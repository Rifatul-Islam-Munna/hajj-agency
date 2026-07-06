import { getPaymentSettings } from "../../lib/payment-store";
import PaymentSettingsManager from "../paymentSettingsManager";

export default async function PaymentsPage() {
  return <PaymentSettingsManager initialSettings={await getPaymentSettings()} />;
}
