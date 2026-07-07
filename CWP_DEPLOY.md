# CWP Panel Deploy

1. Build and package:
   `npm run build`
   `npm run package:cwp`
2. Zip the contents inside `deploy/cwp-app`.
3. Upload/extract that zip into the CWP Node app root.
4. Set startup file to `server.js`.
5. Set app URL/domain in `.env`:
   `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
   `SITE_URL=https://your-domain.com`
6. Start/restart Node app from CWP.

SSLCommerz callbacks use:
- `/api/payments/sslcommerz/success`
- `/api/payments/sslcommerz/fail`
- `/api/payments/sslcommerz/cancel`
- `/api/payments/sslcommerz/ipn`
