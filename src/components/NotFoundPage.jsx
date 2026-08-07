import { ArrowRight } from 'lucide-react'

/**
 * 404 page. Rendered for any path that does not resolve to real data, and
 * marked noindex by seoFor so thin pages never enter the index.
 *
 * Deliberately one screen, not a full page: someone who hit a dead link wants
 * out of here, so the only job is to name what happened and hand over the four
 * routes that go somewhere. The links matter for crawlers too — a dead end
 * strands them the same way it strands a visitor.
 */
const LINKS = [
  ['01', 'Cleaning services', '/services', 'Standard, deep, move-in/out and recurring'],
  ['02', 'Areas we serve', '/locations', 'Chicago neighborhoods and suburbs'],
  ['03', 'Book a cleaning', '/book-now', 'Flat upfront price, same-week slots'],
  ['04', 'Contact us', '/contact', 'Call, text or email — same-day reply'],
]

export default function NotFoundPage() {
  return (
    <section className="nf">
      <div className="is-inview nf-shell">
        <div className="nf-copy">
          <p className="nf-code" data-reveal="">404</p>
          <h1 className="nf-title" data-reveal="" style={{ '--delay': '0.1s' }}>
            This page moved out
          </h1>
          <p className="nf-lede" data-reveal="" style={{ '--delay': '0.2s' }}>
            The link you followed is gone or was never here. Everything else is
            exactly where you left it.
          </p>
          <div className="nf-actions" data-reveal="" style={{ '--delay': '0.3s' }}>
            <a href="/" className="a-button -cream">Back to home <ArrowRight className="h-4 w-4" /></a>
            <a href="/book-now" className="a-button">Book a cleaning</a>
          </div>
        </div>

        <nav className="nf-links" aria-label="Popular pages">
          {LINKS.map(([no, label, href, blurb], i) => (
            <a
              key={href}
              href={href}
              className="nf-link"
              data-reveal=""
              style={{ '--delay': `${0.35 + i * 0.07}s` }}
            >
              <span className="nf-link__no">{no}</span>
              <span className="nf-link__body">
                <strong>{label}</strong>
                <span>{blurb}</span>
              </span>
              <ArrowRight className="nf-link__arrow h-4 w-4" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
