import { useMemo, useRef, useState } from 'react'
import {
  BedDouble,
  Bubbles,
  Building2,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  KeyRound,
  HandCoins,
  Mail,
  MapPin,
  Maximize,
  Minus,
  NotebookPen,
  Phone,
  Plus,
  ShieldCheck,
  Tag,
  UserRound,
} from 'lucide-react'
import broomImage from '@lobehub/fluent-emoji-3d/assets/1f9f9.webp'
import bubblesImage from '@lobehub/fluent-emoji-3d/assets/1fae7.webp'
import packageImage from '@lobehub/fluent-emoji-3d/assets/1f4e6.webp'
import homeImage from '@lobehub/fluent-emoji-3d/assets/1f3e0.webp'
import iceImage from '@lobehub/fluent-emoji-3d/assets/1f9ca.webp'
import cookingImage from '@lobehub/fluent-emoji-3d/assets/1f373.webp'
import cabinetImage from '@lobehub/fluent-emoji-3d/assets/1f5c4-fe0f.webp'
import rulerImage from '@lobehub/fluent-emoji-3d/assets/1f4cf.webp'
import windowImage from '@lobehub/fluent-emoji-3d/assets/1fa9f.webp'
import laundryImage from '@lobehub/fluent-emoji-3d/assets/1f455.webp'
import dishesImage from '@lobehub/fluent-emoji-3d/assets/1f37d-fe0f.webp'
import toolboxImage from '@lobehub/fluent-emoji-3d/assets/1f9f0.webp'
import calendarImage from '@lobehub/fluent-emoji-3d/assets/1f4c5.webp'
import keyImage from '@lobehub/fluent-emoji-3d/assets/1f511.webp'
import personImage from '@lobehub/fluent-emoji-3d/assets/1f464.webp'
import receiptImage from '@lobehub/fluent-emoji-3d/assets/1f9fe.webp'
import { saveBooking } from '../lib/bookingStore.js'
import StripePayment from './StripePayment.jsx'

const SERVICES = [
  { id: 'standard', name: 'Standard cleaning', description: 'For homes that need a reliable reset.', price: 120, image: broomImage },
  { id: 'deep', name: 'Deep cleaning', description: 'Extra time for the details that build up.', price: 220, image: bubblesImage },
  { id: 'move', name: 'Move-in / move-out', description: 'A complete clean for a fresh start.', price: 260, image: packageImage },
]
const FREQUENCIES = [
  { name: 'One time', discount: 0 },
  { name: 'Weekly', discount: 15 },
  { name: 'Bi-weekly', discount: 12 },
  { name: 'Monthly', discount: 8 },
]
// Square footage — a BookingKoala staple that scales the price.
const SQFT = [
  { label: 'Up to 999 sq ft', add: 0 },
  { label: '1,000 – 1,499 sq ft', add: 20 },
  { label: '1,500 – 1,999 sq ft', add: 45 },
  { label: '2,000 – 2,499 sq ft', add: 70 },
  { label: '2,500 – 2,999 sq ft', add: 95 },
  { label: '3,000+ sq ft', add: 130 },
]
const EXTRAS = [
  { id: 'fridge', name: 'Inside fridge', price: 35, image: iceImage },
  { id: 'oven', name: 'Inside oven', price: 35, image: cookingImage },
  { id: 'cabinets', name: 'Inside cabinets', price: 35, image: cabinetImage },
  { id: 'windows', name: 'Interior windows', price: 45, image: windowImage },
  { id: 'laundry', name: 'Laundry & fold', price: 25, image: laundryImage },
  { id: 'dishes', name: 'Wash the dishes', price: 15, image: dishesImage },
  { id: 'baseboards', name: 'Baseboards by hand', price: 30, image: rulerImage },
]
const ENTRY = ["I'll be home", 'Hidden key', 'Doorman / front desk', 'Smart lock code', "Other — I'll advise"]
const TIMES = ['8–11 AM', '11 AM–2 PM', '2–5 PM']
const TIP_OPTIONS = [0, 10, 15, 20]
const PARKING_OPTIONS = ['Free parking available', 'Street meter', 'Paid garage', 'Please call on arrival']
// A couple of working promo codes.
const COUPONS = {
  WELCOME15: { label: '15% off your first clean', type: 'percent', value: 15 },
  FRESH20: { label: '$20 off', type: 'flat', value: 20 },
}

