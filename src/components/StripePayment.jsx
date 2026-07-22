import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CreditCard, LoaderCircle, LockKeyhole, ShieldCheck } from 'lucide-react'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = publishableKey ? loadStripe(publishableKey) : null

const StripeFields = forwardRef(function StripeFields({ onChange }, ref) {
  const stripe = useStripe()
  const elements = useElements()

  useImperativeHandle(ref, () => ({
    async confirm() {
      if (!stripe || !elements) throw new Error('Secure payment is still loading')
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: { return_url: window.location.href },
        redirect: 'if_required',
      })
      if (error) throw new Error(error.message || 'Your card could not be saved')
      return setupIntent
    },
  }), [elements, stripe])

  return <PaymentElement onChange={(event) => onChange({ complete: event.complete, error: event.error?.message || '' })} options={{ layout: 'tabs' }} />
})

const StripePayment = forwardRef(function StripePayment({ customer, onStateChange }, ref) {
  const [clientSecret, setClientSecret] = useState('')
  const [innerRef, setInnerRef] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const canStart = customer.name.trim() && /^\S+@\S+\.\S+$/.test(customer.email)
  const options = useMemo(() => clientSecret ? ({
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: { colorPrimary: '#0b5b43', colorText: '#164d3d', colorDanger: '#a73535', borderRadius: '8px', fontFamily: 'Poppins, sans-serif' },
    },
  }) : null, [clientSecret])

  useImperativeHandle(ref, () => ({ confirm: () => innerRef?.confirm() }), [innerRef])

  const start = async () => {
    if (!canStart || loading) return
    setLoading(true)
    setError('')
    onStateChange({ complete: false, loading: true, error: '' })
    try {
      const response = await fetch('/api/stripe/setup-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: customer.name, email: customer.email }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to start secure payment')
      setClientSecret(data.clientSecret)
      onStateChange({ complete: false, loading: false, error: '' })
    } catch (requestError) {
      setError(requestError.message)
      onStateChange({ complete: false, loading: false, error: requestError.message })
    } finally {
      setLoading(false)
    }
  }

  if (!publishableKey) return <div className="lb-stripeNotice"><LockKeyhole /><div><strong>Stripe keys required</strong><span>Add your test keys to <code>.env.local</code>, then restart the site.</span></div></div>

  if (!clientSecret) return (
    <div className="lb-stripeStart">
      <div><CreditCard /><span><strong>Card details are handled by Stripe</strong><small>Enter your name and email first, then open the secure card form.</small></span></div>
      <button type="button" disabled={!canStart || loading} onClick={start}>{loading ? <><LoaderCircle className="is-spinning" /> Connecting</> : <><LockKeyhole /> Add card securely</>}</button>
      {error && <p>{error}</p>}
    </div>
  )

  return (
    <div className="lb-stripeElement">
      <Elements stripe={stripePromise} options={options}>
        <StripeFields ref={setInnerRef} onChange={(state) => onStateChange({ ...state, loading: false })} />
      </Elements>
      <p className="lb-paymentTrust"><ShieldCheck /> Secured by Stripe. House Keep Up never sees or stores your full card number.</p>
    </div>
  )
})

export default StripePayment
