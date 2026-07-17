import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarCheck, MapPin, ShieldCheck } from 'lucide-react'
import chicagoLakefront from '../assets/images/chicago-lakefront-stock.jpg'
import { AREAS } from '../lib/areas.js'
import { Title } from '../lib/scrollfx.jsx'

const ease = [0.22, 1, 0.36, 1]

const CITY_AREAS = AREAS.filter((area) => area.kind === 'The city' || area.kind.includes('Chicago'))
const SUBURBS = AREAS.filter((area) => !CITY_AREAS.includes(area))

const PROMISES = [
  [MapPin, 'Local teams', 'Crews already familiar with neighborhood access, parking and building requirements.'],
  [CalendarCheck, 'Seven-day coverage', 'Weekday, evening and weekend windows across the city and surrounding suburbs.'],
  [ShieldCheck, 'One quality standard', 'Every location follows the same checklist and 24-hour re-clean promise.'],
]

function LocationDirectory({ title, kicker, intro, areas, dark = false }) {
  const reduce = useReducedMotion()

  return (
    <section className={dark ? 'lp-directory -dark' : 'lp-directory'} data-scroll="">
      <div className="mx-auto max-w-[1100px] px-6 py-20 sm:py-24">
        <div className="lp-directory__head">
          <div>
            <p className="tx-xs mb-4" data-reveal="">{kicker}</p>
            <h2 className="lp-directory__title">{title}</h2>
          </div>
          <p data-reveal="" style={{ '--delay': '0.12s' }}>{intro}</p>
        </div>

        <div className="lp-directory__list">
          {areas.map((area, i) => (
            <motion.a
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="lp-place"
              initial={reduce ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.55, ease, delay: i * 0.06 }}
            >
              <span className="lp-place__no">{String(i + 1).padStart(2, '0')}</span>
              <span className="lp-place__photo">
                <img src={area.img} alt="" loading="lazy" />
              </span>
              <span className="lp-place__body">
                <span className="lp-place__kind">{area.kind}</span>
                <strong>{area.title || area.name}</strong>
                <span>{area.blurb}</span>
              </span>
              <span className="lp-place__arrow" aria-hidden="true"><ArrowRight /></span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LocationsPage() {
  const reduce = useReducedMotion()

  return (
    <div className="lp">
      <section className="lp-hero">
        <div className="lp-hero__shell is-inview">
          <div className="lp-hero__copy">
            <p className="tx-xs mb-6 text-pink" data-reveal="">Areas we serve · Chicagoland</p>
            <Title
              as="h1"
              align="start"
              lines={['Cleaning teams', { text: 'close to home' }]}
              className="text-left text-cream"
            />
            <p className="lp-hero__intro" data-reveal="" style={{ '--delay': '0.65s' }}>
              From high-rise apartments in the Loop to family homes across the
              North Shore and western suburbs, a vetted local crew is ready when
              you are. Pick your area below to see coverage near you.
            </p>
            <div className="lp-hero__tags" data-reveal="" style={{ '--delay': '0.8s' }}>
              <span>{AREAS.length} service areas</span>
              <span>Seven days a week</span>
              <span>Since 2016</span>
            </div>
            <div className="lp-hero__actions" data-reveal="" style={{ '--delay': '0.95s' }}>
              <a href="/#estimate" className="a-button">Check availability</a>
              <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
            </div>
          </div>

          <motion.figure
            className="lp-hero__map"
            initial={reduce ? {} : { opacity: 0, x: 48, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.28 }}
            whileHover={reduce ? {} : { y: -8, rotate: -1 }}
          >
            <img src={chicagoLakefront} alt="Chicago skyline and Lake Michigan" />
            <figcaption>Serving Chicago and the surrounding suburbs</figcaption>
          </motion.figure>
        </div>
      </section>

      <section className="lp-promises mx-auto max-w-[1100px] px-6 py-20" data-scroll="">
        <div className="lp-promises__intro">
          <p className="tx-xs" data-reveal="">Same care, wherever you live</p>
          <h2>One team standard.<br />Every neighborhood.</h2>
        </div>
        <div className="lp-promises__grid">
          {PROMISES.map(([Icon, title, copy], i) => (
            <article key={title} className="lp-promise o-scatter__item" style={{ '--delay': `${i * 0.1}s` }}>
              <Icon />
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <LocationDirectory
        kicker="Inside the city"
        title="Chicago, block by block."
        intro="High-rises, greystones, lakefront homes and fast-moving rentals—served by teams who know the buildings and the streets."
        areas={CITY_AREAS}
      />

      <LocationDirectory
        kicker="Beyond city limits"
        title="The suburbs, covered."
        intro="The same vetted crews, supplies and satisfaction promise throughout the nearby north, west and southwest suburbs."
        areas={SUBURBS}
        dark
      />

      <section className="mx-auto max-w-[1100px] px-6 py-24" data-scroll="">
        <div className="lp-cta">
          <div>
            <p className="tx-xs mb-4 text-pink" data-reveal="">Do we reach your address?</p>
            <h2 data-reveal="" style={{ '--delay': '0.1s' }}>Probably. Let’s make sure.</h2>
            <p data-reveal="" style={{ '--delay': '0.2s' }}>
              Tell us your ZIP code and the clean you need. We’ll confirm the nearest crew and available times.
            </p>
          </div>
          <div className="lp-cta__actions" data-reveal="" style={{ '--delay': '0.3s' }}>
            <a href="/#estimate" className="a-button">Check my address</a>
            <a href="tel:+17087378722" className="a-link text-cream">Talk to the team</a>
          </div>
        </div>
      </section>
    </div>
  )
}
