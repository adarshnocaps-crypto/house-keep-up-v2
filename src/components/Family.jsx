import { Title } from '../lib/scrollfx.jsx'
import { findArea } from '../lib/areas.js'
import chicagoMetroImg from '../assets/images/areas/chicago-metro-map.jpeg'

const ALL_AREAS = [
  'Chicago', 'Oak Lawn', 'Lincoln Park', 'Lakeview', 'West Loop', 'River North',
  'Gold Coast', 'South Loop', 'Logan Square', 'Wicker Park', 'Bucktown',
  'Hyde Park', 'Old Town', 'Streeterville', 'Uptown', 'Rogers Park',
  'Edgewater', 'Oak Park', 'Evanston', 'Cicero', 'Skokie', 'Berwyn',
  'Elmwood Park', 'Forest Park', 'Park Ridge', 'Des Plaines', 'Niles',
  'Morton Grove',
]

const slugFor = (name) =>
  findArea(name.toLowerCase().replace(/\s+/g, '-'))?.slug

/**
 * "Areas we serve" — Chicago metropolitan area map image with area links.
 */
export default function Family() {
  return (
    <section id="family" className="mx-auto max-w-[1320px] px-4 pb-32 sm:px-6" data-scroll="">
      <div className="text-center">
        <p data-reveal="">
          <span className="a-sticker">Areas we serve</span>
        </p>
        <div className="mt-6" data-reveal="">
          <Title lines={['Cleaning across', { text: 'Chicagoland' }]} />
        </div>
        <p
          className="mx-auto mt-5 max-w-[560px] text-[15px] leading-relaxed text-primary/80"
          data-reveal=""
        >
          Serving homes and offices across the entire Chicago metropolitan area.
        </p>
      </div>

      <div className="a-liveMap mt-12" data-reveal="">
        <div className="a-liveMap__wrapper">
          <img
            src={chicagoMetroImg}
            alt="Chicago metropolitan area map showing House Keep Up service coverage"
            className="a-liveMap__image"
            draggable="false"
          />

          {/* Invisible clickable hotspots aligned to the red pins baked into
              the map image (tip positions auto-measured from the source). */}
          {[
            { slug: 'des-plaines', name: 'Des Plaines', x: 18.8, y: 15.1 },
            { slug: 'evanston', name: 'Evanston', x: 51.7, y: 19.0 },
            { slug: 'skokie', name: 'Skokie', x: 44.8, y: 19.5 },
            { slug: 'lincoln-park', name: 'Lincoln Park', x: 57.2, y: 35.2 },
            { slug: 'wicker-park', name: 'Wicker Park', x: 49.4, y: 40.9 },
            { slug: 'oak-park', name: 'Oak Park', x: 24.9, y: 45.6 },
            { slug: 'chicago', name: 'Downtown / Loop', x: 59.0, y: 48.4 },
            { slug: 'oak-lawn', name: 'Oak Lawn', x: 13.1, y: 76.8 },
          ].map((pin) => (
            <a
              key={pin.slug}
              href={`#/areas/${pin.slug}`}
              className="a-liveMap__hotspot"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              aria-label={`View ${pin.name} area page`}
              title={pin.name}
            />
          ))}
        </div>
      </div>

      {/* ---- trust + tag cloud ---- */}
      <div className="mt-20 text-center">
        <Title lines={['Trusted by families', { text: 'since 2016' }]} />

        <ul className="mx-auto mt-10 flex max-w-[820px] flex-wrap justify-center gap-2" data-reveal="">
          {ALL_AREAS.map((area) => {
            const slug = slugFor(area)
            return (
              <li key={area}>
                {slug ? (
                  <a
                    href={`#/areas/${slug}`}
                    className="a-tag bg-pink/60 text-cocoa transition-colors duration-300 hover:bg-cocoa hover:text-pink"
                  >
                    {area}
                  </a>
                ) : (
                  <span className="a-tag bg-pink/60 text-cocoa">{area}</span>
                )}
              </li>
            )
          })}
        </ul>

        <div className="mt-10" data-reveal="">
          <a href="tel:+17087378722" className="a-button">
            Book in your neighborhood
          </a>
        </div>
      </div>
    </section>
  )
}
