import { notFound } from "next/navigation";
import { getBookingOrder, getOrderAnswers } from "../../../lib/order-store";
import OrderDetailsManager from "../../orderDetailsManager";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = Number(id);
  const [order, answers] = await Promise.all([getBookingOrder(orderId), getOrderAnswers(orderId)]);
  if (!order) notFound();
  return <OrderDetailsManager initialOrder={order} answers={answers} />;
}
