import shapes from '../assets/service-areas.json'

/**
 * Real boundary geometry for the locations map, shared by all three map
 * renderers (flat SVG, Leaflet tiles, MapLibre 3D).
 *
 * Suburb outlines come from the Census TIGERweb "Incorporated Places" layer;
 * Chicago neighbourhoods from the blackmad/neighborhoods set, which names areas
 * the way the site markets them. Geometry is pre-simplified to ~35m, so the
 * whole file is ~16 KB gzipped — see scripts note in the repo history.
 *
 * Feature properties are terse to keep the payload small:
 *   n  display name          k  'suburb' | 'hood' | 'limit'
 *   s  service-area slug, when the area has its own page (else null)
 *   c  [lng, lat] centroid, used to place labels
 */
export const SHAPES = shapes.features.filter((f) => f.properties.k !== 'limit')

/**
 * Chicago's outer boundary. Doubles as the shape raised for the city itself:
 * lifting one slab covering every neighbourhood reads far better than lifting
 * 98 separate pieces, which would show a wall along every internal border.
 * Drawn above the neighbourhoods but click-through, so hovering a single
 * neighbourhood still picks that neighbourhood.
 */
export const CITY_LIMIT = shapes.features.find((f) => f.properties.k === 'limit')

/** Match keys loosely: "Des Plaines", "des-plaines" and "DES PLAINES" all agree. */
export const normalize = (value) => String(value ?? '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const BY_KEY = new Map()
SHAPES.forEach((feature) => {
  const { n, s } = feature.properties
  BY_KEY.set(normalize(n), feature)
  if (s) BY_KEY.set(normalize(s), feature)
})

// "chicago" means the whole city — the city outline, not a neighbourhood
if (CITY_LIMIT) {
  BY_KEY.set('chicago', CITY_LIMIT)
  BY_KEY.set('the-city', CITY_LIMIT)
  BY_KEY.set('chicagoland', CITY_LIMIT)
}

/**
 * The areas we actually clean.
 *
 * The geometry file carries all 98 Chicago neighbourhoods so the map reads as a
 * whole city rather than a scatter of islands, but most of them are not on our
 * routes — O'Hare, Pullman, Hegewisch and so on. Anything missing from this
 * list is drawn muted and is neither hoverable nor clickable, so a visitor can
 * never click through from a place we do not serve to a page that implies we
 * do. Add a name here the day we start covering it.
 */
const SERVED_NAMES = [
  // suburbs with their own pages
  'Evanston', 'Skokie', 'Des Plaines', 'Oak Park', 'Cicero', 'Berwyn',
  'Oak Lawn', 'Niles', 'Park Ridge', 'Elmwood Park', 'Forest Park',
  'Morton Grove',
  // Chicago neighbourhoods we market
  'Albany Park', 'Andersonville', 'Avondale', 'Beverly', 'Bronzeville',
  'Bucktown', 'Chinatown', 'Edgewater', 'Gold Coast', 'Hyde Park',
  'Irving Park', 'Lake View', 'Lincoln Park', 'Lincoln Square', 'Logan Square',
  'Loop', 'Pilsen', 'River North', 'Rogers Park', 'South Loop', 'Streeterville',
  'Uptown', 'West Loop', 'Wicker Park', 'Wrigleyville',
]
const SERVED = new Set(SERVED_NAMES.map(normalize))

/** Do we clean here? Drives both interactivity and the muted styling. */
export const isServed = (feature) => SERVED.has(normalize(feature?.properties?.n))

/** Only the areas we actually cover — what the map lets you point at. */
export const SERVED_SHAPES = SHAPES.filter(isServed)

/**
 * The shape a service-area card points at, which is not always its name.
 *
 * The `chicago` card is titled "Downtown / Loop", so pointing at it raises the
 * Loop — the financial core — rather than every neighbourhood at once. Only an
 * explicit search for the city raises the whole city.
 */
const CARD_SHAPES = { chicago: 'loop' }
export const shapeKeyForCard = (area) => CARD_SHAPES[area?.slug] ?? (area?.name || area?.slug)

/**
 * Resolve whatever the page is currently pointing at — an area slug, a
 * neighbourhood card slug like `neighborhood-andersonville`, or a plain name —
 * down to a single shape to raise.
 */
export function shapeFor(key) {
  if (!key) return null
  const clean = normalize(key).replace(/^neighborhood-/, '')
  const found = BY_KEY.get(clean) ?? null
  // the city outline is always fair game; a neighbourhood has to be on a route
  if (!found || found === CITY_LIMIT) return found
  return isServed(found) ? found : null
}

/** Stable id per shape; MapLibre feature-state needs a numeric id. */
export const shapeId = (feature) => SHAPES.indexOf(feature)

/** Bounding box of every shape, as [[minLng, minLat], [maxLng, maxLat]]. */
export function shapeBounds(features = SHAPES) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  features.forEach(({ geometry }) => {
    const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
    polygons.forEach((polygon) => polygon.forEach((ring) => ring.forEach(([x, y]) => {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    })))
  })
  return [[minX, minY], [maxX, maxY]]
}
