import { videos } from '../assets/images.js'
import { ArrowDoodle } from './Decor.jsx'

const PUSHES = [
  {
    eyebrow: 'One-time deep clean',
    title: ['Need a', 'fresh start?'],
    href: '#estimate',
  },
  {
    eyebrow: 'Recurring cleaning',
    title: ['Ready to never', 'scrub again?'],
    href: '#estimate',
  },
]

/**
 * Two centered pink push cards with Anton titles and cream buttons.
 */
export default function PushPages() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-32" data-scroll="">
      <div className="relative mb-6 text-center md:mb-28" data-reveal="">
        <p className="tx-s">And you?</p>
        <ArrowDoodle className="absolute left-1/2 top-[calc(100%+8px)] z-10 hidden w-[100px] -translate-x-[160px] -scale-x-100 md:block" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {PUSHES.map(({ eyebrow, title, href }, i) => (
          <div
            key={eyebrow}
            className="o-scatter__item"
            style={{ '--delay': `${i * 0.12}s` }}
          >
            <div className="relative flex h-full flex-col items-center overflow-hidden rounded-[30px] bg-pink px-10 py-16 text-center">
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
              <div className="relative z-10 flex flex-col items-center">
                <p className="tx-xs text-cocoa">{eyebrow}</p>
                <h2 className="tx-l mt-3 text-primary">
                  {title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <a href={href} className="a-button -cream mt-8">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
