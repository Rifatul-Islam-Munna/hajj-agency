"use client";

import { useState } from "react";

export default function DashboardLogoutButton() {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      className="green_border_btn"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.assign("/login");
      }}
    >
      {busy ? "Signing out..." : "Log out"}
    </button>
  );
}
