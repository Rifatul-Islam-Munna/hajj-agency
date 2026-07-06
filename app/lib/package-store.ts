import { readPackages, writePackages } from "./cms-storage";
import { normalizePackage } from "./cms-normalize";
import type { PackageRecord } from "./cms-types";

export async function getPackages(options: { featured?: boolean; enabledOnly?: boolean } = {}): Promise<PackageRecord[]> {
  let items = await readPackages();
  if (options.enabledOnly !== false) items = items.filter((item) => item.enabled);
  if (options.featured !== undefined) items = items.filter((item) => item.featured === options.featured);
  return items.sort((a, b) => a.sort_order - b.sort_order || a.id - b.id);
}

export async function savePackage(input: Partial<PackageRecord>): Promise<PackageRecord> {
  let result!: PackageRecord;
  await writePackages((items) => {
    const normalized = normalizePackage(input);
    if (items.some((item) => item.slug === normalized.slug && item.id !== normalized.id)) {
      throw new Error("DUPLICATE_SLUG");
    }
    const index = items.findIndex((item) => item.id === normalized.id);
    if (index >= 0) {
      result = { ...items[index], ...normalized, id: items[index].id };
      items[index] = result;
    } else {
      result = { ...normalized, id: items.reduce((max, item) => Math.max(max, item.id), 0) + 1 };
      items.push(result);
    }
  });
  return result;
}

export async function deletePackage(id: number) {
  await writePackages((items) => {
    const index = items.findIndex((item) => item.id === id);
    if (index >= 0) items.splice(index, 1);
  });
}

export async function getPackageBySlug(slug: string): Promise<PackageRecord | null> {
  return (await getPackages()).find((item) => item.slug === slug) || null;
}
