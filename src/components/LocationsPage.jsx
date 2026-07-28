import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowRight, CalendarCheck, CheckCircle2, Crosshair, MapPin, Search } from 'lucide-react'
import { AREAS } from '../lib/areas.js'
import { navigate } from '../lib/router.jsx'
import { Title } from '../lib/scrollfx.jsx'
import chicagoLakefront from '../assets/images/chicago-lakefront-stock.jpg'

const AREA_COORDS = {
  chicago: [41.8819, -87.6278],
  evanston: [42.0451, -87.6877],
  skokie: [42.0324, -87.7416],
  'des-plaines': [42.0334, -87.8834],
  'logan-square': [41.9231, -87.7093],
  'wicker-park': [41.9088, -87.6796],
  'lincoln-park': [41.9214, -87.6513],
  'oak-park': [41.885, -87.7845],
  cicero: [41.8456, -87.7539],
  berwyn: [41.8506, -87.7937],
  'hyde-park': [41.7943, -87.5907],
  'oak-lawn': [41.7199, -87.7479],
  niles: [42.0189, -87.8028],
  'park-ridge': [42.0111, -87.8406],
  'elmwood-park': [41.9215, -87.8131],
  'forest-park': [41.8795, -87.8134],
  'morton-grove': [42.0401, -87.7823],
}
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
// Build searchable cards for Chicago neighborhoods (link to the Chicago area page)
const chicagoArea = AREAS.find((a) => a.slug === 'chicago')
const NEIGHBORHOOD_CARDS = CHICAGO_NEIGHBORHOODS.map(([name]) => ({
  slug: `neighborhood-${name.toLowerCase().replace(/\s+/g, '-')}`,
  name,
  title: name,
  kind: 'Chicago neighborhood',
  img: chicagoArea.img,
  blurb: `We serve ${name} as part of our Chicago coverage. Same vetted teams, same thorough checklist.`,
  href: '/areas/chicago',
  isNeighborhood: true,
}))
const ALL_SEARCHABLE = [...ALL_SERVICE_AREAS, ...NEIGHBORHOOD_CARDS]

const PIN_SVG = '<svg class="lf-pin__mark" viewBox="0 0 24 32" aria-hidden="true">'
  + '<path d="M12 .9C5.9.9 1 5.8 1 11.9c0 7.9 9.4 19 9.8 19.5a1.6 1.6 0 0 0 2.4 0c.4-.5 9.8-11.6 9.8-19.5C23 5.8 18.1.9 12 .9Z"/>'
  + '<circle cx="12" cy="11.9" r="4.1"/></svg>'

/**
 * Teardrop place marker. The name rides on a cream pill underneath that only
 * appears on hover or for the selected area, so the map stays clean. Service
 * areas carry the red pin so our coverage is unmistakable; Chicago
 * neighborhoods get a smaller pin in house green.
 */
const placeIcon = (label, { hood = false, active = false } = {}) => L.divIcon({
  className: 'lf-pinWrap',
  html: `<span class="lf-pin${hood ? ' is-hood' : ''}${active ? ' is-active' : ''}">${PIN_SVG}<b>${label}</b></span>`,
  iconSize: hood ? [17, 23] : [24, 32],
  iconAnchor: hood ? [9, 23] : [12, 32],
  tooltipAnchor: [0, hood ? -25 : -34],
})

