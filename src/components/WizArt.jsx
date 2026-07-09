/**
 * Original hand-drawn line-art in the Formly illustration style: single-weight
 * black strokes, rounded caps, loose "sketch" energy, small accent marks.
 * Icon*: small single-weight line icons for the service cards, extras and steps.
 * All inherit `currentColor` so they recolor with their container.
 */

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/* ---------------- Small line icons ---------------- */

/* A tiny reusable "sparkle" mark for the cleaning icons */
function Sparkle({ x, y, r = 1.6, w = 1.5 }) {
  return (
    <path
      d={`M${x} ${y - r}l${r * 0.4} ${r * 0.6} ${r * 0.6} ${r * 0.4}-${r * 0.6} ${r * 0.4}-${r * 0.4} ${r * 0.6}-${r * 0.4}-${r * 0.6}-${r * 0.6}-${r * 0.4} ${r * 0.6}-${r * 0.4}z`}
      strokeWidth={w}
    />
  )
}

export function IconBroom(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        {/* handle */}
        <path d="M19 3L11 11" />
        {/* bristle head */}
        <path d="M11 11l4 4-4.5 5.5a1.4 1.4 0 0 1-1 .5H5l4-6z" />
        {/* bristle lines */}
        <path d="M9 15l-1.6 5M11.4 15.4l-.8 5M13 16l0 4.4" strokeWidth="1.3" />
        <Sparkle x={17.5} y={7} r={1.7} />
      </g>
    </svg>
  )
}
export function IconBubbles(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <circle cx="9.5" cy="14" r="4.5" />
        <circle cx="17" cy="8.5" r="3" />
        <circle cx="16.5" cy="16.5" r="1.7" />
        {/* shine dots inside the two big bubbles */}
        <circle cx="7.8" cy="12" r="0.7" strokeWidth="1.3" />
        <circle cx="15.8" cy="7.3" r="0.5" strokeWidth="1.2" />
      </g>
    </svg>
  )
}
export function IconBox(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <path d="M3 7.5l9-4 9 4v9l-9 4-9-4z" />
        <path d="M3 7.5l9 4 9-4M12 11.5v9" />
        {/* tape strip across the lid */}
        <path d="M7.5 5.5l9 4" strokeWidth="1.3" />
      </g>
    </svg>
  )
}
export function IconHome(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <path d="M3.5 11.5L12 4l8.5 7.5" />
        <path d="M5.5 10.5V20h13v-9.5" />
        {/* door */}
        <path d="M10 20v-5.5h4V20" strokeWidth="1.5" />
        {/* little window */}
        <circle cx="12" cy="9" r="1" strokeWidth="1.4" />
      </g>
    </svg>
  )
}
export function IconBuilding(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <path d="M4 20V6l7-2v16" />
        <path d="M11 20V9l6 2v9" />
        <path d="M3 20h18" />
        {/* windows */}
        <path d="M6.5 8v1M8.5 8v1M6.5 12v1M8.5 12v1M6.5 16v1M8.5 16v1M14 13v1M14 16v1" strokeWidth="1.4" />
      </g>
    </svg>
  )
}
export function IconHammer(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        {/* claw hammer head */}
        <path d="M13 4l6 3-1.6 3-3-1.2-1.8 1.8" />
        {/* handle down to the corner */}
        <path d="M12.6 10.6L5.4 17.8a1.6 1.6 0 0 0 0 2.2 1.6 1.6 0 0 0 2.2 0l7.2-7.2" />
        <Sparkle x={19} y={4.5} r={1.6} />
      </g>
    </svg>
  )
}
export function IconFridge(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M7 10h10M11 6v2M11 13v3" strokeWidth="1.4" />
      </g>
    </svg>
  )
}
export function IconOven(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M4 10h16" />
        <path d="M8 7.5h4" strokeWidth="1.4" />
        <circle cx="16" cy="7.5" r="0.6" />
      </g>
    </svg>
  )
}
export function IconWindow(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <rect x="5" y="4" width="14" height="16" rx="1.5" />
        <path d="M12 4v16M5 12h14" strokeWidth="1.4" />
      </g>
    </svg>
  )
}
export function IconShirt(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <path d="M8 4l4 3 4-3 4 3-3 3v10H7V10L4 7z" />
      </g>
    </svg>
  )
}
export function IconCabinet(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <rect x="5" y="4" width="14" height="16" rx="1.5" />
        <path d="M12 4v16" />
        <path d="M10 11h.01M14 11h.01" strokeWidth="2.4" />
      </g>
    </svg>
  )
}
export function IconSponge(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <rect x="4" y="8" width="16" height="10" rx="4" />
        <path d="M4 12h16" strokeWidth="1.4" />
      </g>
    </svg>
  )
}
export function IconCar(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <path d="M4 14l2-5h12l2 5v4h-2M4 14v4h2M6 18h12" />
        <path d="M5 14h14" strokeWidth="1.4" />
        <circle cx="8" cy="18" r="1.4" />
        <circle cx="16" cy="18" r="1.4" />
      </g>
    </svg>
  )
}
export function IconRuler(p) {
  return (
    <svg viewBox="0 0 24 24" {...p} aria-hidden="true">
      <g {...S}>
        <path d="M4 16L16 4l4 4L8 20z" />
        <path d="M8 8l2 2M11 5l2 2M14 10l2 2" strokeWidth="1.4" />
      </g>
    </svg>
  )
}
