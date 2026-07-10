import { Title } from '../lib/scrollfx.jsx'

const FAQS = [
  {
    n: '01',
    q: 'Do I need to be home during the cleaning?',
    a: "No — most clients aren't. We can work with door codes, lockboxes or building concierges, and every cleaner is background-checked, bonded and insured for your peace of mind.",
  },
  {
    n: '02',
    q: 'Who brings the cleaning supplies?',
    a: 'We do. Your team arrives with professional equipment and eco-friendly products. Prefer your own favorites? Just leave them out and tell us in the booking notes.',
  },
  {
    n: '03',
    q: 'How long does a cleaning take?',
    a: 'A standard clean of a two-bedroom home takes about 2–3 hours; deep cleans and move-outs run longer. Your confirmation includes a time window, and we text when the team is on the way.',
  },
  {
    n: '04',
    q: 'Can I keep the same cleaning team?',
    a: 'Yes — recurring clients are matched with a dedicated team that learns your home and your preferences. Consistency is the whole point of keeping up.',
  },
  {
    n: '05',
    q: "What if I'm not satisfied?",
    a: "Tell us within 24 hours and we'll come back and re-clean the areas in question, free. If it's still not right, we'll make it right on the bill.",
  },
]

/**
 * FAQ in the split textListCards layout: sticky Anton title left, numbered
 * stacking cards right.
 */
export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[1320px] px-6 pb-32" data-scroll="">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <div className="lg:sticky lg:top-36">
            <p className="tx-xs mb-6" data-reveal="">
              Your questions
            </p>
            <Title
              align="start"
              lines={['House cleaning:', 'the FAQ', { text: 'by House Keep Up' }]}
              className="text-left"
            />
            <div className="mt-10" data-reveal="">
              <a href="/#contact" className="a-button">
                Ask us anything
              </a>
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-6">
          {FAQS.map(({ n, q, a }) => (
            <li key={n} className="o-listCards__item">
              <div className="m-card flex items-start gap-8">
                <span className="a-tag-round">{n}</span>
                <div>
                  <h3 className="tx-m">{q}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed">{a}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
