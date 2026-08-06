import { ArrowRight, Check, ClipboardList, KeyRound, PlusCircle } from 'lucide-react'
import maidStill from '../assets/images/home/maid-glass-feature-frame.jpg'

/* PLACEHOLDER — 4.9 needs a real figure before launch. The other two come
   from the answers in Faq.jsx. */
const stats = [
  { value: '4.9', label: 'Average rating' },
  { value: '2–4 hrs', label: 'Typical visit' },
  { value: '1–3', label: 'Maids per home' },
]

/* Deliberately not the Steps section again. These are independent benefits,
   not a sequence, so they carry icons rather than numbers. Each one is backed
   by a stated answer in Faq.jsx — keyless entry, product notes, add-ons. */
const points = [
  {
    icon: KeyRound,
    title: 'Skip the waiting around',
    detail: 'Leave a door code or lockbox once — your maid lets herself in and locks up.',
  },
  {
    icon: ClipboardList,
    title: 'Explain your home once',
    detail: 'The cabinet you skip, the products you avoid — noted, then carried into every visit.',
  },
  {
    icon: PlusCircle,
    title: 'Hand over what you postpone',
    detail: 'Oven, fridge, interior windows or laundry — add them to any booking.',
  },
]

export default function MaidGlassFeature() {
  return (
    <section id="home-care" className="maid-feature" aria-labelledby="maid-feature-title" data-scroll="">
      <div className="mb-8 text-center" data-reveal="">
        <span className="a-sticker">Your maid, matched to your home</span>
        <h2 id="maid-feature-title" className="tx-l mt-6 text-primary">
          A cleaner home. A lighter week.
        </h2>
        <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-relaxed text-primary/80">
          The same trusted maid every visit — arriving ready, working a
          room-by-room checklist, and leaving the details handled.
        </p>
      </div>

      <div className="maid-feature__scene" data-reveal="">
        <img
          className="maid-feature__image"
          src={maidStill}
          alt="A House Keep Up maid wiping down the marble island of a bright Chicago kitchen"
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
        />

        <div className="maid-feature__panel">
          <div className="maid-feature__content">
            <p className="maid-feature__eyebrow">Every visit, handled</p>

            <p className="maid-feature__title">
              What you stop <mark>thinking about</mark>
            </p>

            <dl className="maid-feature__stats">
              {stats.map(({ value, label }) => (
                <div key={label} className="maid-feature__stat">
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>

            <ul className="maid-feature__points">
              {points.map(({ icon: Icon, title, detail }) => (
                <li key={title}>
                  <span className="maid-feature__pointIcon" aria-hidden="true">
                    <Icon size={15} strokeWidth={2.2} />
                  </span>
                  <span className="maid-feature__pointBody">
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="maid-feature__actions">
              <a href="/book" className="a-button -primary">
                Book your maid <ArrowRight size={17} aria-hidden="true" />
              </a>
              <span className="maid-feature__note">
                <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                Free cancellation up to 24 hours before
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
