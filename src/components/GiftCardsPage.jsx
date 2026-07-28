import { useEffect } from 'react'
import { Gift } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import { BOOKING_EMBED_SCRIPT, GIFT_CARD_EMBED_SRC } from '../lib/links.js'

const FACTS = [
  'Any amount, or enough to cover a specific clean',
  'Your message travels with the card, not in a separate email',
  'Sent the moment you buy, or held for the morning it matters',
]

/**
 * Gift cards (/gift-cards) — embeds the BookingKoala gift-card flow so the
 * purchase happens on our own page. Deliberately short: hero, then the thing
 * you came to buy, same shape as /book. embed.js resizes the iframe to fit and
 * is injected once on mount (shared with the booking embed).
 */
export default function GiftCardsPage() {
  useEffect(() => {
    if (document.querySelector(`script[src="${BOOKING_EMBED_SCRIPT}"]`)) return undefined
    const script = document.createElement('script')
    script.src = BOOKING_EMBED_SCRIPT
    script.defer = true
    document.body.appendChild(script)
    return () => script.remove()
  }, [])

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="mx-auto grid max-w-[1100px] items-center gap-14 px-6 pb-20 pt-[150px] lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="tx-xs mb-6" data-reveal="">Gift cards &middot; Chicagoland</p>
              <Title
                as="h1"
                align="start"
                lines={['Give someone', { text: 'a clean home' }]}
                className="text-left text-cream"
              />
              <p
                className="mt-8 max-w-xl text-[16px] leading-relaxed text-cream/95"
                data-reveal=""
                style={{ '--delay': '0.6s' }}
              >
                New place, new baby, or a thank-you that isn&rsquo;t flowers. A few
                hours back is worth more than another candle — especially in the
                weeks when someone has none to spare.
              </p>

              <ul className="gc-facts" data-reveal="" style={{ '--delay': '0.7s' }}>
                {FACTS.map((fact) => <li key={fact}>{fact}</li>)}
              </ul>

              <div className="mt-9 flex flex-wrap gap-4" data-reveal="" style={{ '--delay': '0.8s' }}>
                <a href="#buy" className="a-button">Choose an amount</a>
                <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
              </div>
            </div>

            {/* flat brand card, no photography needed */}
            <div className="gc-art" data-reveal="" style={{ '--delay': '0.5s' }} aria-hidden="true">
              <span className="gc-art__back" />
              <div className="gc-art__card">
                <span className="gc-art__top">
                  <span className="gc-art__brand">HOUSE KEEP UP</span>
                  <Gift className="gc-art__icon" />
                </span>
                <span className="gc-art__label">Gift<br />card</span>
                <span className="gc-art__foot">
                  <i />
                  Redeemable on any cleaning service
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- BookingKoala gift-card flow ---- */}
      <section id="buy" className="mx-auto max-w-[1240px] scroll-mt-28 px-6 pb-24 pt-20" data-scroll="">
        <div className="o-embed -gift" data-reveal="">
          <iframe
            src={GIFT_CARD_EMBED_SRC}
            title="Buy a House Keep Up gift card"
            className="o-embed__frame"
            width="100%"
            height="1000"
            scrolling="no"
          />
        </div>
      </section>
    </>
  )
}
