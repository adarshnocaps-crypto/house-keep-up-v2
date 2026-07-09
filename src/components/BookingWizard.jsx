import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { Title } from '../lib/scrollfx.jsx'
import {
  IconBroom, IconBubbles, IconBox, IconHome, IconBuilding, IconHammer,
  IconFridge, IconOven, IconWindow, IconShirt, IconCabinet, IconSponge,
  IconCar, IconRuler,
} from './WizArt.jsx'
import stampPicked from '../assets/images/wizard/stamp-picked.png'
import stampOrderUp from '../assets/images/wizard/stamp-orderup.png'
import stampNoCard from '../assets/images/wizard/stamp-nocard.png'
import stampSameWeek from '../assets/images/wizard/stamp-sameweek.png'
import cleanerArt from '../assets/images/wizard/cleaner-register.png'
import receiptPaper from '../assets/images/wizard/receipt-paper.jpeg'
import sceneService from '../assets/images/wizard/scene-service.png'
import sceneExtras from '../assets/images/wizard/scene-extras.png'
import sceneSchedule from '../assets/images/wizard/scene-schedule.png'
import sceneContact from '../assets/images/wizard/scene-contact.png'

const SCENE_ART = [sceneService, sceneExtras, sceneSchedule, sceneContact]
const SCENE_ALT = [
  'Retro cleaner mopping a sparkling floor',
  'Vintage cleaning supplies — bucket, spray, sponge and duster',
  'A calendar with a date circled beside a retro alarm clock',
  'A confirmation envelope stamped with a green checkmark',
]

const STEPS = [
  { label: 'Service', Icon: IconBroom },
  { label: 'Extras', Icon: IconSponge },
  { label: 'Schedule', Icon: IconWindow },
  { label: 'Contact', Icon: IconHome },
]

const SERVICES = [
  { id: 'standard', Icon: IconBroom, title: 'Standard Cleaning', sub: 'Dusting, vacuuming, mopping & more', price: 129 },
  { id: 'deep', Icon: IconBubbles, title: 'Deep Cleaning', sub: 'Thorough top-to-bottom scrub', price: 219 },
  { id: 'move', Icon: IconBox, title: 'Move In / Out', sub: 'Full property prep for new tenants', price: 259 },
  { id: 'airbnb', Icon: IconHome, title: 'Airbnb / Rental', sub: 'Quick turnaround guest-ready clean', price: 149 },
  { id: 'office', Icon: IconBuilding, title: 'Office Cleaning', sub: 'Workspaces, lobbies & restrooms', price: 199 },
  { id: 'post', Icon: IconHammer, title: 'Post-Construction', sub: 'Debris removal & final polish', price: 299 },
]

const EXTRAS = [
  { id: 'fridge', Icon: IconFridge, label: 'Inside Fridge', price: 35 },
  { id: 'oven', Icon: IconOven, label: 'Inside Oven', price: 35 },
  { id: 'windows', Icon: IconWindow, label: 'Interior Windows', price: 45 },
  { id: 'laundry', Icon: IconShirt, label: 'Laundry', price: 25 },
  { id: 'cabinets', Icon: IconCabinet, label: 'Inside Cabinets', price: 35 },
  { id: 'walls', Icon: IconSponge, label: 'Wall Washing', price: 40 },
  { id: 'garage', Icon: IconCar, label: 'Garage', price: 55 },
  { id: 'baseboards', Icon: IconRuler, label: 'Baseboards', price: 30 },
]

const TIME_WINDOWS = [
  { id: 'Morning (8am - 11am)', short: 'MORNING' },
  { id: 'Midday (11am - 2pm)', short: 'MIDDAY' },
  { id: 'Afternoon (2pm - 5pm)', short: 'AFTERNOON' },
  { id: 'Evening (5pm - 8pm)', short: 'EVENING' },
]

const STEP_COPY = [
  ['What are we cleaning?', 'Pick the job and watch it hit the ticket.'],
  ['Pile on the extras', 'Add-ons print straight onto your receipt.'],
  ['When should we roll up?', 'Pick a day and a window — same-week slots go fast.'],
  ['Who gets the receipt?', 'Drop your details and we confirm within hours.'],
]

