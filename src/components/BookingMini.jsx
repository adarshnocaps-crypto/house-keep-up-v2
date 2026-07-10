import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  IconBroom, IconBubbles, IconBox, IconHome, IconBuilding, IconHammer,
  IconFridge, IconOven, IconWindow, IconSponge,
} from './WizArt.jsx'

/**
 * The hero's right-hand card: a compact, friendly four-step estimate request.
 * Soft glass panel, springy selections, a dot progress bar and a cheerful
 * confirmation. Carries id="estimate" so every "free estimate" CTA lands here.
 */
const SERVICES = [
  { id: 'standard', label: 'Standard', Icon: IconBroom },
  { id: 'deep', label: 'Deep clean', Icon: IconBubbles },
  { id: 'move', label: 'Move in/out', Icon: IconBox },
  { id: 'airbnb', label: 'Airbnb', Icon: IconHome },
  { id: 'office', label: 'Office', Icon: IconBuilding },
  { id: 'post', label: 'Post-build', Icon: IconHammer },
]

const EXTRAS = [
  { id: 'fridge', label: 'Fridge', Icon: IconFridge },
  { id: 'oven', label: 'Oven', Icon: IconOven },
  { id: 'windows', label: 'Windows', Icon: IconWindow },
  { id: 'walls', label: 'Walls', Icon: IconSponge },
]

const TIMES = ['Morning', 'Midday', 'Afternoon', 'Evening']

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
  const [d, setD] = useState({ service: '', extras: [], date: '', time: '', name: '', email: '' })

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
              We've got your request. Expect a call or email within a few hours to
              lock in the visit.
            </p>
            <button
              type="button"
              className="bk__cta"
              onClick={() => {
                setDone(false)
                setStep(0)
                set({ service: '', extras: [], date: '', time: '', name: '', email: '' })
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
                      {SERVICES.map(({ id, label, Icon }) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => set({ service: id })}
                          className={`bk__opt ${d.service === id ? 'is-on' : ''}`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="bk__grid">
                      {EXTRAS.map(({ id, label, Icon }) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => toggle(id)}
                          className={`bk__opt ${d.extras.includes(id) ? 'is-on' : ''}`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{label}</span>
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
                        {TIMES.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => set({ time: t })}
                            className={`bk__chip ${d.time === t ? 'is-on' : ''}`}
                          >
                            {t}
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
                    </>
                  )}
                </motion.div>
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
