"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { BookingField, PackageBookingBundle } from "../lib/commerce-types";
import { clearSelectedPackage, readSelectedPackage, type SelectedPackage } from "../lib/client-booking";

export default function BookingCheckoutView() {
  const [selected, setSelected] = useState<SelectedPackage | null>(null);
  const [bundle, setBundle] = useState<PackageBookingBundle | null>(null);
  const [onlinePayment, setOnlinePayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"sslcommerz" | "offline">("offline");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", city: "", country: "Bangladesh" });
  const [answers, setAnswers] = useState<Record<string, string>>( {} );
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const item = readSelectedPackage();
    setSelected(item);
    if (!item) return;
    fetch(`/api/catalog/package-booking?slug=${encodeURIComponent(item.slug)}`, { cache: "no-store" })
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        if (!response.ok) throw new Error(data.message || "Could not load booking form.");
        setBundle(data.bundle);
        setOnlinePayment(Boolean(data.payment?.enabled));
        setPaymentMethod(data.payment?.enabled ? "sslcommerz" : "offline");
      })
      .catch((error) => setMessage(error instanceof Error ? error.message : "Could not load booking form."));
  }, []);

  const travellerFields = useMemo(() => bundle?.fields.filter((field) => field.per_traveller) || [], [bundle]);
  const orderFields = useMemo(() => bundle?.fields.filter((field) => !field.per_traveller) || [], [bundle]);

  function setAnswer(field: BookingField, travellerIndex: number, value: string) {
    setAnswers((current) => ({ ...current, [`${travellerIndex}:${field.id}`]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!selected || !bundle) return;
    setSubmitting(true); setMessage("");
    const orderAnswers = [
      ...orderFields.map((field) => ({ field_id: field.id, traveller_index: -1, value: answers[`-1:${field.id}`] || "" })),
      ...Array.from({ length: selected.travellers_count }, (_, travellerIndex) => travellerFields.map((field) => ({ field_id: field.id, traveller_index: travellerIndex, value: answers[`${travellerIndex}:${field.id}`] || "" }))).flat(),
    ];
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        package_id: selected.id,
        travellers_count: selected.travellers_count,
        tier_id: selected.tier_id || undefined,
        payment_method: paymentMethod,
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        customer_address: customer.address,
        customer_city: customer.city,
        customer_country: customer.country,
        answers: orderAnswers,
      }),
    });
    const data = await response.json();
    if (!response.ok) { setSubmitting(false); setMessage(data.message || "Booking could not be created."); return; }
    if (paymentMethod === "sslcommerz") {
      const paymentResponse = await fetch("/api/payments/sslcommerz/initiate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order_id: data.order.id }) });
      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok || !paymentData.gatewayUrl) { setSubmitting(false); setMessage(paymentData.message || "Payment could not be started. Your order was saved."); return; }
      clearSelectedPackage();
      window.location.assign(paymentData.gatewayUrl);
      return;
    }
    clearSelectedPackage();
    window.location.assign(`/order-confirmation?order=${encodeURIComponent(data.order.order_number)}&status=pending`);
  }

  if (!selected) return <section className="shop checkout section-padding"><div className="container"><div className="admin-empty"><h3>No package selected</h3><p>Choose a package before opening checkout.</p><Link href="/packages" className="green_btn"><span>Browse Packages</span></Link></div></div></section>;
  if (!bundle) return <section className="shop checkout section-padding"><div className="container"><p>{message || "Loading booking form..."}</p></div></section>;

  return <section className="shop checkout section-padding"><div className="container"><form onSubmit={submit}><div className="row g-4">
    <div className="col-lg-8"><div className="checkout-form"><h2>Primary Contact</h2><div className="row g-3">
      <CheckoutInput label="Full name" required value={customer.name} onChange={(value) => setCustomer((current) => ({ ...current, name: value }))} />
      <CheckoutInput label="Email" required type="email" value={customer.email} onChange={(value) => setCustomer((current) => ({ ...current, email: value }))} />
      <CheckoutInput label="Phone" required type="tel" value={customer.phone} onChange={(value) => setCustomer((current) => ({ ...current, phone: value }))} />
      <CheckoutInput label="Country" required value={customer.country} onChange={(value) => setCustomer((current) => ({ ...current, country: value }))} />
      <CheckoutInput label="City / Division" required value={customer.city} onChange={(value) => setCustomer((current) => ({ ...current, city: value }))} />
      <CheckoutInput label="Address" required value={customer.address} onChange={(value) => setCustomer((current) => ({ ...current, address: value }))} />
    </div></div>
    {orderFields.length > 0 && <FormSection title="Booking Information" fields={orderFields} travellerIndex={-1} answers={answers} setAnswer={setAnswer} />}
    {Array.from({ length: selected.travellers_count }, (_, index) => <FormSection key={index} title={`Traveller ${index + 1} of ${selected.travellers_count}`} fields={travellerFields} travellerIndex={index} answers={answers} setAnswer={setAnswer} />)}
    </div>
    <div className="col-lg-4"><div className="order-details"><div className="single-widget"><h2>Booking Summary</h2><div className="content"><ul><li>{selected.title}<span>{selected.currency} {selected.total_amount.toLocaleString()}</span></li><li>Travellers<span>{selected.travellers_count}</span></li><li>Option<span>{selected.pricing_label}</span></li><li className="last">Total<span>{selected.currency} {selected.total_amount.toLocaleString()}</span></li></ul></div></div><div className="single-widget payment-methods"><h2>Payment</h2><div className="content"><label className="form-check"><input type="radio" name="payment" checked={paymentMethod === "offline"} onChange={() => setPaymentMethod("offline")} /> Pay / confirm with agency</label>{onlinePayment && <label className="form-check"><input type="radio" name="payment" checked={paymentMethod === "sslcommerz"} onChange={() => setPaymentMethod("sslcommerz")} /> Pay online with SSLCommerz</label>}</div></div>{message && <div className="alert alert-danger">{message}</div>}<button type="submit" className="green_btn w-100" disabled={submitting}><span>{submitting ? "Processing..." : paymentMethod === "sslcommerz" ? "Create Order & Pay" : "Submit Booking"}</span></button></div></div>
  </div></form></div></section>;
}

