import { useState } from 'react'
import { hands } from '../assets/images.js'
import { Title } from '../lib/scrollfx.jsx'

/**
 * Full-viewport hero: cream page with an inset dark-green rounded container,
 * centered Anton headline (last line swept with the pink highlighter),
 * flanking hand illustrations and a cream toggle pill with two CTAs.
 */
export default function Hero({ ready }) {
  const [active, setActive] = useState(0)

  return (
    <section id="top" className="p-[15px]">
      <div
        className={`relative min-h-[calc(100svh-100px)] overflow-hidden rounded-[30px] bg-primary px-5 pb-[120px] pt-[112px] text-center text-cream sm:px-6 sm:pb-[140px] sm:pt-[150px] ${ready ? 'is-inview' : ''}`}
      >
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="tx-xs mb-6" data-reveal="" style={{ '--delay': '0.1s' }}>
            Cleaning you can count on
          </p>

          <Title
            as="h1"
            lines={[
              'A spotless home',
              'and office',
              { text: 'without the hassle' },
            ]}
            className="o-hero__title text-cream"
          />

          <p
            className="mx-auto mt-7 max-w-md text-[14px] leading-relaxed text-cream/95 sm:mt-8 sm:text-[15px]"
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
                href="#estimate"
                className={`a-button ${active === 0 ? '-active' : ''}`}
                onMouseEnter={() => setActive(0)}
              >
                Home cleaning
              </a>
              <a
                href="#estimate"
                className={`a-button ${active === 1 ? '-active' : ''}`}
                onMouseEnter={() => setActive(1)}
              >
                Office cleaning
              </a>
            </div>
          </div>
        </div>

        <img
          src={hands.peace}
          alt=""
          className="a-heroHand pointer-events-none absolute bottom-[10px] left-[3%] hidden w-[230px] lg:block"
          style={{ '--tilt': '-12deg', '--from-x': '-18px', '--from-y': '34px', '--delay': '1.45s' }}
        />
        <img
          src={hands.thumb}
          alt=""
          className="a-heroHand pointer-events-none absolute right-[-30px] top-[34%] hidden w-[240px] lg:block"
          style={{ '--tilt': '10deg', '--from-x': '24px', '--from-y': '18px', '--delay': '1.6s' }}
        />
      </div>
    </section>
  )
}
