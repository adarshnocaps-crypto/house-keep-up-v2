import { ArrowRight, ClipboardList, KeyRound, PlusCircle } from 'lucide-react'
import maidStill from '../assets/images/home/maid-window-feature-v2.jpg'
import { LiquidImage } from './ui/liquid-image.jsx'

/* PLACEHOLDER — 4.9 needs a real figure before launch. The other two come
   from the answers in Faq.jsx. */
const proof = [
  { value: '4.9', label: 'Average rating' },
  { value: '2–4 hrs', label: 'Typical visit' },
  { value: '1–3', label: 'Maids per home' },
]

/* Independent benefits, not a sequence, so they carry icons rather than
   numbers. Each one is backed by a stated answer in Faq.jsx — keyless entry,
   product notes, add-ons. */
const points = [
  { icon: KeyRound, title: 'Keyless entry', detail: 'Leave a door code once — your maid lets herself in and locks up.' },
  { icon: ClipboardList, title: 'Noted once, kept', detail: 'The cabinet you skip, the products you avoid — carried into every visit.' },
  { icon: PlusCircle, title: 'Add what you postpone', detail: 'Oven, fridge, interior windows or laundry, on any booking.' },
]

/* One picture filling a rounded frame, with the copy set over its right
   side — no plate, no wash, the photograph left at full colour. The picture
   is the interaction: ripples trail the cursor across it. */
export default function HomeCareBand() {
  return (
    <section id="home-care" className="hc-band" aria-labelledby="hc-band-title" data-scroll="">
      <div className="hc-band__inner" data-reveal="">
        <div className="hc-band__frame">
          <LiquidImage
            className="hc-band__media"
            src={maidStill}
            alt="A House Keep Up maid wiping down a sunlit window in a bright Chicago home"
            fit="cover"
            strength={0.03}
            speed={0.14}
          />

          <div className="hc-band__card">
            <p className="hc-band__eyebrow">Ready when you are</p>

            {/* Explicit break: left to wrap on its own the pink band split
                across two lines, taking "reclaim" up beside "the maid,". */}
            <h2 id="hc-band-title" className="hc-band__title">
              Book the maid,
              <br />
              <mark>reclaim the week</mark>
            </h2>

            <p className="hc-band__blurb">
              The same trusted maid every visit — arriving ready, working a
              room-by-room checklist, and leaving the details handled.
            </p>

            <ul className="hc-band__points">
              {points.map(({ icon: Icon, title, detail }) => (
                <li key={title}>
                  <span className="hc-band__pointIcon" aria-hidden="true">
                    <Icon size={14} strokeWidth={2.2} />
                  </span>
                  <span className="hc-band__pointBody">
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            <dl className="hc-band__proof">
              {proof.map(({ value, label }) => (
                <div key={label}>
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>

            <a href="/book-now" className="a-button -primary hc-band__cta">
              Book your maid <ArrowRight size={17} aria-hidden="true" />
            </a>

            <p className="hc-band__fine">Free cancellation up to 24 hours before</p>
          </div>
        </div>
      </div>
    </section>
  )
}
