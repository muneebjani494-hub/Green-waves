# Green Waves

A polished Vite + React + Tailwind dashboard starter for financial trading and investment workflows.

## Features

- Professional trading dashboard UI
- Demo account mode for practice trading
- Manual deposit request workflow for Binance crypto wallet funding
- Live all-markets chart ready for TradingView or MetaTrader 5 integration
- Ready for Vercel deployment with SPA fallback

## Setup

1. Copy `.env.example` to `.env`
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start locally:
   ```bash
   npm run dev
   ```

## Deployment

This project is configured for Vercel with `vercel.json` and a static build.

- `npm run build` generates the production bundle in `dist`
- Vercel serves the app as a single-page application

## Notes

- The deposit flow is implemented as a manual request system. For real transfers, add backend validation and reconciliation via Supabase or a secure server.
- Live market data is currently fetched from the CoinGecko public API; you can replace it with TradingView or another paid provider for more advanced signals.
