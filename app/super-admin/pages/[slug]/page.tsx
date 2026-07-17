import { notFound } from "next/navigation";
import { getCmsPage } from "../../../lib/cms-db";
import { CMS_PAGES } from "../../../lib/cms-config";
import PageEditor from "../../pageEditor";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminPageEditor({ params }: Props) {
  const { slug } = await params;
  if (!CMS_PAGES.some((page) => page.slug === slug)) notFound();
  const page = await getCmsPage(slug);
  if (!page) notFound();
  return <PageEditor initialPage={page} />;
}
