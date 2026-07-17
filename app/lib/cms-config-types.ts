export type CmsSectionSeed = {
  key: string;
  name: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
};

export type CmsPageSeed = {
  slug: string;
  name: string;
  route: string;
  seoTitle: string;
  seoDescription: string;
  sections: CmsSectionSeed[];
};
