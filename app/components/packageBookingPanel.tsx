"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { PackageBookingBundle } from "../lib/commerce-types";
import { saveSelectedPackage } from "../lib/client-booking";

export default function PackageBookingPanel({ bundle }: { bundle: PackageBookingBundle }) {
  const router = useRouter();
  const { package: item, settings, category, tiers } = bundle;
  const [tierId, setTierId] = useState(tiers[0]?.id || 0);
  const [message, setMessage] = useState("");
  const peopleCount = Math.max(1, settings.min_travellers || settings.max_travellers || 1);
  const selectedTier = tiers.find((tier) => tier.id === tierId) || null;
  const pricing = useMemo(() => {
    if (selectedTier) return { label: selectedTier.label, count: selectedTier.people_count, unit: selectedTier.amount, total: selectedTier.amount };
    const total = settings.pricing_mode === "fixed" ? settings.base_price : settings.base_price * peopleCount;
    return { label: `${peopleCount} traveller${peopleCount === 1 ? "" : "s"}`, count: peopleCount, unit: settings.base_price, total };
  }, [selectedTier, settings, peopleCount]);

  function selectPackage(goToCheckout: boolean) {
    if (!settings.booking_enabled) { setMessage("Online booking is currently unavailable for this package."); return; }
    saveSelectedPackage({
      id: item.id, slug: item.slug, title: item.title, image_url: item.image_url,
      category_name: category?.name || item.category, travellers_count: pricing.count,
      tier_id: selectedTier?.id || 0, pricing_label: pricing.label, unit_price: pricing.unit,
      total_amount: pricing.total, currency: settings.currency,
    });
    router.push(goToCheckout ? "/checkout" : "/cart");
  }

  return <div className="package-booking-panel">
    <h3>Book This Package</h3>
    {tiers.length > 0 ? <div className="form-group"><label>Package option</label><select value={tierId} onChange={(event) => setTierId(Number(event.target.value))}>{tiers.map((tier) => <option key={tier.id} value={tier.id}>{tier.label} ({tier.people_count} people) - {settings.currency} {tier.amount.toLocaleString()}</option>)}</select></div> : <div className="package-booking-total"><span>People</span><strong>{peopleCount}</strong></div>}
    <div className="package-booking-total"><span>Total</span><strong>{settings.currency} {pricing.total.toLocaleString()}</strong></div>
    <p className="package-booking-note">Traveller information will be collected separately for all {pricing.count} traveller{pricing.count === 1 ? "" : "s"} during checkout.</p>
    {message && <p className="text-danger">{message}</p>}
    <div className="d-grid gap-2"><button className="green_btn" type="button" onClick={() => selectPackage(true)}><span>Book Now</span></button><button className="green_border_btn" type="button" onClick={() => selectPackage(false)}><ShoppingCart size={17} /> Add to Cart</button></div>
  </div>;
}