const MARQUEE = '★ FREE ESTIMATE ★ NO CARD NEEDED ★ SAME-WEEK SLOTS ★ 2-MINUTE ORDER ★ CHICAGOLAND ★ SINCE DAY ONE ★ SATISFACTION STAMPED '

const spring = { type: 'spring', stiffness: 300, damping: 24 }

const stepVariants = {
  enter: { opacity: 0, y: 36, rotate: 1.4, scale: 0.98 },
  center: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: spring },
  exit: { opacity: 0, y: -24, rotate: -1.2, transition: { duration: 0.18 } },
}

const CONFETTI_COLORS = ['#ffa9e9', '#09543d', '#dc3f81', '#6d0596', '#461e10']

function Confetti() {
  return (
    <div className="rw-confetti" aria-hidden="true">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: -30, x: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: 460 + (i % 5) * 50,
            x: ((i * 37) % 140) - 70,
            opacity: 0,
            rotate: i % 2 ? 380 : -380,
          }}
          transition={{ duration: 1.7 + (i % 7) * 0.17, ease: 'easeIn', delay: (i % 9) * 0.08 }}
          style={{
            left: `${(i * 53) % 100}%`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            width: i % 3 ? 8 : 13,
            height: i % 4 ? 15 : 9,
          }}
        />
      ))}
    </div>
  )
}

/* One printed line on the receipt — scales open like paper feeding out */
function RLine({ children, strong = false }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      style={{ originY: 0 }}
      className={`rw-rline ${strong ? 'is-strong' : ''}`}
    >
      {children}
    </motion.div>
  )
}

