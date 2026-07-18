import { useState } from 'react'
import { Phone } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import BookingMini from './BookingMini.jsx'

/**
 * Full-viewport hero: cream page with an inset dark-green rounded container.
 * Copy sits on the left (eyebrow, Anton headline with the pink highlighter
 * sweep, blurb, CTA toggle); the compact estimate request sits on the right.
 */
export default function Hero({ ready }) {
  const [active, setActive] = useState(0)

  return (
    <section id="top" className="p-[15px]">
      <div
        className={`relative min-h-[calc(100svh-100px)] overflow-hidden rounded-[30px] bg-primary px-5 pb-[90px] pt-[120px] text-cream sm:px-6 sm:pb-[110px] sm:pt-[150px] ${ready ? 'is-inview' : ''}`}
      >
        <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---- left: copy ---- */}
          <div className="text-left">
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
          </div>

          {/* ---- right: compact estimate request ---- */}
          <BookingMini />
        </div>
      </div>
    </section>
  )
}
