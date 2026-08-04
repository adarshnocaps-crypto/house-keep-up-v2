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

/* ---------------- Large service-card illustrations ----------------
   Original loose ink drawings inspired by collaborative sketchbook artwork.
   Each scene uses hands + one unmistakable service object, with pink accents
   shared across every card so the set reads as one family. */

const ART = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function ServiceArt({ title, children, ...props }) {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label={title} {...props}>
      <path className="service-lineArt__orbit" d="M22 111c28 32 74 43 120 31 27-7 49-22 68-45" />
      <g {...ART}>{children}</g>
    </svg>
  )
}

export function ArtStandardCleaning(props) {
  return (
    <ServiceArt title="Hand-drawn spray bottle and wiping cloth" {...props}>
      <path className="service-lineArt__accent" d="M76 65h42l7 67H66z" />
      <path d="M81 65V47h31v18M87 47l2-14h18l3 14M94 33v-9h39M127 24l13 7-13 6" />
      <path d="M15 126c15-18 28-30 42-34 8-2 16 2 18 9 2 8-5 14-14 15l-13 2 19 15" />
      <path d="M145 118c16-17 30-25 42-26 12-1 27 8 37 21M162 98l13 7 10-11 13 10-9 12" />
      <path d="M151 41l5 9 10 4-10 5-5 10-5-10-10-5 10-4zM190 52l3 6 7 3-7 3-3 7-3-7-7-3 7-3z" />
      <path d="M35 58c10 1 17 4 23 10M40 47l-8-5M58 43l3-10" />
    </ServiceArt>
  )
}

export function ArtDeepCleaning(props) {
  return (
    <ServiceArt title="Hand-drawn scrub brush, bubbles and gloved hands" {...props}>
      <path className="service-lineArt__accent" d="M82 78c22-12 56-9 77 6l-9 35H77z" />
      <path d="M69 77c17-12 69-14 99 5l-8 37H74zM80 119v12M94 119v15M110 119v13M127 119v15M145 119v12" />
      <path d="M92 75l4-27c2-17 12-25 25-23 12 2 18 13 14 27l-7 24" />
      <path d="M17 118c17-20 32-29 45-26 9 2 14 10 10 17-4 8-17 7-27 7l17 19" />
      <path d="M171 110c13-15 26-21 37-18 8 2 15 10 19 22M185 96l7 14M199 94l4 13" />
      <circle cx="66" cy="52" r="9" /><circle cx="176" cy="53" r="13" /><circle cx="198" cy="34" r="6" />
      <path d="M63 48l3-2M172 47l5-2M195 31l2-1" />
      <path d="M42 50l5 8 9 4-9 4-5 9-4-9-9-4 9-4z" />
    </ServiceArt>
  )
}

export function ArtMoveCleaning(props) {
  return (
    <ServiceArt title="Hand-drawn moving box, house key and helping hands" {...props}>
      <path className="service-lineArt__accent" d="M70 71l52-21 51 22-7 57H75z" />
      <path d="M71 72l51 22 51-22M122 94v42M71 72l51-22 51 22v57l-51 20-51-20z" />
      <path d="M98 61l50 22M15 118c17-18 35-29 49-28 9 1 15 8 12 16-3 7-14 8-25 9l20 19" />
      <path d="M174 111c14-15 29-22 42-16 7 3 12 10 15 19M181 103l8 11M194 98l6 11" />
      <circle cx="49" cy="53" r="13" /><path d="M59 62l22 22M72 75l7-7M78 81l7-7" />
      <path d="M151 36l5 9 10 4-10 5-5 10-5-10-10-5 10-4z" />
      <path d="M101 113h41M108 113v14M135 113v14" />
    </ServiceArt>
  )
}

export function ArtCommercialCleaning(props) {
  return (
    <ServiceArt title="Hand-drawn office monitor being cleaned by two hands" {...props}>
      <path className="service-lineArt__accent" d="M65 43h111v72H65z" />
      <rect x="58" y="36" width="124" height="82" rx="6" />
      <path d="M65 51h110M76 43h.1M84 43h.1M92 43h.1M91 132h58M108 118v14M133 118v14" />
      <path d="M16 125c13-17 29-30 43-32 9-1 17 5 16 13-1 9-13 12-25 12l17 17" />
      <path d="M181 94c15-17 29-23 40-16 7 4 10 12 13 23M189 86l8 12M203 81l5 12" />
      <path d="M83 75l6 10 11 5-11 5-6 11-5-11-11-5 11-5zM148 64l4 7 8 4-8 3-4 8-4-8-8-3 8-4z" />
      <path d="M113 90c10 5 20 5 31 0" />
    </ServiceArt>
  )
}

export function ArtPostConstruction(props) {
  return (
    <ServiceArt title="Hand-drawn dustpan, brush and construction hard hat" {...props}>
      <path className="service-lineArt__accent" d="M71 67c7-29 23-43 49-43s43 14 50 43z" />
      <path d="M64 67h112M76 66c3-25 18-41 44-41s42 16 45 41M104 28v22M136 28v22" />
      <path d="M70 102l67-18 9 38-66 18zM137 84l28-39 12 8-31 69" />
      <path d="M17 123c13-18 29-29 44-29 9 0 16 7 14 15-2 8-14 10-25 10l18 16" />
      <path d="M164 111c14-14 27-19 39-14 9 4 15 12 22 24M178 103l9 13M191 100l7 12" />
      <path d="M49 55l4 7 8 4-8 4-4 8-4-8-8-4 8-4zM199 57l3 6 7 3-7 3-3 7-3-7-7-3 7-3z" />
      <path d="M86 111l41-11M89 120l41-11M92 129l41-11" />
    </ServiceArt>
  )
}

export function ArtRecurringCleaning(props) {
  return (
    <ServiceArt title="Hand-drawn recurring cleaning calendar with circular arrows" {...props}>
      <path className="service-lineArt__accent" d="M75 45h91v80H75z" />
      <rect x="66" y="37" width="108" height="94" rx="7" />
      <path d="M66 61h108M91 29v18M149 29v18" />
      <path d="M91 82h14M116 82h14M141 82h14M91 102h14M116 102h14M141 102h14" />
      <path d="M35 65c-11 11-15 27-11 42 4 14 14 26 28 31M25 65l13-1-1 13" />
      <path d="M202 111c10-12 14-27 10-42-4-15-15-27-29-32M211 111l-13 2 1-13" />
      <path d="M16 128c14-16 28-25 41-24 9 1 15 8 12 15-3 8-14 8-24 9l15 12" />
      <path d="M178 126c13-14 26-20 37-16 7 3 13 9 17 18" />
      <path d="M194 65l4 8 9 4-9 4-4 9-4-9-9-4 9-4z" />
    </ServiceArt>
  )
}
