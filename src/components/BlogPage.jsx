import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import { POSTS } from '../lib/blog.js'

const TOPICS = ['All', ...new Set(POSTS.map((post) => post.category))]

export default function BlogPage() {
  const [topic, setTopic] = useState('All')
  const [lead, ...rest] = POSTS
  const visible = topic === 'All' ? rest : POSTS.filter((post) => post.category === topic && post.slug !== lead.slug)

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="mx-auto max-w-[1100px] px-6 pb-20 pt-[150px]">
            <p className="tx-xs mb-6" data-reveal="">
              The Keep-Up Journal &middot; Chicagoland
            </p>
            <Title
              as="h1"
              align="start"
              lines={['Useful notes for', { text: 'real Chicago homes' }]}
              className="text-left text-cream"
            />
            <p
              className="mt-8 max-w-2xl text-[16px] leading-relaxed text-cream/95"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              Room-by-room advice, seasonal checklists and the small things our
              crews learn in Chicago homes every week — written to be useful
              whether or not you ever book us.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Featured story ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pt-20" data-scroll="">
        <p className="tx-xs mb-4 text-magenta" data-reveal="">Editor&rsquo;s pick</p>
        <a href={`/blog/${lead.slug}`} className="bl-feature" data-reveal="" style={{ '--delay': '0.1s' }}>
          <div className="bl-featureImg">
            <img src={lead.img} alt="" />
          </div>
          <div className="bl-featureBody">
            <div className="bl-meta">
              <span className="a-tag bg-pink text-cocoa">{lead.category}</span>
              <span className="bl-date"><Clock3 className="h-4 w-4" /> {lead.readTime}</span>
              <span className="bl-date">{lead.date}</span>
            </div>
            <h2 className="bl-featureTitle">{lead.title}</h2>
            <p className="bl-featureExcerpt">{lead.excerpt}</p>
            <span className="bl-cardLink">Read the story <ArrowRight className="h-4 w-4" /></span>
          </div>
        </a>
      </section>

      {/* ---- Index ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pt-20" data-scroll="">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="tx-xs mb-3 text-magenta" data-reveal="">From the journal</p>
            <h2 className="tx-l font-display text-primary" data-reveal="" style={{ '--delay': '0.1s' }}>
              Latest field notes
            </h2>
          </div>
          <nav className="flex flex-wrap gap-2.5" aria-label="Filter journal articles">
            {TOPICS.map((item) => (
              <button
                type="button"
                key={item}
                className={`bl-topic ${topic === item ? 'is-on' : ''}`}
                onClick={() => setTopic(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {visible.length ? visible.map((post, i) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bl-card o-scatter__item"
              style={{ '--delay': `${i * 0.08}s` }}
            >
              <div className="bl-cardImg">
                <img src={post.img} alt="" loading="lazy" />
                <span className="bl-cardTag a-tag bg-pink text-cocoa">{post.category}</span>
              </div>
              <div className="bl-cardBody">
                <span className="bl-date">{post.date} &middot; {post.readTime}</span>
                <h3 className="bl-cardTitle">{post.title}</h3>
                <p className="bl-cardExcerpt">{post.excerpt}</p>
                <span className="bl-cardLink">Read the article <ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </a>
          )) : (
            <p className="bl-empty">
              The featured story above is our latest {topic.toLowerCase()} article.
            </p>
          )}
        </div>
      </section>

      {/* ---- Newsletter ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24 pt-20" data-scroll="">
        <div className="bl-news">
          <span className="bl-newsBar" aria-hidden="true" />
          <div>
            <p className="tx-xs mb-4 text-pink" data-reveal="">One useful email a month</p>
            <h2 className="tx-l font-display text-cream" data-reveal="" style={{ '--delay': '0.1s' }}>
              Keep the good habits going
            </h2>
            <p
              className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-cream/80"
              data-reveal=""
              style={{ '--delay': '0.2s' }}
            >
              Seasonal reminders, room-by-room advice and neighborhood offers.
              No filler, and no daily inbox clutter.
            </p>
          </div>
          <a href="/contact" className="a-button" data-reveal="" style={{ '--delay': '0.3s' }}>
            Join the list
          </a>
        </div>
      </section>
    </>
  )
}
