import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import {
  ArrowRight, BadgeDollarSign, Building2, CalendarCheck, CalendarDays, Check,
  ClipboardCheck, Factory, GraduationCap, HeartPulse, Home, KeyRound,
  PartyPopper, PhoneCall, Plane, RefreshCw, Repeat2, ShieldCheck, Sparkles, Store,
  UtensilsCrossed, WalletCards, Wind,
} from 'lucide-react'
import { SERVICES, findService } from '../lib/services.js'

/**
 * Dedicated, cinematic detail page for one service (/services/<id>).
 * Scroll-driven hero (parallax image, clip-reveal, floating word), an
 * animated "what's included" checklist, a room-by-room breakdown, a big
 * price panel and a magnetic CTA. Elegant motion, tuned with reduced-motion.
 */
const ease = [0.22, 1, 0.36, 1]

const VISIT_STEPS = [
  [CalendarCheck, 'We confirm the details', 'Your date, arrival window and service checklist are confirmed before the visit.'],
  [ClipboardCheck, 'We clean to the checklist', 'Your team works through the agreed scope with the right supplies and equipment.'],
  [ShieldCheck, 'We make it right', 'Tell us within 24 hours if anything was missed and we will return to fix it.'],
]

const QUICK_ANSWERS = [
  ['Do I need to be home?', "No. Many clients provide access and carry on with their day. As long as we can get in, we'll take care of the rest."],
  ['Do I need to provide supplies?', 'No. Our crew brings the supplies and equipment needed for the agreed service. If you have preferred products, let us know.'],
  ['Can I add something to the visit?', 'Yes. You can add services such as inside appliances, windows or cabinets when requesting your estimate.'],
]

const COMMERCIAL_ANSWERS = [
  ['Can the plan fit our business?', 'Yes. We build the checklist around your facility, traffic, operating hours and the areas that matter most to your team.'],
  ['Can you clean after hours?', 'Yes. Evening and weekend visits are available so cleaning can happen with minimal disruption to staff and customers.'],
  ['How is commercial pricing calculated?', 'We provide a custom quote based on square footage, facility type, frequency and scope. Start with a free on-site assessment.'],
]

