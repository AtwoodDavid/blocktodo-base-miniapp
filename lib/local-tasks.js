const storageKey = (address) => `blocktodo:${address?.toLowerCase() || 'guest'}`

export function getLocalTasks(address) {
  if (typeof window === 'undefined' || !address) return {}

  try {
    const raw = window.localStorage.getItem(storageKey(address))
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function storeLocalTask(address, id, content) {
  if (typeof window === 'undefined' || !address) return
  const next = getLocalTasks(address)
  next[String(id)] = { content, updatedAt: Date.now() }
  window.localStorage.setItem(storageKey(address), JSON.stringify(next))
}

export function removeLocalTask(address, id) {
  if (typeof window === 'undefined' || !address) return
  const next = getLocalTasks(address)
  delete next[String(id)]
  window.localStorage.setItem(storageKey(address), JSON.stringify(next))
}
