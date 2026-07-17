"use client";

import { Bot, Code2, Plus, Save, Search, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "../lib/cms-db";
import { Field } from "./editorFields";
import ImageUploadField from "./imageUploadField";
import RichTextEditor from "./richTextEditor";

const today = new Date().toISOString().slice(0, 10);
const emptyPost: BlogPost = {
  id: 0,
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "Hajj Guide",
  tags: "",
  featured_image: "",
  author_name: "Hajj Agency",
  published_at: today,
  featured: false,
  enabled: true,
  sort_order: 0,
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  canonical_url: "",
  og_title: "",
  og_description: "",
  og_image: "",
  twitter_title: "",
  twitter_description: "",
  twitter_image: "",
  robots_index: true,
  robots_follow: true,
  structured_data: "",
};

export default function BlogManager({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [items, setItems] = useState(initialPosts);
  const [draft, setDraft] = useState(emptyPost);
  const [busy, setBusy] = useState<number | "new" | null>(null);
  const [message, setMessage] = useState("");

  function patch(index: number, update: Partial<BlogPost>) {
    setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, ...update } : item));
  }

  async function save(item: BlogPost, index?: number) {
    setBusy(item.id || "new");
    setMessage("");
    const response = await fetch("/api/management/blogs", {
      method: item.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    setBusy(null);
    if (!response.ok) {
      setMessage(data.message || "Blog post could not be saved.");
      return;
    }
    if (item.id && index !== undefined) patch(index, data.post);
    else {
      setItems((current) => [data.post, ...current]);
      setDraft({ ...emptyPost, published_at: new Date().toISOString().slice(0, 10) });
    }
    setMessage("Blog post saved.");
  }

  async function remove(item: BlogPost) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    setBusy(item.id);
    const response = await fetch("/api/management/blogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    setBusy(null);
    if (!response.ok) {
      setMessage("Blog post could not be deleted.");
      return;
    }
    setItems((current) => current.filter((post) => post.id !== item.id));
    setMessage("Blog post deleted.");
  }

  return (
    <div>
      <h1 className="admin-title">Blog</h1>
      <p className="admin-subtitle">Publish Hajj guidance, Umrah travel tips and agency news with rich text, ImageBB images and post-level SEO.</p>
      {message && <div className="admin-notice" style={{ marginTop: 18 }}>{message}</div>}

      <details className="admin-section-card admin-create-panel" style={{ marginTop: 24 }}>
        <summary><Plus size={19} /> Write a new blog post</summary>
        <BlogFields item={draft} onChange={(update) => setDraft((current) => ({ ...current, ...update }))} />
        <div className="admin-actions" style={{ marginTop: 16 }}>
          <button className="admin-button" disabled={busy === "new"} onClick={() => save(draft)}>
            <Plus size={17} /> {busy === "new" ? "Publishing..." : "Create Post"}
          </button>
        </div>
      </details>

      <div className="admin-package-list">
        {items.map((item, index) => (
          <div className="admin-package-card" key={item.id}>
            <div className="admin-section-head">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {item.featured_image && <img src={item.featured_image} className="admin-package-preview" alt={item.title} />}
                <div><h3>{item.title}</h3><p className="admin-subtitle">/blog/{item.slug}</p></div>
              </div>
              <label className="admin-toggle"><input type="checkbox" checked={item.enabled} onChange={(event) => patch(index, { enabled: event.target.checked })} /> Published</label>
            </div>
            <BlogFields item={item} onChange={(update) => patch(index, update)} />
            <div className="admin-actions" style={{ marginTop: 16 }}>
              <button className="admin-button" disabled={busy === item.id} onClick={() => save(item, index)}><Save size={17} /> {busy === item.id ? "Saving..." : "Save"}</button>
              <button className="admin-button danger" disabled={busy === item.id} onClick={() => remove(item)}><Trash2 size={17} /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogFields({ item, onChange }: { item: BlogPost; onChange: (update: Partial<BlogPost>) => void }) {
  return (
    <div className="admin-fields" style={{ marginTop: 16 }}>
      <Field label="Post title" value={item.title} onChange={(title) => onChange({ title })} />
      <Field label="Slug" value={item.slug} onChange={(slug) => onChange({ slug })} />
      <Field label="Category" value={item.category} onChange={(category) => onChange({ category })} />
      <Field label="Tags" value={item.tags} onChange={(tags) => onChange({ tags })} placeholder="Hajj, Umrah, Visa, Travel Tips" />
      <Field label="Author" value={item.author_name} onChange={(author_name) => onChange({ author_name })} />
      <Field label="Publish date" value={item.published_at} onChange={(published_at) => onChange({ published_at })} type="date" />
      <Field label="Sort order" value={String(item.sort_order)} onChange={(value) => onChange({ sort_order: Number(value) || 0 })} type="number" />
      <div className="admin-field"><label className="admin-toggle"><input type="checkbox" checked={item.featured} onChange={(event) => onChange({ featured: event.target.checked })} /> Feature on homepage</label></div>
      <RichTextEditor label="Excerpt / short description" value={item.excerpt} onChange={(excerpt) => onChange({ excerpt })} help="This short description also supports paragraphs, line breaks, bold text, lists and links." />
      <RichTextEditor label="Article content" value={item.content} onChange={(content) => onChange({ content })} help="Use paragraphs, line breaks, headings, bold text, lists, quotes and links." />
      <ImageUploadField label="Featured blog image" value={item.featured_image} onChange={(featured_image) => onChange({ featured_image })} recommended="1200 × 800 px" />

      <details className="admin-details full">
        <summary><Search size={18} /> Complete blog SEO</summary>
        <div className="admin-fields">
          <Field label="SEO title" value={item.seo_title} onChange={(seo_title) => onChange({ seo_title })} />
          <Field label="Canonical URL" value={item.canonical_url} onChange={(canonical_url) => onChange({ canonical_url })} />
          <Field className="full" label="SEO description" value={item.seo_description} onChange={(seo_description) => onChange({ seo_description })} textarea />
          <Field className="full" label="SEO keywords" value={item.seo_keywords} onChange={(seo_keywords) => onChange({ seo_keywords })} />
          <div className="admin-subsection-title full"><Share2 size={17} /> Open Graph</div>
          <Field label="OG title" value={item.og_title} onChange={(og_title) => onChange({ og_title })} />
          <Field label="OG description" value={item.og_description} onChange={(og_description) => onChange({ og_description })} />
          <ImageUploadField label="Open Graph image" value={item.og_image} onChange={(og_image) => onChange({ og_image })} recommended="1200 × 630 px" />
          <div className="admin-subsection-title full"><Share2 size={17} /> X / Twitter</div>
          <Field label="Twitter title" value={item.twitter_title} onChange={(twitter_title) => onChange({ twitter_title })} />
          <Field label="Twitter description" value={item.twitter_description} onChange={(twitter_description) => onChange({ twitter_description })} />
          <ImageUploadField label="Twitter image" value={item.twitter_image} onChange={(twitter_image) => onChange({ twitter_image })} recommended="1200 × 675 px" />
          <div className="admin-subsection-title full"><Bot size={17} /> Robots</div>
          <div className="admin-actions full">
            <label className="admin-toggle"><input type="checkbox" checked={item.robots_index} onChange={(event) => onChange({ robots_index: event.target.checked })} /> Allow indexing</label>
            <label className="admin-toggle"><input type="checkbox" checked={item.robots_follow} onChange={(event) => onChange({ robots_follow: event.target.checked })} /> Follow links</label>
          </div>
          <div className="admin-subsection-title full"><Code2 size={17} /> JSON-LD</div>
          <Field className="full" label="Article schema JSON" value={item.structured_data} onChange={(structured_data) => onChange({ structured_data })} textarea />
        </div>
      </details>
    </div>
  );
}
