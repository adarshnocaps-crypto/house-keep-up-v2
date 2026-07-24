import { Title } from '../lib/scrollfx.jsx'

const REASONS = [
  ['Your dedicated team', 'The same trusted faces on your recurring visits, so your home is learned by heart.'],
  ['Supplies included', 'We arrive with all the products and equipment — nothing for you to buy or store.'],
  ['Same-week, seven days', 'Book fast: same-week slots across Chicagoland, mornings through evenings.'],
  ['A heads-up before we arrive', 'We text when we are on the way, so a visit never catches you off guard.'],
  ['Book & reschedule online', 'Manage everything in minutes, with free changes up to 24 hours ahead.'],
  ['Cleaned around your needs', 'Tell us about products, allergies or priorities and we work to them.'],
]

/**
 * "Why homeowners choose us" — a six-card grid of operational differentiators
 * (kept distinct from the guarantees covered in the Story section).
 */
export default function WhyUs() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 py-24" data-scroll="">
      <div className="text-center">
        <p className="mb-6" data-reveal="">
          <span className="a-sticker">Why House Keep Up</span>
        </p>
        <Title lines={['Cleaning that fits', { text: 'your life' }]} />
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map(([title, body], i) => (
          <div
            key={title}
            className="rounded-[26px] border border-primary/10 bg-white p-8 shadow-[0_16px_45px_rgba(9,84,61,0.06)]"
            data-reveal=""
            style={{ '--delay': `${(i % 3) * 0.08}s` }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pink text-cocoa">
              <Check />
            </span>
            <h3 className="mt-5 text-[18px] font-semibold text-primary">{title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-primary/75">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M4 12.5l5 5 11-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
