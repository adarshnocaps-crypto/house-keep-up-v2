import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowRight, CalendarCheck, CheckCircle2, Crosshair, MapPin, Search } from 'lucide-react'
import { AREAS } from '../lib/areas.js'
import { navigate } from '../lib/router.jsx'
import chicagoLakefront from '../assets/images/chicago-lakefront-stock.jpg'

const ease = [0.22, 1, 0.36, 1]
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
const locationIcon = (active = false) => L.divIcon({
  className: 'lf-locationPinWrap',
  html: `<span class="lf-locationPin ${active ? 'is-active' : ''}"><i></i></span>`,
  iconSize: [24, 30],
  iconAnchor: [12, 27],
  tooltipAnchor: [0, -22],
})
function AreaMap({ areas, selectedSlug, onSelect }) {
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
      const label = document.createElement('div')
      const title = document.createElement('strong')
      title.textContent = area.title || area.name
      label.append(title, document.createElement('br'), document.createTextNode(area.kind))
      const marker = L.marker(point, { icon: locationIcon(selectedSlug === area.slug) })
        .addTo(layer)
        .bindTooltip(label, { direction: 'top' })
      marker.on('click', () => navigate(`/areas/${area.slug}`))
      markers.set(area.slug, marker)
    })
    if (cityPointsVisible) CHICAGO_NEIGHBORHOODS.forEach(([name, latitude, longitude]) => {
      bounds.push([latitude, longitude])
      L.marker([latitude, longitude], { icon: locationIcon() })
        .addTo(layer)
        .bindTooltip(name, { direction: 'top', className: 'lf-neighborhoodTip' })
    })
    layerRef.current = layer
    markersRef.current = markers
    if (bounds.length > 1) map.fitBounds(bounds, { padding: [42, 42], maxZoom: 10 })
    else if (bounds.length === 1) map.flyTo(bounds[0], 12, { duration: .5 })
  }, [areas, cityPointsVisible, onSelect, selectedSlug])

  useEffect(() => {
    const point = AREA_COORDS[selectedSlug]
    if (!point) return
    markersRef.current.get(selectedSlug)?.openTooltip()
  }, [selectedSlug])

  const locate = () => {
    navigator.geolocation?.getCurrentPosition(({ coords }) => {
      mapRef.current?.flyTo([coords.latitude, coords.longitude], 12, { duration: .7 })
    })
  }

  return <div className="lf-mapShell">
    <div ref={node} className="lf-map" aria-label="Map of House Keep Up service areas" />
    <div className="lf-mapStatus"><i /> Showing all {areas.length + (cityPointsVisible ? CHICAGO_NEIGHBORHOODS.length : 0)} service locations</div>
    <button type="button" className="lf-locate" onClick={locate}><Crosshair /> My location</button>
    <div className="lf-mapLegend"><span><i/>Each pin is a location where House Keep Up is available</span></div>
  </div>
}

export default function LocationsPage() {
  const reduce = useReducedMotion()
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

  return <div className="lf">
    <section className="lf-hero">
      <motion.div className="lf-hero__copy" initial={reduce ? {} : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease }}>
        <span>Proudly serving Chicagoland</span>
        <h1>A trusted clean,<br/><strong>across the city.</strong></h1>
        <p>From Des Plaines to Oak Lawn, our vetted teams serve Chicago and nearby suburbs. Search your neighborhood or ZIP to find coverage close to home.</p>
        <div className="lf-hero__actions"><a href="/book">Book a cleaning <ArrowRight/></a><a href="tel:+17087378722">Call (708) 737-8722</a></div>
      </motion.div>
      <motion.div className="lf-hero__photo" initial={reduce ? {} : { opacity: 0, scale: .94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .85, ease, delay: .18 }}>
        <img src={chicagoLakefront} alt="Chicago skyline beside Lake Michigan" />
        <div><span>Service area</span><strong>Chicago + {SUBURB_COUNT} suburbs</strong></div>
        <p><MapPin/> Chicago born. Chicagoland ready.</p>
      </motion.div>
    </section>

    <main className="lf-main">
      <section className="lf-search" aria-label="Find a service area">
        <label><span>Cleaning needed</span><select value={service} onChange={(event) => setService(event.target.value)}>{SERVICES.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Coverage</span><select value={region} onChange={(event) => setRegion(event.target.value)}><option value="all">All service areas</option><option value="city">Chicago neighborhoods</option><option value="suburbs">Nearby suburbs</option></select></label>
        <label className="lf-search__query"><span>Neighborhood or ZIP</span><div><Search/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Wicker Park" /></div></label>
      </section>

      <div className="lf-resultsHead"><div><span>Currently available</span><h2>{filtered.length} areas ready to book</h2></div><p>{service} · Seven-day availability</p></div>

      <section className="lf-results">
        <div className="lf-areaList">
          <div className="lf-areaList__guide"><strong>All service areas</strong><span>All {filtered.length} shown below</span></div>
          {filtered.length ? filtered.map((area) => <a key={area.slug} href={area.href || `/areas/${area.slug}`} className={`lf-areaCard ${selectedSlug === area.slug ? 'is-active' : ''}`} onMouseEnter={() => setSelectedSlug(area.slug)}>
            <img src={area.img} alt="" />
            <span><small>{area.kind}</small><strong>{area.title || area.name}</strong><p>{area.blurb}</p></span>
            <i><ArrowRight /></i>
          </a>) : <div className="lf-empty"><Search/><strong>No matching service area</strong><p>Try another neighborhood, suburb, or ZIP code.</p></div>}
        </div>
        <AreaMap areas={ALL_SERVICE_AREAS} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
      </section>

      <section className="lf-neighborhoods">
        <div><span>Inside Chicago</span><h2>Across the city,<br/>block by block.</h2><p>We cover homes, apartments and offices across Chicago. Don’t see your neighborhood? Call us—we serve many surrounding blocks too.</p></div>
        <ul>{CHICAGO_NEIGHBORHOODS.map(([name]) => <li key={name}>{name}</li>)}</ul>
      </section>

      <section className="lf-coverage">
        <div><span><CheckCircle2/></span><p><strong>Vetted local teams</strong>Background-checked professionals who know Chicago buildings and access rules.</p></div>
        <div><span><CalendarCheck/></span><p><strong>Seven-day coverage</strong>Morning, afternoon and weekend arrival windows across Chicagoland.</p></div>
        <div><span><MapPin/></span><p><strong>Outside the map?</strong>Send your address and we’ll confirm the nearest available crew.</p></div>
        <a href={`/book?service=${encodeURIComponent(service)}`}>Check my address <ArrowRight/></a>
      </section>
    </main>
  </div>
}
