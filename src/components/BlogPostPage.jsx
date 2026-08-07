import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock, HeartHandshake, ListTree, PhoneCall } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { AUTHOR, POSTS, findPost, headingId, serviceForPost } from '../lib/blog.js'
import { findService } from '../lib/services.js'

/**
 * Single blog post page (/blog/<slug>): editorial hero, then a two-column
 * reading layout — article on the left, a sticky rail on the right holding the
 * table of contents and a service prompt — followed by the author, an inline
 * CTA and a "keep reading" grid.
 */
export default function BlogPostPage({ slug }) {
  const post = findPost(slug)

  // headings drive both the anchor ids in the body and the contents list
  const headings = useMemo(
    () => (post?.body ?? []).filter((b) => b.h).map((b) => ({ text: b.h, id: headingId(b.h) })),
    [post],
  )
  const [activeId, setActiveId] = useState('')

  // highlight the section currently in view; the top band keeps the marker on
  // the heading you are reading rather than the one about to scroll in
  useEffect(() => {
    if (!headings.length) return undefined
    const seen = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => seen.set(entry.target.id, entry.isIntersecting))
        const current = headings.find(({ id }) => seen.get(id))
        if (current) setActiveId(current.id)
      },
      { rootMargin: '-96px 0px -70% 0px' },
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (!post) {
    return (
      <section className="px-6 pb-32 pt-[180px] text-center">
        <h1 className="tx-l">Article not found</h1>
        <a href="/blog" className="a-button mt-8">Back to the journal</a>
      </section>
    )
  }

  const others = POSTS.filter((p) => p.slug !== slug)
  const author = { ...AUTHOR, ...(post.author ?? {}) }
  const initials = author.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('')
  const service = findService(serviceForPost(post))

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="mx-auto max-w-[1100px] px-6 pb-20 pt-[150px]">
            <a href="/blog" className="bp-back" data-reveal="">
              <ArrowLeft className="h-4 w-4" /> The journal
            </a>
            <div className="mt-7 flex flex-wrap items-center gap-3" data-reveal="" style={{ '--delay': '0.1s' }}>
              <span className="a-tag bg-pink text-cocoa">{post.category}</span>
              <span className="bp-heroMeta"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
              <span className="bp-heroMeta">{post.date}</span>
            </div>
            <h1 className="bp-heroTitle" data-reveal="" style={{ '--delay': '0.2s' }}>
              {post.title}
            </h1>
            <p
              className="mt-7 max-w-2xl text-[16px] leading-relaxed text-cream/90"
              data-reveal=""
              style={{ '--delay': '0.3s' }}
            >
              {post.excerpt}
            </p>
            <p className="bp-heroBy" data-reveal="" style={{ '--delay': '0.4s' }}>
              {author.avatar
                ? <img className="bp-byMark" src={author.avatar} alt="" />
                : <span className="bp-byMark" aria-hidden="true">{initials}</span>}
              By {author.name} &middot; {author.role}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Body + rail ---- */}
      <div className="bp-layout" data-scroll="">
        <article className="bp-main">
          <figure className="bp-lead" data-reveal="">
            <img src={post.img} alt={post.title} />
          </figure>
          <div className="bp-body">
            {post.body.map((block, i) => {
              if (block.h) {
                return (
                  <h2 key={i} id={headingId(block.h)} className="bp-h2">{block.h}</h2>
                )
              }
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

          {/* author */}
          <div className="bp-author" data-reveal="">
            {author.avatar
              ? <img className="bp-authorAvatar" src={author.avatar} alt={`${author.name}, ${author.role}`} loading="lazy" />
              : <span className="bp-authorAvatar" aria-hidden="true">{initials}</span>}
            <div>
              <p className="bp-authorKicker">Written by</p>
              <p className="bp-authorName">{author.name}</p>
              <p className="bp-authorRole">{author.role}</p>
              <p className="bp-authorBio">{author.bio}</p>
              <div className="bp-authorSocial">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label={`${author.name} on Facebook`}><FaFacebookF /></a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label={`${author.name} on Instagram`}><FaInstagram /></a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label={`${author.name} on LinkedIn`}><FaLinkedinIn /></a>
              </div>
            </div>
          </div>

          {/* inline CTA */}
          <div className="bp-cta">
            <span className="bp-ctaBar" aria-hidden="true" />
            <p className="tx-xs mb-4 text-pink">Ready when you are</p>
            <p className="tx-l font-display text-cream">
              Ready for a spotless home?
            </p>
            <p className="mx-auto mt-3 max-w-[42ch] text-[15px] leading-relaxed text-cream/85">
              Get a free estimate in about two minutes — no card needed.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href="/book-now" className="a-button">Book now <ArrowRight className="h-4 w-4" /></a>
              <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
            </div>
          </div>
        </article>

        <aside className="bp-rail">
          <div className="bp-railInner">
            {headings.length > 1 && (
              <nav className="bp-toc" aria-label="Table of contents">
                <p className="bp-tocTitle"><ListTree className="h-4 w-4" /> In this article</p>
                <ol>
                  {headings.map(({ text, id }) => (
                    <li key={id}>
                      {/* absolute: the router resolves hrefs against the origin,
                          so a bare "#id" would jump to the homepage */}
                      <a href={`/blog/${slug}#${id}`} className={activeId === id ? 'is-on' : ''}>{text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {service && (
              <div className="bp-promo">
                <p className="bp-promoKicker">{service.badge}</p>
                <p className="bp-promoTitle">{service.title}</p>
                <p className="bp-promoText">{service.blurb}</p>
                <p className="bp-promoPrice">{service.price}</p>
                <a href={`/services/${service.id}`} className="a-button w-full">
                  See what&rsquo;s included <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}

            <div className="bp-give">
              <span className="bp-giveMark" aria-hidden="true"><HeartHandshake className="h-5 w-5" strokeWidth={1.8} /></span>
              <p className="bp-giveKicker">Community clean</p>
              <p className="bp-giveTitle">A free clean, on us</p>
              <p className="bp-giveText">
                We set aside cleans for Chicago neighbours who could use a hand —
                someone recovering from illness, a family going through a hard
                stretch, or a person who quietly looks after everyone else.
              </p>
              <ul className="bp-giveList">
                {['Nominate a neighbour', 'No cost, no catch', 'Chicagoland households'].map((item) => (
                  <li key={item}><Check className="h-3 w-3" strokeWidth={3} /> {item}</li>
                ))}
              </ul>
              <a href="/contact" className="bp-giveLink">
                Nominate someone <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <a href="tel:+17087378722" className="bp-call">
              <PhoneCall className="h-5 w-5" strokeWidth={1.8} />
              <span>
                <strong>Questions first?</strong>
                (708) 737-8722
              </span>
            </a>
          </div>
        </aside>
      </div>

      {/* ---- More posts ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24 pt-20" data-scroll="">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="tx-xs mb-3 text-magenta" data-reveal="">More from the journal</p>
            <h2 className="tx-l font-display text-primary" data-reveal="" style={{ '--delay': '0.1s' }}>
              Keep reading
            </h2>
          </div>
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
                <span className="bl-date">{p.date} &middot; {p.readTime}</span>
                <h3 className="bl-cardTitle">{p.title}</h3>
                <p className="bl-cardExcerpt">{p.excerpt}</p>
                <span className="bl-cardLink">Read the article <ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
