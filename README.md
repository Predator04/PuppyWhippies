# Puppy Whippies

Logo-inspired Puppy Whippies landing site built with Vite and React.

## Run locally

Double-click `Run PuppyWhippies Site.bat`, or run:

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build is written to `dist/`.

## SEO Environment Variables

Optional production variables:

```bash
VITE_GA_MEASUREMENT_ID=
VITE_GSC_VERIFICATION=
REQUEST_WEBHOOK_URL=
```

Leave the Google values empty until the real Analytics measurement ID or Search Console verification token exists. Set `REQUEST_WEBHOOK_URL` in Cloudflare Pages to forward request-form submissions to a real inbox, CRM, Zapier, Make, or form backend.

## Deploy

This site is ready for Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite
