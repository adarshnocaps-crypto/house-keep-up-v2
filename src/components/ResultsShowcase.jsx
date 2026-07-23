import { ArrowLeft, ArrowRight } from 'lucide-react'
import { rooms } from '../assets/images.js'

const METRICS = [
  { value: '45%', label: 'Less weekend chore time', tone: 'cream' },
  { value: '98%', label: 'On-time arrival rate', tone: 'green' },
  { value: '100%', label: 'Re-clean guarantee', tone: 'cocoa' },
]

export default function ResultsShowcase() {
  return (
    <section className="results-showcase" aria-label="House Keep Up results" data-scroll="">
      <header className="results-showcase__head" data-reveal="">
        <div>
          <p className="tx-xs">Proof of the keep-up</p>
          <h2>Results that speak<br />for themselves.</h2>
          <p>From turnovers to guarantees, our clients see the difference in every metric that matters.</p>
        </div>
        <div className="results-showcase__arrows" aria-label="Case studies">
          <button type="button" aria-label="Previous case study"><ArrowLeft /></button>
          <button type="button" aria-label="Next case study"><ArrowRight /></button>
        </div>
      </header>

      <div className="results-showcase__grid">
        <article className="results-feature" data-reveal="">
          <p>Case study</p>
          <h3>Faster Airbnb turnovers</h3>
          <span>Same-day turnover cleans with a host checklist tripled how fast a Lincoln Park host could rebook between guests.</span>
          <a href="/blog">Read case study <ArrowRight /></a>
          <strong>3×<small>Faster Airbnb turnovers</small></strong>
          <img src={rooms.living} alt="A bright, clean living room" />
        </article>
        {METRICS.map(({ value, label, tone }) => (
          <article key={label} className={`results-metric results-metric--${tone}`} data-reveal="">
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
