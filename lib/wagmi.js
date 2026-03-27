import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { coinbaseWallet, injected } from 'wagmi/connectors'
import { blockTodoEncodedAttribution } from '@/lib/blocktodo'

export const wagmiConfig = createConfig({
  chains: [base],
  dataSuffix: blockTodoEncodedAttribution,
  connectors: [
    coinbaseWallet({
      appName: 'BlockTodo',
    }),
    injected(),
  ],
  transports: {
    [base.id]: http(),
  },
})
