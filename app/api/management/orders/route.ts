import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import { getBookingOrder, getBookingOrders, getOrderAnswers, updateBookingOrder } from "../../../lib/order-store";

export async function GET(request: Request) {
  try {
    await requireManagementUser();
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (id) {
      const order = await getBookingOrder(id);
      if (!order) return NextResponse.json({ message: "Order not found." }, { status: 404 });
      return NextResponse.json({ order, answers: await getOrderAnswers(id) });
    }
    return NextResponse.json({ orders: await getBookingOrders({ limit: 500 }) });
  } catch (error) { return handle(error); }
}

export async function PATCH(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    return NextResponse.json({ order: await updateBookingOrder(Number(body.id), body) });
  } catch (error) { return handle(error); }
}

function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  console.error(error);
  return NextResponse.json({ message: "Order request failed." }, { status: 500 });
}
