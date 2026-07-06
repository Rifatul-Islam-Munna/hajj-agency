"use client";

export function Field({ label, value, onChange, textarea, placeholder, className = "" }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`admin-field ${className}`}>
      <label>{label}</label>
      {textarea ? (
        <textarea value={value || ""} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input value={value || ""} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      )}
    </div>
  );
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      <div className="admin-color-row">
        <input type="color" value={value || "#0f6b4f"} onChange={(event) => onChange(event.target.value)} />
        <input value={value || ""} placeholder="#0f6b4f" onChange={(event) => onChange(event.target.value)} />
      </div>
    </div>
  );
}
