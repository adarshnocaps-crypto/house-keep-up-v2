import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { dashboard } from './api/admin/dashboard.js'
import { createSession, credentialsAreValid, expiredSessionCookie, readSession, sessionCookie } from './api/admin/_session.js'
import { createCardSetup, readCardSetup, stripeClient } from './api/stripe/_client.js'

const sendJson = (response, status, body, headers = {}) => {
  response.statusCode = status
  Object.entries({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers }).forEach(([name, value]) => response.setHeader(name, value))
  response.end(JSON.stringify(body))
}

const readJson = (request) => new Promise((resolve, reject) => {
  let body = ''
  request.on('data', (chunk) => { body += chunk; if (body.length > 10_000) reject(new Error('Request too large')) })
  request.on('end', () => { try { resolve(JSON.parse(body || '{}')) } catch { reject(new Error('Invalid JSON')) } })
  request.on('error', reject)
})

function localAdminApi(env) {
  return {
    name: 'local-admin-api',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = new URL(request.url, 'http://localhost').pathname
        if (!path.startsWith('/api/admin/')) return next()
        try {
          if (path === '/api/admin/login' && request.method === 'POST') {
            const { email = '', password = '' } = await readJson(request)
            if (!credentialsAreValid(email, password, env)) return sendJson(response, 401, { error: 'Email or password is incorrect' })
            return sendJson(response, 200, { authenticated: true, email }, { 'Set-Cookie': sessionCookie(createSession(email, env), false) })
          }
          if (path === '/api/admin/logout' && request.method === 'POST') return sendJson(response, 200, { authenticated: false }, { 'Set-Cookie': expiredSessionCookie(false) })
          const session = readSession(request, env)
          if (path === '/api/admin/session' && request.method === 'GET') return sendJson(response, session ? 200 : 401, session ? { authenticated: true, email: session.email } : { authenticated: false })
          if (path === '/api/admin/dashboard' && request.method === 'GET') return sendJson(response, session ? 200 : 401, session ? dashboard : { error: 'Authentication required' })
          return sendJson(response, 405, { error: 'Method not allowed' })
        } catch {
          return sendJson(response, 400, { error: 'Invalid request' })
        }
      })
    },
  }
}

function localStripeApi(env) {
  return {
    name: 'local-stripe-api',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = new URL(request.url, 'http://localhost').pathname
        if (!path.startsWith('/api/stripe/')) return next()
        if (request.method !== 'POST') return sendJson(response, 405, { error: 'Method not allowed' })
        try {
          const body = await readJson(request)
          const stripe = stripeClient(env.STRIPE_SECRET_KEY)
          if (path === '/api/stripe/setup-intent') {
            const { name = '', email = '' } = body
            if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) return sendJson(response, 400, { error: 'A valid name and email are required' })
            return sendJson(response, 200, await createCardSetup(stripe, { name: name.trim(), email: email.trim().toLowerCase() }))
          }
          if (path === '/api/stripe/setup-status') {
            if (!body.setupIntentId?.startsWith('seti_')) return sendJson(response, 400, { error: 'Invalid setup intent' })
            return sendJson(response, 200, await readCardSetup(stripe, body.setupIntentId))
          }
          return sendJson(response, 404, { error: 'Not found' })
        } catch (error) {
          return sendJson(response, error.message === 'Stripe is not configured' ? 503 : 400, { error: error.message })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return { plugins: [react(), tailwindcss(), localAdminApi(env), localStripeApi(env)] }
})
