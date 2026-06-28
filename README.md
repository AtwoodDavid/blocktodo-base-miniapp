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
