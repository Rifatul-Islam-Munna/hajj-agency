import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";

process.env.NODE_ENV = process.env.NODE_ENV || "production";

const port = Number(process.env.PORT || 3000);
const hostname = process.env.HOSTNAME || "0.0.0.0";
const app = next({ dev: false, dir: process.cwd(), hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

createServer((req, res) => {
  handle(req, res, parse(req.url || "/", true));
}).listen(port, hostname, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});
