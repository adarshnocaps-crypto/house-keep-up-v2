import { Title } from '../lib/scrollfx.jsx'
import { servicePhotos } from '../assets/images.js'

/**
 * Dedicated services page (/services). Magazine-style: a photographic hero,
 * quick-jump chips, then large alternating photo/detail rows for each service
 * (with a parallax-tilting image, reveal-in checklist, price and CTA), a
 * numbered process band and a closing CTA. Uses the shared reveal/lift
 * animation classes plus a few services-only motion classes.
 */
const SERVICES = [
  {
    id: 'standard',
    photo: servicePhotos.standard,
    no: '01',
    badge: 'Most popular',
    title: 'Standard Cleaning',
    blurb: 'Weekly or bi-weekly upkeep that keeps your whole home consistently fresh, room by room.',
    price: 'From $120',
    tint: 'text-primary',
    includes: [
      'Kitchens: counters, sinks, stovetop & exteriors',
      'Bathrooms: showers, tubs, toilets & mirrors',
      'Dusting of all reachable surfaces',
      'Vacuum & mop every floor',
      'Empty bins & tidy common areas',
    ],
    idealFor: 'Busy households wanting reliable, recurring upkeep.',
  },
  {
    id: 'deep',
    photo: servicePhotos.deep,
    no: '02',
    badge: 'Best value',
    title: 'Deep Cleaning',
    blurb: 'A top-to-bottom seasonal reset that reaches the spots a standard clean skips.',
    price: 'From $220',
    tint: 'text-primary',
    includes: [
      'Everything in a standard clean, taken further',
      'Baseboards, door frames & light switches',
      'Inside appliances on request (oven, fridge)',
      'Grout, vents, blinds & window sills',
      'Behind and under movable furniture',
    ],
    idealFor: 'First-time cleans, spring resets, or homes overdue for a scrub.',
  },
  {
    id: 'move',
    photo: servicePhotos.move,
    no: '03',
    badge: 'Turnkey',
    title: 'Move-In / Move-Out',
    blurb: 'Empty-home cleans that pass landlord walkthroughs and make new places feel brand new.',
    price: 'From $260',
    tint: 'text-primary',
    includes: [
      'Full interior deep clean, top to bottom',
      'Inside all cabinets, drawers & closets',
      'Inside oven, fridge & dishwasher',
      'Wall spot-cleaning & baseboards',
      'Move-out checklist for deposit returns',
    ],
    idealFor: 'Tenants, landlords and anyone turning over a property.',
  },
  {
    id: 'office',
    photo: servicePhotos.office,
    no: '04',
    badge: 'For business',
    title: 'Commercial & Office',
    blurb: 'After-hours office, lobby and retail cleaning on a schedule that never disrupts your team.',
    price: 'Custom quote',
    tint: 'text-primary',
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
    id: 'post',
    photo: servicePhotos.post,
    no: '05',
    badge: 'Specialty',
    title: 'Post-Construction',
    blurb: 'Fine dust, paint specks and debris gone — renovation spaces made ready to live in.',
    price: 'From $320',
    tint: 'text-primary',
    includes: [
      'Fine construction dust removal',
      'Paint, adhesive & sticker cleanup',
      'Detailed wipe-down of every surface',
      'Windows, tracks & fixtures',
      'Debris haul-away coordination',
    ],
    idealFor: 'Renovations, new builds and remodels.',
  },
]

const PROCESS = [
  ['Tell us the job', 'Pick a service and share the basics — size, extras, timing.'],
  ['Get a flat quote', 'A clear, upfront price with no surprises or hidden fees.'],
  ['We show up & clean', 'The same vetted, background-checked crew, on time.'],
  ['Love it — guaranteed', "Not happy? We come back and make it right within 24 hours."],
]

const PROMISES = [
  ['Vetted crews', 'Every cleaner is background-checked and trained on our checklists.'],
  ['Flat, honest pricing', 'Transparent quotes — you always know what a clean includes.'],
  ['Satisfaction guarantee', "If something's missed, we re-clean it free within 24 hours."],
  ['Eco-friendly options', 'Low-tox, pet- and kid-safe products available on request.'],
]

function jumpTo(id) {
  const el = document.getElementById(`service-${id}`)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 100
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function ServicesPage() {
  return (
    <>
      {/* ---- Photographic hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <img
            src={servicePhotos.hero}
            alt=""
            className="sv-heroImg absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="sv-heroGrad absolute inset-0" />
          <div className="relative mx-auto max-w-[1100px] px-6 pb-20 pt-[150px]">
            <p className="tx-xs mb-6" data-reveal="">
              Our services &middot; Chicagoland
            </p>
            <Title
              as="h1"
              align="start"
              lines={['Every kind of clean,', { text: 'one trusted team' }]}
              className="text-left text-cream"
            />
            <p
              className="mt-8 max-w-2xl text-[16px] leading-relaxed text-cream/95"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              From a weekly tidy to a full post-renovation reset, House Keep Up
              handles it all — flat pricing, vetted crews and a satisfaction
              guarantee on every visit.
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
                <button
                  key={id}
                  type="button"
                  onClick={() => jumpTo(id)}
                  className="sv-chip"
                >
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
                {/* image */}
                <figure className={`sv-figure ${flip ? 'lg:order-2' : ''}`} data-reveal="">
                  <span className="sv-figNo" aria-hidden="true">{no}</span>
                  <img src={photo} alt={title} className="sv-photo" loading="lazy" />
                  <span className="sv-figBadge">{badge}</span>
                </figure>

                {/* copy */}
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

      {/* ---- How it works ---- */}
      <section className="mx-auto max-w-[1100px] px-6 pt-28" data-scroll="">
        <p className="tx-xs mb-8 text-center" data-reveal="">
          How it works
        </p>
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
            <p className="tx-xs mb-5" data-reveal="">
              Why House Keep Up
            </p>
            <Title align="start" lines={['The cleaning', { text: 'you can trust' }]} />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-primary/85" data-reveal="" style={{ '--delay': '0.5s' }}>
              Since 2016 we've cleaned thousands of Chicago homes and offices —
              and every visit comes backed by the same promises.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PROMISES.map(([h, body], i) => (
              <div
                key={h}
                className="a-lift o-scatter__item rounded-[24px] bg-pink p-7 text-cocoa"
                style={{ '--delay': `${i * 0.08}s` }}
              >
                <h3 className="text-[17px] font-semibold text-primary">{h}</h3>
                <p className="mt-2 text-[14px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Closing CTA ---- */}
      <section className="mx-auto max-w-[1100px] px-6 py-28" data-scroll="">
        <div className="flex flex-col items-start rounded-[30px] bg-primary p-10 text-cream sm:p-14">
          <p className="tx-l text-cream">Ready for a spotless space?</p>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-cream/85">
            Get a free, no-obligation estimate in about two minutes — no card
            needed, same-week slots available across Chicagoland.
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
