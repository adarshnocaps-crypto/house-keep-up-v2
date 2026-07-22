import { useEffect, useState } from 'react'
import { CalendarCheck2, ExternalLink } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import LocalBooking from './LocalBooking.jsx'

const BOOKING_SRC = 'https://housekeepupco.bookingkoala.com/booknow?embed=true&offsetTopM=50'
const EMBED_SCRIPT = 'https://housekeepupco.bookingkoala.com/resources/embed.js'

/**
 * Book Now page (/book) — embeds the BookingKoala widget full-width so it
 * renders its own native layout: the booking form on the left and the live
 * Booking Summary + Live Reviews sidebar on the right. embed.js resizes the
 * iframe to fit; injected once on mount.
 */
export default function BookPage() {
  const [mode, setMode] = useState('local')
  useEffect(() => {
    if (mode !== 'hosted') return undefined
    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return
    const s = document.createElement('script')
    s.src = EMBED_SCRIPT
    s.defer = true
    document.body.appendChild(s)
    return () => s.remove()
  }, [mode])

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="book-hero px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="relative mx-auto max-w-[1100px] px-6 pb-12 pt-[118px] text-center">
            <p className="tx-xs mb-4" data-reveal="">Book online &middot; About 2 minutes</p>
            <Title as="h1" lines={['Book your', { text: 'clean' }]} className="text-cream" />
            <p
              className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-cream/90"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              Don't pay until after your appointment — cancel anytime. Pick your
              service, choose a time and see your live booking summary as you go.
            </p>
          </div>
        </div>
      </section>

      {/* ---- BookingKoala customer flow ---- */}
      <section className="mx-auto max-w-[1240px] px-6 pb-24 pt-9" data-scroll="">
        <div className="bk-switch" data-reveal="">
          <div>
            <p className="bk-switch__label">Choose how you book</p>
            <p className="bk-switch__copy">Use our new local booking experience or the current hosted BookingKoala flow.</p>
          </div>
          <div className="bk-switch__control" role="tablist" aria-label="Booking flow">
            <button type="button" role="tab" aria-selected={mode === 'local'} className={mode === 'local' ? 'is-active' : ''} onClick={() => setMode('local')}><CalendarCheck2 /> Local booking <span>New</span></button>
            <button type="button" role="tab" aria-selected={mode === 'hosted'} className={mode === 'hosted' ? 'is-active' : ''} onClick={() => setMode('hosted')}><ExternalLink /> Hosted booking</button>
          </div>
        </div>
        {mode === 'local' ? <LocalBooking /> : <div className="o-embed mt-8" data-reveal=""><iframe src={BOOKING_SRC} title="Book your cleaning" className="o-embed__frame" width="100%" height="1100" scrolling="no" /></div>}
      </section>
    </>
  )
}
