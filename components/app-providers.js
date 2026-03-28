'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useState } from 'react'
import { wagmiConfig } from '@/lib/wagmi'
import { MiniAppReady } from '@/components/miniapp-ready'

export function AppProviders({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <MiniAppReady />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
