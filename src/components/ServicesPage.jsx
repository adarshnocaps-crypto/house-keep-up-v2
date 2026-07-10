import { useState } from 'react'
import {
  BedDouble, PawPrint, Ruler, Columns3, PanelsTopLeft, Blinds,
  Refrigerator, CookingPot, Utensils, ShieldCheck, CalendarClock, SmilePlus,
} from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import { servicePhotos } from '../assets/images.js'

/**
 * Dedicated services page (/services). Photo/detail rows for each of the six
 * core services, an add-ons grid, a numbered process band, a "why us" strip,
 * a services FAQ and a closing CTA. Content mirrors housekeepup.com/services.
 */
const SERVICES = [
  {
    id: 'standard',
    photo: servicePhotos.standard,
    no: '01',
    badge: 'Most popular',
    title: 'Standard Cleaning',
    blurb: 'Reliable upkeep that keeps a clean, comfortable home fresh from room to room.',
    price: 'From $120',
    includes: [
      'Dusting of all reachable surfaces',
      'Wiping counters, sinks & fixtures',
      'Bathrooms: showers, tubs, toilets & mirrors',
      'Vacuum & mop every floor',
      'Empty bins & tidy common areas',
    ],
    idealFor: 'Busy households wanting consistent upkeep.',
  },
  {
    id: 'deep',
    photo: servicePhotos.deep,
    no: '02',
    badge: 'Best value',
    title: 'Deep Cleaning',
    blurb: 'For homes that need extra attention — the detailed areas a standard clean skips.',
    price: 'From $220',
    includes: [
      'Everything in a standard clean, taken further',
      'Baseboards, door frames & light switches',
      'Inside appliances, tile & grout',
      'High-touch surfaces sanitised',
      'Behind and under movable furniture',
    ],
    idealFor: 'First-time cleans, spring resets or overdue scrubs.',
  },
  {
    id: 'move',
    photo: servicePhotos.move,
    no: '03',
    badge: 'Turnkey',
    title: 'Move-In / Move-Out',
    blurb: 'Take the stress out of relocating with an empty-home clean that passes inspection.',
    price: 'From $260',
    includes: [
      'Full interior deep clean, top to bottom',
      'Kitchens, bathrooms & appliances',
      'Inside cabinets, drawers & closets',
      'Wall spot-cleaning & baseboards',
      'Move-out checklist for deposit returns',
    ],
    idealFor: 'Tenants, landlords and anyone turning over a property.',
  },
  {
    id: 'post',
    photo: servicePhotos.post,
    no: '04',
    badge: 'Specialty',
    title: 'Post-Construction',
    blurb: 'Newly built or renovated spaces made ready to live in — dust, debris and grime gone.',
    price: 'From $320',
    includes: [
      'Fine construction dust removal',
      'Paint, adhesive & sticker cleanup',
      'Detailed wipe-down of every surface',
      'Windows, tracks & fixtures',
      'Debris haul-away coordination',
    ],
    idealFor: 'Renovations, new builds and remodels.',
  },
  {
    id: 'office',
    photo: servicePhotos.office,
    no: '05',
    badge: 'For business',
    title: 'Commercial Cleaning',
    blurb: 'Offices, retail spaces and businesses cleaned on a schedule that never disrupts your team.',
    price: 'Custom quote',
    includes: [
      'Workstations, desks & shared surfaces',
      'Lobbies, kitchens & break rooms',
      'Restrooms sanitised & restocked',
      'Trash & recycling handled',
      'Flexible after-hours scheduling',
    ],
    idealFor: 'Offices, clinics, studios and retail spaces.',
  },
  {
    id: 'recurring',
    photo: servicePhotos.recurring,
    no: '06',
    badge: 'Save more',
    title: 'Recurring Cleaning',
    blurb: 'Keep your home effortlessly fresh on a weekly, bi-weekly or monthly schedule.',
    price: 'From $99',
    includes: [
      'Weekly, bi-weekly or monthly visits',
      'The same trusted crew each time',
      'Lower per-visit rates than one-offs',
      'Easy reschedule, skip or cancel',
      'Priority same-week booking',
    ],
    idealFor: 'Anyone who never wants to think about cleaning again.',
  },
]

