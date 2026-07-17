import { successfulPaymentResponse } from "../../../../lib/payment-callback";
export async function POST(request: Request) { return successfulPaymentResponse(request, true); }
