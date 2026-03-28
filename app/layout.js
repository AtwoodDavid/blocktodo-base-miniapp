import './globals.css'
import { AppProviders } from '@/components/app-providers'
import { AppShell } from '@/components/app-shell'
import { blockTodoAppId } from '@/lib/blocktodo'

export default function RootLayout({ children }) {
  const description = 'Onchain task keeping for makers who like their tools warm, tactile, and dependable.'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blocktodo-base-miniapp.vercel.app'
  const imageUrl = `${appUrl}/og-image.png`
  const miniappEmbed = {
    version: '1',
    imageUrl,
    button: {
      title: 'Open BlockTodo',
      action: {
        type: 'launch_frame',
        name: 'BlockTodo',
        url: appUrl,
        splashImageUrl: `${appUrl}/icon.png`,
        splashBackgroundColor: '#f2e6cf',
      },
    },
  }

  return (
    <html lang="en">
      <head>
        <title>BlockTodo</title>
        <meta name="description" content={description} />
        <meta name="application-name" content="BlockTodo" />
        <meta name="apple-mobile-web-app-title" content="BlockTodo" />
        <meta name="theme-color" content="#f2e6cf" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta property="og:title" content="BlockTodo" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={appUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BlockTodo" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content={imageUrl} />
        <meta name="fc:frame:button:1" content="Open BlockTodo" />
        <meta name="fc:frame:post_url" content={appUrl} />
        <meta name="fc:miniapp" content={JSON.stringify(miniappEmbed)} />
        <meta name="base:app_id" content={blockTodoAppId} />
        <meta
          name="talentapp:project_verification"
          content="be80aa86eb705c6c3ee62c69f2ff3a08d67f40fbd11722d3dd3f51c9af0e00c5c5c24b03c69438be4440d20d445cdd0f2b2d75ebc90efba0c5c9367aac710ce8"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  )
}
