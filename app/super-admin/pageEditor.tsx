"use client";

import { useState } from "react";
import type { CmsPage, CmsSection } from "../lib/cms-db";
import PageSeoEditor from "./pageSeoEditor";
import SectionEditor from "./sectionEditor";

export default function PageEditor({ initialPage }: { initialPage: CmsPage }) {
  const [page, setPage] = useState(initialPage);
  const [tab, setTab] = useState<"content" | "seo">("content");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function changePage(key: keyof CmsPage, value: CmsPage[keyof CmsPage]) {
    setPage((current) => ({ ...current, [key]: value }));
  }

  function changeSection(index: number, patch: Partial<CmsSection>) {
    setPage((current) => ({
      ...current,
      sections: current.sections.map((section, itemIndex) =>
        itemIndex === index ? { ...section, ...patch } : section,
      ),
    }));
  }

  async function save() {
    setSaving(true);
    setStatus("");
    const response = await fetch(`/api/admin/pages/${page.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(page),
    });
    const result = await response.json();
    setSaving(false);
    if (!response.ok) {
      setStatus(result.message || "Save failed.");
      return;
    }
    setPage(result.page);
    setStatus("All changes saved.");
  }

  return (
    <div className="admin-form">
      <div>
        <h1 className="admin-title">{page.name}</h1>
        <p className="admin-subtitle">Route: {page.route}</p>
      </div>
      {status && <div className="admin-notice">{status}</div>}
      <div className="admin-tabs">
        <button type="button" className={tab === "content" ? "active" : ""} onClick={() => setTab("content")}>Content</button>
        <button type="button" className={tab === "seo" ? "active" : ""} onClick={() => setTab("seo")}>SEO</button>
      </div>
      {tab === "content" && page.sections.map((section, index) => (
        <SectionEditor
          key={section.section_key}
          section={section}
          defaultOpen={index === 0}
          onChange={(patch) => changeSection(index, patch)}
        />
      ))}
      {tab === "seo" && <PageSeoEditor page={page} onChange={changePage} />}
      <button className="admin-button" onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save All Changes"}
      </button>
    </div>
  );
}
