import { failedPaymentResponse } from "../../../../lib/payment-callback";
export async function POST(request: Request) { return failedPaymentResponse(request, "cancelled"); }
export async function GET(request: Request) { return failedPaymentResponse(request, "cancelled"); }
