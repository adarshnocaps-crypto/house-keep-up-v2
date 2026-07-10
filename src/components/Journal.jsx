import { rooms } from '../assets/images.js'
import { Title } from '../lib/scrollfx.jsx'
import { Ribbon } from './Decor.jsx'

const POSTS = [
  {
    img: rooms.bathroomDeep,
    tags: [
      { label: 'Article', cls: 'bg-violet text-white' },
      { label: 'Deep cleaning', cls: 'bg-pink text-cocoa' },
    ],
    date: '06/15/2026',
    title: 'The Real Reasons Chicago Homes Are Paying for Deep Cleaning',
    excerpt:
      'Allergies, lake humidity, radiator dust — the case for a seasonal reset goes far beyond looks. Here is what a deep clean actually covers.',
    big: true,
  },
  {
    img: rooms.bedroom,
    tags: [
      { label: 'Article', cls: 'bg-violet text-white' },
      { label: 'How-to', cls: 'bg-pink text-cocoa' },
    ],
    date: '05/28/2026',
    title: '5 Tips for Cleaning Your Mattress',
    excerpt:
      'Your mattress collects more than dreams. Five practical steps to freshen it up between professional visits.',
  },
  {
    img: rooms.renovated,
    tags: [
      { label: 'Article', cls: 'bg-violet text-white' },
      { label: 'Hosts', cls: 'bg-pink text-cocoa' },
    ],
    date: '05/02/2026',
    title: 'The Airbnb Cleaning Checklist Every Host Needs',
    excerpt:
      'Five-star reviews start with the turnover. The room-by-room checklist our teams use between guests.',
  },
]

const TOPICS = ['Deep cleaning', 'Move-out', 'Offices', 'How-to', 'Hosts', 'Green products']

/**
 * Journal / resources: big blog cards on the left; pink topics card, green
 * community card and magenta event card in the right rail.
 */
export default function Journal() {
  return (
    <section id="journal" className="relative mx-auto max-w-[1320px] px-6 pb-32" data-scroll="">
      <Ribbon className="left-[-8%] top-[12%] -z-10 w-[116%]" opacity={0.14} flip />

      <div className="text-center">
        <p className="tx-xs mb-6" data-reveal="">
          A community of spotless homes
        </p>
        <Title lines={['The keep-up', { text: 'journal' }]} />
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-8">
          {POSTS.map(({ img, tags, date, title, excerpt, big }, i) => (
            <article
              key={title}
              className={`o-scatter__item overflow-hidden rounded-[30px] bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] ${big ? '' : 'grid sm:grid-cols-[270px_1fr]'}`}
              style={{ '--delay': `${i * 0.1}s` }}
            >
              <img
                src={img}
                alt=""
                className={`w-full object-cover ${big ? 'h-[320px]' : 'h-full min-h-[220px]'}`}
              />
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  {tags.map(({ label, cls }) => (
                    <span key={label} className={`a-tag ${cls}`}>
                      {label}
                    </span>
                  ))}
                  <span className="text-sm font-semibold">{date}</span>
                </div>
                <h3 className="tx-s mt-5">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{excerpt}</p>
                <a href="/#contact" className="a-link mt-5">
                  Read the article
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <div
            className="o-scatter__item rounded-[30px] bg-pink px-8 py-12 text-center"
            style={{ '--delay': '0.1s' }}
          >
            <h3 className="tx-s text-primary">Explore our topics</h3>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {TOPICS.map((topic) => (
                <li key={topic} className="a-tag bg-white text-primary">
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="o-scatter__item flex flex-col items-center rounded-[30px] bg-primary px-8 py-14 text-center text-cream"
            style={{ '--delay': '0.2s' }}
          >
            <h3 className="tx-s">Join the community</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/90">
              Monthly tips, seasonal checklists and neighborhood offers. No spam,
              just sparkle.
            </p>
            <a href="/#contact" className="a-button mt-7">
              Sign up for the newsletter
            </a>
          </div>

          <div
            className="o-scatter__item flex flex-col items-center rounded-[30px] bg-magenta px-8 py-14 text-center text-white"
            style={{ '--delay': '0.3s' }}
          >
            <p className="tx-xs">07/20/2026 in Chicago</p>
            <h3 className="tx-l mt-3">
              Spring reset:
              <span className="block">open house day</span>
            </h3>
            <a href="/#contact" className="a-button -violet mt-7">
              Discover the event
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
