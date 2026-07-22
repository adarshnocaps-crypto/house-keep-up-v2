/**
 * Client-side bridge between the customer booking form (/book) and the admin
 * CRM (/admin). Without a backend, bookings are persisted to localStorage and
 * broadcast via events, so a request made on the site surfaces in the admin
 * inbox — live in the same tab, and across tabs via the storage event.
 */
const KEY = 'hku_bookings'
const EVENT = 'hku:booking'

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function saveBooking(booking) {
  const entry = {
    id: `bk_${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
    ...booking,
  }
  const all = getBookings()
  all.unshift(entry)
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* storage unavailable — still broadcast for same-tab listeners */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: entry }))
  return entry
}

/** Subscribe to booking changes. Returns an unsubscribe fn. */
export function subscribeBookings(callback) {
  const onCustom = () => callback(getBookings())
  const onStorage = (event) => {
    if (event.key === KEY) callback(getBookings())
  }
  window.addEventListener(EVENT, onCustom)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(EVENT, onCustom)
    window.removeEventListener('storage', onStorage)
  }
}

/** Human-friendly "x min ago" for the admin inbox. */
export function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} hr ago`
  return `${Math.round(hrs / 24)} d ago`
}