const ADDONS = [
  { label: 'Change sheets', Icon: BedDouble, price: 15 },
  { label: 'Pet fee', Icon: PawPrint, price: 20 },
  { label: 'Baseboards by hand', Icon: Ruler, price: 30 },
  { label: 'Inside cabinets', Icon: Columns3, price: 35 },
  { label: 'Interior windows', Icon: PanelsTopLeft, price: 45 },
  { label: 'Wet-wipe blinds', Icon: Blinds, price: 25 },
  { label: 'Inside fridge', Icon: Refrigerator, price: 35 },
  { label: 'Inside oven', Icon: CookingPot, price: 35 },
  { label: 'Dishes', Icon: Utensils, price: 15 },
]

const PROCESS = [
  ['Book or get a quote', 'See real-time availability — book in seconds or grab a free estimate.'],
  ['We confirm your clean', 'A verified professional is scheduled and a fresh home is on the way.'],
  ['Relax while we work', 'The same vetted crew shows up on time and follows our checklist.'],
  ['Easy, secure payment', 'No contracts or hidden fees — pay as you go, hassle-free.'],
]

const PROMISES = [
  ['Verified professionals', 'Every cleaner passes identity checks and an in-person interview.', ShieldCheck],
  ['Cleaning on demand', 'Book, reschedule or cancel what you need, whenever you need it.', CalendarClock],
  ['Happiness guaranteed', "If something's missed, we re-clean it free within 24 hours.", SmilePlus],
]

const FAQS = [
  ['Do I need to be home during cleaning?', "No — you don't have to be home. Many clients provide access and go about their day. We'll lock up when we're done."],
  ['How long does a cleaning take?', 'It depends on the service and home size. A standard clean for an average home usually takes a couple of hours; deep and move-out cleans take longer.'],
  ['How do I get a quote?', 'Use the booking form for an instant estimate, or call us at (708) 737-8722 and we\'ll price it over the phone.'],
  ['Do you offer services outside Chicago?', 'Yes. We cover Des Plaines, Oak Lawn, Oak Park, Evanston, Berwyn and surrounding suburbs across Chicagoland.'],
]

function jumpTo(id) {
  const el = document.getElementById(`service-${id}`)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 100
  window.scrollTo({ top, behavior: 'smooth' })
}