function AreaMap({ areas, selectedSlug }) {
  const node = useRef(null)
  const mapRef = useRef(null)
  const layerRef = useRef(null)
  const markersRef = useRef(new Map())
  const cityPointsVisible = areas.some(isChicago)

  useEffect(() => {
    if (!node.current || mapRef.current) return
    const map = L.map(node.current, { zoomControl: false, scrollWheelZoom: false }).setView([41.89, -87.72], 10)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map)
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    mapRef.current = map
    window.setTimeout(() => map.invalidateSize(), 0)
    return () => { map.remove(); mapRef.current = null }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    layerRef.current?.remove()
    const layer = L.layerGroup().addTo(map)
    const markers = new Map()
    const bounds = []
    areas.forEach((area) => {
      const point = AREA_COORDS[area.slug]
      if (!point) return
      bounds.push(point)
      const marker = L.marker(point, { icon: placeIcon(area.name), riseOnHover: true }).addTo(layer)
      marker.on('click', () => navigate(`/areas/${area.slug}`))
      markers.set(area.slug, marker)
    })
    if (cityPointsVisible) CHICAGO_NEIGHBORHOODS.forEach(([name, latitude, longitude]) => {
      bounds.push([latitude, longitude])
      const marker = L.marker([latitude, longitude], { icon: placeIcon(name, { hood: true }), riseOnHover: true }).addTo(layer)
      marker.on('click', () => navigate('/areas/chicago'))
    })
    layerRef.current = layer
    markersRef.current = markers
    if (bounds.length > 1) map.fitBounds(bounds, { padding: [56, 56], maxZoom: 10 })
    else if (bounds.length === 1) map.flyTo(bounds[0], 12, { duration: .5 })
  }, [areas, cityPointsVisible])

  // Highlight only — rebuilding the layer here would refit the map on every
  // card hover.
  useEffect(() => {
    markersRef.current.forEach((marker, slug) => {
      const area = areas.find((item) => item.slug === slug)
      if (area) marker.setIcon(placeIcon(area.name, { active: slug === selectedSlug }))
    })
  }, [areas, selectedSlug])

  const locate = () => {
    navigator.geolocation?.getCurrentPosition(({ coords }) => {
      mapRef.current?.flyTo([coords.latitude, coords.longitude], 12, { duration: .7 })
    })
  }

  return (
    <div className="lf-mapShell">
      <div ref={node} className="lf-map" aria-label="Map of House Keep Up service areas" />
      <div className="lf-mapStatus">
        <i />
        Showing all {areas.length + (cityPointsVisible ? CHICAGO_NEIGHBORHOODS.length : 0)} service locations
      </div>
      <button type="button" className="lf-locate" onClick={locate}>
        <Crosshair /> My location
      </button>
      <div className="lf-mapLegend">
        <span><i className="lf-swatch" /> House Keep Up service area</span>
        <span><i className="lf-swatch -hood" /> Chicago neighborhood we cover</span>
        <em>Hover a pin for its name &middot; click to open the area</em>
      </div>
    </div>
  )
}

export default function LocationsPage() {
  const [service, setService] = useState(SERVICES[0])
  const [region, setRegion] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedSlug, setSelectedSlug] = useState(COVERAGE_AREAS[0].slug)

  // Cards: show 8 major areas by default; when searching, search ALL areas + neighborhoods
  const isSearching = query.trim().length > 0 || region !== 'all'
  const cardSource = isSearching ? ALL_SEARCHABLE : COVERAGE_AREAS
  const filtered = useMemo(() => cardSource.filter((area) => {
    const matchesRegion = region === 'all' || (region === 'city' ? (isChicago(area) || area.isNeighborhood) : !isChicago(area) && !area.isNeighborhood)
    const search = query.trim().toLowerCase()
    const matchesSearch = !search || [area.name, area.title, area.kind, area.blurb, AREA_ZIPS[area.slug] || ''].some((value) => value.toLowerCase().includes(search))
    return matchesRegion && matchesSearch
  }), [query, region, cardSource])

  useEffect(() => {
    if (filtered.length && !filtered.some((area) => area.slug === selectedSlug)) setSelectedSlug(filtered[0].slug)
  }, [filtered, selectedSlug])

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
          <div className="lf-areaList">
            <div className="lf-areaList__guide">
              <strong>All service areas</strong>
              <span>All {filtered.length} shown below</span>
            </div>
            {filtered.length ? filtered.map((area) => (
              <a
                key={area.slug}
                href={area.href || `/areas/${area.slug}`}
                className={`lf-areaCard ${selectedSlug === area.slug ? 'is-active' : ''}`}
                onMouseEnter={() => setSelectedSlug(area.slug)}
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
          <AreaMap areas={ALL_SERVICE_AREAS} selectedSlug={selectedSlug} />
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
    </>
  )
}
