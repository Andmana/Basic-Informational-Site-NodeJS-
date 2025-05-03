import http from "http";
import url from "url";
import path from "path";
import fs from "fs/promises";

const PORT = 8000;

// Get cyrrent PATH
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);

    let contentType = "text/html";
    let filePath;

    try {
        if (req.method === "GET") {
            if (req.url === "/") {
                filePath = path.join(__dirname, "index.html");
            } else if (req.url === "/about") {
                filePath = path.join(__dirname, "about.html");
            } else if (req.url === "/contact") {
                filePath = path.join(__dirname, "contact-me.html");
            } else if (req.url === "/style.css") {
                filePath = path.join(__dirname, "style.css");
                contentType = "text/css"; // Set content type for CSS file
            } else {
                filePath = path.join(__dirname, "404.html");
            }
        } else {
            filePath = path.join(__dirname, "404.html");
        }
        console.log(`${filePath} ${contentType}`);

        const data = await fs.readFile(filePath);
        res.setHeader("content-type", contentType);
        res.write(data);

        res.end();
    } catch (error) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end(`Server error`);
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
