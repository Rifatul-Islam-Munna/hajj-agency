import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const patchDir = ".patches";
if (!existsSync(patchDir)) process.exit(0);

const patches = readdirSync(patchDir).filter((name) => name.endsWith(".json.b64")).sort();
for (const patchName of patches) {
  const encoded = readFileSync(join(patchDir, patchName), "utf8").trim();
  const manifest = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
  for (const entry of manifest.files || []) {
    const target = String(entry.path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, Buffer.from(String(entry.content), "base64"));
  }
  for (const target of manifest.delete || []) {
    rmSync(String(target), { recursive: true, force: true });
  }
  rmSync(join(patchDir, patchName), { force: true });
}
