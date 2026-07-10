import { useEffect, useRef } from 'react'
import { services } from '../assets/images.js'
import { Title } from '../lib/scrollfx.jsx'

/**
 * Service cards: bold solid-color rounded cards, each led by its 3D render,
 * with a thin-outlined "product bar" row (name + price + pill CTA) at the
 * bottom. Draggable snap slider with pink round arrows underneath.
 */
const SERVICES = [
  {
    img: services.standardCleaning,
    badge: 'Most popular',
    title: 'Standard Cleaning',
    blurb: 'Weekly or bi-weekly upkeep: kitchens, baths, floors and dusting on a room-by-room checklist.',
    price: 'From $120',
    card: 'bg-pink text-cocoa',
    bar: 'border-cocoa/30',
    btn: 'a-button -cream',
  },
  {
    img: services.deepCleaning,
    badge: 'Best value',
    title: 'Deep Cleaning',
    blurb: 'A top-to-bottom seasonal reset — baseboards, vents, grout, behind and under everything.',
    price: 'From $220',
    card: 'bg-primary text-cream',
    bar: 'border-cream/40',
    btn: 'a-button',
  },
  {
    img: services.moveInOut,
    badge: 'Turnkey',
    title: 'Move-In / Move-Out',
    blurb: 'Empty-home cleans that pass landlord walkthroughs and make new places feel brand new.',
    price: 'From $260',
    card: 'bg-cream text-primary border-2 border-cocoa/15',
    bar: 'border-primary/30',
    btn: 'a-button',
  },
  {
    img: services.commercial,
    badge: 'B2B',
    title: 'Commercial & Office',
    blurb: 'After-hours office, lobby and retail cleaning on a schedule that never disrupts your team.',
    price: 'Custom quote',
    card: 'bg-violet text-white',
    bar: 'border-white/40',
    btn: 'a-button',
  },
  {
    img: services.postConstruction,
    badge: 'Specialty',
    title: 'Post-Construction',
    blurb: 'Fine dust, paint specks and debris gone — renovation spaces made ready to live in.',
    price: 'From $320',
    card: 'bg-magenta text-white',
    bar: 'border-white/40',
    btn: 'a-button -violet',
  },
]

export default function ServicesSlider() {
  const track = useRef(null)
  const drag = useRef(null)

  const scrollByCards = (dir) => {
    const slider = track.current
    if (!slider) return

    const card = slider.firstElementChild
    const gap = Number.parseFloat(getComputedStyle(slider).columnGap) || 24
    const step = (card?.getBoundingClientRect().width || 400) + gap

    // The second set is a visual clone of the first. Resetting by exactly one
    // set is invisible, which lets the next card continue in the same direction.
    const cycleWidth = step * SERVICES.length
    if (slider.scrollLeft >= cycleWidth - 8) {
      slider.scrollLeft -= cycleWidth
    }

    slider.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      const slider = track.current
      if (!slider || drag.current || document.hidden) return

      const card = slider.firstElementChild
      const gap = Number.parseFloat(getComputedStyle(slider).columnGap) || 24
      const step = (card?.getBoundingClientRect().width || 400) + gap
      const cycleWidth = step * SERVICES.length

      if (slider.scrollLeft >= cycleWidth - 8) {
        slider.scrollLeft -= cycleWidth
      }

      slider.scrollBy({ left: step, behavior: 'smooth' })
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, left: track.current.scrollLeft }
    track.current.classList.add('-dragging')
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
  }
  const endDrag = () => {
    drag.current = null
    track.current?.classList.remove('-dragging')
  }

  return (
    <section id="services" className="overflow-hidden pb-24" data-scroll="">
      <div className="mx-auto max-w-[1320px] px-6 text-center">
        <p className="mb-6" data-reveal="">
          <span className="a-sticker">Services</span>
        </p>
        <Title lines={[{ text: 'Our most-loved' }, 'cleans']} />
      </div>

      <div
        ref={track}
        className="m-slider mt-6 px-[max(24px,calc(50vw-660px))]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {[...SERVICES, ...SERVICES].map(({ img, badge, title, blurb, price, card, bar, btn }, index) => (
          <article
            key={`${title}-${index}`}
            aria-hidden={index >= SERVICES.length ? 'true' : undefined}
            className={`${card} flex w-[400px] max-w-[86vw] select-none flex-col rounded-[30px] p-6 text-center sm:p-8`}
          >
            <span className="a-tag mx-auto bg-white/90 text-cocoa">{badge}</span>

            <img
              src={img}
              alt={title}
              draggable="false"
              className="mx-auto my-5 h-[170px] w-auto object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.18)] sm:my-6 sm:h-[210px]"
            />

            <h3 className="tx-s font-display">{title}</h3>
            <p className="mx-auto mt-3 max-w-[300px] text-[14px] leading-relaxed opacity-90">
              {blurb}
            </p>

            <div
              className={`mt-auto flex items-center justify-between gap-3 rounded-[24px] border ${bar} py-2 pl-4 pr-2 text-left sm:rounded-full sm:pl-5`}
            >
              <span className="text-[12px] font-semibold uppercase tracking-wide sm:text-[13px]">
                {price}
              </span>
              <a
                href="/#estimate"
                tabIndex={index >= SERVICES.length ? -1 : undefined}
                className={`${btn} !px-5 !py-3 sm:!px-6`}
              >
                Book
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 px-6 sm:gap-6" data-reveal="">
        <button
          type="button"
          className="a-button -round"
          aria-label="Previous services"
          onClick={() => scrollByCards(-1)}
        >
          <Arrow className="rotate-180" />
        </button>
        <a href="/#estimate" className="a-button">
          Explore all our services
        </a>
        <button
          type="button"
          className="a-button -round"
          aria-label="Next services"
          onClick={() => scrollByCards(1)}
        >
          <Arrow />
        </button>
      </div>
    </section>
  )
}

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="none" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
