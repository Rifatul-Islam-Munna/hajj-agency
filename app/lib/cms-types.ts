export type CmsSection = {
  id: number;
  page_slug: string;
  section_key: string;
  section_name: string;
  sort_order: number;
  enabled: boolean;
  eyebrow: string;
  title: string;
  description: string;
  image_url: string;
  button_text: string;
  button_url: string;
  button_bg_color: string;
  button_hover_color: string;
  extra_json: string;
};

export type CmsPage = {
  id: number;
  slug: string;
  name: string;
  route: string;
  enabled: boolean;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_card: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  robots_index: boolean;
  robots_follow: boolean;
  structured_data: string;
  sections: CmsSection[];
};

export type PackageRecord = {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  image_url: string;
  price: string;
  duration: string;
  category: string;
  button_text: string;
  button_url: string;
  button_bg_color: string;
  button_hover_color: string;
  featured: boolean;
  enabled: boolean;
  sort_order: number;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  canonical_url: string;
  og_image: string;
  robots_index: boolean;
  robots_follow: boolean;
  structured_data: string;
};

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  featured_image: string;
  author_name: string;
  published_at: string;
  featured: boolean;
  enabled: boolean;
  sort_order: number;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  robots_index: boolean;
  robots_follow: boolean;
  structured_data: string;
};

export type NavItem = {
  id: string;
  label: string;
  url: string;
  enabled: boolean;
  children: NavItem[];
};

export type SiteSettings = {
  site_name: string;
  logo_url: string;
  favicon_url: string;
  default_og_image: string;
  default_meta_title: string;
  default_meta_description: string;
  topbar_email: string;
  topbar_phone: string;
  topbar_address: string;
  sunrise_text: string;
  sunset_text: string;
  cta_text: string;
  cta_url: string;
  nav_items: NavItem[];
  social_links: Record<string, string>;
  imagebb_api_key: string;
};

export type PublicSiteSettings = Omit<SiteSettings, "imagebb_api_key">;
