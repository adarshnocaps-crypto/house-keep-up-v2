import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  BrushCleaning, Bubbles, PackageOpen, Building2, Construction, CalendarSync,
  Refrigerator, CookingPot, PanelsTopLeft, Shirt, Columns3, Paintbrush,
  CarFront, Ruler, Sunrise, Sun, Sunset, MoonStar, Check, ArrowRight, ArrowLeft,
} from 'lucide-react'

/**
 * Hero-native estimate request. Built to live inside the green hero: a deep,
 * translucent panel with a pink hairline, cream type and Anton headings — the
 * same language as the hero itself, rather than a light card pasted on top.
 * Carries id="estimate" so every "free estimate" CTA lands here.
 */
const SERVICES = [
  { id: 'standard', label: 'Standard', Icon: BrushCleaning, price: 120 },
  { id: 'deep', label: 'Deep clean', Icon: Bubbles, price: 220 },
  { id: 'move', label: 'Move in/out', Icon: PackageOpen, price: 260 },
  { id: 'post', label: 'Post-build', Icon: Construction, price: 320 },
  { id: 'office', label: 'Commercial', Icon: Building2, price: 199 },
  { id: 'recurring', label: 'Recurring', Icon: CalendarSync, price: 99 },
]

const EXTRAS = [
  { id: 'fridge', label: 'Fridge', Icon: Refrigerator, price: 35 },
  { id: 'oven', label: 'Oven', Icon: CookingPot, price: 35 },
  { id: 'windows', label: 'Windows', Icon: PanelsTopLeft, price: 45 },
  { id: 'laundry', label: 'Laundry', Icon: Shirt, price: 25 },
  { id: 'cabinets', label: 'Cabinets', Icon: Columns3, price: 35 },
  { id: 'walls', label: 'Walls', Icon: Paintbrush, price: 40 },
  { id: 'garage', label: 'Garage', Icon: CarFront, price: 55 },
  { id: 'baseboards', label: 'Baseboards', Icon: Ruler, price: 30 },
]

const TIMES = [
  { id: 'Morning', hours: '8am – 11am', Icon: Sunrise },
  { id: 'Midday', hours: '11am – 2pm', Icon: Sun },
  { id: 'Afternoon', hours: '2pm – 5pm', Icon: Sunset },
  { id: 'Evening', hours: '5pm – 8pm', Icon: MoonStar },
]

const STEPS = ['Service', 'Extras', 'Time', 'You']
const STEP_TITLE = [
  ['What can we clean?', 'Pick the visit that fits.'],
  ['Add any extras', 'Optional — skip if you like.'],
  ['When suits you?', 'Same-week slots are open.'],
  ['Where do we confirm?', "We'll reply within hours."],
]

const spring = { type: 'spring', stiffness: 340, damping: 30 }

