import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { createDefaultPages } from "./cms-defaults";
import { createDefaultPackages } from "./package-defaults";
import type { CmsPage, PackageRecord } from "./cms-types";

const dataDirectory = process.env.CMS_DATA_DIR
  ? path.resolve(process.env.CMS_DATA_DIR)
  : path.join(process.cwd(), "data");
const pagesPath = path.join(dataDirectory, "cms-pages.json");
const packagesPath = path.join(dataDirectory, "packages.json");
let pagesQueue = Promise.resolve();
let packagesQueue = Promise.resolve();

async function load<T>(file: string, fallback: T): Promise<T> {
  await mkdir(dataDirectory, { recursive: true });
  try {
    return JSON.parse(await readFile(file, "utf8")) as T;
  } catch {
    await save(file, fallback);
    return fallback;
  }
}

async function save(file: string, value: unknown) {
  await mkdir(dataDirectory, { recursive: true });
  const temporary = `${file}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(temporary, file);
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
    await save(pagesPath, items);
  });
  return pagesQueue;
}

export async function writePackages(update: (items: PackageRecord[]) => void | Promise<void>) {
  packagesQueue = packagesQueue.then(async () => {
    const items = await readPackages();
    await update(items);
    await save(packagesPath, items);
  });
  return packagesQueue;
}
