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
  og_image: string;
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
};
