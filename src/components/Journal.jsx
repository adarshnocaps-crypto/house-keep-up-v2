import { Title } from '../lib/scrollfx.jsx'
import { Ribbon } from './Decor.jsx'
import { POSTS } from '../lib/blog.js'

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
          {POSTS.map(({ slug, img, category, date, title, excerpt }, i) => (
            <a
              key={slug}
              href={`/blog/${slug}`}
              className={`a-lift o-scatter__item overflow-hidden rounded-[30px] bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] ${i === 0 ? '' : 'grid sm:grid-cols-[270px_1fr]'}`}
              style={{ '--delay': `${i * 0.1}s` }}
            >
              <img
                src={img}
                alt={title}
                className={`w-full object-cover ${i === 0 ? 'h-[320px]' : 'h-full min-h-[220px]'}`}
              />
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="a-tag bg-violet text-white">Article</span>
                  <span className="a-tag bg-pink text-cocoa">{category}</span>
                  <span className="text-sm font-semibold">{date}</span>
                </div>
                <h3 className="tx-s mt-5">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{excerpt}</p>
                <span className="a-link mt-5 inline-block">Read the article</span>
              </div>
            </a>
          ))}

          <div className="text-center" data-reveal="">
            <a href="/blog" className="a-button -primary">
              View all articles
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div
            className="o-scatter__item rounded-[30px] bg-pink px-8 py-12 text-center"
            style={{ '--delay': '0.1s' }}
          >
            <h3 className="tx-s text-primary">Explore our topics</h3>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {TOPICS.map((topic) => (
                <li key={topic}>
                  <a href="/blog" className="a-tag bg-white text-primary transition-colors hover:bg-cocoa hover:text-pink">
                    {topic}
                  </a>
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
            <a href="/contact" className="a-button mt-7">
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
            <a href="/contact" className="a-button -violet mt-7">
              Discover the event
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
