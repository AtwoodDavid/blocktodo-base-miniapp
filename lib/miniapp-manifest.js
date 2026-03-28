const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blocktodo-base-miniapp.vercel.app'
const appDomain = new URL(appUrl).host
const defaultBuilderAddress = '0x9568370D9F1B4D75Eb7ed6596702607c532dbfc6'

function withDefinedProperties(input) {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0
      return value !== undefined && value !== null && value !== ''
    }),
  )
}

function getAllowedAddresses() {
  const raw =
    process.env.BASE_BUILDER_ALLOWED_ADDRESSES ||
    process.env.NEXT_PUBLIC_BASE_BUILDER_ALLOWED_ADDRESSES ||
    defaultBuilderAddress

  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function getMiniAppManifest() {
  const allowedAddresses = getAllowedAddresses()

  return withDefinedProperties({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER || '',
      payload: process.env.FARCASTER_PAYLOAD || '',
      signature: process.env.FARCASTER_SIGNATURE || '',
    },
    miniapp: {
      version: '1',
      name: 'BlockTodo',
      subtitle: 'Chain-backed task keeping on Base',
      description: 'Write it down, stamp it on Base, and manage your task list from a wallet-ready mini app.',
      tagline: 'Chain-backed task keeping',
      primaryCategory: 'productivity',
      tags: ['base', 'todo', 'productivity', 'onchain'],
      homeUrl: appUrl,
      canonicalDomain: appDomain,
      iconUrl: `${appUrl}/icon.svg`,
      splashImageUrl: `${appUrl}/icon.svg`,
      splashBackgroundColor: '#f2e6cf',
      heroImageUrl: `${appUrl}/og-image.svg`,
      ogTitle: 'BlockTodo',
      ogDescription: 'Write it down, stamp it on Base, and keep your tasks close.',
      ogImageUrl: `${appUrl}/og-image.svg`,
      screenshotUrls: [`${appUrl}/og-image.svg`],
      requiredChains: ['eip155:8453'],
      requiredCapabilities: ['wallet.getEthereumProvider'],
    },
    baseBuilder: allowedAddresses.length
      ? {
          allowedAddresses,
        }
      : undefined,
  })
}
