import { successfulPaymentResponse } from "../../../../lib/payment-callback";
export async function POST(request: Request) { return successfulPaymentResponse(request); }
export async function GET(request: Request) { return successfulPaymentResponse(request); }
