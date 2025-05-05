import express from "express";
import url from "url";
import path, { dirname } from "path";

const PORT = 8000;
const app = express();

// Get cyrrent PATH
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "contact-me.html"));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "style.css"));
});

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
