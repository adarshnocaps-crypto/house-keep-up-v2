import { Title } from '../lib/scrollfx.jsx'
import { Reveal1 } from './ui/reveal1.tsx'
import { GALLERY_PAIRS } from '../lib/gallery.js'

// Illustrative service-type labels for the gallery tiles (kept generic so they
// stay accurate for any before/after — no per-photo claims).
const TYPES = ['Deep clean', 'Move-out clean', 'Recurring visit', 'Post-construction']

/**
 * /gallery — before/after gallery. A written intro, a compact 3-column grid of
 * drag-to-compare sliders with captions, then a "what makes the difference"
 * content block and CTA.
 */
export default function GalleryPage() {
  return (
    <div>
      {/* ---- brand hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="mx-auto max-w-[1100px] px-6 pb-16 pt-[150px] text-center">
            <p className="tx-xs mb-6" data-reveal="">Before · After</p>
            <Title as="h1" lines={['The keep-up', { text: 'gallery' }]} className="text-cream" />
            <p
              className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-cream/90"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              Real Chicago homes and offices, before and after our team got to
              work. Drag any slider to reveal the difference a House Keep Up visit
              makes.
            </p>
          </div>
        </div>
      </section>

      {/* ---- written intro ---- */}
      <section className="mx-auto max-w-[1080px] px-6 pt-16" data-scroll="">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div data-reveal="">
            <p className="mb-4"><span className="a-sticker">Proof, not promises</span></p>
            <h2 className="tx-l text-primary">Every photo is a real clean</h2>
          </div>
          <p className="text-[15px] leading-relaxed text-primary/75" data-reveal="">
            No stock imagery and no staging — these are actual jobs from across
            Chicagoland. Slide between each pair to see exactly what changes:
            grimy grout scrubbed bright, dusty blinds wiped clean, and floors you
            can finally see your reflection in. It is the same result we bring to
            every home and office we visit.
          </p>
        </div>
      </section>

      {/* ---- grid of comparisons ---- */}
      <section className="mx-auto max-w-[1240px] px-6 pt-12" data-scroll="">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_PAIRS.map((pair, i) => (
            <figure key={i} data-reveal="" style={{ '--delay': `${(i % 3) * 0.07}s` }}>
              <Reveal1
                bare
                beforeImage={{ src: pair.before, alt: `A Chicago space before House Keep Up cleaned it (${i + 1})` }}
                afterImage={{ src: pair.after, alt: `The same space after a House Keep Up clean (${i + 1})` }}
              />
              <figcaption className="mt-3 flex items-center justify-between px-1">
                <span className="text-[13px] font-semibold text-primary">{TYPES[i % TYPES.length]}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary/45">
                  Drag to compare
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="mx-auto max-w-[1240px] px-6 pb-24 pt-20" data-scroll="">
        <div className="rounded-[30px] bg-primary px-6 py-14 text-center text-cream" data-reveal="">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-tight">
            Want results like these?
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-cream/85">
            Get a flat, upfront estimate in about two minutes — same-week slots
            across Chicagoland.
          </p>
          <a href="/book" className="a-button -cream mt-8">Get my free estimate</a>
        </div>
      </section>
    </div>
  )
}
