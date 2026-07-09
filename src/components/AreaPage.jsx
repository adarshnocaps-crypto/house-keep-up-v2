import { Title } from '../lib/scrollfx.jsx'
import { AREAS, findArea } from '../lib/areas.js'

const SERVICES = [
  ['Standard Cleaning', 'Weekly / bi-weekly upkeep, room by room.'],
  ['Deep Cleaning', 'A top-to-bottom seasonal reset.'],
  ['Move-In / Move-Out', 'Empty-home cleans that pass inspection.'],
  ['Commercial & Office', 'After-hours workplaces and lobbies.'],
  ['Post-Construction', 'Fine dust and debris, gone.'],
]

/**
 * Dedicated page for one service area. Uses the area's display `title`
 * (e.g. "Downtown / Loop" for Chicago) and its rich content: intro,
 * stats, neighborhoods, area-specific highlights, services, location FAQs
 * and nearby areas. Reached from the map pins via #/areas/<slug>.
 */
export default function AreaPage({ slug }) {
  const area = findArea(slug)

  if (!area) {
    return (
      <section className="px-6 pb-32 pt-[160px] text-center">
        <h1 className="tx-l">Area not found</h1>
        <a href="#/" className="a-button mt-8">
          Back to the map
        </a>
      </section>
    )
  }

  const {
    name, title, kind, img, landmark,
    intro = [], stats = [], neighborhoods = [], highlights = [], faqs = [],
  } = area
  const display = title || name
  const nearby = AREAS.filter((a) => a.slug !== slug).slice(0, 8)

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary px-6 pb-20 pt-[140px] text-cream">
          <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="tx-xs mb-6" data-reveal="">
                Areas we serve &middot; {kind}
              </p>
              <Title
                as="h1"
                align="start"
                lines={['House cleaning', { text: `in ${display}` }]}
                className="text-left text-cream"
              />
              <p
                className="mt-8 max-w-lg text-[15px] leading-relaxed text-cream/95"
                data-reveal=""
                style={{ '--delay': '0.7s' }}
              >
                {area.blurb}
              </p>

              <div
                className="mt-8 flex flex-wrap items-center gap-3"
                data-reveal=""
                style={{ '--delay': '0.85s' }}
              >
                <span className="a-tag bg-cream text-cocoa">Since 2016</span>
                <span className="a-tag bg-cream text-cocoa">4.9 ★ on Google</span>
                <span className="a-tag bg-pink text-cocoa">Same-week slots</span>
              </div>

              <div
                className="mt-10 flex flex-wrap gap-4"
                data-reveal=""
                style={{ '--delay': '1s' }}
              >
                <a href="#/#estimate" className="a-button">
                  Get my free estimate
                </a>
                <a href="tel:+17087378722" className="a-button -cream">
                  Call (708) 737-8722
                </a>
              </div>
            </div>

            <figure className="mx-auto w-full max-w-[380px]" data-reveal="" style={{ '--delay': '0.5s' }}>
              <img
                src={img}
                alt={`${landmark}, ${name}`}
                className="aspect-square w-full rounded-[30px] border-4 border-cream/90 object-cover shadow-[0_30px_80px_rgba(0,0,0,0.3)]"
              />
              <figcaption className="mt-3 text-center text-[13px] font-semibold text-cream/80">
                {landmark}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---- Intro + stats ---- */}
      <section className="mx-auto max-w-[1100px] px-6 pt-20" data-scroll="">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="tx-xs mb-5" data-reveal="">
              Cleaning in {display}
            </p>
            {intro.map((para, i) => (
              <p
                key={i}
                className="mb-5 text-[16px] leading-relaxed text-primary/90"
                data-reveal=""
                style={{ '--delay': `${0.1 + i * 0.1}s` }}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {stats.map(([big, small], i) => (
              <div
                key={small}
                className="o-scatter__item rounded-[24px] bg-pink px-7 py-6 text-cocoa"
                style={{ '--delay': `${i * 0.1}s` }}
              >
                <p className="font-display text-[40px] leading-none text-primary">{big}</p>
                <p className="mt-2 text-[13px] font-semibold uppercase tracking-wide">
                  {small}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Area highlights ---- */}
      <section className="mx-auto max-w-[1100px] px-6 pt-20" data-scroll="">
        <p className="tx-xs mb-8 text-center" data-reveal="">
          Why {display} chooses House Keep Up
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map(([h, body], i) => (
            <div
              key={h}
              className="o-scatter__item rounded-[24px] border-2 border-primary/10 bg-white p-7 shadow-[0_0_50px_rgba(0,0,0,0.05)]"
              style={{ '--delay': `${i * 0.1}s` }}
            >
              <span className="a-tag-round !h-11 !w-11 !text-[15px]">{i + 1}</span>
              <h3 className="mt-5 text-[18px] font-semibold text-primary">{h}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-primary/80">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Services + neighborhoods ---- */}
      <section className="mx-auto max-w-[1100px] px-6 pt-20" data-scroll="">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="tx-xs mb-5" data-reveal="">
              What we clean in {display}
            </p>
            <ul className="flex flex-col gap-3">
              {SERVICES.map(([service, sub], i) => (
                <li key={service} className="o-scatter__item" style={{ '--delay': `${i * 0.07}s` }}>
                  <a
                    href="#/#services"
                    className="flex items-center justify-between gap-4 rounded-[20px] bg-white px-6 py-4 shadow-[0_0_50px_rgba(0,0,0,0.07)] transition-colors duration-300 hover:bg-pink"
                  >
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold text-primary">{service}</span>
                      <span className="mt-0.5 block text-[13px] text-primary/70">{sub}</span>
                    </span>
                    <span className="a-tag-round !h-10 !w-10 flex-none">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                        <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-[30px] bg-primary p-10 text-cream">
            <p className="tx-xs mb-2 text-cream/80">Neighborhoods covered</p>
            <p className="tx-l">Around {display}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {neighborhoods.map((n) => (
                <li key={n} className="a-tag bg-cream/12 text-cream">
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] leading-relaxed text-cream/80">
              Not sure if we reach your block? We almost certainly do — just ask
              when you book.
            </p>
            <a href="tel:+17087378722" className="a-button mt-8 self-start">
              Check my address
            </a>
          </div>
        </div>
      </section>

      {/* ---- Location FAQ ---- */}
      {faqs.length > 0 && (
        <section className="mx-auto max-w-[860px] px-6 pt-20" data-scroll="">
          <p className="tx-xs mb-8 text-center" data-reveal="">
            {display} questions
          </p>
          <div className="flex flex-col gap-4">
            {faqs.map(([q, a], i) => (
              <div
                key={q}
                className="o-scatter__item rounded-[24px] bg-white p-7 shadow-[0_0_50px_rgba(0,0,0,0.05)]"
                style={{ '--delay': `${i * 0.08}s` }}
              >
                <h3 className="text-[17px] font-semibold text-primary">{q}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-primary/80">{a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---- Nearby + closing ---- */}
      <section className="mx-auto max-w-[1100px] px-6 py-24" data-scroll="">
        <div className="flex flex-col items-start rounded-[30px] bg-pink p-10 text-cocoa sm:p-14">
          <p className="tx-l text-primary">Also nearby</p>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed">
            Same teams, same 24-hour guarantee, all around {display}:
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {nearby.map((n) => (
              <li key={n.slug}>
                <a
                  href={`#/areas/${n.slug}`}
                  className="a-tag bg-white text-primary transition-colors duration-300 hover:bg-cocoa hover:text-pink"
                >
                  {n.title || n.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#/#estimate" className="a-button -cream">
              Get my free estimate
            </a>
            <a href="#/#family" className="a-link text-cocoa">
              Back to the map
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
