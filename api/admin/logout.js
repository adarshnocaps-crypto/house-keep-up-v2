import { expiredSessionCookie } from './_session.js'

export default function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }
  response.setHeader('Set-Cookie', expiredSessionCookie())
  response.setHeader('Cache-Control', 'no-store')
  return response.status(200).json({ authenticated: false })
}
