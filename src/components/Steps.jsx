import { Title } from '../lib/scrollfx.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Tell us about your place',
    body: 'Rooms, bathrooms, pets, priorities — a two-minute form or a quick call is all we need to size up the job and quote it flat.',
  },
  {
    n: '02',
    title: 'Pick a time that suits you',
    body: 'Weekly, bi-weekly, monthly or one-time. Same-week slots across Chicagoland, with reminders before every visit.',
  },
  {
    n: '03',
    title: 'We clean, you live your life',
    body: 'Your vetted team arrives with all supplies and works through a room-by-room checklist. No surprises, no shortcuts.',
  },
  {
    n: '04',
    title: 'Need a re-do? On us',
    body: "If any spot isn't right, tell us within 24 hours and we'll return to fix it free. That's the House Keep Up guarantee.",
  },
]

/**
 * Split layout: sticky left Anton title with hand + CTA, right column of
 * numbered white cards that slide up and stack as you scroll.
 */
export default function Steps() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 pb-32" data-scroll="">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <div className="lg:sticky lg:top-36">
            <p className="tx-xs mb-6" data-reveal="">
              Your needs, our routine
            </p>
            <Title
              align="start"
              lines={['A clean home.', { text: 'Not a chore' }]}
              className="text-left"
            />
            <div className="mt-10" data-reveal="">
              <a href="/#estimate" className="a-button">
                Get my estimate
              </a>
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-6">
          {STEPS.map(({ n, title, body }) => (
            <li key={n} className="o-listCards__item">
              <div className="m-card flex items-start gap-8">
                <span className="a-tag-round">{n}</span>
                <div>
                  <h3 className="tx-m">{title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed">{body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
