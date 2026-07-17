import { HOME_CMS_PAGES } from "./cms-config-home";
import { CORE_CMS_PAGES } from "./cms-config-core";
import { CONTENT_CMS_PAGES } from "./cms-config-content";
import { EXTRA_CMS_PAGES } from "./cms-config-extra";

export type { CmsPageSeed, CmsSectionSeed } from "./cms-config-types";
export const CMS_PAGES = [
  ...HOME_CMS_PAGES,
  ...CORE_CMS_PAGES,
  ...CONTENT_CMS_PAGES,
  ...EXTRA_CMS_PAGES,
];
