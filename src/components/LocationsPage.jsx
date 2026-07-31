import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowRight, CalendarCheck, CheckCircle2, MapPin, Search } from 'lucide-react'
import { AREAS } from '../lib/areas.js'
import { navigate } from '../lib/router.jsx'
import { Title } from '../lib/scrollfx.jsx'
import { shapeFor, shapeKeyForCard } from '../lib/serviceShapes.js'
import { HOOD_CREDITS, HOOD_IMAGES } from '../lib/hoodImages.js'
import TileMap from './maps/TileMap.jsx'
import chicagoLakefront from '../assets/images/chicago-lakefront-stock.jpg'

const AREA_ZIPS = {
  chicago: '60601 60602 60603 60604 60605 60606 60607 60611 60654',
  evanston: '60201 60202 60208', skokie: '60076 60077', 'des-plaines': '60016 60018',
  'logan-square': '60647', 'wicker-park': '60622', 'lincoln-park': '60614',
  'oak-park': '60301 60302 60304', cicero: '60804', berwyn: '60402',
  'hyde-park': '60615 60637', 'oak-lawn': '60453',
  niles: '60714', 'park-ridge': '60068',
  'elmwood-park': '60707', 'forest-park': '60130', 'morton-grove': '60053',
}

const SERVICES = ['Standard cleaning', 'Deep cleaning', 'Recurring cleaning', 'Move-in / move-out', 'Commercial cleaning']
const isChicago = (area) => area.kind === 'The city' || area.kind.includes('Chicago')
const MAJOR_SLUGS = ['chicago', 'evanston', 'skokie', 'des-plaines', 'wicker-park', 'lincoln-park', 'oak-park', 'oak-lawn']
const ALL_SERVICE_AREAS = AREAS
const SUBURB_COUNT = ALL_SERVICE_AREAS.filter((area) => !isChicago(area)).length
const COVERAGE_AREAS = AREAS.filter((area) => MAJOR_SLUGS.includes(area.slug))
const CHICAGO_NEIGHBORHOODS = [
  ['Albany Park', 41.9683, -87.728], ['Andersonville', 41.9796, -87.668], ['Avondale', 41.939, -87.711],
  ['Beverly', 41.717, -87.676], ['Bronzeville', 41.831, -87.617], ['Bucktown', 41.9227, -87.68],
  ['Chinatown', 41.852, -87.632], ['Edgewater', 41.987, -87.661], ['Gold Coast', 41.9058, -87.627],
  ['Hyde Park', 41.7943, -87.5907], ['Irving Park', 41.9534, -87.736], ['Lake View', 41.9435, -87.654],
  ['Lincoln Park', 41.9214, -87.6513], ['Lincoln Square', 41.9687, -87.688], ['Logan Square', 41.923, -87.709],
  ['Pilsen', 41.856, -87.656], ['River North', 41.892, -87.634], ['Rogers Park', 42.01, -87.67],
  ['South Loop', 41.8565, -87.624], ['Streeterville', 41.892, -87.62], ['Uptown', 41.966, -87.653],
  ['West Loop', 41.883, -87.647], ['Wicker Park', 41.909, -87.677], ['Wrigleyville', 41.948, -87.656],
]
// Build searchable cards for Chicago neighborhoods (link to the Chicago area
// page). Four of them — Hyde Park, Lincoln Park, Logan Square, Wicker Park —
// are full service areas in their own right, with their own photo and page, so
// they are skipped here rather than listed twice.
const chicagoArea = AREAS.find((a) => a.slug === 'chicago')
const AREA_NAMES = new Set(ALL_SERVICE_AREAS.map((area) => area.name.toLowerCase()))
const NEIGHBORHOOD_CARDS = CHICAGO_NEIGHBORHOODS
  .filter(([name]) => !AREA_NAMES.has(name.toLowerCase()))
  .map(([name]) => ({
    slug: `neighborhood-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name,
    title: name,
    kind: 'Chicago neighborhood',
    img: HOOD_IMAGES[name] ?? chicagoArea.img,
    blurb: `We serve ${name} as part of our Chicago coverage. Same vetted teams, same thorough checklist.`,
    href: '/areas/chicago',
    isNeighborhood: true,
  }))
const ALL_SEARCHABLE = [...ALL_SERVICE_AREAS, ...NEIGHBORHOOD_CARDS]

/**
 * The coverage map: real boundaries over the CARTO basemap, with the active
 * area raised off the page. `activeKey` is whatever the page is pointing at —
 * a card being hovered, or the top search result — so hovering a card and
 * typing a ZIP drive the map through the same path.
 *
 * Nothing is raised until the visitor actually points at something; the map is
 * meant to read as an ordinary street map at rest.
 */
function AreaMap({ activeKey, onHover }) {
  const onSelect = useCallback((href) => navigate(href), [])

  return (
    <div className="lf-mapShell">
      <TileMap activeKey={activeKey} onHover={onHover} onSelect={onSelect} />

      <div className="lf-mapLegend">
        <span><i className="lf-swatch" /> House Keep Up coverage</span>
        <span><i className="lf-swatch -hood" /> Raised = your match</span>
        <em>Hover an area to raise it &middot; click to open its page</em>
      </div>
    </div>
  )
}

export default function LocationsPage() {
  const [service, setService] = useState(SERVICES[0])
  const [region, setRegion] = useState('all')
  const [query, setQuery] = useState('')
  // both start empty: at rest the list has no highlighted card and the map is
  // a plain street map
  const [selectedSlug, setSelectedSlug] = useState(null)
  // what the map should raise: a card slug, or a shape name when the hover
  // started on the map itself (most Chicago neighbourhoods have no card)
  const [activeKey, setActiveKey] = useState(null)

  // Cards: show 8 major areas by default; when searching, search ALL areas + neighborhoods
  const isSearching = query.trim().length > 0 || region !== 'all'
  const cardSource = isSearching ? ALL_SEARCHABLE : COVERAGE_AREAS
  const filtered = useMemo(() => cardSource.filter((area) => {
    const matchesRegion = region === 'all' || (region === 'city' ? (isChicago(area) || area.isNeighborhood) : !isChicago(area) && !area.isNeighborhood)
    const search = query.trim().toLowerCase()
    const matchesSearch = !search || [area.name, area.title, area.kind, area.blurb, AREA_ZIPS[area.slug] || ''].some((value) => value.toLowerCase().includes(search))
    return matchesRegion && matchesSearch
  }), [query, region, cardSource])

  // drop a selection that the current filter no longer contains, rather than
  // moving it onto whatever happens to be first
  useEffect(() => {
    if (selectedSlug && !filtered.some((area) => area.slug === selectedSlug)) setSelectedSlug(null)
  }, [filtered, selectedSlug])

  // Searching is the one case where the map raises something on its own.
  // What was typed wins when it names a place outright — "chicago" means the
  // whole city, even though the card it matches is "Downtown / Loop".
  // Otherwise the top result is raised, so "60201" lifts Evanston. Clearing
  // the search puts the map back to its plain state.
  useEffect(() => {
    if (!isSearching) {
      setActiveKey(null)
      return
    }
    const typed = query.trim()
    if (typed && shapeFor(typed)) {
      setActiveKey(typed)
      return
    }
    const top = filtered[0]
    setActiveKey(top ? shapeKeyForCard(top) : null)
  }, [filtered, isSearching, query])

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="mx-auto grid max-w-[1100px] items-center gap-12 px-6 pb-20 pt-[150px] lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="tx-xs mb-6" data-reveal="">
                Areas we serve &middot; Chicagoland
              </p>
              <Title
                as="h1"
                align="start"
                lines={['A trusted clean,', { text: 'across the city.' }]}
                className="text-left text-cream"
              />
              <p
                className="mt-8 max-w-xl text-[16px] leading-relaxed text-cream/95"
                data-reveal=""
                style={{ '--delay': '0.6s' }}
              >
                From Des Plaines to Oak Lawn, our vetted teams serve Chicago and the
                nearby suburbs. Search your neighborhood or ZIP to find coverage
                close to home.
              </p>
              <div className="mt-9 flex flex-wrap gap-4" data-reveal="" style={{ '--delay': '0.8s' }}>
                <a href="/book" className="a-button">Book a cleaning</a>
                <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
              </div>
            </div>

            <figure className="lf-heroPhoto" data-reveal="" style={{ '--delay': '0.5s' }}>
              <img src={chicagoLakefront} alt="Chicago skyline beside Lake Michigan" />
              <figcaption>
                <MapPin /> Chicago + {SUBURB_COUNT} suburbs, seven days a week
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---- Finder ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pt-20" data-scroll="">
        <div className="lf-search" data-reveal="">
          <label>
            <span>Cleaning needed</span>
            <select value={service} onChange={(event) => setService(event.target.value)}>
              {SERVICES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Coverage</span>
            <select value={region} onChange={(event) => setRegion(event.target.value)}>
              <option value="all">All service areas</option>
              <option value="city">Chicago neighborhoods</option>
              <option value="suburbs">Nearby suburbs</option>
            </select>
          </label>
          <label className="lf-search__query">
            <span>Neighborhood or ZIP</span>
            <div>
              <Search />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Wicker Park" />
            </div>
          </label>
        </div>

        <div className="lf-resultsHead" data-reveal="" style={{ '--delay': '0.15s' }}>
          <div>
            <p className="tx-xs text-magenta">Currently available</p>
            <h2>{filtered.length} areas ready to book</h2>
          </div>
          <p>{service} &middot; Seven-day availability</p>
        </div>

        <div className="lf-results">
          <div
            className="lf-areaList"
            onMouseLeave={() => { if (!isSearching) { setSelectedSlug(null); setActiveKey(null) } }}
          >
            <div className="lf-areaList__guide">
              <strong>All service areas</strong>
              <span>All {filtered.length} shown below</span>
            </div>
            {filtered.length ? filtered.map((area) => (
              <a
                key={area.slug}
                href={area.href || `/areas/${area.slug}`}
                className={`lf-areaCard ${selectedSlug === area.slug ? 'is-active' : ''}`}
                onMouseEnter={() => { setSelectedSlug(area.slug); setActiveKey(shapeKeyForCard(area)) }}
              >
                <img src={area.img} alt="" />
                <span>
                  <small>{area.kind}</small>
                  <strong>{area.title || area.name}</strong>
                  <p>{area.blurb}</p>
                </span>
                <i><ArrowRight /></i>
              </a>
            )) : (
              <div className="lf-empty">
                <Search />
                <strong>No matching service area</strong>
                <p>Try another neighborhood, suburb, or ZIP code.</p>
              </div>
            )}
          </div>
          <AreaMap activeKey={activeKey} onHover={setActiveKey} />
        </div>
      </section>

      {/* ---- Chicago neighborhoods ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pt-20" data-scroll="">
        <div className="lf-hoods">
          <div>
            <p className="tx-xs mb-4 text-cocoa/70" data-reveal="">Inside Chicago</p>
            <h2 className="tx-l font-display text-cocoa" data-reveal="" style={{ '--delay': '0.1s' }}>
              Across the city,<br />block by block.
            </h2>
            <p
              className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-cocoa/75"
              data-reveal=""
              style={{ '--delay': '0.2s' }}
            >
              We cover homes, apartments and offices across Chicago. Don&rsquo;t see
              your neighborhood? Call us — we serve many surrounding blocks too.
            </p>
          </div>
          <ul>
            {CHICAGO_NEIGHBORHOODS.map(([name], i) => (
              <li key={name} className="o-scatter__item" style={{ '--delay': `${(i % 8) * 0.05}s` }}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Coverage CTA ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24 pt-20" data-scroll="">
        <div className="lf-coverage">
          <div>
            <p className="tx-xs mb-4 text-pink" data-reveal="">Outside the map?</p>
            <h2 className="tx-l font-display text-cream" data-reveal="" style={{ '--delay': '0.1s' }}>
              We probably still reach you
            </h2>
            <p
              className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-cream/80"
              data-reveal=""
              style={{ '--delay': '0.2s' }}
            >
              Send us your address and we&rsquo;ll confirm the nearest available crew —
              usually within the hour.
            </p>
            <div className="mt-8 flex flex-wrap gap-4" data-reveal="" style={{ '--delay': '0.3s' }}>
              <a href={`/book?service=${encodeURIComponent(service)}`} className="a-button">
                Check my address
              </a>
              <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
            </div>
          </div>

          <ul className="lf-coverage__list">
            {[
              [CheckCircle2, 'Vetted local teams', 'Background-checked professionals who know Chicago buildings and access rules.'],
              [CalendarCheck, 'Seven-day coverage', 'Morning, afternoon and weekend arrival windows across Chicagoland.'],
              [ArrowRight, 'Same-week slots', 'Most new bookings are cleaned within five days of the first call.'],
            ].map(([Icon, heading, body], i) => (
              <li key={heading} className="o-scatter__item" style={{ '--delay': `${i * 0.1}s` }}>
                <span><Icon /></span>
                <div>
                  <strong>{heading}</strong>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Image credits ----
          Required by the CC licences on the neighbourhood photographs. Kept
          collapsed so it stays out of the way without hiding the attribution. */}
      <section className="mx-auto max-w-[1180px] px-6 pb-16">
        <details className="lf-credits">
          <summary>Image credits</summary>
          <p>
            Neighbourhood photographs from Wikimedia Commons, reused under their
            respective licences. All other photography is our own.
          </p>
          <ul>
            {HOOD_CREDITS.map((credit) => (
              <li key={credit.hood}>
                <b>{credit.hood}</b>
                <a href={credit.href} target="_blank" rel="noreferrer">{credit.title}</a>
                <span>{credit.author} &middot; {credit.licence}</span>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </>
  )
}
