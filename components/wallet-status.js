'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function WalletStatus() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="inline-space">
        <div className="brand-copy">
          <strong>{shortenAddress(address)}</strong>
          <p>{chain?.name || 'Connected'}</p>
        </div>
        <button className="ghost-button" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="button-row">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          className="wallet-pill"
          disabled={isPending}
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}
