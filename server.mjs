import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";

process.env.NODE_ENV = process.env.NODE_ENV || "production";

const port = Number(process.env.PORT || 3000);
const hostname = process.env.HOST || "localhost";
const app = next({ dev: false, dir: process.cwd(), hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

createServer((req, res) => {
  const started = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} ${res.statusCode} ${Date.now() - started}ms`);
  });
  handle(req, res, parse(req.url || "/", true)).catch((error) => {
    console.error(error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  });
}).listen(port, hostname, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});
