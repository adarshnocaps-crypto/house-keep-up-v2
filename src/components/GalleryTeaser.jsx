import { Title } from '../lib/scrollfx.jsx'
import { Reveal1 } from './ui/reveal1.tsx'
import { GALLERY_PAIRS } from '../lib/gallery.js'

/**
 * Home-page teaser for the before/after gallery — three interactive sliders
 * plus a link through to the full /gallery page.
 */
const CASES = [GALLERY_PAIRS[3], GALLERY_PAIRS[0], GALLERY_PAIRS[5]]

export default function GalleryTeaser() {
  return (
    <section className="mx-auto max-w-[1560px] px-6 py-24" data-scroll="">
      <div className="text-center">
        <p className="mb-6" data-reveal="">
          <span className="a-sticker">Before &amp; after</span>
        </p>
        <Title lines={['See the', { text: 'difference' }]} />
        <p
          className="mx-auto mt-5 max-w-[560px] text-[15px] leading-relaxed text-primary/70"
          data-reveal=""
        >
          Drag any slider to reveal a real Chicago clean — then explore the full
          before-and-after gallery.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3" data-reveal="">
        {CASES.map((pair, i) => (
          <Reveal1
            key={i}
            bare
            aspectClassName="aspect-[4/3]"
            beforeImage={{ src: pair.before, alt: `A Chicago space before House Keep Up cleaned it (${i + 1})` }}
            afterImage={{ src: pair.after, alt: `The same space after a House Keep Up clean (${i + 1})` }}
          />
        ))}
      </div>

      <div className="mt-10 text-center" data-reveal="">
        <a href="/gallery" className="a-button">View the full gallery</a>
      </div>
    </section>
  )
}
