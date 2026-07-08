import { useCallback, useEffect, useRef } from 'react'
import { reviewAvatars } from '../assets/images.js'
import { Title } from '../lib/scrollfx.jsx'

/**
 * Google reviews (sourced from the live housekeepup.com review widget),
 * restyled as our colorful quote cards: rotating solid backgrounds, star
 * row, quote, then an outlined bar with the reviewer's initial and name.
 */
const REVIEWS = [
  {
    name: 'Dee Williams',
    text: 'She did an amazing job! My apartment looks spotless. I was so happy to come home to such a clean space. Can’t wait for my next appointment.',
    card: 'bg-pink text-cocoa',
    bar: 'border-cocoa/30',
    avatar: reviewAvatars.deeWilliams,
  },
  {
    name: 'M Petsod',
    text: 'I booked a deep cleaning post construction. Booking was easy. Excellent communication from beginning to end. Excellent job throughout — I will rebook and I am considering a regular service.',
    card: 'bg-primary text-cream',
    bar: 'border-cream/40',
    avatar: reviewAvatars.mPetsod,
  },
  {
    name: 'Mariel Tishma',
    text: 'The ladies did a great job tackling our apartment after a rough patch of not being able to keep up with it. They were fast too! I’m definitely booking again.',
    card: 'bg-white text-primary',
    bar: 'border-primary/30',
    avatar: reviewAvatars.marielTishma,
  },
  {
    name: 'Ryan Villanueva',
    text: 'Very communicative, excellent job cleaning. Will be using House Keep Up for future rental turnover.',
    card: 'bg-magenta text-white',
    bar: 'border-white/40',
    avatar: reviewAvatars.ryanVillanueva,
  },
  {
    name: 'Emilia Cervantes',
    text: 'Sandra has always been a great person providing cleaning services at my home. I highly recommend her services.',
    card: 'bg-cream text-primary border-2 border-cocoa/15',
    bar: 'border-primary/30',
    avatar: reviewAvatars.emiliaCervantes,
  },
  {
    name: 'Neda Svrakic',
    text: 'Had a wonderful experience! Will book again.',
    card: 'bg-violet text-white',
    bar: 'border-white/40',
    avatar: reviewAvatars.nedaSvrakic,
  },
  {
    name: 'María José Martín',
    text: 'Great experience overall — the whole process, since booking to the day of cleaning.',
    card: 'bg-white text-primary',
    bar: 'border-primary/30',
    avatar: reviewAvatars.mariaJoseMartin,
  },
]

export default function Reviews() {
  const track = useRef(null)
  const drag = useRef(null)

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
    <section id="reviews" className="overflow-hidden pb-24" data-scroll="">
      <div className="mx-auto max-w-[1320px] px-6 text-center">
        <p className="mb-6" data-reveal="">
          <span className="a-sticker">Reviews</span>
        </p>
        <Title lines={['What our customers', { text: 'are saying' }]} />

        <div
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-[0_0_60px_rgba(0,0,0,0.08)]"
          data-reveal=""
        >
          <Stars className="text-magenta" />
          <span className="text-[15px] font-semibold">
            4.9 on Google &middot; 250+ reviews
          </span>
        </div>
      </div>

      <div
        ref={track}
        className="m-slider mt-4 px-[max(24px,calc(50vw-660px))]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {REVIEWS.map(({ name, text, card, bar, avatar }) => (
          <article
            key={name}
            className={`${card} flex w-[360px] max-w-[86vw] select-none flex-col rounded-[30px] p-8 text-center shadow-[0_0_60px_rgba(0,0,0,0.06)]`}
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
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold">{name}</span>
                <span className="block text-[11px] opacity-75">Google review</span>
              </span>
            </div>
          </article>
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
        <a
          href="https://www.google.com/maps/search/House+Keep+Up+Chicago"
          target="_blank"
          rel="noreferrer"
          className="a-button"
        >
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
