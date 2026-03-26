import './globals.css'
import { AppProviders } from '@/components/app-providers'
import { AppShell } from '@/components/app-shell'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  )
}
