import { getMiniAppManifest } from '@/lib/miniapp-manifest'

export function GET() {
  return Response.json(getMiniAppManifest(), {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
