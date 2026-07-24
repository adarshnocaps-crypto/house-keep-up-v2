import { useState } from 'react'
import { Phone } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import BookingMini from './BookingMini.jsx'

const STATS = [
  ['2016', 'Since'],
  ['12k+', 'Homes cleaned'],
  ['4.9★', 'Avg. rating'],
  ['24h', 'Guarantee'],
]

/**
 * Full-viewport hero: cream page with an inset dark-green rounded container.
 * Copy sits on the left (eyebrow, Anton headline with the pink highlighter
 * sweep, blurb, CTA toggle); the compact estimate request sits on the right.
 */
export default function Hero({ ready }) {
  const [active, setActive] = useState(0)

  return (
    <section id="top" className="o-homeHero p-[15px]">
      <div
        className={`o-homeHero__shell relative min-h-[calc(100svh-100px)] overflow-hidden rounded-[30px] bg-primary px-5 pb-[90px] pt-[120px] text-cream sm:px-6 sm:pb-[110px] sm:pt-[150px] ${ready ? 'is-inview' : ''}`}
      >
        <div className="o-homeHero__grid relative z-10 mx-auto grid w-full min-w-0 max-w-[1240px] grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* ---- left: copy ---- */}
          <div className="min-w-0 text-left">
            <p className="tx-xs mb-6" data-reveal="" style={{ '--delay': '0.1s' }}>
              Cleaning you can count on
            </p>

            <Title
              as="h1"
              align="start"
              lines={[
                'A spotless home',
                'and office',
                { text: 'without the hassle' },
              ]}
              className="o-hero__title text-cream"
            />

            <p
              className="mt-7 max-w-md text-[14px] leading-relaxed text-cream/95 sm:mt-8 sm:text-[15px]"
              data-reveal=""
              style={{ '--delay': '0.8s' }}
            >
              House Keep Up does more than clean. Since 2016 we've helped Chicago
              homes and businesses stay fresh with vetted cleaners, transparent
              pricing and a satisfaction guarantee on every visit.
            </p>

            <div className="mt-8 sm:mt-10" data-reveal="" style={{ '--delay': '1s' }}>
              <div className="o-hero__toggle">
                <a
                  href="/book"
                  className={`a-button ${active === 0 ? '-active' : ''}`}
                  onMouseEnter={() => setActive(0)}
                >
                  Book now
                </a>
                <a
                  href="tel:+17087378722"
                  className={`a-button ${active === 1 ? '-active' : ''}`}
                  onMouseEnter={() => setActive(1)}
                >
                  <Phone className="h-4 w-4" />
                  Call us
                </a>
              </div>
            </div>

            {/* credibility stats */}
            <div
              className="o-hero__proofStats mt-9 border-t border-cream/15 pt-7"
              data-reveal=""
              style={{ '--delay': '1.15s' }}
            >
              <dl className="grid grid-cols-2 gap-x-5 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-10">
                {STATS.map(([value, label]) => (
                  <div key={label}>
                    <dt className="font-display text-[30px] leading-none text-cream sm:text-[34px]">
                      {value}
                    </dt>
                    <dd className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-cream/70">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.13em] text-cream/60">
                Licensed, bonded &amp; insured · Background-checked cleaners
              </p>
            </div>
          </div>

          {/* ---- right: compact estimate request ---- */}
          <BookingMini />
        </div>
      </div>
    </section>
  )
}
