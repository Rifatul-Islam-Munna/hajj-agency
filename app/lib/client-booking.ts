export type SelectedPackage = {
  id: number;
  slug: string;
  title: string;
  image_url: string;
  category_name: string;
  travellers_count: number;
  tier_id: number;
  pricing_label: string;
  unit_price: number;
  total_amount: number;
  currency: string;
};

const storageKey = "selected_hajj_package";
const changeEvent = "selected-package-change";

export function readSelectedPackage(): SelectedPackage | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(storageKey);
    const parsed = value ? JSON.parse(value) : null;
    return parsed && typeof parsed === "object" && parsed.id ? parsed as SelectedPackage : null;
  } catch {
    return null;
  }
}

export function saveSelectedPackage(item: SelectedPackage) {
  window.localStorage.setItem(storageKey, JSON.stringify(item));
  window.dispatchEvent(new Event(changeEvent));
}

export function clearSelectedPackage() {
  window.localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event(changeEvent));
}

export function subscribeSelectedPackage(listener: () => void) {
  const handler = () => listener();
  window.addEventListener("storage", handler);
  window.addEventListener(changeEvent, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(changeEvent, handler);
  };
}
