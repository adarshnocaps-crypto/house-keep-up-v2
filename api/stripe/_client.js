import Stripe from 'stripe'

export function stripeClient(secretKey = process.env.STRIPE_SECRET_KEY) {
  if (!secretKey) throw new Error('Stripe is not configured')
  return new Stripe(secretKey)
}

export async function createCardSetup(stripe, { name, email }) {
  const existing = await stripe.customers.list({ email, limit: 1 })
  const customer = existing.data[0] || await stripe.customers.create({ name, email })
  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    usage: 'off_session',
    payment_method_types: ['card'],
    metadata: { source: 'house_keep_up_booking' },
  })
  return {
    clientSecret: setupIntent.client_secret,
    customerId: customer.id,
    setupIntentId: setupIntent.id,
  }
}

export async function readCardSetup(stripe, setupIntentId) {
  const setupIntent = await stripe.setupIntents.retrieve(setupIntentId, { expand: ['payment_method'] })
  if (setupIntent.status !== 'succeeded') throw new Error('Card setup is not complete')
  const paymentMethod = setupIntent.payment_method
  if (!paymentMethod || typeof paymentMethod === 'string') throw new Error('Payment method is unavailable')
  return {
    status: setupIntent.status,
    setupIntentId: setupIntent.id,
    customerId: typeof setupIntent.customer === 'string' ? setupIntent.customer : setupIntent.customer?.id,
    paymentMethodId: paymentMethod.id,
    brand: paymentMethod.card?.brand || 'card',
    last4: paymentMethod.card?.last4 || '',
  }
}
