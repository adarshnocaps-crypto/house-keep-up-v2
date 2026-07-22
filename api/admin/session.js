import { readSession } from './_session.js'

export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Method not allowed' })
  }
  const session = readSession(request)
  response.setHeader('Cache-Control', 'no-store')
  return response.status(session ? 200 : 401).json(session ? { authenticated: true, email: session.email } : { authenticated: false })
}
