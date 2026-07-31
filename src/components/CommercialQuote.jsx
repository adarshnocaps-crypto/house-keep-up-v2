import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * On-site estimate request for commercial work. Commercial jobs can't be
 * priced from the standard booking flow — square footage, facility type and
 * access hours decide the quote — so this collects those instead of sending
 * people to /book.
 */
const FACILITY_TYPES = [
  'Office',
  'Warehouse',
  'Retail store',
  'Restaurant',
  'Medical facility / clinic',
  'Hotel / accommodation',
  'Shopping mall',
  'Event venue',
  'Manufacturing facility',
  'Gym / fitness center',
  'School / education center',
  'Other',
]

export default function CommercialQuote() {
  const [sent, setSent] = useState(false)

  return (
    <section id="estimate" className="mx-auto max-w-[1100px] scroll-mt-28 px-6 pb-24" data-scroll="">
      <div className="cq-head">
        <p className="sd-kicker">Free on-site assessment</p>
        <h2 className="sd-h2">Tell us about your facility.</h2>
        <p className="cq-intro">
          Share a few details and we&rsquo;ll visit, review the space with you
          and prepare a tailored quote — no cost and no obligation.
        </p>
      </div>

      <div className="ct-formWrap mt-10" data-reveal="">
        {sent ? (
          <div className="ct-sent">
            <span className="ct-sentMark" aria-hidden="true">✓</span>
            <p className="ct-sentTitle">Request received!</p>
            <p className="ct-sentText">
              Thanks — we&rsquo;ll call to confirm a walkthrough time, usually
              within one business day.
            </p>
            <button type="button" className="a-button mt-6" onClick={() => setSent(false)}>
              Send another request
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
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="ct-field">
                <span className="ct-label">Name *</span>
                <input type="text" name="name" required autoComplete="name" placeholder="Jane Doe" className="ct-input" />
              </label>
              <label className="ct-field">
                <span className="ct-label">Phone number *</span>
                <input type="tel" name="phone" required autoComplete="tel" placeholder="(312) 555-1234" className="ct-input" />
              </label>
              <label className="ct-field">
                <span className="ct-label">Email *</span>
                <input type="email" name="email" required autoComplete="email" placeholder="you@company.com" className="ct-input" />
              </label>
              <label className="ct-field">
                <span className="ct-label">Business name *</span>
                <input type="text" name="business" required autoComplete="organization" placeholder="Acme Co." className="ct-input" />
              </label>
            </div>

            <fieldset className="cq-group">
              <legend className="ct-label">Facility address *</legend>
              <div className="grid gap-4">
                <input type="text" name="street" required autoComplete="address-line1" placeholder="Street address" className="ct-input" />
                <input type="text" name="street2" autoComplete="address-line2" placeholder="Suite, floor or unit (optional)" className="ct-input" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="text" name="city" required autoComplete="address-level2" placeholder="City" className="ct-input" />
                  <input
                    type="text"
                    name="zip"
                    required
                    autoComplete="postal-code"
                    inputMode="numeric"
                    pattern="[0-9]{5}(-[0-9]{4})?"
                    title="Five-digit ZIP, optionally with the +4 extension"
                    placeholder="ZIP code"
                    className="ct-input"
                  />
                </div>
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="ct-field">
                <span className="ct-label">Square footage</span>
                <input type="number" name="sqft" min="0" step="50" placeholder="e.g. 4,500" className="ct-input" />
              </label>
              <label className="ct-field">
                <span className="ct-label">Type of facility *</span>
                <select name="facility" required defaultValue="" className="ct-input ct-select">
                  <option value="" disabled>Select one…</option>
                  {FACILITY_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="ct-field">
              <span className="ct-label">Preferred date for the visit *</span>
              <input type="date" name="visit" required className="ct-input cq-date" />
            </label>

            <label className="ct-field">
              <span className="ct-label">Additional notes or special requests</span>
              <textarea
                name="notes"
                rows={4}
                placeholder="Access hours, areas that need extra attention, cleaning frequency you have in mind…"
                className="ct-input ct-textarea"
              />
            </label>

            <button type="submit" className="a-button mt-2 self-start">
              Request a free on-site estimate <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
