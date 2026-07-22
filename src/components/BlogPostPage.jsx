import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock } from 'lucide-react'
import { POSTS, findPost } from '../lib/blog.js'

/**
 * Single blog post page (/blog/<slug>): a clean editorial hero, the article
 * body rendered from content blocks, an inline CTA and a "keep reading" grid.
 */
export default function BlogPostPage({ slug }) {
  const post = findPost(slug)

  if (!post) {
    return (
      <section className="px-6 pb-32 pt-[180px] text-center">
        <h1 className="tx-l">Article not found</h1>
        <a href="/blog" className="a-button mt-8">Back to the journal</a>
      </section>
    )
  }

  const others = POSTS.filter((p) => p.slug !== slug)

  return (
    <>
      {/* ---- Editorial hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="bp-hero is-inview">
          <div className="bp-heroContent">
            <a href="/blog" className="bp-back" data-reveal="">
              <ArrowLeft className="h-4 w-4" /> The journal
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-3" data-reveal="" style={{ '--delay': '0.1s' }}>
              <span className="a-tag bg-pink text-cocoa">{post.category}</span>
              <span className="bp-heroMeta"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
              <span className="bp-heroMeta">{post.date}</span>
            </div>
            <h1 className="bp-heroTitle" data-reveal="" style={{ '--delay': '0.2s' }}>
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ---- Body ---- */}
      <article className="mx-auto max-w-[720px] px-6 pt-16" data-scroll="">
        <p className="bp-lede" data-reveal="">{post.excerpt}</p>
        <div className="bp-body">
          {post.body.map((block, i) => {
            if (block.h) return <h2 key={i} className="bp-h2">{block.h}</h2>
            if (block.list) {
              return (
                <ul key={i} className="bp-list">
                  {block.list.map((item) => (
                    <li key={item}>
                      <span className="bp-tick"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }
            return <p key={i} className="bp-p">{block.p}</p>
          })}
        </div>

        {/* inline CTA */}
        <div className="bp-cta">
          <span className="bp-ctaBar" aria-hidden="true" />
          <p className="font-display text-[clamp(1.5rem,3vw,2.2rem)] uppercase leading-tight text-cream">
            Ready for a spotless home?
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-cream/85">
            Get a free estimate in about two minutes — no card needed.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="/book" className="a-button">Book now <ArrowRight className="h-4 w-4" /></a>
            <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
          </div>
        </div>
      </article>

      {/* ---- More posts ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24 pt-20" data-scroll="">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] uppercase text-primary">Keep reading</h2>
          <a href="/blog" className="a-link">All articles</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {others.map((p, i) => (
            <a
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="bl-card o-scatter__item"
              style={{ '--delay': `${i * 0.08}s` }}
            >
              <div className="bl-cardImg">
                <img src={p.img} alt={p.title} loading="lazy" />
                <span className="bl-cardTag a-tag bg-pink text-cocoa">{p.category}</span>
              </div>
              <div className="bl-cardBody">
                <span className="bl-date">{p.readTime}</span>
                <h3 className="bl-cardTitle">{p.title}</h3>
                <span className="bl-cardLink">Read the article <ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
