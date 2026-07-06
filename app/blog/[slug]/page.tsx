import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Banner from "../../components/banner";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header1";
import { getBlogPostBySlug, getBlogPosts } from "../../lib/blog-store";
import { plainTextFromHtml, sanitizeRichHtml } from "../../lib/rich-text";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Blog article" };
  const image = post.og_image || post.featured_image;
  const excerpt = plainTextFromHtml(post.excerpt);
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || excerpt,
    keywords: post.seo_keywords || undefined,
    alternates: post.canonical_url ? { canonical: post.canonical_url } : undefined,
    openGraph: {
      type: "article",
      title: post.og_title || post.title,
      description: post.og_description || excerpt,
      publishedTime: post.published_at,
      authors: [post.author_name],
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.twitter_title || post.title,
      description: post.twitter_description || excerpt,
      images: post.twitter_image || image ? [post.twitter_image || image] : undefined,
    },
    robots: { index: post.robots_index, follow: post.robots_follow },
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  const recent = (await getBlogPosts({ limit: 5 }).catch(() => [])).filter((item) => item.id !== post.id).slice(0, 3);
  const tags = post.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  const schema = validSchema(post.structured_data) || JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo_description || plainTextFromHtml(post.excerpt),
    image: post.og_image || post.featured_image || undefined,
    datePublished: post.published_at,
    author: { "@type": "Person", name: post.author_name },
    publisher: { "@type": "Organization", name: "Hajj Agency" },
    mainEntityOfPage: post.canonical_url || undefined,
  });

  return (
    <>
      <Header />
      <Banner title={post.title} />
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />}
      <section className="blog-details section-padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-xl-8 col-lg-8 col-md-12 col-12">
              <article className="post-inner">
                <div className="post-image"><img src={post.featured_image || "/assets/img/blog/blog-details.jpg"} alt={post.title} /></div>
                <div className="entry-content">
                  <div className="blog_meta d-flex gap-4 mb-3">
                    <span><i className="fa-regular fa-clock"></i> {formatDate(post.published_at)}</span>
                    <span><i className="fa-regular fa-user"></i> {post.author_name}</span>
                    <span><i className="fa-regular fa-folder"></i> {post.category}</span>
                  </div>
                  <h1>{post.title}</h1>
                  <div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(post.content) }} />
                </div>
              </article>
            </div>
            <aside className="col-xl-4 col-lg-4 col-12 sidebar-area">
              <div className="widget category-widget">
                <h3 className="widget-title">Category</h3>
                <ul><li><Link href="/blog">{post.category}</Link></li></ul>
              </div>
              <div className="widget popular-posts-widget">
                <h3 className="widget-title">Recent Posts</h3>
                <ul>
                  {recent.map((item) => (
                    <li key={item.id}>
                      <Link href={`/blog/${item.slug}`}>
                        <div className="float-start ppimage"><img src={item.featured_image || "/assets/img/blog/1.jpg"} alt={item.title} /></div>
                        <div className="ppcontent"><h4>{item.title}</h4><span>{formatDate(item.published_at)}</span></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {tags.length > 0 && (
                <div className="widget popular-posts-widget">
                  <h3 className="widget-title">Tags</h3>
                  <div className="tags_clouds">{tags.map((tag) => <Link href="/blog" key={tag}>{tag}</Link>)}</div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function validSchema(value: string) {
  if (!value.trim()) return "";
  try { return JSON.stringify(JSON.parse(value)); } catch { return ""; }
}
