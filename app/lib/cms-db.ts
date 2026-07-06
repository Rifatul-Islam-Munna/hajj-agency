import { ensureCmsStorage } from "./cms-storage";

export type { CmsPage, CmsSection, PackageRecord } from "./cms-types";
export { getCmsPage, saveCmsPage } from "./cms-pages-store";
export { deletePackage, getPackageBySlug, getPackages, savePackage } from "./package-store";

let started = false;
export function initCmsDatabaseOnce() {
  if (started) return;
  started = true;
  ensureCmsStorage().catch((error) => console.error("CMS storage init failed", error));
}
export const ensureCmsDatabase = ensureCmsStorage;
