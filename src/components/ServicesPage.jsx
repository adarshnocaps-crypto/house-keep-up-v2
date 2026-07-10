import { useState } from 'react'
import {
  BedDouble, PawPrint, Ruler, Columns3, PanelsTopLeft, Blinds,
  Refrigerator, CookingPot, Utensils,
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
        <div className="sv-faqInner">
          <p className="px-6 pb-5 pt-1 text-[14px] leading-relaxed text-primary/80">{a}</p>
        </div>
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
      <section className="mx-auto max-w-[1100px] px-6 pt-24" data-scroll="">
        <div className="mb-12 text-center">
          <p className="tx-xs mb-4" data-reveal="">Make it yours</p>
          <Title lines={['Add-on', { text: 'services' }]} />
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-primary/75" data-reveal="" style={{ '--delay': '0.4s' }}>
            Tailor any visit — pick these when you book and they're added to your quote.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ADDONS.map(({ label, Icon, price }, i) => (
            <div
              key={label}
              className="sv-addon o-scatter__item"
              style={{ '--delay': `${(i % 3) * 0.08}s` }}
            >
              <span className="sv-addonIcon">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="sv-addonBody">
                <span className="sv-addonLabel">{label}</span>
                <span className="sv-addonPrice">+${price}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---- How it works (dark green band) ---- */}
      <section className="px-[15px] pt-24" data-scroll="">
        <div className="sv-process">
          <div className="mx-auto max-w-[1100px] px-6 py-16 sm:py-20">
            <div className="mb-12 text-center">
              <p className="tx-xs mb-4 text-pink" data-reveal="">How does it work?</p>
              <Title lines={['Booked in', { text: 'four easy steps' }]} className="text-cream" />
            </div>
            <div className="sv-processGrid">
              {PROCESS.map(([h, body], i) => (
                <div
                  key={h}
                  className="sv-processStep o-scatter__item"
                  style={{ '--delay': `${i * 0.1}s` }}
                >
                  <span className="sv-processNo">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="sv-processTitle">{h}</h3>
                  <p className="sv-processBody">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="mx-auto max-w-[820px] px-6 pt-24" data-scroll="">
        <div className="mb-10 text-center">
          <p className="tx-xs mb-4" data-reveal="">Good to know</p>
          <Title lines={['Common', { text: 'questions' }]} />
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map(([q, a], i) => (
            <Faq key={q} q={q} a={a} i={i} />
          ))}
        </div>
      </section>

      {/* ---- Closing CTA ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24 pt-24" data-scroll="">
        <div className="sv-cta">
          <span className="sv-ctaBurst" aria-hidden="true" />
          <div className="sv-ctaInner">
            <p className="tx-xs mb-4 text-pink" data-reveal="">Ready when you are</p>
            <h2 className="tx-l font-display text-cream" data-reveal="" style={{ '--delay': '0.1s' }}>
              Let the cleaning experts take over
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-cream/85" data-reveal="" style={{ '--delay': '0.2s' }}>
              Your time is worth more than a mop. Get a free, no-obligation estimate
              in about two minutes — no card needed, same-week slots across Chicagoland.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4" data-reveal="" style={{ '--delay': '0.3s' }}>
              <a href="/#estimate" className="a-button">
                Get my free estimate
              </a>
              <a href="tel:+17087378722" className="a-button -cream">
                Call (708) 737-8722
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
