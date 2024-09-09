import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

const hostname = "localhost";
const port = 8082;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
};

const server = createServer(async (req, res) => {
  let filePath = join(__dirname, req.url === "/" ? "index.html" : req.url);
  const ext = extname(filePath);

  // Establece el tipo MIME basado en la extensión del archivo
  const contentType = mimeTypes[ext] || "application/octet-stream";

  try {
    const data = await readFile(filePath);
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(data);
  } catch (err) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("File not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
