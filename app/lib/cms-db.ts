import { ensureCmsStorage } from "./cms-storage";

export type { BlogPost, CmsPage, CmsSection, NavItem, PackageRecord, PublicSiteSettings, SiteSettings } from "./cms-types";
export { getCmsPage, getCmsPages, saveCmsPage } from "./cms-pages-store";
export { deletePackage, getPackageBySlug, getPackages, savePackage } from "./package-store";
export { deleteBlogPost, getBlogPostBySlug, getBlogPosts, saveBlogPost } from "./blog-store";
export { getPublicSiteSettings, getSiteSettings, saveSiteSettings } from "./site-settings";

let started = false;
export function initCmsDatabaseOnce() {
  if (started) return;
  started = true;
  ensureCmsStorage().catch((error) => console.error("CMS database init failed", error));
}
export const ensureCmsDatabase = ensureCmsStorage;
