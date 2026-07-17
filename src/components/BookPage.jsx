import { useEffect } from 'react'
import { Title } from '../lib/scrollfx.jsx'

const BOOKING_SRC = 'https://housekeepupco.bookingkoala.com/booknow?embed=true&offsetTopM=50'
const EMBED_SCRIPT = 'https://housekeepupco.bookingkoala.com/resources/embed.js'

/**
 * Book Now page (/book) — embeds the BookingKoala booking widget. Their
 * embed.js resizes the iframe to fit its content, so it's injected once on
 * mount and cleaned up on unmount.
 */
export default function BookPage() {
  useEffect(() => {
    const existing = document.querySelector(`script[src="${EMBED_SCRIPT}"]`)
    if (existing) return
    const s = document.createElement('script')
    s.src = EMBED_SCRIPT
    s.defer = true
    document.body.appendChild(s)
    return () => {
      s.remove()
    }
  }, [])

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="relative mx-auto max-w-[1100px] px-6 pb-16 pt-[150px] text-center">
            <p className="tx-xs mb-6" data-reveal="">
              Free estimate &middot; Same-week slots
            </p>
            <Title as="h1" lines={['Book your', { text: 'clean in minutes' }]} className="text-cream" />
            <p
              className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-cream/90"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              Pick your service, choose a time and get an instant price — no card
              needed. Prefer to talk? Call us at{' '}
              <a href="tel:+17087378722" className="a-link text-cream">(708) 737-8722</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Booking widget ---- */}
      <section className="mx-auto max-w-[1000px] px-6 pb-24 pt-12" data-scroll="">
        <div className="o-embed" data-reveal="">
          <iframe
            src={BOOKING_SRC}
            title="Book your cleaning"
            className="o-embed__frame"
            width="100%"
            height="1000"
            scrolling="no"
            loading="lazy"
          />
        </div>
      </section>
    </>
  )
}
