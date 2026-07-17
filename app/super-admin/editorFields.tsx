"use client";

export function Field({ label, value, onChange, textarea, placeholder, className = "", type = "text", help }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  placeholder?: string;
  className?: string;
  type?: string;
  help?: string;
}) {
  return (
    <div className={`admin-field ${className}`}>
      <label>{label}</label>
      {help && <small className="admin-help">{help}</small>}
      {textarea ? (
        <textarea value={value || ""} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input type={type} value={value || ""} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      )}
    </div>
  );
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const color = /^#[0-9a-f]{6}$/i.test(value || "") ? value : "#0f6b4f";
  return (
    <div className="admin-field">
      <label>{label}</label>
      <div className="admin-color-row">
        <input type="color" value={color} onChange={(event) => onChange(event.target.value)} />
        <input value={value || ""} placeholder="#0f6b4f" onChange={(event) => onChange(event.target.value)} />
      </div>
      {value && <button type="button" className="admin-button secondary" onClick={() => onChange("")}>Clear color</button>}
    </div>
  );
}
