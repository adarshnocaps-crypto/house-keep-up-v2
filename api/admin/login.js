import { createSession, credentialsAreValid, sessionCookie } from './_session.js'

export default function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }
  const { email = '', password = '' } = request.body || {}
  if (!credentialsAreValid(email, password)) return response.status(401).json({ error: 'Email or password is incorrect' })
  try {
    response.setHeader('Set-Cookie', sessionCookie(createSession(email)))
    response.setHeader('Cache-Control', 'no-store')
    return response.status(200).json({ authenticated: true, email })
  } catch {
    return response.status(503).json({ error: 'Admin authentication is not configured' })
  }
}
