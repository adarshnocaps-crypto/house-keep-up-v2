import { videos } from '../assets/images.js'
import { Title } from '../lib/scrollfx.jsx'

const STATS = [
  ['12k+', 'Homes cleaned'],
  ['4.9★', 'Google rating'],
  ['24h', 'Re-clean promise'],
]

/**
 * Slim cinematic video band: the microfiber-clean clip plays behind a neutral
 * contrast wash with a headline, three stat chips and a CTA.
 */
export default function VideoShowcase() {
  return (
    <section className="px-[15px] py-8 sm:py-10" data-scroll="">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[26px] bg-primary">
        {/* base footage */}
        <video
          className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-center"
          src={videos.microfiber}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="o-videoWatermarkCover" aria-hidden="true" />
        {/* neutral wash so text stays legible without tinting the footage green */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.34) 42%, rgba(0,0,0,0.08) 100%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 px-6 py-8 text-cream sm:px-10 sm:py-10 lg:px-14">
          <p className="tx-xs mb-3" data-reveal="">
            The satisfying part
          </p>
          <div className="max-w-[15ch]">
            <Title
              align="start"
              lines={['Watch the', { text: 'shine happen' }]}
              className="o-videoTitle text-left text-cream"
            />
          </div>
          <p
            className="mt-4 max-w-[390px] text-[14px] leading-relaxed text-cream/90"
            data-reveal=""
            style={{ '--delay': '0.7s' }}
          >
            Streak-free glass, spotless counters, floors you can see yourself in.
            Every visit ends with that fresh, just-cleaned feeling.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5" data-reveal="" style={{ '--delay': '0.85s' }}>
            {STATS.map(([big, small]) => (
              <div
                key={small}
                className="rounded-[16px] bg-black/24 px-4 py-2.5 backdrop-blur-sm"
              >
                <p className="font-display text-[24px] leading-none sm:text-[30px]">{big}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-cream/80 sm:text-[11px]">
                  {small}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5" data-reveal="" style={{ '--delay': '1s' }}>
            <a href="#/#estimate" className="a-button !px-7 !py-3">
              Get my free estimate
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
