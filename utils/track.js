const DASHBOARD_API = 'https://base-dashboard-zeta.vercel.app/api/track'

export async function trackTransaction(appId, appName, userAddress, txHash) {
  try {
    const response = await fetch(DASHBOARD_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: appId,
        app_name: appName,
        user_address: userAddress?.toLowerCase(),
        tx_hash: txHash,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok && process.env.NODE_ENV !== 'production') {
      console.warn('Base dashboard tracking failed', response.status, response.statusText)
    }
  } catch {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Base dashboard tracking request failed')
    }
  }
}
