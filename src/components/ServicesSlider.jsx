import { Title } from '../lib/scrollfx.jsx'
import { serviceLines } from '../assets/images.js'

/**
 * Service cards: bold solid-color rounded cards, each led by original hand-drawn art,
 * with a thin-outlined "product bar" row (name + price + pill CTA) at the
 * bottom. Draggable snap slider with pink round arrows underneath.
 */
const SERVICES = [
  {
    art: serviceLines.standard, artTone: 'dark',
    id: 'standard',
    badge: 'Most popular',
    title: 'Standard Cleaning',
    blurb: 'Weekly or bi-weekly upkeep: kitchens, baths, floors and dusting on a room-by-room checklist.',
    price: 'From $120',
    card: 'bg-pink text-cocoa',
    accent: '#fffdf7',
    bar: 'border-cocoa/30',
    btn: 'a-button -cream',
  },
  {
    art: serviceLines.deep, artTone: 'light', artScale: 0.88,
    id: 'deep',
    badge: 'Best value',
    title: 'Deep Cleaning',
    blurb: 'A top-to-bottom seasonal reset — baseboards, vents, grout, behind and under everything.',
    price: 'From $220',
    card: 'bg-primary text-cream',
    accent: '#ffa9e9',
    bar: 'border-cream/40',
    btn: 'a-button',
  },
  {
    art: serviceLines.move, artTone: 'dark',
    id: 'move',
    badge: 'Turnkey',
    title: 'Move-In / Move-Out',
    blurb: 'Empty-home cleans that pass landlord walkthroughs and make new places feel brand new.',
    price: 'From $260',
    card: 'bg-cream text-primary border-2 border-cocoa/15',
    accent: '#ffa9e9',
    bar: 'border-primary/30',
    btn: 'a-button',
  },
  {
    art: serviceLines.office, artTone: 'light',
    id: 'office',
    badge: 'B2B',
    title: 'Commercial & Office',
    blurb: 'After-hours office, lobby and retail cleaning on a schedule that never disrupts your team.',
    price: 'Custom quote',
    card: 'bg-violet text-white',
    accent: '#ffa9e9',
    bar: 'border-white/40',
    btn: 'a-button',
  },
  {
    art: serviceLines.post, artTone: 'light', artScale: 1.16,
    id: 'post',
    badge: 'Specialty',
    title: 'Post-Construction',
    blurb: 'Fine dust, paint specks and debris gone — renovation spaces made ready to live in.',
    price: 'From $320',
    card: 'bg-magenta text-white',
    accent: '#fffdf7',
    bar: 'border-white/40',
    btn: 'a-button -violet',
  },
  {
    art: serviceLines.recurring, artTone: 'light', artScale: 0.88,
    id: 'recurring',
    badge: 'Set & forget',
    title: 'Recurring Cleaning',
    blurb: 'A familiar professional and a consistent checklist, scheduled weekly, bi-weekly or monthly.',
    price: 'From $99',
    card: 'bg-cocoa text-cream',
    accent: '#ffa9e9',
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
        {SERVICES.map(({ art, artTone, artScale, id, badge, title, blurb, price, card, accent, bar, btn }) => (
          <article
            key={title}
            className={`${card} service-premiumCard flex min-h-[450px] min-w-0 flex-col rounded-[26px] p-6 text-center sm:p-7`}
            style={{ '--service-art-accent': accent }}
          >
            <span className="a-tag mx-auto !px-4 !py-2 bg-white/90 text-cocoa">{badge}</span>

            {/* flat black art on transparency — tinted to the card's own text
                colour in CSS, so one asset works on pink and on cocoa alike */}
            <img
              src={art}
              alt=""
              draggable="false"
              loading="lazy"
              style={artScale ? { '--art-scale': artScale } : undefined}
              className={`service-lineArt -${artTone} mx-auto my-4 h-[150px] w-full max-w-[270px] object-contain sm:h-[174px]`}
            />

            {/* the title carries the link name; its ::after stretches over the
                whole card so anywhere but the Book pill opens the service */}
            <h3 className="font-display text-[25px] uppercase leading-none tracking-[-0.01em]">
              <a href={`/services/${id}`} className="service-premiumCard__link">{title}</a>
            </h3>
            <p className="mx-auto mt-3 max-w-[290px] text-[12px] leading-[1.65] opacity-80 sm:text-[13px]">
              {blurb}
            </p>

            <div
              className={`mt-auto flex items-center justify-between gap-3 rounded-full border ${bar} py-1.5 pl-4 pr-1.5 text-left`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.04em] sm:text-[12px]">
                {price}
              </span>
              {/* commercial jobs are quoted after a walkthrough, so Book opens
                  that service's estimate form rather than the booking flow */}
              <a
                href={id === 'office' ? '/services/office#estimate' : '/book-now'}
                aria-label={id === 'office' ? `Request an estimate for ${title}` : `Book ${title}`}
                className={`${btn} service-premiumCard__book !px-5 !py-2.5`}
              >
                {id === 'office' ? 'Get quote' : 'Book'}
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center px-6" data-reveal="">
        <a href="/services" className="a-button">
          Explore all our services
        </a>
      </div>
    </section>
  )
}