export default function LocalBooking() {
  const [service, setService] = useState('standard')
  const [frequency, setFrequency] = useState('One time')
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(1)
  const [sqft, setSqft] = useState(SQFT[0].label)
  const [extras, setExtras] = useState([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [homeType, setHomeType] = useState('Apartment')
  const [entry, setEntry] = useState(ENTRY[0])
  const [notes, setNotes] = useState('')
  const [tip, setTip] = useState(0)
  const [customTip, setCustomTip] = useState('')
  const [parking, setParking] = useState(PARKING_OPTIONS[0])
  const [policyAccepted, setPolicyAccepted] = useState(false)
  const [contact, setContact] = useState({ name: '', email: '', phone: '', address: '', city: 'Chicago', zip: '' })
  const paymentRef = useRef(null)
  const [paymentState, setPaymentState] = useState({ complete: false, loading: false, error: '' })
  const [savedPayment, setSavedPayment] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [promo, setPromo] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const selectedService = SERVICES.find((item) => item.id === service)
  const selectedFrequency = FREQUENCIES.find((item) => item.name === frequency)
  const selectedSqft = SQFT.find((item) => item.label === sqft)

  const pricing = useMemo(() => {
    const roomAdjustment = Math.max(0, bedrooms - 2) * 20 + Math.max(0, bathrooms - 1) * 25
    const sqftAdjustment = selectedSqft.add
    const extrasTotal = extras.reduce((sum, id) => sum + EXTRAS.find((item) => item.id === id).price, 0)
    const subtotal = selectedService.price + roomAdjustment + sqftAdjustment + extrasTotal
    const discount = Math.round(subtotal * selectedFrequency.discount / 100)
    let promoOff = 0
    if (appliedPromo) {
      promoOff = appliedPromo.type === 'percent'
        ? Math.round((subtotal - discount) * appliedPromo.value / 100)
        : appliedPromo.value
    }
    const total = Math.max(0, subtotal - discount - promoOff)
    return { roomAdjustment, sqftAdjustment, extrasTotal, discount, promoOff, total }
  }, [bathrooms, bedrooms, extras, selectedFrequency.discount, selectedService.price, selectedSqft.add, appliedPromo])
  const tipAmount = tip === 'custom' ? Math.max(0, Number(customTip) || 0) : Math.round(pricing.total * tip / 100)
  const estimatedCharge = pricing.total + tipAmount

  const toggleExtra = (id) => setExtras((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const adjust = (setValue, value, amount, minimum = 0) => setValue(Math.max(minimum, value + amount))
  const updateContact = (field, value) => setContact((current) => ({ ...current, [field]: value }))
  const applyPromo = () => {
    const code = promo.trim().toUpperCase()
    if (!code) return
    if (COUPONS[code]) { setAppliedPromo({ code, ...COUPONS[code] }); setPromoError('') }
    else { setAppliedPromo(null); setPromoError('That code isn’t valid.') }
  }
  const canSubmit = date && time && contact.name && contact.email && contact.address && contact.zip && paymentState.complete && policyAccepted && !submitting

  const submit = async (event) => {
    event.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const setupIntent = await paymentRef.current?.confirm()
      if (!setupIntent?.id) throw new Error('Card setup did not complete')
      const response = await fetch('/api/stripe/setup-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setupIntentId: setupIntent.id }),
      })
      const paymentDetails = await response.json()
      if (!response.ok) throw new Error(paymentDetails.error || 'Unable to verify your card')
      saveBooking({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: `${contact.address}, ${contact.city}${contact.zip ? ` ${contact.zip}` : ''}`,
        city: contact.city,
        service: selectedService.name,
        frequency,
        homeType,
        bedrooms,
        bathrooms,
        sqft,
        extras: extras.map((id) => EXTRAS.find((item) => item.id === id).name),
        date,
        time,
        entry,
        notes,
        tip: tipAmount,
        tipSelection: tip === 'custom' ? 'Custom amount' : `${tip}%`,
        parking,
        paymentConsentAcceptedAt: new Date().toISOString(),
        policyVersion: '2026-07-22',
        promo: appliedPromo?.code || '',
        estimate: estimatedCharge,
        stripeCustomerId: paymentDetails.customerId,
        stripeSetupIntentId: paymentDetails.setupIntentId,
        stripePaymentMethodId: paymentDetails.paymentMethodId,
        paymentMethod: paymentDetails.brand,
        cardLast4: paymentDetails.last4,
      })
      setSavedPayment(paymentDetails)
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="lb-success">
        <span><Check /></span>
        <p className="lb-kicker">Request received</p>
        <h2>We’ll confirm your clean shortly.</h2>
        <p>Thanks, {contact.name.split(' ')[0]}. Your preferred time and {savedPayment?.brand || 'card'} ending in {savedPayment?.last4} are attached to the request. No charge was made today.</p>
        <button type="button" className="a-button" onClick={() => setSubmitted(false)}>Start another request</button>
      </section>
    )
  }

  return (
    <form className="lb-shell lb-shell--compact" onSubmit={submit}>
      <div className="lb-form">
        <div className="lb-form__head">
          <div><p className="lb-kicker">Book your cleaning</p><h2>Your cleaning details.</h2></div>
          <span className="lb-secure"><ShieldCheck /> Secure booking</span>
        </div>

        <section className="lb-section lb-section--service">
          <header><span className="lb-sectionImage"><img src={broomImage} alt="" /></span><div><h3>Choose your service</h3><p>Pick the clean that matches your home today.</p></div></header>
          <div className="lb-services">
            {SERVICES.map((item) => <button type="button" key={item.id} onClick={() => { setService(item.id); if (item.id === 'move') setFrequency('One time') }} className={service === item.id ? 'is-selected' : ''}><span className="lb-serviceIcon"><img src={item.image} alt="" /></span><span className="lb-radio" /><div><strong>{item.name}</strong><small>{item.description}</small></div><b>From ${item.price}</b></button>)}
          </div>
          <div className="lb-frequency"><span>How often?</span><div>{FREQUENCIES.map((item) => <button type="button" key={item.name} disabled={service === 'move' && item.discount > 0} className={frequency === item.name ? 'is-selected' : ''} onClick={() => setFrequency(item.name)}>{item.name}{item.discount > 0 && <small>Save {item.discount}%</small>}</button>)}</div></div>
        </section>

        <div className="lb-compactGrid">
          <section className="lb-compactPanel">
            <header><span className="lb-sectionImage"><img src={homeImage} alt="" /></span><div><h3>Your home</h3><p>Used for an accurate estimate.</p></div></header>
            <div className="lb-homeFields">
              <Counter Icon={BedDouble} label="Bedrooms" value={bedrooms} change={(amount) => adjust(setBedrooms, bedrooms, amount)} />
              <Counter Icon={Bubbles} label="Bathrooms" value={bathrooms} change={(amount) => adjust(setBathrooms, bathrooms, amount, 1)} />
              <label className="lb-select"><span><Maximize /> Square footage</span><select value={sqft} onChange={(event) => setSqft(event.target.value)}>{SQFT.map((item) => <option key={item.label}>{item.label}</option>)}</select><ChevronDown /></label>
              <label className="lb-select"><span><Building2 /> Home type</span><select value={homeType} onChange={(event) => setHomeType(event.target.value)}><option>Apartment</option><option>House</option><option>Condo</option><option>Office</option></select><ChevronDown /></label>
            </div>
          </section>

          <section className="lb-compactPanel">
            <header><span className="lb-sectionImage"><img src={toolboxImage} alt="" /></span><div><h3>Extras <em>optional</em></h3><p>Add only what you need.</p></div></header>
            <div className="lb-extras">{EXTRAS.map(({ id, name, price, image }) => <label key={id}><input type="checkbox" checked={extras.includes(id)} onChange={() => toggleExtra(id)} /><span className="lb-extraIcon"><img src={image} alt="" /></span><span className="lb-check"><Check /></span><span>{name}</span><b>+${price}</b></label>)}</div>
          </section>

          <section className="lb-compactPanel">
            <header><span className="lb-sectionImage"><img src={calendarImage} alt="" /></span><div><h3>Preferred time</h3><p>We’ll confirm the closest window.</p></div></header>
            <div className="lb-timeFields"><label><CalendarDays /><input type="date" required value={date} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setDate(event.target.value)} /></label><div>{TIMES.map((item) => <button type="button" key={item} className={time === item ? 'is-selected' : ''} onClick={() => setTime(item)}><Clock3 /> {item}</button>)}</div></div>
            <p className="lb-availability"><Clock3 /> Usually confirmed within 10 minutes.</p>
          </section>

          <section className="lb-compactPanel">
            <header><span className="lb-sectionImage"><img src={keyImage} alt="" /></span><div><h3>Access & notes</h3><p>How we get in, and anything to know.</p></div></header>
            <div className="lb-accessFields">
              <label className="lb-select"><span><KeyRound /> How we get in</span><select value={entry} onChange={(event) => setEntry(event.target.value)}>{ENTRY.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown /></label>
              <label className="lb-notes"><span><NotebookPen /> Special instructions <em>optional</em></span><textarea rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Pets, parking, priority rooms, products to avoid…" /></label>
            </div>
          </section>

          <section className="lb-compactPanel lb-compactPanel--contact">
            <header><span className="lb-sectionImage"><img src={personImage} alt="" /></span><div><h3>Your details</h3><p>No account required.</p></div></header>
            <div className="lb-contactFields">
              <label><span><UserRound /> Full name</span><input required autoComplete="name" value={contact.name} onChange={(event) => updateContact('name', event.target.value)} placeholder="Jane Doe" /></label>
              <label><span><Mail /> Email</span><input required type="email" autoComplete="email" value={contact.email} onChange={(event) => updateContact('email', event.target.value)} placeholder="jane@example.com" /></label>
              <label><span><Phone /> Phone <em>optional</em></span><input type="tel" autoComplete="tel" value={contact.phone} onChange={(event) => updateContact('phone', event.target.value)} placeholder="(312) 555-0123" /></label>
              <label><span><MapPin /> Street address</span><input required autoComplete="street-address" value={contact.address} onChange={(event) => updateContact('address', event.target.value)} placeholder="123 W Madison St" /></label>
              <label className="lb-contactCity"><span><Building2 /> City</span><input autoComplete="address-level2" value={contact.city} onChange={(event) => updateContact('city', event.target.value)} placeholder="Chicago" /></label>
              <label className="lb-contactZip"><span><MapPin /> ZIP</span><input required inputMode="numeric" autoComplete="postal-code" value={contact.zip} onChange={(event) => updateContact('zip', event.target.value)} placeholder="60601" /></label>
            </div>
          </section>

          <section className="lb-compactPanel lb-compactPanel--payment">
            <header><span><CreditCard /></span><div><h3>Payment method</h3><p>Secure your appointment now. You won’t be charged until after the clean.</p></div><div className="lb-cardBrands"><b>VISA</b><b>MC</b><b>AMEX</b></div></header>
            <div className="lb-paymentOptions">
              <div className="lb-tipPicker">
                <span><HandCoins /> Tip your cleaning team <em>optional</em></span>
                <div>{TIP_OPTIONS.map((amount) => <button type="button" key={amount} className={tip === amount ? 'is-selected' : ''} onClick={() => { setTip(amount); setCustomTip('') }}>{amount}%</button>)}<button type="button" className={tip === 'custom' ? 'is-selected' : ''} onClick={() => setTip('custom')}>Other</button></div>
                {tip === 'custom' && <label className="lb-customTip"><span>$</span><input autoFocus inputMode="decimal" value={customTip} onChange={(event) => setCustomTip(event.target.value.replace(/[^\d.]/g, ''))} placeholder="Custom tip" /></label>}
              </div>
              <label className="lb-parkingPicker"><span><CarFront /> Parking</span><div><select value={parking} onChange={(event) => setParking(event.target.value)}>{PARKING_OPTIONS.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown /></div><small>We use free parking when possible. Necessary meter or garage costs are added after the visit.</small></label>
            </div>
            <StripePayment ref={paymentRef} customer={contact} onStateChange={setPaymentState} />
          </section>
        </div>
      </div>

      <aside className="lb-summary">
        <div className="lb-summary__head"><span><img src={receiptImage} alt="" /></span><div><p>Your booking</p><small>Updates as you go</small></div></div>
        <div className="lb-summary__item"><span>Service</span><strong>{selectedService.name}</strong></div>
        <div className="lb-summary__item"><span>Frequency</span><strong>{frequency}</strong></div>
        <div className="lb-summary__item"><span>Home</span><strong>{homeType} · {bedrooms} bed · {bathrooms} bath</strong></div>
        <div className="lb-summary__item"><span>Size</span><strong>{sqft}</strong></div>
        {pricing.roomAdjustment > 0 && <div className="lb-summary__item"><span>Room adjustment</span><strong>+${pricing.roomAdjustment}</strong></div>}
        {pricing.sqftAdjustment > 0 && <div className="lb-summary__item"><span>Size adjustment</span><strong>+${pricing.sqftAdjustment}</strong></div>}
        {extras.length > 0 && <div className="lb-summary__extras"><span>Extras · ${pricing.extrasTotal}</span>{extras.map((id) => <p key={id}>{EXTRAS.find((item) => item.id === id).name}</p>)}</div>}
        {pricing.discount > 0 && <div className="lb-summary__discount"><span>{selectedFrequency.discount}% recurring discount</span><strong>−${pricing.discount}</strong></div>}
        {pricing.promoOff > 0 && <div className="lb-summary__discount"><span>Promo {appliedPromo.code}</span><strong>−${pricing.promoOff}</strong></div>}
        {tipAmount > 0 && <div className="lb-summary__item"><span>Team tip</span><strong>+${tipAmount}</strong></div>}

        <div className="lb-promo">
          <label><Tag /><input value={promo} onChange={(event) => { setPromo(event.target.value); setPromoError('') }} placeholder="Promo code" aria-label="Promo code" /></label>
          <button type="button" onClick={applyPromo}>Apply</button>
        </div>
        {appliedPromo && <p className="lb-promoNote is-ok"><Check /> {appliedPromo.label} applied.</p>}
        {promoError && <p className="lb-promoNote is-err">{promoError}</p>}

        <div className="lb-summary__total"><span>Estimated total</span><strong>${estimatedCharge}</strong><small>Parking, if needed, is added from the receipt.</small></div>
        <div className="lb-summary__date"><CalendarDays /><div><span>{date ? new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Pick a date'}</span><small>{time || 'Pick a time window'}</small></div></div>
        <div className="lb-summary__payment"><CreditCard/><span>{paymentState.complete ? 'Card details complete' : 'Add a payment card'}</span><b>No charge today</b></div>
        <label className="lb-policyConsent"><input type="checkbox" checked={policyAccepted} onChange={(event) => setPolicyAccepted(event.target.checked)} /><span className="lb-policyCheck"><Check /></span><span>I authorize House Keep Up to save this card and charge the final total after service.</span></label>
        <details className="lb-policyDetails"><summary>Payment & cancellation policy</summary><p>The final charge includes completed services, your selected tip, and documented paid parking. Cancel or reschedule at least 24 hours before arrival at no cost; changes within 24 hours or inability to enter may incur a $50 fee.</p></details>
        {submitError && <p className="lb-submitError">{submitError}</p>}
        <button type="submit" className="lb-submit" disabled={!canSubmit}>{submitting ? 'Securing…' : 'Secure this booking'} <Check /></button>
        <p className="lb-summary__note"><ShieldCheck /> Card saved securely today. Charged only after the cleaning is completed.</p>
      </aside>
    </form>
  )
}

function Counter({ Icon, label, value, change }) {
  return <div className="lb-counter"><span><Icon /> {label}</span><div><button type="button" aria-label={`Remove ${label}`} onClick={() => change(-1)}><Minus /></button><strong>{value}</strong><button type="button" aria-label={`Add ${label}`} onClick={() => change(1)}><Plus /></button></div></div>
}
