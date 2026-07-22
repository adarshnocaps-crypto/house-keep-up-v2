import { createCardSetup, stripeClient } from './_client.js'

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })
  const { name = '', email = '' } = request.body || {}
  if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) return response.status(400).json({ error: 'A valid name and email are required' })
  try {
    const result = await createCardSetup(stripeClient(), { name: name.trim(), email: email.trim().toLowerCase() })
    response.setHeader('Cache-Control', 'no-store')
    return response.status(200).json(result)
  } catch (error) {
    return response.status(error.message === 'Stripe is not configured' ? 503 : 500).json({ error: error.message === 'Stripe is not configured' ? error.message : 'Unable to start secure payment' })
  }
}