function Faq({ q, a, i }) {
  const [open, setOpen] = useState(i === 0)
  return (
    <div className="a-lift o-scatter__item overflow-hidden rounded-[20px] border-2 border-primary/10 bg-white" style={{ '--delay': `${i * 0.07}s` }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[16px] font-semibold text-primary">{q}</span>
        <span className={`sv-faqMark ${open ? 'is-open' : ''}`} aria-hidden="true">+</span>
      </button>
      <div className={`sv-faqBody ${open ? 'is-open' : ''}`}>
        <p className="px-6 pb-5 text-[14px] leading-relaxed text-primary/80">{a}</p>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="relative mx-auto max-w-[1100px] px-6 pb-20 pt-[150px]">
            <p className="tx-xs mb-6" data-reveal="">
              Our services &middot; Chicagoland
            </p>
            <Title
              as="h1"
              align="start"
              lines={['Let us handle', { text: 'the cleaning' }]}
              className="text-left text-cream"
            />
            <p
              className="mt-8 max-w-2xl text-[16px] leading-relaxed text-cream/95"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              Enjoy a fresh, spotless home in Chicago. We clean houses, apartments
              and businesses across Chicagoland — with same-day availability, flat
              pricing and a satisfaction guarantee on every visit.
            </p>
            <div className="mt-9 flex flex-wrap gap-4" data-reveal="" style={{ '--delay': '0.8s' }}>
              <a href="/#estimate" className="a-button">
                Get my free estimate
              </a>
              <a href="tel:+17087378722" className="a-button -cream">
                Call (708) 737-8722
              </a>
            </div>

            {/* quick-jump chips */}
            <div className="mt-10 flex flex-wrap gap-2.5" data-reveal="" style={{ '--delay': '0.95s' }}>
              {SERVICES.map(({ id, title }) => (
                <button key={id} type="button" onClick={() => jumpTo(id)} className="sv-chip">
                  {title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Alternating photo/detail rows ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pt-20">
        <div className="flex flex-col gap-24 sm:gap-28">
          {SERVICES.map(({ id, photo, no, badge, title, blurb, price, includes, idealFor }, i) => {
            const flip = i % 2 === 1
            return (
              <article
                key={id}
                id={`service-${id}`}
                className="sv-row scroll-mt-24 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                data-scroll=""
              >
                <figure className={`sv-figure ${flip ? 'lg:order-2' : ''}`} data-reveal="">
                  <span className="sv-figNo" aria-hidden="true">{no}</span>
                  <img src={photo} alt={title} className="sv-photo" loading="lazy" />
                  <span className="sv-figBadge">{badge}</span>
                </figure>

                <div className={flip ? 'lg:order-1' : ''}>
                  <h2 className="tx-l font-display text-primary" data-reveal="" style={{ '--delay': '0.1s' }}>
                    {title}
                  </h2>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-primary/80" data-reveal="" style={{ '--delay': '0.18s' }}>
                    {blurb}
                  </p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {includes.map((item, j) => (
                      <li
                        key={item}
                        className="sv-check flex items-start gap-2.5 text-[14px] leading-snug text-primary/85"
                        style={{ '--delay': `${0.24 + j * 0.06}s` }}
                        data-reveal=""
                      >
                        <span className="sv-checkMark" aria-hidden="true">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3" data-reveal="" style={{ '--delay': '0.3s' }}>
                    <span className="font-display text-[30px] leading-none text-primary">{price}</span>
                    <span className="text-[13px] text-primary/60">
                      Ideal for: <span className="text-primary/80">{idealFor}</span>
                    </span>
                  </div>

                  <a href="/#estimate" className="a-button mt-7" data-reveal="" style={{ '--delay': '0.36s' }}>
                    Book this clean
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ---- Add-ons ---- */}
      <section className="mx-auto max-w-[1100px] px-6 pt-28" data-scroll="">
        <div className="mb-10 text-center">
          <p className="tx-xs mb-4" data-reveal="">Make it yours</p>
          <Title lines={['Add-on', { text: 'services' }]} />
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-primary/75" data-reveal="" style={{ '--delay': '0.4s' }}>
            Tack on any of these when you book to tailor the visit to your home.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ADDONS.map(({ label, Icon, price }, i) => (
            <div
              key={label}
              className="a-lift o-scatter__item flex items-center gap-4 rounded-[18px] border-2 border-primary/10 bg-white px-5 py-4 shadow-[0_0_40px_rgba(0,0,0,0.04)]"
              style={{ '--delay': `${(i % 3) * 0.08}s` }}
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-pink text-cocoa">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="flex-1 text-[15px] font-semibold text-primary">{label}</span>
              <span className="font-display text-[18px] text-primary">+${price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section className="mx-auto max-w-[1100px] px-6 pt-28" data-scroll="">
        <p className="tx-xs mb-8 text-center" data-reveal="">How does it work?</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map(([h, body], i) => (
            <div
              key={h}
              className="a-lift o-scatter__item rounded-[24px] border-2 border-primary/10 bg-white p-7 shadow-[0_0_50px_rgba(0,0,0,0.05)]"
              style={{ '--delay': `${i * 0.1}s` }}
            >
              <span className="a-badgeSpin a-tag-round !h-11 !w-11 !text-[15px]">{i + 1}</span>
              <h3 className="mt-5 text-[17px] font-semibold text-primary">{h}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-primary/80">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Why House Keep Up ---- */}
      <section className="mx-auto max-w-[1100px] px-6 pt-28" data-scroll="">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="tx-xs mb-5" data-reveal="">Why choose us</p>
            <Title align="start" lines={['The cleaning', { text: 'you can trust' }]} />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-primary/85" data-reveal="" style={{ '--delay': '0.5s' }}>
              Since 2016 we've cleaned thousands of Chicago homes and offices — and
              every visit comes backed by the same promises.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {PROMISES.map(([h, body, Icon], i) => (
              <div
                key={h}
                className="a-lift o-scatter__item rounded-[24px] bg-pink p-6 text-cocoa"
                style={{ '--delay': `${i * 0.1}s` }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-cream">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold text-primary">{h}</h3>
                <p className="mt-2 text-[13px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="mx-auto max-w-[860px] px-6 pt-28" data-scroll="">
        <p className="tx-xs mb-8 text-center" data-reveal="">Common questions</p>
        <div className="flex flex-col gap-3">
          {FAQS.map(([q, a], i) => (
            <Faq key={q} q={q} a={a} i={i} />
          ))}
        </div>
      </section>

      {/* ---- Closing CTA ---- */}
      <section className="mx-auto max-w-[1100px] px-6 py-28" data-scroll="">
        <div className="flex flex-col items-start rounded-[30px] bg-primary p-10 text-cream sm:p-14">
          <p className="tx-l text-cream">Let the cleaning experts take over</p>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-cream/85">
            Your time is worth more than a mop. Get a free, no-obligation estimate
            in about two minutes — no card needed, same-week slots across Chicagoland.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/#estimate" className="a-button">
              Get my free estimate
            </a>
            <a href="/#locations" className="a-link text-cream">
              See areas we serve
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
