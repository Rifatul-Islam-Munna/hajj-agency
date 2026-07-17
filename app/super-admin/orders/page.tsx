import { getBookingOrders } from "../../lib/order-store";
import OrderTable from "../orderTable";

export default async function OrdersPage() {
  const orders = await getBookingOrders({ limit: 500 }).catch((error) => {
    console.error("ADMIN_ORDERS_EMPTY_FALLBACK", error);
    return [];
  });
  return <OrderTable initialOrders={orders} />;
}
