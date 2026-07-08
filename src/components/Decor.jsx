/**
 * Decorative scroll-layer pieces: flowing ribbon bands, a hand-drawn
 * swooping arrow, and a scroll-drawn flow line (the path draws itself in
 * as the section scrolls, scrubbed by scrollfx via .js-flowline).
 */

/** Wide organic ribbon band sweeping through a section's background. */
export function Ribbon({ className = '', color = '#ffa9e9', opacity = 0.3, flip = false }) {
  return (
    <svg
      viewBox="0 0 1200 420"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <path
        d="M-60 320 C160 180 320 340 560 240 C800 140 940 260 1260 90"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth="130"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/** Hand-drawn swooping arrow doodle (little curl, then a dive to the tip). */
export function ArrowDoodle({ className = '', color = '#dc3f81' }) {
  return (
    <svg viewBox="0 0 220 190" aria-hidden="true" fill="none" className={`pointer-events-none ${className}`}>
      <path
        d="M28 66 C40 30 92 18 102 44 C108 62 76 72 66 58 C58 44 96 40 130 62 C160 82 180 112 192 148"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M162 132 C172 140 182 146 192 149 C193 136 196 124 202 112"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Meandering line that draws itself in as you scroll (and retracts when
 * scrolling back). Fills its positioned parent; weaves left-right so it
 * can snake between offset cards.
 */
export function FlowLine({ className = '', color = '#ffa9e9', width = 6 }) {
  return (
    <svg
      viewBox="0 0 1000 1400"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <path
        className="js-flowline"
        d="M640 30
           C880 150 760 300 520 320
           C240 344 180 420 250 560
           C320 700 760 620 800 800
           C836 964 420 900 330 1040
           C250 1170 480 1290 640 1360"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