export default function BookingMini() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [d, setD] = useState({ service: '', extras: [], date: '', time: '', name: '', email: '', phone: '' })
  const [orderNo] = useState(() => String(Math.floor(1000 + Math.random() * 9000)))

  const total =
    (SERVICES.find((s) => s.id === d.service)?.price ?? 0) +
    d.extras.reduce((sum, id) => sum + (EXTRAS.find((e) => e.id === id)?.price ?? 0), 0)

  const set = (patch) => setD((s) => ({ ...s, ...patch }))
  const toggle = (id) =>
    setD((s) => ({
      ...s,
      extras: s.extras.includes(id) ? s.extras.filter((e) => e !== id) : [...s.extras, id],
    }))

  const canNext =
    (step === 0 && d.service) ||
    step === 1 ||
    (step === 2 && d.date && d.time) ||
    (step === 3 && d.name && d.email)

  const next = () => (step < 3 ? setStep((s) => s + 1) : setDone(true))
  const back = () => setStep((s) => Math.max(0, s - 1))
  const reset = () => {
    setDone(false)
    setStep(0)
    set({ service: '', extras: [], date: '', time: '', name: '', email: '', phone: '' })
  }
  const today = new Date().toISOString().slice(0, 10)

  const variants = {
    enter: { opacity: 0, x: 22 },
    center: { opacity: 1, x: 0, transition: reduce ? { duration: 0 } : spring },
    exit: { opacity: 0, x: -22, transition: { duration: 0.16 } },
  }

  return (
    <div id="estimate" className="mb scroll-mt-28" data-reveal="" style={{ '--delay': '0.9s' }}>
      <div className="mb__panel">
        {done ? (
          <div className="mb__done">
            <motion.span
              className="mb__doneMark"
              initial={reduce ? {} : { scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 15 }}
              aria-hidden="true"
            >
              <Check strokeWidth={3} />
            </motion.span>
            <p className="mb__doneTitle">You're all set{d.name ? `, ${d.name.split(' ')[0]}` : ''}!</p>
            <p className="mb__doneText">
              Request <strong>#{orderNo}</strong> received — estimated at{' '}
              <strong>${total}</strong>. We'll confirm within a few hours. Nothing due today.
            </p>
            <button type="button" className="mb__cta" onClick={reset}>
              Book another
            </button>
          </div>
        ) : (
          <>
            {/* header: eyebrow + step count, Anton title */}
            <div className="mb__head">
              <span className="mb__eyebrow">Free estimate</span>
              <span className="mb__count">0{step + 1}<i>/04</i></span>
            </div>

            {/* segmented step rail */}
            <ol className="mb__rail" aria-hidden="true">
              {STEPS.map((label, i) => (
                <li key={label} className={`mb__railSeg ${i < step ? 'is-done' : ''} ${i === step ? 'is-on' : ''}`}>
                  <span className="mb__railFill" />
                  <span className="mb__railLabel">{label}</span>
                </li>
              ))}
            </ol>

            <h3 className="mb__title">{STEP_TITLE[step][0]}</h3>
            <p className="mb__sub">{STEP_TITLE[step][1]}</p>

            <form
              className="mb__form"
              onSubmit={(e) => {
                e.preventDefault()
                if (canNext) next()
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div className="mb__stage" key={step} variants={variants} initial="enter" animate="center" exit="exit">
                  {step === 0 && (
                    <div className="mb__grid">
                      {SERVICES.map(({ id, label, Icon, price }) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => set({ service: id })}
                          className={`mb__opt ${d.service === id ? 'is-on' : ''}`}
                          aria-pressed={d.service === id}
                        >
                          <span className="mb__optIcon"><Icon className="h-[18px] w-[18px]" strokeWidth={1.8} /></span>
                          <span className="mb__optText">
                            <span className="mb__optLabel">{label}</span>
                            <span className="mb__optPrice">From ${price}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="mb__grid">
                      {EXTRAS.map(({ id, label, Icon, price }) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => toggle(id)}
                          className={`mb__opt ${d.extras.includes(id) ? 'is-on' : ''}`}
                          aria-pressed={d.extras.includes(id)}
                        >
                          <span className="mb__optIcon"><Icon className="h-[18px] w-[18px]" strokeWidth={1.8} /></span>
                          <span className="mb__optText">
                            <span className="mb__optLabel">{label}</span>
                            <span className="mb__optPrice">+${price}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <>
                      <label className="mb__field">
                        <span className="mb__label">Preferred date</span>
                        <input
                          type="date"
                          min={today}
                          value={d.date}
                          onChange={(e) => set({ date: e.target.value })}
                          className="mb__input"
                        />
                      </label>
                      <div className="mb__chips">
                        {TIMES.map(({ id, hours, Icon }) => (
                          <button
                            type="button"
                            key={id}
                            onClick={() => set({ time: id })}
                            className={`mb__chip ${d.time === id ? 'is-on' : ''}`}
                            aria-pressed={d.time === id}
                          >
                            <span className="mb__chipIcon"><Icon className="h-[18px] w-[18px]" strokeWidth={1.8} /></span>
                            <span className="mb__chipText">
                              <span className="mb__chipName">{id}</span>
                              <span className="mb__chipHours">{hours}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <div className="mb__fields">
                      <label className="mb__field">
                        <span className="mb__label">Your name</span>
                        <input
                          type="text"
                          placeholder="Jane Doe"
                          value={d.name}
                          onChange={(e) => set({ name: e.target.value })}
                          className="mb__input"
                          required
                        />
                      </label>
                      <label className="mb__field">
                        <span className="mb__label">Email</span>
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={d.email}
                          onChange={(e) => set({ email: e.target.value })}
                          className="mb__input"
                          required
                        />
                      </label>
                      <label className="mb__field">
                        <span className="mb__label">Phone <i>optional</i></span>
                        <input
                          type="tel"
                          placeholder="(312) 555-1234"
                          value={d.phone}
                          onChange={(e) => set({ phone: e.target.value })}
                          className="mb__input"
                        />
                      </label>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* running estimate — always present to fix height */}
              <div className={`mb__total ${total ? 'is-ready' : ''}`} aria-live="polite">
                <span className="mb__totalLabel">Estimated total</span>
                <span className="mb__totalValue">{total ? `$${total}` : '—'}</span>
              </div>

              <div className="mb__nav">
                {step > 0 ? (
                  <button type="button" onClick={back} className="mb__back">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <span className="mb__reassure">No card needed</span>
                )}
                <button type="submit" disabled={!canNext} className="mb__cta">
                  {step === 3 ? 'Send request' : 'Continue'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
