import type { PackageRecord } from "./cms-types";

export type PackageCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  enabled: boolean;
  sort_order: number;
};

export type PackageBookingSettings = {
  package_id: number;
  category_id: number;
  base_price: number;
  currency: string;
  pricing_mode: "per_person" | "fixed";
  min_travellers: number;
  max_travellers: number;
  deposit_amount: number;
  booking_enabled: boolean;
};

export type PackagePriceTier = {
  id: number;
  package_id: number;
  label: string;
  people_count: number;
  amount: number;
  enabled: boolean;
  sort_order: number;
};

export type BookingField = {
  id: number;
  scope_type: "global" | "category" | "package";
  scope_id: number;
  label: string;
  field_key: string;
  field_type: "text" | "email" | "tel" | "date" | "number" | "select" | "textarea" | "checkbox";
  placeholder: string;
  help_text: string;
  options: string[];
  required: boolean;
  per_traveller: boolean;
  enabled: boolean;
  sort_order: number;
};

export type PackageAdminRow = PackageRecord & {
  category_id: number;
  category_name: string;
  category_slug: string;
  base_price: number;
  currency: string;
  pricing_mode: "per_person" | "fixed";
  min_travellers: number;
  max_travellers: number;
  booking_enabled: boolean;
};

export type PackageBookingBundle = {
  package: PackageRecord;
  settings: PackageBookingSettings;
  category: PackageCategory | null;
  tiers: PackagePriceTier[];
  fields: BookingField[];
};

export type OrderRecord = {
  id: number;
  order_number: string;
  user_id: number | null;
  package_id: number;
  package_title: string;
  category_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_country: string;
  travellers_count: number;
  pricing_label: string;
  unit_price: number;
  total_amount: number;
  currency: string;
  status: "pending" | "confirmed" | "processing" | "completed" | "cancelled";
  payment_status: "unpaid" | "pending" | "paid" | "failed" | "refunded";
  payment_method: "sslcommerz" | "offline";
  transaction_id: string;
  payment_sessionkey: string;
  admin_note: string;
  created_at: string;
  updated_at: string;
};

export type OrderAnswer = {
  id: number;
  order_id: number;
  traveller_index: number;
  field_id: number;
  field_label: string;
  field_key: string;
  value: string;
};

export type PaymentSettings = {
  enabled: boolean;
  sandbox: boolean;
  store_id: string;
  store_password: string;
  currency: string;
};
