import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import { hands } from '../assets/images.js'

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
            <img
              src={hands.point}
              alt=""
              className="pointer-events-none absolute -right-8 -top-10 hidden w-[160px] rotate-[18deg] opacity-95 sm:block sm:w-[210px]"
            />

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
      </div>
    </section>
  )
}
