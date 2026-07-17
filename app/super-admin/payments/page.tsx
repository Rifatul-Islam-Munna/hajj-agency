import { getPaymentSettings } from "../../lib/payment-store";
import type { PaymentSettings } from "../../lib/commerce-types";
import PaymentSettingsManager from "../paymentSettingsManager";

export default async function PaymentsPage() {
  const fallback: PaymentSettings = { enabled: false, sandbox: true, store_id: "", store_password: "", currency: "BDT" };
  const settings = await getPaymentSettings().catch((error) => {
    console.error("ADMIN_PAYMENTS_EMPTY_FALLBACK", error);
    return fallback;
  });
  return <PaymentSettingsManager initialSettings={settings} />;
}
