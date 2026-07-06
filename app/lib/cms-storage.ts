import { readFile, writeFile } from "fs/promises";
import path from "path";
import { createDefaultPages } from "./cms-defaults";
import { createDefaultPackages } from "./package-defaults";
import type { CmsPage, PackageRecord } from "./cms-types";

const pagesPath = path.join(process.cwd(), "data", "cms-pages.json");
const packagesPath = path.join(process.cwd(), "data", "packages.json");
let pagesQueue = Promise.resolve();
let packagesQueue = Promise.resolve();

async function load<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as T;
  } catch {
    await writeFile(file, `${JSON.stringify(fallback, null, 2)}\n`, "utf8");
    return fallback;
  }
}

export function ensureCmsStorage() {
  return Promise.all([readPages(), readPackages()]).then(() => undefined);
}

export function readPages() {
  return load<CmsPage[]>(pagesPath, createDefaultPages());
}

export function readPackages() {
  return load<PackageRecord[]>(packagesPath, createDefaultPackages());
}

export async function writePages(update: (items: CmsPage[]) => void | Promise<void>) {
  pagesQueue = pagesQueue.then(async () => {
    const items = await readPages();
    await update(items);
    await writeFile(pagesPath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  });
  return pagesQueue;
}

export async function writePackages(update: (items: PackageRecord[]) => void | Promise<void>) {
  packagesQueue = packagesQueue.then(async () => {
    const items = await readPackages();
    await update(items);
    await writeFile(packagesPath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  });
  return packagesQueue;
}