function Receipt({ data, service, done, orderNo, total, step }) {
  const reduce = useReducedMotion()
  const paperRef = useRef(null)
  const printerRef = useRef(null)
  const fedRef = useRef(false)

  const time = TIME_WINDOWS.find((t) => t.id === data.time)
  const hasAny = service || data.extras.length > 0 || data.date || data.time
  const lineCount =
    [service, data.date, data.time, data.name].filter(Boolean).length + data.extras.length

  /* --- GSAP: initial paper feed out of the printer slot, on first scroll into view --- */
  useEffect(() => {
    const el = paperRef.current
    if (!el || reduce) {
      fedRef.current = true
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fedRef.current) {
          fedRef.current = true
          gsap.fromTo(
            el,
            { yPercent: -104 },
            { yPercent: 0, duration: 1.6, ease: 'steps(13)', delay: 0.25 },
          )
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  /* --- GSAP: feed pulse each time the paper grows (new line) or a step advances --- */
  const prevRef = useRef({ step, lineCount })
  useEffect(() => {
    const el = paperRef.current
    const stepChanged = step !== prevRef.current.step
    const grew = lineCount > prevRef.current.lineCount
    prevRef.current = { step, lineCount }
    if (!el || reduce || !fedRef.current || done) return
    if (!stepChanged && !grew) return
    gsap.fromTo(
      el,
      { y: stepChanged ? -46 : -20 },
      { y: 0, duration: stepChanged ? 0.55 : 0.35, ease: `steps(${stepChanged ? 5 : 3})`, overwrite: 'auto' },
    )
    if (printerRef.current) {
      gsap.fromTo(printerRef.current, { y: -3 }, { y: 0, duration: 0.35, ease: 'bounce.out', overwrite: 'auto' })
    }
  }, [step, lineCount, done, reduce])

  /* --- GSAP: tear-off on submit — wiggle, rip, fall… then the final copy re-feeds --- */
  useEffect(() => {
    const el = paperRef.current
    if (!el || !done || reduce) return
    const tl = gsap.timeline()
    tl.to(el, { rotation: -2.5, y: 10, duration: 0.16, ease: 'power1.out' })
      .to(el, { rotation: 3.5, duration: 0.12 })
      .to(el, { y: 760, rotation: 18, opacity: 0, duration: 0.75, ease: 'power2.in' })
      .set(el, { rotation: 0, y: 0 })
      .fromTo(el, { yPercent: -104, opacity: 1 }, { yPercent: 0, duration: 1.35, ease: 'steps(11)' }, '+=0.25')
    return () => tl.kill()
  }, [done, reduce])

  return (
    <aside className="rw-receiptWrap" data-reveal="" style={{ '--delay': '0.3s' }}>
      <div className="rw-printer" ref={printerRef} aria-hidden="true" />
      <div className="rw-feedWrap">
        <div
          ref={paperRef}
          className="rw-receipt"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url(${receiptPaper})`,
            backgroundSize: 'cover',
          }}
        >
          <p className="rw-receipt__brand">HOUSE KEEP UP</p>
          <p className="rw-receipt__tag">CHICAGO'S CLEANING CO.</p>
          <p className="rw-receipt__stars" aria-hidden="true">★ ★ ★ ★ ★</p>
          <div className="rw-rule" />
          <div className="rw-rline"><span>ORDER</span><span>#{orderNo}</span></div>
          <div className="rw-rline"><span>KIND</span><span>FREE ESTIMATE</span></div>
          <div className="rw-rule" />

          <AnimatePresence initial={false}>
            {!hasAny && (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rw-receipt__empty"
              >
                AWAITING YOUR ORDER<span className="rw-cursor">▌</span>
              </motion.p>
            )}

            {service && (
              <RLine key={`svc-${service.id}`}>
                <span>1x {service.title.toUpperCase()}</span>
                <span>${service.price}</span>
              </RLine>
            )}
            {data.extras.map((id) => {
              const ex = EXTRAS.find((e) => e.id === id)
              return (
                <RLine key={id}>
                  <span>&nbsp;+ {ex.label.toUpperCase()}</span>
                  <span>${ex.price}</span>
                </RLine>
              )
            })}
            {data.date && (
              <RLine key="date"><span>DATE</span><span>{data.date}</span></RLine>
            )}
            {time && (
              <RLine key="time"><span>TIME</span><span>{time.short}</span></RLine>
            )}
            {data.name && (
              <RLine key="name"><span>FOR</span><span>{data.name.toUpperCase().slice(0, 16)}</span></RLine>
            )}
          </AnimatePresence>

          <div className="rw-rule" />
          <div className="rw-rline is-strong">
            <span>TOTAL (EST)</span>
            <span>${total}</span>
          </div>
          <div className="rw-rline is-strong">
            <span>DUE TODAY</span>
            <span>$0.00</span>
          </div>
          <div className="rw-rule" />

          <AnimatePresence>
            {done && (
              <motion.p
                key="received"
                initial={{ opacity: 0, scale: 2.4, rotate: -14 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 16, delay: reduce ? 0 : 2.6 }}
                className="rw-receipt__received"
              >
                *** ORDER RECEIVED ***
              </motion.p>
            )}
          </AnimatePresence>

          <div className="rw-barcode" aria-hidden="true" />
          <p className="rw-receipt__foot">NO CARD NEEDED · THANK YOU!</p>
          <p className="rw-receipt__foot">COME AGAIN ★</p>
        </div>
      </div>
      <img src={stampSameWeek} alt="" aria-hidden="true" className="rw-deco--week" loading="lazy" />
    </aside>
  )
}

export default function BookingWizard() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [orderNo] = useState(() => String(Math.floor(1000 + Math.random() * 9000)))
  const [data, setData] = useState({
    service: '',
    extras: [],
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
  })

  const set = (patch) => setData((d) => ({ ...d, ...patch }))
  const toggleExtra = (id) =>
    setData((d) => ({
      ...d,
      extras: d.extras.includes(id)
        ? d.extras.filter((e) => e !== id)
        : [...d.extras, id],
    }))

  const canNext =
    (step === 0 && data.service) ||
    step === 1 ||
    (step === 2 && data.date && data.time) ||
    step === 3

  const next = () => (step < STEPS.length - 1 ? setStep((s) => s + 1) : setDone(true))
  const back = () => setStep((s) => Math.max(0, s - 1))
  const selectedService = SERVICES.find((s) => s.id === data.service)
  const total =
    (selectedService?.price ?? 0) +
    data.extras.reduce((sum, id) => sum + (EXTRAS.find((e) => e.id === id)?.price ?? 0), 0)
  const today = new Date().toISOString().slice(0, 10)

  // Keep the wizard's top (ticket tabs + heading) in view on each step change,
  // so advancing never leaves the user scrolled past the top of the board.
  const boardRef = useRef(null)
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const el = boardRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 110 // clear fixed header
    // only scroll up if the board top is above the current view (out of frame)
    if (window.scrollY > top) {
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [step, done, reduce])

  return (
    <section id="estimate" className="rw mx-auto max-w-[1320px] px-4 py-20 sm:px-6 sm:py-28" data-scroll="">
      <div className="rw-burst" aria-hidden="true" />

      <div className="relative z-[1] mb-8 grid items-end gap-6 md:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="mb-6" data-reveal="">
            <span className="a-sticker">Order up!</span>
          </p>
          <Title align="start" lines={['Place your', { text: 'clean order' }]} />
        </div>
        <p
          className="max-w-md text-[15px] leading-relaxed text-primary/75 md:justify-self-end"
          data-reveal=""
          style={{ '--delay': '0.15s' }}
        >
          Build your cleaning like a diner ticket — pick the job, stack the
          extras, and watch your receipt print itself. We confirm the visit,
          you pay nothing today.
        </p>
      </div>

      <div className="rw-marquee" data-reveal="" aria-hidden="true">
        <div className="rw-marquee__track">
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>

      <div className="relative z-[1] mb-8 flex flex-wrap items-center justify-end gap-4" data-reveal="">
        <img
          src={stampNoCard}
          alt="No card needed"
          className="h-12 w-auto rotate-[-6deg] mix-blend-multiply"
          loading="lazy"
        />
        <a href="tel:+17087378722" className="a-link">
          Prefer phone? Call (708) 737-8722
        </a>
      </div>

      <div className="rw-board" data-reveal="" style={{ '--delay': '0.2s' }} ref={boardRef}>
        <div className="rw-cardMain">
          <div className="rw-check" aria-hidden="true" />

          {/* ticket-stub step tabs */}
          <ol className="rw-stubs">
            {STEPS.map(({ label, Icon }, i) => {
              const state = done || i < step ? 'done' : i === step ? 'active' : 'todo'
              return (
                <li key={label} className={`rw-stub is-${state}`}>
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="t">{label}</span>
                  <Icon className="ml-auto h-4 w-4 flex-none" />
                </li>
              )
            })}
          </ol>

          <div className="rw-body">
            {done ? (
              <div className="relative flex min-h-[460px] flex-col items-center justify-center text-center">
                <Confetti />
                <div className="rw-polaroid" style={{ width: 280, transform: 'rotate(-2deg)' }}>
                  <img
                    src={cleanerArt}
                    alt="Retro cleaner ringing up your order on a vintage register"
                    className="block h-auto w-full"
                  />
                </div>
                <motion.img
                  src={stampOrderUp}
                  alt="Order up!"
                  initial={{ scale: 3, opacity: 0, rotate: -30 }}
                  animate={{ scale: 1, opacity: 1, rotate: -7 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 15, delay: 0.15 }}
                  className="rw-bigstampImg mt-8"
                />
                <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-cocoa/70">
                  Thanks{data.name ? `, ${data.name.split(' ')[0]}` : ''} — your
                  {selectedService ? ` ${selectedService.title.toLowerCase()}` : ' cleaning'} ticket
                  is on the rail. We'll confirm within a few hours.
                </p>
                <button
                  type="button"
                  className="rw-btn mt-9"
                  onClick={() => {
                    setDone(false)
                    setStep(0)
                    set({ service: '', extras: [], date: '', time: '', name: '', email: '', phone: '' })
                  }}
                >
                  Book another clean →
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (canNext) next() }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <div className="mb-8 grid items-center gap-7 md:grid-cols-[1fr_190px]">
                      <div>
                        <p className="rw-eyebrow">Ticket {String(step + 1).padStart(2, '0')} / 04</p>
                        <h3 className="rw-heading">{STEP_COPY[step][0]}</h3>
                        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-cocoa/65">
                          {STEP_COPY[step][1]}
                        </p>
                      </div>
                      <div className="rw-polaroid hidden md:block">
                        <img
                          src={SCENE_ART[step]}
                          alt={SCENE_ALT[step]}
                          className="block h-auto w-full"
                        />
                      </div>
                    </div>

                    {step === 0 && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {SERVICES.map(({ id, Icon, title, sub, price }) => (
                          <button
                            type="button"
                            key={id}
                            onClick={() => set({ service: id })}
                            className={`rw-option ${data.service === id ? 'is-selected' : ''}`}
                          >
                            <AnimatePresence>
                              {data.service === id && (
                                <motion.img
                                  src={stampPicked}
                                  alt=""
                                  initial={{ scale: 2.6, opacity: 0, rotate: -28 }}
                                  animate={{ scale: 1, opacity: 1, rotate: 9 }}
                                  exit={{ scale: 0.6, opacity: 0 }}
                                  transition={{ type: 'spring', stiffness: 520, damping: 16 }}
                                  className="rw-stampPng"
                                />
                              )}
                            </AnimatePresence>
                            <span className="flex items-start justify-between gap-3">
                              <Icon className="h-7 w-7" />
                              <span className="rw-price">${price}+</span>
                            </span>
                            <span className="mt-3 block font-display text-[19px] uppercase leading-tight">{title}</span>
                            <span className="mt-1 block text-[13px] text-cocoa/60">{sub}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {EXTRAS.map(({ id, Icon, label, price }) => (
                            <button
                              type="button"
                              key={id}
                              onClick={() => toggleExtra(id)}
                              className={`rw-chip ${data.extras.includes(id) ? 'is-selected' : ''}`}
                            >
                              <Icon className="h-5 w-5 flex-none" />
                              {label}
                              <span className="ml-auto font-display text-[15px]">+${price}</span>
                            </button>
                          ))}
                        </div>
                        <p className="mt-6 text-[14px] italic text-cocoa/50">
                          No extras? No problem — just hit Continue.
                        </p>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <label className="block max-w-sm">
                          <span className="rw-flabel">Preferred date</span>
                          <input
                            type="date"
                            min={today}
                            value={data.date}
                            onChange={(e) => set({ date: e.target.value })}
                            className="rw-field"
                          />
                        </label>
                        <div className="mt-7">
                          <span className="rw-flabel">Preferred window</span>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {TIME_WINDOWS.map(({ id }) => (
                              <button
                                type="button"
                                key={id}
                                onClick={() => set({ time: id })}
                                className={`rw-chip ${data.time === id ? 'is-selected' : ''}`}
                              >
                                {id}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                          <span className="rw-flabel">Full name</span>
                          <input
                            type="text"
                            placeholder="Jane Doe"
                            value={data.name}
                            onChange={(e) => set({ name: e.target.value })}
                            className="rw-field"
                            required
                          />
                        </label>
                        <label className="block">
                          <span className="rw-flabel">Phone number</span>
                          <input
                            type="tel"
                            placeholder="(312) 555-1234"
                            value={data.phone}
                            onChange={(e) => set({ phone: e.target.value })}
                            className="rw-field"
                          />
                        </label>
                        <label className="block sm:col-span-2">
                          <span className="rw-flabel">Email address</span>
                          <input
                            type="email"
                            placeholder="you@email.com"
                            value={data.email}
                            onChange={(e) => set({ email: e.target.value })}
                            className="rw-field"
                            required
                          />
                        </label>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                  {step > 0 ? (
                    <button type="button" onClick={back} className="rw-btn rw-btn--ghost">
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={!canNext}
                      className={`rw-btn ${step === 3 ? 'rw-btn--go' : ''} disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {step === 3 ? 'Fire the ticket' : 'Continue'}
                      <span aria-hidden="true">→</span>
                    </button>
                    <span className="hidden text-[13px] text-cocoa/50 sm:block">
                      ~<strong className="text-cocoa/80">2 min</strong>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        <Receipt
          data={data}
          service={selectedService}
          done={done}
          orderNo={orderNo}
          total={total}
          step={step}
        />
      </div>
    </section>
  )
}
