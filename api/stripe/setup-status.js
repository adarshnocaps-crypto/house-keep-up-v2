import { readCardSetup, stripeClient } from './_client.js'

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })
  const { setupIntentId = '' } = request.body || {}
  if (!setupIntentId.startsWith('seti_')) return response.status(400).json({ error: 'Invalid setup intent' })
  try {
    const result = await readCardSetup(stripeClient(), setupIntentId)
    response.setHeader('Cache-Control', 'no-store')
    return response.status(200).json(result)
  } catch (error) {
    return response.status(error.message === 'Stripe is not configured' ? 503 : 400).json({ error: error.message })
  }
}
