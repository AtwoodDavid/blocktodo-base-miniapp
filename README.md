# blocktodo-base-miniapp

Repository: https://github.com/AtwoodDavid/blocktodo-base-miniapp.git

## Overview

BlockTodo is a Base Mini App built with the Next.js App Router.

The project supports the modern Base App flow while also keeping a Farcaster-compatible manifest available at:

`/.well-known/farcaster.json`

This makes the app usable with current Base Mini App behavior and compatible with preview, publish, and legacy tooling that still checks the manifest endpoint.

## Features

- Next.js App Router project structure
- Base Mini App metadata support
- Dynamic Farcaster manifest endpoint
- Environment-driven manifest configuration
- Generated PNG icon endpoint for manifest use
- Generated PNG Open Graph image endpoint
- Vercel-friendly deployment setup
- Local development and production verification steps

## Project Structure

Important files in this repository include:

- `app/.well-known/farcaster.json/route.js`  
  Serves the dynamic manifest endpoint.

- `lib/miniapp-manifest.js`  
  Defines the manifest shape and reads environment-based values.

- `app/icon.png/route.js`  
  Generates the PNG icon used by the manifest.

- `app/og-image.png/route.js`  
  Generates the hero and Open Graph PNG image.

- `app/layout.js`  
  Defines Base embed metadata, including `base:app_id`.

- `.env.example`  
  Lists the environment variables needed for local and production setup.

## Requirements

Before running the project, make sure you have:

- Node.js installed
- npm installed
- A production HTTPS domain for final deployment
- The required environment variables configured

## Environment Variables

Create a local `.env.local` file using `.env.example` as a starting point.

Example:

```bash
NEXT_PUBLIC_APP_URL=https://blocktodo-base-miniapp.vercel.app
BASE_BUILDER_OWNER_ADDRESS=0xYourBaseBuildWalletAddress
BASE_BUILDER_ALLOWED_ADDRESSES=0xYourBaseBuildWalletAddress
FARCASTER_HEADER=REPLACE_WITH_SIGNED_HEADER
FARCASTER_PAYLOAD=REPLACE_WITH_SIGNED_PAYLOAD
FARCASTER_SIGNATURE=REPLACE_WITH_SIGNED_SIGNATURE
```

## Environment Notes

`NEXT_PUBLIC_APP_URL` must exactly match the deployed production domain.

`BASE_BUILDER_OWNER_ADDRESS` should be the wallet address that owns the app in Base Build or Base.dev.

`BASE_BUILDER_ALLOWED_ADDRESSES` is optional, but useful when more than one builder wallet should be recognized.

The three `FARCASTER_*` values should be replaced after completing the Farcaster manifest signing flow.

## Local Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

The app should be available at:

```bash
http://localhost:3000
```

## Build

Run a local production build before deploying:

```bash
npm run build
```

This helps confirm that the app compiles successfully before it is published.

## Local Verification

After starting the local development server, verify the manifest and generated image routes:

```bash
curl http://localhost:3000/.well-known/farcaster.json
curl http://localhost:3000/icon.png -I
curl http://localhost:3000/og-image.png -I
```

Each route should return a successful response.

## Production Verification

After deploying, verify the production URLs:

```bash
curl https://blocktodo-base-miniapp.vercel.app/.well-known/farcaster.json
curl https://blocktodo-base-miniapp.vercel.app -I
curl https://blocktodo-base-miniapp.vercel.app/icon.png -I
curl https://blocktodo-base-miniapp.vercel.app/og-image.png -I
```

The homepage, manifest, icon, and Open Graph image should all be publicly reachable.

## Farcaster Manifest Signing

Use the Warpcast or Farcaster manifest signing flow to generate the required signed values.

Recommended flow:

1. Deploy the app to its final HTTPS domain.
2. Open the Farcaster or Warpcast manifest signing tool.
3. Enter the production app domain, for example:
   `blocktodo-base-miniapp.vercel.app`
4. Sign the verification request with the wallet that should own the app.
5. Copy the generated values:
   - `header`
   - `payload`
   - `signature`
6. Add those values to `.env.local` or to the production environment.
7. Redeploy the app.

After redeploying, confirm that the live manifest includes the updated signed values:

```bash
curl https://blocktodo-base-miniapp.vercel.app/.well-known/farcaster.json
```

## Deploying to Vercel

This project is ready to deploy on Vercel.

Typical deployment flow:

1. Import the GitHub repository into Vercel.
2. Set the environment variables from `.env.example`.
3. Confirm that `NEXT_PUBLIC_APP_URL` matches the production URL exactly.
4. Deploy to production.
5. Verify the public routes after deployment.

Important deployment notes:

- The production domain must match `NEXT_PUBLIC_APP_URL`.
- The public app URL must allow external tools to fetch the manifest.
- Vercel Deployment Protection should be disabled for the public production URL if Base tooling needs access.

## Base.dev Publishing

Base has moved toward the Standard Web App model, while a valid `farcaster.json` manifest remains useful for compatibility and publishing flows.

Suggested publishing flow:

1. Deploy the final production build.
2. Confirm that the homepage returns `200`.
3. Confirm that the homepage includes the `base:app_id` metadata.
4. Confirm that the manifest is live at:
   `https://your-domain/.well-known/farcaster.json`
5. Confirm that the manifest includes the expected Base and Mini App fields.
6. Open Base.dev.
7. Use the production app domain in the publish or verify flow.
8. If verification fails, check that:
   - the signed domain matches the production domain exactly
   - the connected wallet matches the builder wallet
   - the manifest endpoint is publicly reachable
   - the icon and Open Graph image routes return successful responses

## Static Asset Recommendations

This repository currently serves manifest-friendly PNG assets through route handlers:

- `https://your-domain/icon.png`
- `https://your-domain/og-image.png`

You may also replace these generated routes with static files under `public/` later.

Possible static files include:

- `public/icon.png`
- `public/splash.png`
- `public/og-image.png`

If you switch to static files, keep the manifest URLs consistent.

Also keep image dimensions and aspect ratios compatible with the expectations of the manifest and preview surfaces.

## Troubleshooting

If the manifest cannot be fetched, verify that the route exists at:

```bash
/.well-known/farcaster.json
```

If the production manifest returns an error, check the deployed environment variables.

If generated images do not load, verify the image routes directly in a browser or with `curl -I`.

If Base.dev reports a domain mismatch, confirm that the signed domain and `NEXT_PUBLIC_APP_URL` are identical.

If preview tooling cannot access the app, confirm that the production deployment is public.
