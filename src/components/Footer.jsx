import { GIFT_CARD_PATH } from '../lib/links.js'
import chicagoScriptCream from '../assets/images/brand/chicago-script-cream.png'

const LINKS = [
  ['About', '/about'],
  ['Services', '/services'],
  ['Gallery', '/gallery'],
  ['Book now', '/book'],
  ['Blog', '/blog'],
  ['FAQ', '/#faq'],
  ['Contact', '/contact'],
  ['Gift cards', GIFT_CARD_PATH],
]
/**
 * Footer: an inset dark-green rounded container (bookending the hero) holding
 * two pink push cards, centered link rows, the legal line, then
 * the Chicago script over the giant clipped wordmark in cream.
 */
export default function Footer() {
  return (
    <footer className="px-[15px] pt-10" data-scroll="">
      <div className="o-footer-dark overflow-hidden rounded-t-[30px] bg-primary pt-16 text-cream">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-6 md:grid-cols-2">
          <div className="footer-feature relative flex flex-col items-start overflow-hidden rounded-[30px] bg-pink p-12 text-cocoa">
            <div className="relative z-10">
              <p className="tx-l text-primary">Stay in the loop</p>
              <p className="mt-3 text-[15px] leading-relaxed">
                Every month, our best cleaning tips and seasonal offers.
              </p>
              <a href="/blog" className="a-button -cream mt-7">
                Read the journal
              </a>
            </div>
          </div>

          <div className="footer-feature relative flex flex-col items-start overflow-hidden rounded-[30px] bg-pink p-12 text-cocoa">
            <div className="relative z-10">
              <p className="tx-l text-primary">And your place?</p>
              <p className="mt-3 text-[15px] leading-relaxed">
                We're around to talk through what you need — no pressure, no jargon.
              </p>
              <a href="tel:+17087378722" className="a-button -cream mt-7">
                Talk to a cleaner
              </a>
            </div>
          </div>
        </div>

        <nav
          className="mx-auto mt-20 flex max-w-[900px] flex-wrap justify-center gap-x-10 gap-y-3 px-6"
          aria-label="Footer"
        >
          {LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="a-link"
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* legal links sit on the copyright line rather than in the nav above,
            so they stay findable without competing with the service pages */}
        <div className="mx-auto mt-8 flex max-w-[900px] flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-sm text-cream/80">
          {/* year comes from the clock so the notice never goes stale */}
          <p>© {new Date().getFullYear()} House Keep Up, all rights reserved.</p>
          <span aria-hidden="true" className="text-cream/40">·</span>
          <a href="/terms" className="underline underline-offset-4 hover:text-cream">Terms</a>
          <span aria-hidden="true" className="text-cream/40">·</span>
          <a href="/privacy" className="underline underline-offset-4 hover:text-cream">Privacy notice</a>
          <span aria-hidden="true" className="text-cream/40">·</span>
          <a href="/legal-notice" className="underline underline-offset-4 hover:text-cream">Legal notice</a>
        </div>

        {/* Reproduces the navbar lockup exactly. There the script's ink lands
            0.0444em above the wordmark's baseline (grid row + a flat -2px at
            1.6rem/0.86); -0.67vw puts it at the same em-offset here, allowing
            for the taller 13vw/0.8 type, Anton's 1.505em content box overrunning
            the line box, and the ~3.35% top padding inside the art itself. The
            ratio is width-independent, so the two lockups stay identical at any
            viewport. The bottom padding clears the fixed PopinContact widget. */}
        <div className="pointer-events-none mt-14 overflow-hidden pb-28" aria-hidden="true">
          <p className="font-display whitespace-nowrap text-center text-[13vw] leading-[0.8] text-cream/95">
            HOUSE KEEP UP
          </p>
          <img
            src={chicagoScriptCream}
            alt=""
            className="mx-auto -mt-[0.67vw] block w-[32vw]"
          />
        </div>
      </div>
    </footer>
  )
}
