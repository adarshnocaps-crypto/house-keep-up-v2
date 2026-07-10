import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  IconBroom, IconBubbles, IconBox, IconHome, IconBuilding, IconHammer,
  IconFridge, IconOven, IconWindow, IconShirt, IconCabinet, IconSponge,
  IconCar, IconRuler,
} from './WizArt.jsx'

/**
 * The hero's right-hand card: a compact, friendly four-step estimate request.
 * Soft glass panel, springy selections, a dot progress bar and a cheerful
 * confirmation. Carries id="estimate" so every "free estimate" CTA lands here.
 */
const SERVICES = [
  { id: 'standard', label: 'Standard', Icon: IconBroom, price: 129 },
  { id: 'deep', label: 'Deep clean', Icon: IconBubbles, price: 219 },
  { id: 'move', label: 'Move in/out', Icon: IconBox, price: 259 },
  { id: 'airbnb', label: 'Airbnb', Icon: IconHome, price: 149 },
  { id: 'office', label: 'Office', Icon: IconBuilding, price: 199 },
  { id: 'post', label: 'Post-build', Icon: IconHammer, price: 299 },
]

const EXTRAS = [
  { id: 'fridge', label: 'Fridge', Icon: IconFridge, price: 35 },
  { id: 'oven', label: 'Oven', Icon: IconOven, price: 35 },
  { id: 'windows', label: 'Windows', Icon: IconWindow, price: 45 },
  { id: 'laundry', label: 'Laundry', Icon: IconShirt, price: 25 },
  { id: 'cabinets', label: 'Cabinets', Icon: IconCabinet, price: 35 },
  { id: 'walls', label: 'Walls', Icon: IconSponge, price: 40 },
  { id: 'garage', label: 'Garage', Icon: IconCar, price: 55 },
  { id: 'baseboards', label: 'Baseboards', Icon: IconRuler, price: 30 },
]

const TIMES = [
  { id: 'Morning', hours: '8am – 11am' },
  { id: 'Midday', hours: '11am – 2pm' },
  { id: 'Afternoon', hours: '2pm – 5pm' },
  { id: 'Evening', hours: '5pm – 8pm' },
]

const STEP_TITLE = [
  ['What can we clean?', 'Pick the visit that fits.'],
  ['Any extras?', 'Optional — skip if you like.'],
  ['When suits you?', 'Same-week slots open.'],
  ['Where do we confirm?', "We'll reply within hours."],
]

const spring = { type: 'spring', stiffness: 320, damping: 26 }

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
  const today = new Date().toISOString().slice(0, 10)

  const variants = {
    enter: { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0, transition: reduce ? { duration: 0 } : spring },
    exit: { opacity: 0, x: -24, transition: { duration: 0.16 } },
  }

  return (
    <div id="estimate" className="bk scroll-mt-28" data-reveal="" style={{ '--delay': '0.9s' }}>
      <span className="bk__glow" aria-hidden="true" />

      <div className="bk__card">
        {done ? (
          <div className="bk__done">
            <motion.span
              className="bk__doneMark"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 16 }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
            <p className="bk__doneTitle">You're all set{d.name ? `, ${d.name.split(' ')[0]}` : ''}!</p>
            <p className="bk__doneText">
              Request <strong className="text-cream">#{orderNo}</strong> received — estimated at
              {' '}<strong className="text-cream">${total}</strong>. We'll confirm within a few hours.
              Nothing due today.
            </p>
            <button
              type="button"
              className="bk__cta"
              onClick={() => {
                setDone(false)
                setStep(0)
                set({ service: '', extras: [], date: '', time: '', name: '', email: '', phone: '' })
              }}
            >
              Book another
            </button>
          </div>
        ) : (
          <>
            <header className="bk__head">
              <div>
                <p className="bk__eyebrow">Free estimate</p>
                <p className="bk__title">{STEP_TITLE[step][0]}</p>
                <p className="bk__sub">{STEP_TITLE[step][1]}</p>
              </div>
              <span className="bk__pill">~2 min</span>
            </header>

            {/* dot progress */}
            <div className="bk__dots" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={4}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`bk__dot ${i <= step ? 'is-on' : ''}`} />
              ))}
            </div>

            <form
              className="bk__body"
              onSubmit={(e) => {
                e.preventDefault()
                if (canNext) next()
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} variants={variants} initial="enter" animate="center" exit="exit">
                  {step === 0 && (
                    <div className="bk__grid">
                      {SERVICES.map(({ id, label, Icon, price }) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => set({ service: id })}
                          className={`bk__opt ${d.service === id ? 'is-on' : ''}`}
                        >
                          <Icon className="h-5 w-5 flex-none" />
                          <span className="bk__optText">
                            <span className="bk__optLabel">{label}</span>
                            <span className="bk__optPrice">${price}+</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="bk__grid">
                      {EXTRAS.map(({ id, label, Icon, price }) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => toggle(id)}
                          className={`bk__opt ${d.extras.includes(id) ? 'is-on' : ''}`}
                        >
                          <Icon className="h-5 w-5 flex-none" />
                          <span className="bk__optText">
                            <span className="bk__optLabel">{label}</span>
                            <span className="bk__optPrice">+${price}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <>
                      <label className="bk__field">
                        <span className="bk__label">Preferred date</span>
                        <input
                          type="date"
                          min={today}
                          value={d.date}
                          onChange={(e) => set({ date: e.target.value })}
                          className="bk__input"
                        />
                      </label>
                      <div className="bk__chips">
                        {TIMES.map(({ id, hours }) => (
                          <button
                            type="button"
                            key={id}
                            onClick={() => set({ time: id })}
                            className={`bk__chip ${d.time === id ? 'is-on' : ''}`}
                          >
                            <span className="bk__chipName">{id}</span>
                            <span className="bk__chipHours">{hours}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <label className="bk__field">
                        <span className="bk__label">Your name</span>
                        <input
                          type="text"
                          placeholder="Jane Doe"
                          value={d.name}
                          onChange={(e) => set({ name: e.target.value })}
                          className="bk__input"
                          required
                        />
                      </label>
                      <label className="bk__field">
                        <span className="bk__label">Email</span>
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={d.email}
                          onChange={(e) => set({ email: e.target.value })}
                          className="bk__input"
                          required
                        />
                      </label>
                      <label className="bk__field">
                        <span className="bk__label">Phone <span className="bk__optional">optional</span></span>
                        <input
                          type="tel"
                          placeholder="(312) 555-1234"
                          value={d.phone}
                          onChange={(e) => set({ phone: e.target.value })}
                          className="bk__input"
                        />
                      </label>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* live running estimate */}
              <AnimatePresence initial={false}>
                {total > 0 && (
                  <motion.div
                    className="bk__total"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <span className="bk__totalLabel">Estimated total</span>
                    <span className="bk__totalValue">${total}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bk__nav">
                {step > 0 ? (
                  <button type="button" onClick={back} className="bk__back">
                    ← Back
                  </button>
                ) : (
                  <span />
                )}
                <button type="submit" disabled={!canNext} className="bk__cta">
                  {step === 3 ? 'Send request' : 'Continue'}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </>
        )}

        <p className="bk__foot">No card needed · Same-week slots</p>
      </div>
    </div>
  )
}
