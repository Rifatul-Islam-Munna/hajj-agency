"use client";

import { ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  recommended: string;
  help?: string;
};

export default function ImageUploadField({ label, value, onChange, recommended, help }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setMessage("");
    const dimensions = await readDimensions(file).catch(() => null);
    const form = new FormData();
    form.set("image", file);
    const response = await fetch("/api/admin/uploads/imgbb", { method: "POST", body: form });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setMessage(data.message || "Upload failed.");
      return;
    }
    onChange(data.url);
    const actual = dimensions ? `${dimensions.width}×${dimensions.height}px` : "";
    setMessage(`Uploaded to ImageBB${actual ? ` (${actual})` : ""}.`);
  }

  return (
    <div className="admin-field full admin-image-field">
      <label><ImagePlus size={17} /> {label}</label>
      <div className="admin-image-size"><strong>Recommended size:</strong> {recommended}</div>
      {help && <small className="admin-help">{help}</small>}
      <div className="admin-image-actions">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) upload(file);
            event.currentTarget.value = "";
          }}
        />
        <button type="button" className="admin-button secondary" disabled={busy} onClick={() => inputRef.current?.click()}>
          {busy ? <><Loader2 size={17} className="admin-spin" /> Uploading...</> : <><UploadCloud size={17} /> Upload to ImageBB</>}
        </button>
        {value && (
          <button type="button" className="admin-button danger" onClick={() => onChange("")}>
            <Trash2 size={16} /> Remove
          </button>
        )}
      </div>
      <input
        value={value || ""}
        placeholder="ImageBB URL will appear here"
        readOnly
        aria-label={`${label} ImageBB URL`}
      />
      {message && <small className={message.includes("failed") ? "admin-error-text" : "admin-success-text"}>{message}</small>}
      {value && <img src={value} alt={`${label} preview`} className="admin-image-preview" />}
    </div>
  );
}

function readDimensions(file: File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
      URL.revokeObjectURL(url);
    };
    image.onerror = () => {
      reject(new Error("Could not read image"));
      URL.revokeObjectURL(url);
    };
    image.src = url;
  });
}
