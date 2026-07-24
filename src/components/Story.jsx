import { Title } from '../lib/scrollfx.jsx'
import { stock } from '../assets/images.js'

const POINTS = [
  ['Bonded & insured', 'Every visit is fully covered, so your home and belongings are protected.'],
  ['Vetted, familiar cleaners', 'Background-checked pros — and the same faces for your recurring cleans.'],
  ['Flat, upfront pricing', 'A clear quote before we start. No hourly surprises, ever.'],
  ['24-hour guarantee', "Not right? Tell us within a day and we're back to re-clean it, free."],
]

/**
 * "Our story / why Chicago trusts us" — a content-rich editorial block: a photo
 * with a floating stat card on the left, brand story paragraphs and a
 * check-list of differentiators on the right.
 */
export default function Story() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 py-24" data-scroll="">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* ---- left: image + floating stat ---- */}
        <div className="relative" data-reveal="">
          <figure className="overflow-hidden rounded-[30px] shadow-[0_30px_80px_rgba(9,84,61,0.15)]">
            <img
              src={stock.kitchenModern}
              alt="A bright, freshly cleaned modern kitchen in a Chicago home"
              loading="lazy"
              decoding="async"
              className="h-[360px] w-full object-cover sm:h-[440px]"
            />
          </figure>
          <div className="absolute -bottom-6 right-4 hidden rounded-[24px] bg-primary px-7 py-5 text-cream shadow-[0_20px_45px_rgba(9,84,61,0.28)] sm:block">
            <p className="font-display text-[42px] leading-none">12k+</p>
            <p className="mt-1 max-w-[12ch] text-[11px] font-semibold uppercase tracking-wide text-cream/80">
              Chicago homes cleaned since 2016
            </p>
          </div>
        </div>

        {/* ---- right: story + differentiators ---- */}
        <div>
          <p data-reveal="">
            <span className="a-sticker">Our story</span>
          </p>
          <div className="mt-6" data-reveal="">
            <Title align="start" lines={['A cleaning team', { text: 'Chicago trusts' }]} className="text-left" />
          </div>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-primary/80" data-reveal="">
            <p>
              House Keep Up started in 2016 with one mop and a simple promise — a
              clean home should feel effortless. Word spread down the block, then
              across the neighborhood, and today our background-checked crews keep
              thousands of homes and offices across Chicagoland fresh every year.
            </p>
            <p>
              We're not a faceless agency. You get the same trusted cleaners, a
              written room-by-room checklist, all the supplies, and a flat price you
              agree to before we lift a finger. If anything isn't right, one call
              within 24 hours brings us back to fix it — free.
            </p>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2" data-reveal="">
            {POINTS.map(([title, body]) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-pink text-cocoa">
                  <Check />
                </span>
                <div>
                  <p className="font-semibold text-primary">{title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-primary/70">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-4" data-reveal="">
            <a href="/book" className="a-button">Get my free estimate</a>
            <a href="/about" className="a-button -cream">Read our story</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M4 12.5l5 5 11-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