const SERVICE_FOCUS = {
  standard: {
    kicker: 'When it fits best',
    title: 'A dependable reset for real life.',
    intro: 'Standard cleaning keeps everyday buildup under control without turning the visit into an all-day production.',
    items: [
      [CalendarDays, 'Weekly refresh', 'Keep busy rooms consistently tidy, comfortable and ready for the week.'],
      [PartyPopper, 'Before guests', 'Give kitchens, bathrooms and gathering spaces a polished reset.'],
      [RefreshCw, 'After hosting', 'Bring order back after dinners, celebrations or a full house.'],
      [Plane, 'Vacation homes', 'Refresh the space before arrival or after a longer stretch away.'],
      [Home, 'Busy households', 'Stay ahead of dust, floors and bathrooms when time is already spoken for.'],
      [Sparkles, 'Between deep cleans', 'Maintain the finish after a seasonal or first-time deep cleaning.'],
    ],
  },
  deep: {
    kicker: 'Time for a reset',
    title: 'The moments that call for more.',
    intro: 'A deep clean reaches the buildup, edges and overlooked details that routine upkeep does not.',
    items: [
      [PartyPopper, 'Pre-event prep', 'Set the stage with detailed kitchens, bathrooms and guest-facing rooms.'],
      [RefreshCw, 'Seasonal reset', 'Clear settled dust and stale buildup when the seasons change.'],
      [Wind, 'Allergy relief', 'Reduce dust and allergens around trim, surfaces and hard-to-reach areas.'],
      [Sparkles, 'Post-party recovery', 'Restore the home after a gathering without spending your next day scrubbing.'],
      [Home, 'Home sale prep', 'Present rooms, fixtures and finishes at their cleanest for photos and showings.'],
      [CalendarDays, 'Holiday refresh', 'Get the entire home ready before travel, visitors or celebrations.'],
    ],
  },
  move: {
    kicker: 'A cleaner handoff',
    title: 'Leave well. Arrive fresh.',
    intro: 'An empty property gives us access to the details that matter most during a move, inspection or turnover.',
    items: [
      [BadgeDollarSign, 'Deposit return', 'Address the visible details landlords inspect before closing out a lease.'],
      [KeyRound, 'Move-in ready', 'Start with clean appliances, cabinets, bathrooms and floors before unpacking.'],
      [Home, 'Listing preparation', 'Make a vacant property feel brighter and more appealing to buyers or renters.'],
      [Repeat2, 'Rental turnover', 'Reset the space efficiently between occupants and handover dates.'],
      [ClipboardCheck, 'Inspection prep', 'Work from a clear empty-home checklist with attention to trim and fixtures.'],
      [Sparkles, 'Fresh-start finish', 'Remove lingering dust, grime and odors before the next chapter begins.'],
    ],
  },
  post: {
    kicker: 'After the build',
    title: 'The final phase of the project.',
    intro: 'Construction cleaning turns a finished job site into a space that is safe, polished and ready to use.',
    items: [
      [RefreshCw, 'After renovation', 'Remove the fine dust and residue left after remodeling work wraps.'],
      [Home, 'Pre-move-in', 'Prepare a newly built or renovated space before furniture and occupants arrive.'],
      [KeyRound, 'Final handover', 'Present the completed project cleanly to owners, tenants or clients.'],
      [Wind, 'Fine-dust control', 'Detail ledges, fixtures, vents and surfaces where construction dust settles.'],
      [Building2, 'Commercial projects', 'Coordinate larger spaces and shared areas around the project schedule.'],
      [ShieldCheck, 'Ready to occupy', 'Finish floors, glass and touchpoints so the space feels complete.'],
    ],
  },
  office: {
    kicker: 'Spaces we serve',
    title: 'Built around your business.',
    intro: 'From a quiet studio to a busy multi-room facility, the plan follows your hours, traffic and priorities.',
    items: [
      [Building2, 'Offices', 'Workstations, reception, meeting rooms and shared spaces.'],
      [Store, 'Retail', 'Customer-facing floors, fitting areas, counters and back rooms.'],
      [Factory, 'Industrial', 'Facilities and operational spaces with a tailored cleaning plan.'],
      [UtensilsCrossed, 'Food service', 'Dining, service and staff areas cleaned around operating hours.'],
      [HeartPulse, 'Clinics', 'High-touch areas and shared spaces treated with extra care.'],
      [GraduationCap, 'Education', 'Classrooms, offices and common areas on a dependable schedule.'],
    ],
  },
  recurring: {
    kicker: 'Choose your rhythm',
    title: 'Consistency without the contract.',
    intro: 'A recurring plan keeps your home at a steady baseline and gets easier as the crew learns your priorities.',
    items: [
      [CalendarDays, 'Weekly', 'Best for busy families, pets and high-traffic homes that need regular attention.'],
      [Repeat2, 'Bi-weekly', 'A popular balance of consistent upkeep, flexibility and value.'],
      [RefreshCw, 'Monthly', 'A scheduled reset that prevents everyday buildup from getting ahead of you.'],
      [Home, 'A familiar crew', 'Consistent professionals learn the flow of your home and preferred priorities.'],
      [WalletCards, 'Better per-visit value', 'More frequent care generally costs less per visit than one-off cleaning.'],
      [CalendarCheck, 'Easy adjustments', 'Reschedule or skip when plans change without managing a long-term contract.'],
    ],
  },
}

