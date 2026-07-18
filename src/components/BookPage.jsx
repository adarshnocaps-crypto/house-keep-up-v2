import { useEffect } from 'react'
import { Title } from '../lib/scrollfx.jsx'

const BOOKING_SRC = 'https://housekeepupco.bookingkoala.com/booknow?embed=true&offsetTopM=50'
const EMBED_SCRIPT = 'https://housekeepupco.bookingkoala.com/resources/embed.js'

/**
 * Book Now page (/book) — embeds the BookingKoala widget full-width so it
 * renders its own native layout: the booking form on the left and the live
 * Booking Summary + Live Reviews sidebar on the right. embed.js resizes the
 * iframe to fit; injected once on mount.
 */
export default function BookPage() {
  useEffect(() => {
    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return
    const s = document.createElement('script')
    s.src = EMBED_SCRIPT
    s.defer = true
    document.body.appendChild(s)
    return () => s.remove()
  }, [])

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="relative mx-auto max-w-[1100px] px-6 pb-14 pt-[150px] text-center">
            <p className="tx-xs mb-6" data-reveal="">Book online &middot; 2 minutes</p>
            <Title as="h1" lines={['Schedule your', 'cleaning', { text: 'with ease' }]} className="text-cream" />
            <p
              className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-cream/90"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              Don't pay until after your appointment — cancel anytime. Pick your
              service, choose a time and see your live booking summary as you go.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Booking widget (full-width: shows its own summary + reviews sidebar) ---- */}
      <section className="mx-auto max-w-[1240px] px-6 pb-24 pt-14" data-scroll="">
        <div className="o-embed" data-reveal="">
          <iframe
            src={BOOKING_SRC}
            title="Book your cleaning"
            className="o-embed__frame"
            width="100%"
            height="1100"
            scrolling="no"
          />
        </div>
      </section>
    </>
  )
}
