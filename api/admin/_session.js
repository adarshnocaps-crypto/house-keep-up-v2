import crypto from 'node:crypto'

export const SESSION_COOKIE = 'hku_admin_session'
const SESSION_LENGTH = 60 * 60 * 12

const safeEqual = (left = '', right = '') => {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

const sign = (value, secret) => crypto.createHmac('sha256', secret).update(value).digest('base64url')

export function credentialsAreValid(email, password, env = process.env) {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) return false
  return safeEqual(email.trim().toLowerCase(), env.ADMIN_EMAIL.trim().toLowerCase()) && safeEqual(password, env.ADMIN_PASSWORD)
}

export function createSession(email, env = process.env) {
  if (!env.ADMIN_SESSION_SECRET) throw new Error('ADMIN_SESSION_SECRET is not configured')
  const body = Buffer.from(JSON.stringify({ email, expires: Date.now() + SESSION_LENGTH * 1000 })).toString('base64url')
  return `${body}.${sign(body, env.ADMIN_SESSION_SECRET)}`
}

export function readSession(request, env = process.env) {
  if (!env.ADMIN_SESSION_SECRET) return null
  const cookies = Object.fromEntries((request.headers.cookie || '').split(';').filter(Boolean).map((item) => {
    const index = item.indexOf('=')
    return [item.slice(0, index).trim(), decodeURIComponent(item.slice(index + 1))]
  }))
  const token = cookies[SESSION_COOKIE]
  if (!token) return null
  const [body, signature] = token.split('.')
  if (!body || !signature || !safeEqual(signature, sign(body, env.ADMIN_SESSION_SECRET))) return null
  try {
    const session = JSON.parse(Buffer.from(body, 'base64url').toString())
    return session.expires > Date.now() ? session : null
  } catch {
    return null
  }
}

export function sessionCookie(token, secure = process.env.NODE_ENV === 'production') {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_LENGTH}${secure ? '; Secure' : ''}`
}

export function expiredSessionCookie(secure = process.env.NODE_ENV === 'production') {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure ? '; Secure' : ''}`
}
