const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blocktodo-base-miniapp.vercel.app'
const appDomain = new URL(appUrl).host
const defaultBuilderAddress = '0x9568370D9F1B4D75Eb7ed6596702607c532dbfc6'
const iconPngUrl = `${appUrl}/icon.png`
const ogPngUrl = `${appUrl}/og-image.png`
const defaultAccountAssociation = {
  header: 'eyJmaWQiOjE3Mzc0MTUsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg5NTY4MzcwRDlGMUI0RDc1RWI3ZWQ2NTk2NzAyNjA3YzUzMmRiZmM2In0',
  payload: 'eyJkb21haW4iOiJibG9ja3RvZG8tYmFzZS1taW5pYXBwLnZlcmNlbC5hcHAifQ',
  signature:
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoo1K6BGKdQtX2LiygP_bnfcySgbhh5PmQbS5xYcWK5h-aq3vggnyc6hCfJ58WfkJga6XKUTD1ZX-y7xcz0qBdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAl8ZgIay2xclZzG8RWZzuWvO8j9R0fus3XxDee9lRlVy8FAAAy9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKeyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiRXBHWTB2UzQ1dW5vWlNyX3FfWVRuSkMxeU44bmpGYWp4Y0xSV0ZZem1ocyIsIm9yaWdpbiI6Imh0dHBzOi8va2V5cy5jb2luYmFzZS5jb20iLCJjcm9zc09yaWdpbiI6ZmFsc2V9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
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
  const accountAssociation =
    process.env.FARCASTER_HEADER && process.env.FARCASTER_PAYLOAD && process.env.FARCASTER_SIGNATURE
      ? {
          header: process.env.FARCASTER_HEADER,
          payload: process.env.FARCASTER_PAYLOAD,
          signature: process.env.FARCASTER_SIGNATURE,
        }
      : defaultAccountAssociation
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
