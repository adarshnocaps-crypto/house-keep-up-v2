import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { IconBroom, IconSponge, IconWindow, IconHome } from './WizArt.jsx'

/**
 * The hero's right-hand panel: the four booking steps as a glass card that
 * auto-cycles through each step. The active row expands to show its hint and
 * a progress rail fills alongside it. Hovering a row takes over the cycle.
 */
const STEPS = [
  { n: '01', label: 'Service', hint: 'Pick the clean that fits — standard, deep, move-out and more.', Icon: IconBroom },
  { n: '02', label: 'Extras', hint: 'Stack add-ons like inside the fridge, oven or windows.', Icon: IconSponge },
  { n: '03', label: 'Schedule', hint: 'Choose a day and a time window that works for you.', Icon: IconWindow },
  { n: '04', label: 'Contact', hint: 'Share your details and we confirm within a few hours.', Icon: IconHome },
]

const CYCLE_MS = 3200

export default function HeroSteps() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (paused || reduce) return
    timer.current = window.setInterval(
      () => setActive((i) => (i + 1) % STEPS.length),
      CYCLE_MS,
    )
    return () => window.clearInterval(timer.current)
  }, [paused, reduce])

  return (
    <div className="hs" data-reveal="" style={{ '--delay': '0.9s' }}>
      {/* soft glow behind the card */}
      <span className="hs__glow" aria-hidden="true" />

      <div className="hs__card">
        <header className="hs__head">
          <div>
            <p className="hs__eyebrow">Free estimate</p>
            <p className="hs__title">Book in 4 steps</p>
          </div>
          <span className="hs__pill">~2 min</span>
        </header>

        <ol
          className="hs__list"
          onMouseLeave={() => setPaused(false)}
        >
          {STEPS.map(({ n, label, hint, Icon }, i) => {
            const isActive = i === active
            const isDone = i < active
            return (
              <li
                key={label}
                className={`hs__step ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                onMouseEnter={() => {
                  setPaused(true)
                  setActive(i)
                }}
              >
                <span className="hs__rail" aria-hidden="true">
                  <span className="hs__railDot" />
                  {i < STEPS.length - 1 && <span className="hs__railLine" />}
                </span>

                <div className="hs__body">
                  <div className="hs__row">
                    <span className="hs__icon">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="hs__label">{label}</span>
                    <span className="hs__no">{n}</span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="hint"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.32, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="hs__hint">{hint}</p>
                        {!reduce && (
                          <span className="hs__progress" aria-hidden="true">
                            <motion.span
                              className="hs__progressFill"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{
                                duration: paused ? 0.3 : CYCLE_MS / 1000,
                                ease: 'linear',
                              }}
                            />
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            )
          })}
        </ol>

        <a href="/#estimate" className="hs__cta">
          Start my estimate
          <span aria-hidden="true">→</span>
        </a>

        <p className="hs__foot">No card needed · Same-week slots</p>
      </div>
    </div>
  )
}
