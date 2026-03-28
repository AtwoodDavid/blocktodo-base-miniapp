const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blocktodo-base-miniapp.vercel.app'
const appDomain = new URL(appUrl).host
const defaultBuilderAddress = process.env.BASE_BUILDER_OWNER_ADDRESS || '0xYourBaseBuildWalletAddress'
const iconPngUrl = `${appUrl}/icon.png`
const ogPngUrl = `${appUrl}/og-image.png`
const placeholderAssociation = {
  header: 'REPLACE_WITH_ACCOUNT_ASSOCIATION_HEADER',
  payload: 'REPLACE_WITH_ACCOUNT_ASSOCIATION_PAYLOAD',
  signature: 'REPLACE_WITH_ACCOUNT_ASSOCIATION_SIGNATURE',
}

function withDefinedProperties(input) {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0
      return value !== undefined && value !== null && value !== ''
    }),
  )
}

function getAllowedAddresses() {
  const raw = process.env.BASE_BUILDER_ALLOWED_ADDRESSES || process.env.NEXT_PUBLIC_BASE_BUILDER_ALLOWED_ADDRESSES

  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function getMiniAppManifest() {
  const allowedAddresses = getAllowedAddresses()
  const accountAssociation = {
    header: process.env.FARCASTER_HEADER || placeholderAssociation.header,
    payload: process.env.FARCASTER_PAYLOAD || placeholderAssociation.payload,
    signature: process.env.FARCASTER_SIGNATURE || placeholderAssociation.signature,
  }
  const ownerAddress = process.env.BASE_BUILDER_OWNER_ADDRESS || allowedAddresses[0] || defaultBuilderAddress
  const sharedAppFields = {
    version: '1',
    name: 'BlockTodo',
    homeUrl: appUrl,
    iconUrl: iconPngUrl,
    splashImageUrl: iconPngUrl,
    splashBackgroundColor: '#f2e6cf',
    subtitle: 'Chain-backed task keeping on Base',
    description: 'Write it down, stamp it on Base, and manage your task list from a wallet-ready mini app.',
    primaryCategory: 'productivity',
    tags: ['base', 'todo', 'productivity', 'onchain'],
    heroImageUrl: ogPngUrl,
    tagline: 'Chain-backed task keeping',
    ogTitle: 'BlockTodo',
    ogDescription: 'Write it down, stamp it on Base, and keep your tasks close.',
    ogImageUrl: ogPngUrl,
  }

  return withDefinedProperties({
    accountAssociation,
    frame: {
      ...sharedAppFields,
      canonicalDomain: appDomain,
      imageUrl: ogPngUrl,
      buttonTitle: 'Open BlockTodo',
    },
    miniapp: {
      ...sharedAppFields,
      canonicalDomain: appDomain,
      screenshotUrls: [ogPngUrl],
      requiredChains: ['eip155:8453'],
      requiredCapabilities: ['actions.ready', 'wallet.getEthereumProvider'],
    },
    baseBuilder: {
      ownerAddress,
      ...(allowedAddresses.length ? { allowedAddresses } : {}),
    },
  })
}
