import { videos } from '../assets/images.js'

const LINKS = ['About', 'Services', 'Estimate', 'Journal', 'FAQ', 'Contact']
const LEGAL = ['Legal notice', 'Privacy policy', 'Credits']

/**
 * Footer: an inset dark-green rounded container (bookending the hero) holding
 * two pink push cards, centered link rows, the legal line, then
 * the giant clipped wordmark in cream.
 */
export default function Footer() {
  return (
    <footer className="px-[15px] pt-10" data-scroll="">
      <div className="o-footer-dark overflow-hidden rounded-t-[30px] bg-primary pt-16 text-cream">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-6 md:grid-cols-2">
          <div className="relative flex flex-col items-start overflow-hidden rounded-[30px] bg-pink p-12 text-cocoa">
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen"
              src={videos.bubbles}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <p className="tx-l text-primary">Stay in the loop</p>
              <p className="mt-3 text-[15px] leading-relaxed">
                Every month, our best cleaning tips and seasonal offers.
              </p>
              <a href="#journal" className="a-button -cream mt-7">
                Sign up for the newsletter
              </a>
            </div>
          </div>

          <div className="relative flex flex-col items-start overflow-hidden rounded-[30px] bg-pink p-12 text-cocoa">
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-screen"
              src={videos.bubbles}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
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
          {LINKS.map((label) => (
            <a key={label} href={`#${label.toLowerCase()}`} className="a-link">
              {label}
            </a>
          ))}
        </nav>

        <div className="mx-auto mt-8 flex max-w-[900px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 text-sm text-cream/80">
          <p>© 2026 House Keep Up, all rights reserved.</p>
          {LEGAL.map((label) => (
            <a key={label} href="#top" className="a-link text-sm">
              {label}
            </a>
          ))}
        </div>

        <div className="pointer-events-none mt-14 h-[22vw] overflow-hidden" aria-hidden="true">
          <p className="font-display whitespace-nowrap text-center text-[13vw] leading-[0.8] text-cream/95">
            HOUSE KEEP UP
          </p>
        </div>
      </div>
    </footer>
  )
}
