// Tiny local preview server for dist/ (mimics GitHub Pages incl. BASE_PATH):  npm run build && npm run serve
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
import { SITE } from "./data/site.js";
const BASE = (process.env.BASE_PATH ?? SITE.basePath ?? "").replace(/\/+$/, "");
const dist = path.resolve("dist"), port = +process.env.PORT || 8080;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".mp4": "video/mp4", ".vtt": "text/vtt", ".xml": "application/xml", ".txt": "text/plain" };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (BASE && !p.startsWith(BASE)) { res.writeHead(404); return res.end("Not under base path " + BASE); }
  p = p.slice(BASE.length) || "/";
  let f = path.join(dist, p); if (!f.startsWith(dist)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) { if (!p.endsWith("/")) { res.writeHead(301, { Location: BASE + p + "/" }); return res.end(); } f = path.join(f, "index.html"); }
  if (!fs.existsSync(f)) { res.writeHead(404, { "Content-Type": types[".html"] }); return res.end(fs.readFileSync(path.join(dist, "404.html"))); }
  res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log(`http://localhost:${port}${BASE}/`));
