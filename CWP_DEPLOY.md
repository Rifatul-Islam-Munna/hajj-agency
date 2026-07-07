# CWP Panel Deploy

1. Upload full project without `node_modules`, `.next`, and `deploy`.
2. In CWP terminal/app root:
   `npm install --omit=dev`
   `npm run build`
3. Set startup file to `server.mjs`.
   Run command can be `npm start` or `node server.mjs`.
4. Set app URL/domain in `.env`:
   `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
   `SITE_URL=https://your-domain.com`
5. Start/restart Node app from CWP.

SSLCommerz callbacks use:
- `/api/payments/sslcommerz/success`
- `/api/payments/sslcommerz/fail`
- `/api/payments/sslcommerz/cancel`
- `/api/payments/sslcommerz/ipn`