function AnimatedWord({ text, className = '' }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? { y: 0 } : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.07 }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function ServiceDetailPage({ id }) {
  const reduce = useReducedMotion()
  const service = findService(id)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-3%', reduce ? '-3%' : '10%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, reduce ? 1.04 : 1.13])
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0])

  if (!service) {
    return (
      <section className="px-6 pb-32 pt-[180px] text-center">
        <h1 className="tx-l">Service not found</h1>
        <a href="/services" className="a-button mt-8">Back to services</a>
      </section>
    )
  }

  const { title, tagline, blurb, price, duration, badge, photo, includes, rooms, idealFor, no } = service
  const isCommercial = id === 'office'
  const answers = isCommercial ? COMMERCIAL_ANSWERS : QUICK_ANSWERS
  const focus = SERVICE_FOCUS[id]
  const others = SERVICES.filter((s) => s.id !== id)
  const nextService = SERVICES[(SERVICES.findIndex((s) => s.id === id) + 1) % SERVICES.length]

  return (
    <div className="sd">
      {/* ============ IMAGE-LED EDITORIAL HERO ============ */}
      <section ref={heroRef} className="sd-hero">
        <div className="sd-hero__shell">
          <motion.div className="sd-hero__content" style={{ opacity: heroFade }}>
            <motion.p
              className="sd-hero__eyebrow"
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              {badge} · Chicagoland
            </motion.p>

            <h1 className="sd-hero__title">
              <AnimatedWord text={title} />
            </h1>

            <motion.p
              className="sd-hero__tagline"
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
            >
              {tagline}
            </motion.p>

            <motion.div
              className="sd-hero__proof"
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.65 }}
            >
              <span>Since 2016</span>
              <span>4.9 ★ on Google</span>
              <span>24-hour promise</span>
            </motion.div>

            <motion.div
              className="sd-hero__actions"
              initial={reduce ? {} : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.82 }}
            >
              <a href="/#estimate" className="a-button">
                {isCommercial ? 'Request an assessment' : 'Get my free estimate'}
              </a>
              <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
            </motion.div>
          </motion.div>

          <motion.figure
            className="sd-hero__figure"
            initial={reduce ? {} : { opacity: 0, x: 46, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
            whileHover={reduce ? {} : { y: -8, rotate: -1 }}
          >
            <div className="sd-hero__frame">
              <motion.img
                src={photo}
                alt={title}
                className="sd-hero__img"
                style={{ y: imgY, scale: imgScale }}
              />
              <div className="sd-hero__veil" />
              <motion.span
                className="sd-hero__figureNo"
                initial={reduce ? {} : { scale: 0.4, rotate: -18 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 190, damping: 14, delay: 0.8 }}
              >
                {no}
              </motion.span>
              <span className="sd-hero__figureBadge">{badge}</span>
            </div>
            <figcaption>Professional {title.toLowerCase()} across Chicagoland</figcaption>
          </motion.figure>
        </div>

      </section>

      {/* ============ OVERVIEW + QUICK FACTS ============ */}
      <section className="sd-overview" data-scroll="">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 lg:grid-cols-[1.35fr_0.65fr]">
          <motion.div
            className="sd-overview__copy"
            initial={reduce ? {} : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="sd-kicker">The service</p>
            <h2 className="sd-h2">Made for the moment.</h2>
            <p className="sd-overview__lead">{blurb}</p>
            <div className="sd-overview__best">
              <span>Best for</span>
              <p>{idealFor}</p>
            </div>
          </motion.div>

          <div className="sd-overview__stats">
            {[
              [price, isCommercial ? 'Tailored to your facility' : 'Clear starting price'],
              [duration, 'Typical visit time'],
              ['24h', 'Re-clean promise'],
            ].map(([big, small], i) => (
              <motion.div
                key={small}
                className="sd-overview__stat"
                initial={reduce ? {} : { opacity: 0, x: 34, rotate: 1.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.55, ease, delay: i * 0.1 }}
                whileHover={reduce ? {} : { x: -7, rotate: -1 }}
              >
                <p>{big}</p>
                <span>{small}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INCLUDED (staggered) ============ */}
      <section className="sd-included" data-scroll="">
        <div className="mx-auto max-w-[1100px] px-6 py-24 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <motion.p
                className="sd-kicker"
                initial={reduce ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                What's included
              </motion.p>
              <motion.h2
                className="sd-h2 text-cream"
                initial={reduce ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.05 }}
              >
                Every clean, done right.
              </motion.h2>
            </div>

            <ul className="sd-checklist">
              {includes.map((item, i) => (
                <motion.li
                  key={item}
                  className="sd-checkItem"
                  initial={reduce ? {} : { opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.55, ease, delay: i * 0.08 }}
                >
                  <span className="sd-checkNo">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sd-checkText">{item}</span>
                  <Check className="sd-checkTick" />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ ROOM-BY-ROOM ============ */}
      <section className="sd-rooms mx-auto max-w-[1100px] px-6 py-24 sm:py-28" data-scroll="">
        <div className="sd-rooms__head">
          <div>
            <motion.p
              className="sd-kicker"
              initial={reduce ? {} : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
            >
              The cleaning map
            </motion.p>
            <motion.h2
              className="sd-h2"
              initial={reduce ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
            >
              Room by room.
            </motion.h2>
          </div>
          <motion.p
            className="sd-rooms__intro"
            initial={reduce ? {} : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
          >
            A clear checklist means every room gets the attention it needs —
            not a rushed once-over.
          </motion.p>
        </div>
        <div className="sd-roomList">
          {rooms.map(([h, body], i) => (
            <motion.article
              key={h}
              className="sd-room"
              initial={reduce ? {} : { opacity: 0, x: i % 2 ? 26 : -26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease, delay: i * 0.07 }}
            >
              <span className="sd-roomNo">0{i + 1}</span>
              <h3 className="sd-roomTitle">{h}</h3>
              <p className="sd-roomBody">{body}</p>
              <span className="sd-roomArrow" aria-hidden="true">↗</span>
            </motion.article>
          ))}
        </div>
      </section>

      {focus && (
        <section className="sd-focus" data-scroll="">
          <div className="mx-auto max-w-[1100px] px-6 py-24 sm:py-28">
            <div className="sd-focus__head">
              <div>
                <motion.p
                  className="sd-kicker"
                  initial={reduce ? {} : { opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {focus.kicker}
                </motion.p>
                <motion.h2
                  className="sd-h2"
                  initial={reduce ? {} : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease }}
                >
                  {focus.title}
                </motion.h2>
              </div>
              <p>{focus.intro}</p>
            </div>

            <div className="sd-focus__grid">
              {focus.items.map(([Icon, name, copy], i) => (
                <motion.article
                  key={name}
                  className="sd-focus__type"
                  initial={reduce ? {} : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                >
                  <span className="sd-focus__no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sd-focus__icon"><Icon /></span>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                </motion.article>
              ))}
            </div>

            {isCommercial && (
              <motion.div
                className="sd-focus__assessment"
                initial={reduce ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <div>
                  <span>Free on-site assessment</span>
                  <strong>Walk the space with us. Get a plan that fits.</strong>
                </div>
                <a href="/#estimate">Request an assessment <ArrowRight /></a>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ============ WHAT TO EXPECT ============ */}
      <section className="sd-day" data-scroll="">
        <div className="mx-auto max-w-[1100px] px-6 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="sd-kicker text-pink">On cleaning day</p>
              <h2 className="sd-h2 text-cream">Simple from start to finish.</h2>
              <p className="sd-day__intro">
                We keep the visit clear, calm and easy to manage—whether you are
                home, at work or handing over keys.
              </p>
            </div>
            <div className="sd-day__steps">
              {VISIT_STEPS.map(([Icon, title, copy], i) => (
                <motion.article
                  key={title}
                  className="sd-day__step"
                  initial={reduce ? {} : { opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.55, ease, delay: i * 0.08 }}
                >
                  <span className="sd-day__icon"><Icon className="h-5 w-5" /></span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICE + CTA ============ */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24" data-scroll="">
        <motion.div
          className="sd-cta"
          initial={reduce ? {} : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="sd-ctaGlow" aria-hidden="true" />
          <div className="sd-ctaInner">
            <p className="sd-kicker text-pink">{title}</p>
            <p className="sd-ctaPrice">{price}</p>
            <p className="sd-ctaText">
              {isCommercial
                ? 'Start with a free on-site assessment. We will review your facility, priorities and schedule, then prepare a tailored quote.'
                : 'No card needed. Free, no-obligation estimate in about two minutes — with same-week slots across Chicagoland.'}
            </p>
            <div className="sd-ctaBtns">
              <a href="/#estimate" className="a-button">
                {isCommercial ? 'Request an assessment' : 'Get my free estimate'}
              </a>
              <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============ QUICK ANSWERS + HELP ============ */}
      <section className="mx-auto grid max-w-[1100px] gap-14 px-6 pb-24 lg:grid-cols-[1fr_0.9fr] lg:gap-20" data-scroll="">
        <div>
          <p className="sd-kicker">Before you book</p>
          <h2 className="sd-h2">A few quick answers.</h2>
          <div className="sd-answers">
            {answers.map(([question, answer], i) => (
              <motion.details
                key={question}
                className="sd-answer"
                open={i === 0}
                initial={reduce ? {} : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.45, ease, delay: i * 0.06 }}
              >
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
        <aside className="sd-help">
          <PhoneCall className="h-6 w-6" strokeWidth={1.8} />
          <p className="sd-kicker">Need help today?</p>
          <h2>Talk to a real person.</h2>
          <p>Questions about timing, a special request or same-day availability? We are happy to help.</p>
          <a href="tel:+17087378722">Call (708) 737-8722 <ArrowRight className="h-4 w-4" /></a>
        </aside>
      </section>

      {/* ============ EXPLORE OTHER SERVICES ============ */}
      <section className="mx-auto max-w-[1100px] px-6 pb-28" data-scroll="">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="sd-h2">Other services</h2>
          <a href="/services" className="a-link">View all</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {others.map((s, i) => (
            <motion.a
              key={s.id}
              href={`/services/${s.id}`}
              className="sd-other"
              initial={reduce ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
            >
              <img src={s.photo} alt={s.title} className="sd-otherImg" loading="lazy" />
              <span className="sd-otherOverlay" />
              <span className="sd-otherTitle">{s.title}</span>
            </motion.a>
          ))}
        </div>

        <a href={`/services/${nextService.id}`} className="sd-next">
          <span className="sd-next__label">Up next</span>
          <span className="sd-next__title">{nextService.title}</span>
          <ArrowRight className="sd-next__arrow h-6 w-6" />
        </a>
      </section>
    </div>
  )
}
