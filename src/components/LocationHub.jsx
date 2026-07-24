import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import { FaYelp } from 'react-icons/fa6'
import { SiNextdoor } from 'react-icons/si'

function GoogleLogo(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#4285F4" d="M21.35 12.27c0-.74-.07-1.46-.19-2.16H12v4.08h5.24a4.48 4.48 0 0 1-1.94 2.94v2.65h3.41c1.99-1.83 2.64-4.53 2.64-7.51Z" />
      <path fill="#34A853" d="M12 21.75c2.62 0 4.82-.87 6.43-2.35l-3.41-2.65c-.95.64-2.16 1.02-3.02 1.02-2.52 0-4.66-1.7-5.42-3.99H3.06v2.74A9.72 9.72 0 0 0 12 21.75Z" />
      <path fill="#FBBC05" d="M6.58 13.78A5.86 5.86 0 0 1 6.28 12c0-.62.11-1.21.3-1.78V7.48H3.06A9.72 9.72 0 0 0 2.03 12c0 1.62.39 3.15 1.03 4.52l3.52-2.74Z" />
      <path fill="#EA4335" d="M12 6.23c1.52 0 2.88.52 3.95 1.54l2.96-2.96C16.82 2.86 14.62 1.75 12 1.75a9.72 9.72 0 0 0-8.94 5.73l3.52 2.74C7.34 7.93 9.48 6.23 12 6.23Z" />
    </svg>
  )
}

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d190459.6165042748!2d-87.8008018!3d41.7651345!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd19cb614b4fd%3A0x49e44eec5436e515!2sHouse%20Keep%20Up!5e0!3m2!1sen!2sus!4v1708150817407!5m2!1sen!2sus'

const DETAILS = [
  {
    icon: MapPin,
    label: '8 S Michigan Ave Suite #1313',
    sub: 'Chicago, IL 60603',
    href: 'https://maps.app.goo.gl/DDGzbkNz7847w7a38',
    cta: 'Get directions',
  },
  {
    icon: Phone,
    label: '(708) 737-8722',
    sub: 'Call for booking help',
    href: 'tel:+17087378722',
    cta: 'Call now',
  },
  {
    icon: Mail,
    label: 'hello@housekeepup.com',
    sub: 'Questions, offices, and custom cleans',
    href: 'mailto:hello@housekeepup.com',
    cta: 'Email us',
  },
  {
    icon: Clock,
    label: 'Mon-Sun: 9:00am - 5:00pm',
    sub: 'Open every day',
  },
]

const SOCIALS = [
  ['Facebook', 'https://www.facebook.com/housekeepup/'],
  ['Instagram', 'https://www.instagram.com/housekeepup/'],
  ['X', 'https://twitter.com/housekeepup'],
  ['LinkedIn', 'https://www.linkedin.com/company/house-keep-up-co'],
  ['YouTube', 'https://www.youtube.com/@housekeepup'],
]

const REVIEW_STATS = [
  { platform: 'Google', detail: '4.9 ★ rating', Icon: GoogleLogo },
  { platform: 'Yelp', detail: '4.5 ★ rating', Icon: FaYelp, color: '#d32323' },
  { platform: 'Nextdoor', detail: '2023 favorite', Icon: SiNextdoor, color: '#0b7d45' },
]

export default function LocationHub() {
  return (
    <section id="locations" className="px-4 py-10 sm:px-6 sm:py-14" data-scroll="">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-8 text-center" data-reveal="">
          <span className="a-sticker">Chicago base</span>
          <h2 className="tx-l mt-6 text-primary">
            Find us before we find every crumb
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-relaxed text-primary/80">
            Our team works from the heart of Chicago and covers homes, offices,
            rentals, and move-outs across the metro area.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[30px] bg-primary text-cream shadow-[0_0_100px_rgba(0,0,0,0.1)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden p-7 sm:p-10 lg:p-14">
            <div className="relative z-10">
              <p className="max-w-[10ch] font-display text-[clamp(2.2rem,12vw,4.8rem)] uppercase leading-[0.9] sm:max-w-none sm:text-[clamp(2.4rem,5vw,4.8rem)]">
                House Keep Up Chicago
              </p>

              <div className="mt-10 grid gap-4">
                {DETAILS.map(({ icon: Icon, label, sub, href, cta }) => {
                  const content = (
                    <>
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-pink text-cocoa">
                        <Icon size={20} strokeWidth={2.4} />
                      </span>
                      <span className="min-w-0">
                        <span className="block break-words text-[14px] font-semibold leading-snug sm:text-[15px]">
                          {label}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-cream/72">
                          {sub}
                        </span>
                      </span>
                      {href && (
                        <span className="ml-auto hidden items-center gap-1 rounded-full bg-cream px-3 py-1.5 text-[11px] font-semibold text-cocoa sm:flex">
                          {cta}
                          <ExternalLink size={12} />
                        </span>
                      )}
                    </>
                  )

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer' : undefined}
                      className="flex min-w-0 items-center gap-3 rounded-[22px] border border-cream/15 bg-cream/6 p-3 transition-colors duration-300 hover:bg-cream/12 sm:gap-4"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={label}
                      className="flex min-w-0 items-center gap-3 rounded-[22px] border border-cream/15 bg-cream/6 p-3 sm:gap-4"
                    >
                      {content}
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {SOCIALS.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="a-tag bg-pink text-cocoa transition-colors duration-300 hover:bg-cream"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] bg-cream sm:min-h-[360px] lg:min-h-[620px]">
            <iframe
              title="House Keep Up Chicago map"
              src={MAP_EMBED}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href="https://maps.app.goo.gl/DDGzbkNz7847w7a38"
              target="_blank"
              rel="noreferrer"
              className="a-button absolute bottom-5 left-5"
            >
              Open map
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Review-stat pills — reinforcing our ratings below the map */}
        <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal="">
          {REVIEW_STATS.map(({ platform, detail, Icon, color }) => (
            <div
              key={platform}
              className="flex items-center gap-2.5 rounded-full bg-white px-5 py-3 shadow-[0_10px_30px_rgba(9,84,61,0.08)]"
            >
              <Icon style={color ? { color } : undefined} className="h-[18px] w-[18px] flex-none" />
              <span className="text-[14px] font-bold text-primary">{platform}</span>
              <span className="text-[13px] text-primary/60">{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
