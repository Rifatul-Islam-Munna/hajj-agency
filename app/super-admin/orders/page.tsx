import { getBookingOrders } from "../../lib/order-store";
import OrderTable from "../orderTable";

export default async function OrdersPage() {
  return <OrderTable initialOrders={await getBookingOrders({ limit: 500 })} />;
}
