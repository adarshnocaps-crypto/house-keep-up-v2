import { useState } from 'react'
import { ArrowRight, ArrowUpRight, BookOpen, Clock3 } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import { POSTS } from '../lib/blog.js'

const TOPICS = ['All', ...new Set(POSTS.map((post) => post.category))]

export default function BlogPage() {
  const [topic, setTopic] = useState('All')
  const [lead, ...rest] = POSTS
  const visible = topic === 'All' ? rest : POSTS.filter((post) => post.category === topic && post.slug !== lead.slug)

  return <main className="jr">
    <section className="jr-hero is-inview">
      <div className="jr-hero__inner">
        <div>
          <p className="jr-kicker" data-reveal=""><BookOpen/> The Keep-Up Journal</p>
          <Title as="h1" align="start" lines={['Useful notes for', { text: 'real Chicago homes' }]} className="text-cream" />
        </div>
      </div>
    </section>

    <section className="jr-main">
      <a href={`/blog/${lead.slug}`} className="jr-feature">
        <figure><img src={lead.img} alt=""/><figcaption>Editor’s pick · {lead.date}</figcaption></figure>
        <div className="jr-feature__body">
          <div className="jr-feature__top"><span>Featured story</span><span><Clock3/> {lead.readTime}</span></div>
          <p className="jr-category">{lead.category}</p>
          <h2>{lead.title}</h2>
          <p>{lead.excerpt}</p>
          <span className="jr-read">Read the story <ArrowRight/></span>
        </div>
      </a>

      <div className="jr-index" data-scroll="">
        <header>
          <div><span>From the journal</span><h2>Latest field notes</h2></div>
          <nav aria-label="Filter journal articles">
            {TOPICS.map((item) => <button type="button" key={item} className={topic === item ? 'is-active' : ''} onClick={() => setTopic(item)}>{item}</button>)}
          </nav>
        </header>

        <div className="jr-grid">
          {visible.length ? visible.map((post, index) => <a key={post.slug} href={`/blog/${post.slug}`} className="jr-card">
            <div className="jr-card__image"><img src={post.img} alt="" loading="lazy"/><span>0{index + 1}</span></div>
            <div className="jr-card__body">
              <div><span>{post.category}</span><time>{post.date} · {post.readTime}</time></div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="jr-card__link">Open article <ArrowUpRight/></span>
            </div>
          </a>) : <div className="jr-empty">The featured story above is our latest {topic.toLowerCase()} article.</div>}
        </div>
      </div>

      <section className="jr-news" data-scroll="">
        <div><span>One useful email a month</span><h2>Keep the good habits going.</h2></div>
        <p>Seasonal reminders, room-by-room advice and neighborhood offers. No filler, and no daily inbox clutter.</p>
        <a href="/contact">Join the list <ArrowRight/></a>
      </section>
    </section>
  </main>
}
