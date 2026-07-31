import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Crosshair } from 'lucide-react'
import { CITY_LIMIT, SHAPES, isServed, normalize, shapeFor } from '../../lib/serviceShapes.js'

/**
 * The coverage map: real boundaries over the CARTO basemap, with the area you
 * point at raised off the page.
 *
 * The raised block is drawn by a SEPARATE non-interactive layer rather than by
 * transforming the polygon you are hovering. That matters: a shape that lifts
 * 18px moves out from under the cursor, which fires mouseout, which drops it
 * back under the cursor, which fires mouseover — an oscillation that reads as
 * the block shaking. Keeping hit-testing on a footprint that never moves also
 * means the expensive drop-shadow filter is rasterised once instead of on
 * every frame of the transform.
 */
export default function TileMap({ activeKey, onHover, onSelect }) {
  const node = useRef(null)
  const mapRef = useRef(null)
  const layersRef = useRef(new Map())
  const riseRef = useRef(null)
  const labelRef = useRef(null)
  const clearRef = useRef(null)

  useEffect(() => {
    if (!node.current || mapRef.current) return undefined
    const map = L.map(node.current, { zoomControl: false, scrollWheelZoom: false })
      .setView([41.86, -87.72], 10)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map)
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    mapRef.current = map

    // dashed city limit sits under everything, marking where the slab lifts from
    L.geoJSON(CITY_LIMIT, {
      interactive: false,
      style: { color: '#09543d', weight: 2, dashArray: '7 5', fill: false, opacity: 0.45 },
    }).addTo(map)

    /**
     * Dropping the hover needs a beat of slack. Crossing from one area into the
     * neighbouring one fires mouseout before the next mouseover, so clearing
     * immediately would flicker; the pending clear is cancelled by whichever
     * mouseover lands next. Leaving the map entirely clears at once, because
     * that fires before any mouseenter on the card list and would otherwise
     * race it.
     */
    const raise = (key) => { window.clearTimeout(clearRef.current); onHover?.(key) }
    const dropSoon = () => {
      window.clearTimeout(clearRef.current)
      clearRef.current = window.setTimeout(() => onHover?.(null), 60)
    }
    const dropNow = () => { window.clearTimeout(clearRef.current); onHover?.(null) }

    const layers = new Map()
    SHAPES.forEach((feature) => {
      const { n, s, k } = feature.properties
      const served = isServed(feature)

      // Areas off our routes are drawn so the city still reads as a whole, but
      // they are inert: no hover, no raise, no click. Letting someone click
      // O'Hare through to a service page would promise coverage we do not have.
      if (!served) {
        L.geoJSON(feature, {
          interactive: false,
          style: { className: 'lf-tileShape -off', color: '#09543d', weight: 0.6, opacity: 0.1, fillColor: '#09543d', fillOpacity: 0.02 },
        }).addTo(map)
        return
      }

      // barely-there at rest so the basemap reads as an ordinary street map;
      // the fill still has to be non-zero or the polygon stops taking hovers
      const layer = L.geoJSON(feature, {
        style: { className: `lf-tileShape -${k}`, color: '#09543d', weight: 0.8, opacity: 0.18, fillColor: '#09543d', fillOpacity: 0.06 },
      }).addTo(map)
      layer.on('mouseover', () => raise(s || n))
      layer.on('mouseout', dropSoon)
      layer.on('click', () => onSelect?.(s ? `/areas/${s}` : '/areas/chicago'))
      layers.set(normalize(n), layer)
    })
    // pointer off the map altogether — includes moving onto the card list
    node.current.addEventListener('mouseleave', dropNow)
    layersRef.current = layers

    // The raised block. Empty until something is active; holds exactly one
    // feature at a time, which may be a suburb, a neighbourhood, or the whole
    // city. Non-interactive so it never steals the hover from the base shapes
    // underneath it.
    riseRef.current = L.geoJSON(null, {
      interactive: false,
      style: { className: 'lf-tileRise', color: '#fffdf7', weight: 1.2, fillColor: '#ffa9e9', fillOpacity: 1 },
    }).addTo(map)

    // One shared label rather than a tooltip per polygon — 110 bound tooltips
    // stack on top of each other and linger once several have been opened.
    labelRef.current = L.tooltip({
      className: 'lf-tileTip',
      direction: 'top',
      permanent: true,
      // clears the raised block rather than sitting on top of it
      offset: [0, -26],
    })

    const bounds = L.latLngBounds([])
    layers.forEach((layer) => bounds.extend(layer.getBounds()))
    map.fitBounds(bounds, { padding: [30, 30] })
    const sizing = window.setTimeout(() => map.invalidateSize(), 0)

    const container = node.current
    return () => {
      window.clearTimeout(sizing)
      window.clearTimeout(clearRef.current)
      container?.removeEventListener('mouseleave', dropNow)
      map.remove()
      mapRef.current = null
    }
  }, [onHover, onSelect])

  useEffect(() => {
    const map = mapRef.current
    const rise = riseRef.current
    const label = labelRef.current
    if (!map || !rise || !label) return

    const target = shapeFor(activeKey)
    const key = target ? normalize(target.properties.n) : null

    // dim the footprint the block lifted off, so there is a visible recess
    layersRef.current.forEach((layer, name) => {
      layer.getLayers().forEach((sub) => {
        const el = sub.getElement?.()
        if (el) el.classList.toggle('is-under', name === key)
      })
    })

    // rebuilding the layer recreates the <path>, which restarts the CSS
    // rise animation — that is how switching areas re-animates
    rise.clearLayers()
    if (target) {
      rise.addData(target)
      rise.bringToFront()
      const [lng, lat] = target.properties.c
      label.setContent(target.properties.n).setLatLng([lat, lng])
      if (!map.hasLayer(label)) label.addTo(map)
    } else if (map.hasLayer(label)) {
      label.remove()
    }
  }, [activeKey])

  const locate = () => {
    navigator.geolocation?.getCurrentPosition(({ coords }) => {
      mapRef.current?.flyTo([coords.latitude, coords.longitude], 12, { duration: 0.7 })
    })
  }

  return (
    <>
      <div ref={node} className="lf-map" aria-label="Map of House Keep Up service areas" />
      <button type="button" className="lf-locate" onClick={locate}>
        <Crosshair /> My location
      </button>
    </>
  )
}
