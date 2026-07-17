"use client";

import { UploadCloud } from "lucide-react";
import { useState } from "react";

export default function SqlImportCard() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function upload() {
    if (!file) {
      setError(true);
      setMessage("Choose a .sql file first.");
      return;
    }
    setBusy(true);
    setError(false);
    setMessage("");
    const form = new FormData();
    form.append("file", file);
    try {
      const response = await fetch("/api/management/sql-import", { method: "POST", body: form });
      const body = await response.json().catch(() => ({ message: "SQL import failed." }));
      setError(!response.ok);
      setMessage(body.message || (response.ok ? "SQL import complete." : "SQL import failed."));
    } catch {
      setError(true);
      setMessage("SQL import failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-card sql-import-card">
      <div>
        <h2>Upload SQL Data</h2>
        <p className="admin-subtitle">Upload one .sql file to import database tables and rows.</p>
      </div>
      <div className="admin-actions" style={{ marginTop: 16 }}>
        <label className="admin-button secondary sql-import-file">
          <input type="file" accept=".sql,application/sql,text/plain" onChange={(event) => setFile(event.target.files?.[0] || null)} />
          {file ? file.name : "Choose SQL File"}
        </label>
        <button type="button" className="admin-button" onClick={upload} disabled={busy}>
          <UploadCloud size={18} /> {busy ? "Uploading..." : "Upload Data"}
        </button>
      </div>
      {message && <div className={`admin-notice ${error ? "admin-error" : ""}`} style={{ marginTop: 16 }}>{message}</div>}
    </div>
  );
}