function CheckoutInput({ label, value, onChange, required = false, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return <div className="col-md-6"><div className="form-group"><label>{label}{required && <span>*</span>}</label><input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} /></div></div>;
}

function FormSection({ title, fields, travellerIndex, answers, setAnswer }: { title: string; fields: BookingField[]; travellerIndex: number; answers: Record<string, string>; setAnswer: (field: BookingField, travellerIndex: number, value: string) => void }) {
  return <div className="checkout-form mt-4"><h2>{title}</h2><div className="row g-3">{fields.map((field) => <DynamicField key={field.id} field={field} value={answers[`${travellerIndex}:${field.id}`] || ""} onChange={(value) => setAnswer(field, travellerIndex, value)} />)}</div></div>;
}

function DynamicField({ field, value, onChange }: { field: BookingField; value: string; onChange: (value: string) => void }) {
  const className = field.field_type === "textarea" ? "col-12" : "col-md-6";
  return <div className={className}><div className="form-group"><label>{field.label}{field.required && <span>*</span>}</label>{field.field_type === "select" ? <select value={value} onChange={(event) => onChange(event.target.value)} required={field.required}><option value="">{field.placeholder || `Select ${field.label}`}</option>{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : field.field_type === "textarea" ? <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={field.placeholder} required={field.required} rows={4} /> : field.field_type === "checkbox" ? <label className="form-check"><input type="checkbox" checked={value === "Yes"} onChange={(event) => onChange(event.target.checked ? "Yes" : "No")} required={field.required} /> {field.placeholder || field.label}</label> : <input type={field.field_type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={field.placeholder} required={field.required} />}{field.help_text && <small>{field.help_text}</small>}</div></div>;
}
