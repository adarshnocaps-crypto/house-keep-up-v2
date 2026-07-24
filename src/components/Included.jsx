const INCLUDED = [
  ['Kitchen', 'Counters, sink, stovetop and appliance exteriors'],
  ['Bathrooms', 'Toilets, tubs, showers, sinks and mirrors'],
  ['Living areas', 'Furniture surfaces dusted and rooms tidied'],
  ['Floors', 'Vacuumed and mopped throughout the home'],
  ['Detail dusting', 'Reachable surfaces, sills and fixtures'],
  ['Trash', 'Bins emptied and re-lined before we leave'],
]

const ADDONS = [
  'Inside the oven',
  'Inside the fridge',
  'Interior windows',
  'Inside cabinets',
  'Baseboards by hand',
  'Laundry & fold',
  'Wet-wipe blinds',
  'Basement cleaning',
]

/**
 * "What's included" — the standard checklist on the left, popular paid add-ons
 * on the right. Mirrors what customers actually get on a visit.
 */
export default function Included() {
  return (
    <div className="mx-auto mt-8 max-w-[1280px] px-6" data-scroll="">
      <div className="grid gap-3 rounded-[34px] bg-primary p-3 shadow-[0_22px_60px_rgba(9,84,61,0.14)] sm:p-5 lg:grid-cols-[1.15fr_0.85fr] lg:p-6">
        {/* included */}
        <div className="rounded-[26px] bg-cream p-7 sm:p-9 lg:p-10" data-reveal="">
          <span className="inline-flex rounded-full bg-primary px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-cream">
            Every home clean
          </span>
          <h3 className="mt-5 font-display text-[clamp(1.7rem,3vw,2.5rem)] uppercase leading-none text-primary">
            What we clean on every visit
          </h3>
          <p className="mt-3 max-w-[620px] text-[13px] leading-relaxed text-primary/70 sm:text-[14px]">
            Our team follows a written, room-by-room checklist so the essentials
            never depend on memory.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {INCLUDED.map(([title, detail]) => (
              <li
                key={title}
                className="flex gap-3 rounded-[18px] border border-primary/10 bg-white p-4 text-primary shadow-[0_8px_24px_rgba(9,84,61,0.04)]"
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-pink text-cocoa">
                  <Check />
                </span>
                <span className="min-w-0">
                  <strong className="block text-[13px] font-semibold sm:text-[14px]">{title}</strong>
                  <span className="mt-1 block text-[11px] leading-relaxed text-primary/65 sm:text-[12px]">
                    {detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[11px] leading-relaxed text-primary/60 sm:text-[12px]">
            Deep, move and specialty cleans add service-specific detail to this
            foundation. Commercial visits use an agreed custom checklist.
          </p>
        </div>

        {/* add-ons */}
        <div
          className="flex flex-col rounded-[26px] bg-pink p-7 text-cocoa sm:p-9 lg:p-10"
          data-reveal=""
          style={{ '--delay': '0.1s' }}
        >
          <span className="inline-flex w-fit rounded-full bg-cocoa px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-pink">
            Optional extras
          </span>
          <h3 className="mt-5 font-display text-[clamp(1.7rem,3vw,2.5rem)] uppercase leading-none">
            Popular add-ons
          </h3>
          <p className="mt-3 text-[13px] leading-relaxed text-cocoa/75 sm:text-[14px]">
            Choose common extras while booking. For blinds, basements or
            something custom, add a note and we’ll confirm the scope and price.
          </p>
          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {ADDONS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-full bg-cream/75 px-4 py-3 text-[12px] font-semibold sm:text-[13px]"
              >
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cocoa text-[15px] leading-none text-pink">
                  +
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a href="/book" className="a-button -cream mt-8 w-full sm:w-fit lg:mt-auto lg:pt-4">
            Build my clean
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <path d="M4 12.5l5 5 11-11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
