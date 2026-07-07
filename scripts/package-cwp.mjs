import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, ".next", "standalone");
const target = join(root, "deploy", "cwp-app");

if (!existsSync(source)) {
  console.error("Missing .next/standalone. Run npm run build first.");
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

cpSync(source, target, { recursive: true });

const staticSource = join(root, ".next", "static");
if (existsSync(staticSource)) {
  cpSync(staticSource, join(target, ".next", "static"), { recursive: true });
}

const publicSource = join(root, "public");
if (existsSync(publicSource)) {
  cpSync(publicSource, join(target, "public"), { recursive: true });
}

const envSource = join(root, ".env");
if (existsSync(envSource)) {
  cpSync(envSource, join(target, ".env"));
}

console.log("CWP package ready: deploy/cwp-app");
console.log("Zip contents of deploy/cwp-app, not the folder itself.");
console.log("CWP startup file: server.js");
