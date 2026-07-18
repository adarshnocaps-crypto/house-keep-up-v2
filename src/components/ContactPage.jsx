import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'

const DETAILS = [
  { Icon: Phone, label: 'Call or text', value: '(708) 737-8722', href: 'tel:+17087378722' },
  { Icon: Mail, label: 'Email us', value: 'hello@housekeepup.com', href: 'mailto:hello@housekeepup.com' },
  { Icon: MapPin, label: 'Visit', value: '8 S Michigan Ave, Suite #1313', sub: 'Chicago, IL 60603' },
  { Icon: Clock, label: 'Hours', value: 'Mon – Sat, 8am – 8pm', sub: 'Same-week slots available' },
]

/**
 * Contact page (/contact): contact details, a message form and the live
 * BookingKoala widget so visitors can also book right here.
 */
export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="relative mx-auto max-w-[1100px] px-6 pb-16 pt-[150px]">
            <p className="tx-xs mb-6" data-reveal="">We'd love to hear from you</p>
            <Title as="h1" align="start" lines={['Get in', { text: 'touch' }]} className="text-left text-cream" />
            <p
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-cream/90"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              Questions, quotes or a quick hello — reach us however you like. We
              usually reply within a few hours during business days.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Details + form ---- */}
      <section className="mx-auto max-w-[1100px] px-6 pt-20" data-scroll="">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* details */}
          <div>
            <p className="tx-xs mb-6" data-reveal="">Reach us directly</p>
            <div className="flex flex-col gap-4">
              {DETAILS.map(({ Icon, label, value, sub, href }, i) => {
                const inner = (
                  <>
                    <span className="ct-cardIcon"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                    <span>
                      <span className="ct-cardLabel">{label}</span>
                      <span className="ct-cardValue">{value}</span>
                      {sub && <span className="ct-cardSub">{sub}</span>}
                    </span>
                  </>
                )
                return href ? (
                  <a key={label} href={href} className="ct-card a-lift o-scatter__item" style={{ '--delay': `${i * 0.08}s` }}>
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="ct-card o-scatter__item" style={{ '--delay': `${i * 0.08}s` }}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>

          {/* form */}
          <div className="ct-formWrap" data-reveal="" style={{ '--delay': '0.2s' }}>
            {sent ? (
              <div className="ct-sent">
                <span className="ct-sentMark" aria-hidden="true">✓</span>
                <p className="ct-sentTitle">Message sent!</p>
                <p className="ct-sentText">Thanks for reaching out — we'll get back to you shortly.</p>
                <button type="button" className="a-button mt-6" onClick={() => setSent(false)}>
                  Send another
                </button>
              </div>
            ) : (
              <form
                className="ct-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <p className="ct-formTitle">Send a message</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="ct-field">
                    <span className="ct-label">Name</span>
                    <input type="text" required placeholder="Jane Doe" className="ct-input" />
                  </label>
                  <label className="ct-field">
                    <span className="ct-label">Phone</span>
                    <input type="tel" placeholder="(312) 555-1234" className="ct-input" />
                  </label>
                </div>
                <label className="ct-field">
                  <span className="ct-label">Email</span>
                  <input type="email" required placeholder="you@email.com" className="ct-input" />
                </label>
                <label className="ct-field">
                  <span className="ct-label">How can we help?</span>
                  <textarea rows={4} required placeholder="Tell us about your space or ask a question…" className="ct-input ct-textarea" />
                </label>
                <button type="submit" className="a-button mt-2 self-start">
                  Send message <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ---- Prefer to book? ---- */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24 pt-20" data-scroll="">
        <div className="ct-bookCta" data-reveal="">
          <div>
            <p className="ct-cardLabel !text-cream/70">Rather skip the message?</p>
            <p className="mt-1 font-display text-[clamp(1.5rem,3vw,2.2rem)] uppercase leading-tight text-cream">
              Book your clean online
            </p>
          </div>
          <a href="/book" className="a-button flex-none">
            Book now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  )
}
