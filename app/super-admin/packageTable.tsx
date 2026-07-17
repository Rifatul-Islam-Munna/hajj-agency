"use client";

import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { PackageAdminRow } from "../lib/commerce-types";

export default function PackageTable({ initialRows }: { initialRows: PackageAdminRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [message, setMessage] = useState("");
  const categories = Array.from(new Set(rows.map((row) => row.category_name).filter(Boolean)));
  const filtered = rows.filter((row) => {
    const text = `${row.title} ${row.slug} ${row.category_name}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === "all" || row.category_name === category);
  });

  async function remove(row: PackageAdminRow) {
    if (!window.confirm(`Delete “${row.title}”?`)) return;
    const response = await fetch("/api/management/package-catalog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.id }),
    });
    if (!response.ok) { setMessage("Package could not be deleted."); return; }
    setRows((current) => current.filter((item) => item.id !== row.id));
    setMessage("Package deleted.");
  }

  return <div>
    <div className="admin-page-head">
      <div><h1 className="admin-title">Hajj & Umrah Packages</h1><p className="admin-subtitle">Manage categories, prices, traveller limits, booking forms and package content.</p></div>
      <Link className="admin-button" href="/super-admin/packages/new"><Plus size={18} /> Create Package</Link>
    </div>
    {message && <div className="admin-notice" style={{ marginTop: 18 }}>{message}</div>}
    <div className="admin-toolbar">
      <input className="admin-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search packages..." />
      <select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
      <span className="admin-result-count">{filtered.length} packages</span>
    </div>
    <div className="admin-table-card"><div className="admin-table-scroll"><table className="admin-table">
      <thead><tr><th>Package</th><th>Category</th><th>Price</th><th>Travellers</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{filtered.map((row) => <tr key={row.id}>
        <td><div className="admin-table-primary">{row.image_url ? <img src={row.image_url} alt="" /> : <div className="admin-table-placeholder" />}<div><strong>{row.title}</strong><small>/{row.slug}</small></div></div></td>
        <td><span className="admin-chip">{row.category_name || row.category}</span></td>
        <td><strong>{row.currency} {row.base_price.toLocaleString()}</strong><small>{row.pricing_mode === "per_person" ? " per traveller" : " fixed"}</small></td>
        <td>{row.min_travellers === row.max_travellers ? row.min_travellers : `${row.min_travellers}-${row.max_travellers}`}</td>
        <td><span className={`admin-status ${row.enabled && row.booking_enabled ? "success" : "muted"}`}>{row.enabled && row.booking_enabled ? "Active" : "Draft"}</span>{row.featured && <span className="admin-status warning">Featured</span>}</td>
        <td><div className="admin-row-actions"><Link href={`/package-details/${row.slug}`} title="Preview"><Eye size={17} /></Link><Link href={`/super-admin/packages/${row.id}/edit`} title="Edit"><Edit3 size={17} /></Link><button title="Delete" onClick={() => remove(row)}><Trash2 size={17} /></button></div></td>
      </tr>)}</tbody>
    </table></div>{filtered.length === 0 && <div className="admin-empty">No packages match this filter.</div>}</div>
  </div>;
}
