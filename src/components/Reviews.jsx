import { useCallback, useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import { GOOGLE_URL, REVIEWS } from '../lib/testimonials.js'

export default function Reviews() {
  const track = useRef(null)
  const drag = useRef(null)
  const swiped = useRef(0)

  const scrollByCards = useCallback((dir) => {
    const slider = track.current
    if (!slider) return

    const maxScroll = slider.scrollWidth - slider.clientWidth
    const nearStart = slider.scrollLeft <= 8
    const nearEnd = slider.scrollLeft >= maxScroll - 8

    if (dir > 0 && nearEnd) {
      slider.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }

    if (dir < 0 && nearStart) {
      slider.scrollTo({ left: maxScroll, behavior: 'smooth' })
      return
    }

    slider.scrollBy({ left: dir * 420, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const autoMove = window.setInterval(() => {
      if (document.hidden || drag.current) return
      scrollByCards(1)
    }, 5000)

    return () => window.clearInterval(autoMove)
  }, [scrollByCards])

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, left: track.current.scrollLeft }
    swiped.current = 0
    track.current.classList.add('-dragging')
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const travelled = e.clientX - drag.current.x
    swiped.current = Math.max(swiped.current, Math.abs(travelled))
    track.current.scrollLeft = drag.current.left - travelled
  }
  const endDrag = () => {
    drag.current = null
    track.current?.classList.remove('-dragging')
  }
  // a swipe across the track shouldn't open the review it happened to end on
  const guardSwipe = (e) => { if (swiped.current > 6) e.preventDefault() }

  return (
    <section id="reviews" className="overflow-hidden pb-24" data-scroll="">
      <div className="mx-auto max-w-[1320px] px-6 text-center">
        <p className="mb-6" data-reveal="">
          <span className="a-sticker">Reviews</span>
        </p>
        <Title lines={['What our customers', { text: 'are saying' }]} />

      </div>

      <div
        ref={track}
        className="m-slider mt-4 px-[max(24px,calc(50vw-660px))]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {REVIEWS.map(({ name, url, text, card, bar, avatar }) => (
          <a
            key={name}
            href={url || GOOGLE_URL}
            target="_blank"
            rel="noreferrer"
            onClick={guardSwipe}
            aria-label={`Read ${name}'s review on Google Maps`}
            className={`${card} m-reviewCard flex w-[360px] max-w-[86vw] select-none flex-col rounded-[30px] p-8 text-center shadow-[0_0_60px_rgba(0,0,0,0.06)]`}
          >
            <Stars className="mx-auto opacity-90" />
            <p className="tx-s mt-6 leading-snug">
              &ldquo;{text}&rdquo;
            </p>

            <div
              className={`mt-auto flex items-center gap-3 rounded-full border ${bar} p-2 pt-2 text-left`}
              style={{ marginTop: 'auto' }}
            >
              <ReviewAvatar name={name} avatar={avatar} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">{name}</span>
                <span className="block text-[11px] opacity-75">Google review</span>
              </span>
              <span className="m-reviewCard__out mr-3 flex-none" aria-hidden="true">
                <ExternalLink className="h-4 w-4" />
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6" data-reveal="">
        <button
          type="button"
          className="a-button -round"
          aria-label="Previous reviews"
          onClick={() => scrollByCards(-1)}
        >
          <Arrow className="rotate-180" />
        </button>
        <a href={GOOGLE_URL} target="_blank" rel="noreferrer" className="a-button">
          Read all reviews on Google
        </a>
        <button
          type="button"
          className="a-button -round"
          aria-label="Next reviews"
          onClick={() => scrollByCards(1)}
        >
          <Arrow />
        </button>
      </div>
    </section>
  )
}

function ReviewAvatar({ name, avatar }) {
  if (!avatar) {
    const initials = name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')

    return (
      <span
        className="grid h-11 w-11 flex-none place-items-center rounded-full border-2 border-white/80 bg-white/90 text-[12px] font-semibold text-primary shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
        aria-hidden="true"
      >
        {initials}
      </span>
    )
  }

  return (
    <img
      src={avatar}
      alt={`${name} profile photo`}
      className="h-11 w-11 flex-none rounded-full border-2 border-white/80 bg-white object-cover shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
      loading="lazy"
    />
  )
}

function Stars({ className = '' }) {
  return (
    <span className={`inline-flex gap-1 ${className}`} aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M10 1.7l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.3l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.7z" />
        </svg>
      ))}
    </span>
  )
}

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="none" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
