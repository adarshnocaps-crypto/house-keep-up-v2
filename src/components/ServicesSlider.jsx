import { services } from '../assets/images.js'
import { Title } from '../lib/scrollfx.jsx'
import Included from './Included.jsx'
import calendarImage from '@lobehub/fluent-emoji-3d/assets/1f4c5.webp'

/**
 * Service cards: bold solid-color rounded cards, each led by its 3D render,
 * with a thin-outlined "product bar" row (name + price + pill CTA) at the
 * bottom. Draggable snap slider with pink round arrows underneath.
 */
const SERVICES = [
  {
    img: services.standardCleaning,
    badge: 'Most popular',
    title: 'Standard Cleaning',
    blurb: 'Weekly or bi-weekly upkeep: kitchens, baths, floors and dusting on a room-by-room checklist.',
    price: 'From $120',
    card: 'bg-pink text-cocoa',
    bar: 'border-cocoa/30',
    btn: 'a-button -cream',
  },
  {
    img: services.deepCleaning,
    badge: 'Best value',
    title: 'Deep Cleaning',
    blurb: 'A top-to-bottom seasonal reset — baseboards, vents, grout, behind and under everything.',
    price: 'From $220',
    card: 'bg-primary text-cream',
    bar: 'border-cream/40',
    btn: 'a-button',
  },
  {
    img: services.moveInOut,
    badge: 'Turnkey',
    title: 'Move-In / Move-Out',
    blurb: 'Empty-home cleans that pass landlord walkthroughs and make new places feel brand new.',
    price: 'From $260',
    card: 'bg-cream text-primary border-2 border-cocoa/15',
    bar: 'border-primary/30',
    btn: 'a-button',
  },
  {
    img: services.commercial,
    badge: 'B2B',
    title: 'Commercial & Office',
    blurb: 'After-hours office, lobby and retail cleaning on a schedule that never disrupts your team.',
    price: 'Custom quote',
    card: 'bg-violet text-white',
    bar: 'border-white/40',
    btn: 'a-button',
  },
  {
    img: services.postConstruction,
    badge: 'Specialty',
    title: 'Post-Construction',
    blurb: 'Fine dust, paint specks and debris gone — renovation spaces made ready to live in.',
    price: 'From $320',
    card: 'bg-magenta text-white',
    bar: 'border-white/40',
    btn: 'a-button -violet',
  },
  {
    img: calendarImage,
    badge: 'Set & forget',
    title: 'Recurring Cleaning',
    blurb: 'A familiar professional and a consistent checklist, scheduled weekly, bi-weekly or monthly.',
    price: 'From $99',
    card: 'bg-cocoa text-cream',
    bar: 'border-cream/40',
    btn: 'a-button',
  },
]

export default function ServicesSlider() {
  return (
    <section id="services" className="pb-24" data-scroll="">
      <div className="mx-auto max-w-[1320px] px-6 text-center">
        <p className="mb-6" data-reveal="">
          <span className="a-sticker">Services</span>
        </p>
        <Title lines={[{ text: 'Our most-loved' }, 'cleans']} />
      </div>

      <div className="services-premiumGrid mx-auto mt-9 grid max-w-[1280px] grid-cols-1 gap-5 px-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ img, badge, title, blurb, price, card, bar, btn }) => (
          <article
            key={title}
            className={`${card} service-premiumCard flex min-h-[450px] min-w-0 flex-col rounded-[26px] p-6 text-center sm:p-7`}
          >
            <span className="a-tag mx-auto !px-4 !py-2 bg-white/90 text-cocoa">{badge}</span>

            <img
              src={img}
              alt={title}
              draggable="false"
              className="service-premiumCard__image mx-auto my-5 h-[145px] w-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] sm:h-[170px]"
            />

            <h3 className="font-display text-[25px] uppercase leading-none tracking-[-0.01em]">{title}</h3>
            <p className="mx-auto mt-3 max-w-[290px] text-[12px] leading-[1.65] opacity-80 sm:text-[13px]">
              {blurb}
            </p>

            <div
              className={`mt-auto flex items-center justify-between gap-3 rounded-full border ${bar} py-1.5 pl-4 pr-1.5 text-left`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.04em] sm:text-[12px]">
                {price}
              </span>
              <a
                href="/book"
                className={`${btn} !px-5 !py-2.5`}
              >
                Book
              </a>
            </div>
          </article>
        ))}
      </div>

      <Included />

      <div className="mt-10 flex justify-center px-6" data-reveal="">
        <a href="/services" className="a-button">
          Explore all our services
        </a>
      </div>
    </section>
  )
}
