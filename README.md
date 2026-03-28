# BlockTodo

BlockTodo is a Base Mini App built with Next.js App Router. This repository supports both:

- Standard Web App behavior for the modern Base App flow
- `/.well-known/farcaster.json` manifest compatibility for Base Build preview, publish, and legacy Mini App tooling

## Files

- `app/.well-known/farcaster.json/route.js`: dynamic manifest endpoint
- `lib/miniapp-manifest.js`: manifest schema and environment-driven values
- `app/icon.png/route.js`: generated PNG icon for manifest usage
- `app/og-image.png/route.js`: generated PNG hero / OG image
- `app/layout.js`: Base embed metadata and `base:app_id`
- `.env.example`: manifest-related environment variables

## Environment Variables

Create a local `.env.local` with values based on `.env.example`.

```bash
NEXT_PUBLIC_APP_URL=https://blocktodo-base-miniapp.vercel.app
BASE_BUILDER_OWNER_ADDRESS=0xYourBaseBuildWalletAddress
BASE_BUILDER_ALLOWED_ADDRESSES=0xYourBaseBuildWalletAddress
FARCASTER_HEADER=REPLACE_WITH_ACCOUNT_ASSOCIATION_HEADER
FARCASTER_PAYLOAD=REPLACE_WITH_ACCOUNT_ASSOCIATION_PAYLOAD
FARCASTER_SIGNATURE=REPLACE_WITH_ACCOUNT_ASSOCIATION_SIGNATURE
```

Notes:

- `NEXT_PUBLIC_APP_URL` must match the deployed production domain exactly.
- `BASE_BUILDER_OWNER_ADDRESS` should be the wallet that owns the app in Base Build / Base.dev.
- `BASE_BUILDER_ALLOWED_ADDRESSES` is optional but recommended when more than one builder wallet should be recognized.
- The three `FARCASTER_*` values should be replaced after generating a signed `accountAssociation`.

## Local Development

Install dependencies and run the app:

```bash
npm install
npm run dev
```

Build locally before deploying:

```bash
npm run build
```

## Manifest Verification

After starting the app locally or deploying to Vercel, verify these URLs:

```bash
curl http://localhost:3000/.well-known/farcaster.json
curl http://localhost:3000/icon.png -I
curl http://localhost:3000/og-image.png -I
```

For production:

```bash
curl https://blocktodo-base-miniapp.vercel.app/.well-known/farcaster.json
curl https://blocktodo-base-miniapp.vercel.app -I
curl https://blocktodo-base-miniapp.vercel.app/icon.png -I
curl https://blocktodo-base-miniapp.vercel.app/og-image.png -I
```

## Generate accountAssociation Signature

Use the Warpcast / Farcaster manifest signing flow to generate the three `accountAssociation` fields.

Recommended flow:

1. Deploy the app to its final HTTPS domain.
2. Open the Farcaster or Warpcast manifest signing tool.
3. Enter your app domain, for example:
   `blocktodo-base-miniapp.vercel.app`
4. Sign the verification request with the wallet / account that should own the app.
5. Copy the generated values:
   - `header`
   - `payload`
   - `signature`
6. Replace the placeholder values in `.env.local`.
7. Redeploy the app.

After redeploying, confirm the live manifest contains the new values:

```bash
curl https://blocktodo-base-miniapp.vercel.app/.well-known/farcaster.json
```

## Deploy to Vercel

Deploy the project to Vercel with the production environment variables set.

Important:

- The production domain must match `NEXT_PUBLIC_APP_URL`
- Deployment Protection / Vercel Authentication should be disabled for the public app URL if Base tooling needs to fetch the manifest

Typical flow:

1. Import the GitHub repository into Vercel
2. Set the environment variables from `.env.example`
3. Deploy to production
4. Confirm:
   - homepage returns `200`
   - `/.well-known/farcaster.json` returns `200`
   - icon and OG image URLs return `200`

## Publish on Base.dev

As of April 9, 2026, Base has shifted toward the Standard Web App model, but keeping a valid `farcaster.json` manifest is still recommended for compatibility and publish flows.

Suggested publish flow:

1. Deploy your final production build to Vercel
2. Verify the homepage includes:
   - `<meta name="base:app_id" ... />`
3. Verify the manifest is live at:
   - `https://your-domain/.well-known/farcaster.json`
4. Verify the manifest includes:
   - `accountAssociation`
   - `frame`
   - `miniapp`
   - `baseBuilder`
5. Open Base.dev
6. Use the production app domain in the publish / verify flow
7. If Base.dev still reports an error, confirm:
   - the signed domain matches exactly
   - the connected wallet matches your builder wallet
   - the manifest endpoint is publicly reachable without auth

## Static Asset Recommendations

This repository currently serves manifest-friendly PNG assets through route handlers:

- `https://your-domain/icon.png`
- `https://your-domain/og-image.png`

You may also choose to replace these with static files under `public/` later, for example:

- `public/icon.png`
- `public/splash.png`
- `public/og-image.png`

If you switch to static files, keep the manifest URLs and aspect ratios consistent.
