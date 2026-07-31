import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ListTree, PhoneCall } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'

/**
 * Shared shell for the legal notice and privacy pages.
 *
 * Same shape as a journal article — editorial hero, then the document on the
 * left with a sticky contents rail on the right. Legal copy is long and people
 * arrive looking for one clause, so the rail is doing real work here, not
 * decoration: it tracks the section you are reading, as on a blog post.
 *
 * Pages pass `sections` rather than children so the contents list and the
 * anchor ids are generated from a single source and cannot fall out of step.
 */
export const sectionId = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function LegalPage({ kicker, title, intro, updated, sections }) {
  const items = useMemo(
    () => sections.map(({ title: heading }) => ({ text: heading, id: sectionId(heading) })),
    [sections],
  )
  const [activeId, setActiveId] = useState('')

  // mark the section currently in view, so the rail says where you are
  useEffect(() => {
    if (!items.length) return undefined
    const seen = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => seen.set(entry.target.id, entry.isIntersecting))
        const current = items.find(({ id }) => seen.get(id))
        if (current) setActiveId(current.id)
      },
      { rootMargin: '-96px 0px -70% 0px' },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="mx-auto max-w-[1100px] px-6 pb-20 pt-[150px]">
            <p className="tx-xs mb-6" data-reveal="">{kicker} &middot; House Keep Up</p>
            <Title as="h1" align="start" lines={[title]} className="text-left text-cream" />
            <p
              className="mt-8 max-w-[54ch] text-[16px] leading-relaxed text-cream/95"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              {intro}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3" data-reveal="" style={{ '--delay': '0.8s' }}>
              <span className="a-tag bg-pink text-cocoa">Last updated {updated}</span>
              <span className="lg-heroMeta">{sections.length} sections</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Document + rail ---- */}
      <div className="lg-layout" data-scroll="">
        <article className="lg-main">
          {/* deliberately no [data-reveal] on the body: these sections must be
              readable whether or not the scroll system ever fires. Legal text
              that animates in is legal text that can fail to appear. */}
          {sections.map(({ title: heading, body }, i) => (
            <section key={heading} id={sectionId(heading)} className="lg-section">
              <p className="lg-num">{String(i + 1).padStart(2, '0')}</p>
              <h2>{heading}</h2>
              {body}
            </section>
          ))}

          <div className="lg-cta">
            <span className="lg-ctaBar" aria-hidden="true" />
            <p className="tx-xs mb-4 text-pink">Anything unclear?</p>
            <p className="tx-l font-display text-cream">Talk to a person, not a form</p>
            <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-relaxed text-cream/85">
              If any part of this affects you and you want it explained, corrected
              or removed — just ask. We answer every message ourselves.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href="mailto:hello@housekeepup.com" className="a-button">
                Email us <ArrowRight className="h-4 w-4" />
              </a>
              <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
            </div>
          </div>
        </article>

        <aside className="lg-rail">
          <div className="lg-railInner">
            <nav className="lg-toc" aria-label="On this page">
              <p className="lg-tocTitle"><ListTree className="h-4 w-4" /> On this page</p>
              <ol>
                {items.map(({ text, id }) => (
                  <li key={id}>
                    <a href={`#${id}`} className={activeId === id ? 'is-on' : ''}>{text}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <a href="tel:+17087378722" className="lg-call">
              <PhoneCall className="h-5 w-5" strokeWidth={1.8} />
              <span>
                <strong>Questions?</strong>
                (708) 737-8722
              </span>
            </a>
          </div>
        </aside>
      </div>
    </>
  )
}
