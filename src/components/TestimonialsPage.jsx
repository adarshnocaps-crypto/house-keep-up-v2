import { Quote } from 'lucide-react'
import { FaYelp } from 'react-icons/fa6'
import { SiNextdoor } from 'react-icons/si'
import { Title } from '../lib/scrollfx.jsx'
import { PLATFORMS } from '../lib/testimonials.js'

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

const ICONS = {
  google: { Icon: GoogleLogo, color: null },
  yelp: { Icon: FaYelp, color: '#d32323' },
  nextdoor: { Icon: SiNextdoor, color: '#0b7d45' },
}

function Stars({ className = '' }) {
  return (
    <span className={`inline-flex gap-1 ${className}`} aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M10 1.7l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.3l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.7z" />
        </svg>
      ))}
    </span>
  )
}

function Initials({ name }) {
  const letters = name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('')
  return <span className="ts-avatar ts-avatar--initials" aria-hidden="true">{letters}</span>
}

function ReviewCard({ review, platform, index }) {
  const { name, text, avatar, location, date, elite } = review
  const meta = [location, date].filter(Boolean).join(' · ')
  return (
    <div
      className="ts-card o-scatter__item"
      style={{ '--delay': `${(index % 3) * 0.08}s` }}
    >
      <Quote className="ts-cardMark" aria-hidden="true" />
      <Stars className="ts-cardStars" />
      <p className="ts-cardText">{text}</p>
      <div className="ts-cardFoot">
        {avatar
          ? <img className="ts-avatar" src={avatar} alt={`${name} profile photo`} loading="lazy" />
          : <Initials name={name} />}
        <span className="min-w-0 flex-1">
          <strong>
            {name}
            {elite && <em className="ts-elite">Elite</em>}
          </strong>
          <small>{meta || `${platform.name} testimonial`}</small>
        </span>
      </div>
    </div>
  )
}

export default function TestimonialsPage() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="mx-auto max-w-[1100px] px-6 pb-20 pt-[150px]">
            <p className="tx-xs mb-6" data-reveal="">
              Testimonials &middot; Chicagoland
            </p>
            <Title
              as="h1"
              align="start"
              lines={['Testimonials from', { text: 'real Chicago homes' }]}
              className="text-left text-cream"
            />
            <p
              className="mt-8 max-w-2xl text-[16px] leading-relaxed text-cream/95"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              Every word below was written by a customer on Google, Yelp or
              Nextdoor — never by us, and republished here word for word.
            </p>
            <div className="ts-jump mt-10" data-reveal="" style={{ '--delay': '0.8s' }}>
              {PLATFORMS.map(({ id, name, reviews }) => (
                <a key={id} href={`#${id}`} className="ts-jumpChip">
                  {name} <span>{reviews.length || '—'}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Platform summary ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pt-20" data-scroll="">
        <div className="ts-scores">
          {PLATFORMS.map(({ id, name, score, detail }) => {
            const { Icon, color } = ICONS[id]
            return (
              <div key={id} className="ts-score">
                <span className="ts-scoreIcon"><Icon style={color ? { color } : undefined} /></span>
                <strong>{score}</strong>
                <span className="ts-scoreDetail">{detail}</span>
                <span className="ts-scoreName">on {name}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* ---- One section per platform ---- */}
      {PLATFORMS.map((platform) => {
        const { id, name, heading, eyebrow, blurb, reviews } = platform
        const { Icon, color } = ICONS[id]
        return (
          <section key={id} id={id} className="mx-auto max-w-[1180px] scroll-mt-28 px-6 pt-20" data-scroll="">
            <div className="ts-head">
              <div>
                <p className="tx-xs mb-3 flex items-center gap-2.5 text-magenta" data-reveal="">
                  <Icon className="h-5 w-5" style={color ? { color } : undefined} /> {eyebrow}
                </p>
                <h2 className="tx-l font-display text-primary" data-reveal="" style={{ '--delay': '0.1s' }}>
                  {heading}
                </h2>
                <p
                  className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-primary/70"
                  data-reveal=""
                  style={{ '--delay': '0.2s' }}
                >
                  {blurb}
                </p>
              </div>
            </div>

            {reviews.length ? (
              <div className="ts-grid">
                {reviews.map((review, i) => (
                  <ReviewCard key={review.name} review={review} platform={platform} index={i} />
                ))}
              </div>
            ) : (
              <div className="ts-pending">
                <span className="ts-pendingIcon"><Icon style={color ? { color } : undefined} /></span>
                <strong>Our {name} testimonials are on the way</strong>
                <p>
                  We haven&rsquo;t republished these here yet — we only post them
                  word for word, so they go up as we copy them across.
                </p>
              </div>
            )}
          </section>
        )
      })}

      {/* ---- Closing CTA ---- */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24 pt-20" data-scroll="">
        <div className="ts-cta">
          <span className="ts-ctaBar" aria-hidden="true" />
          <p className="tx-xs mb-4 text-pink" data-reveal="">Ready when you are</p>
          <h2 className="tx-l font-display text-cream" data-reveal="" style={{ '--delay': '0.1s' }}>
            Be our next testimonial
          </h2>
          <p
            className="mx-auto mt-4 max-w-[46ch] text-[15px] leading-relaxed text-cream/85"
            data-reveal=""
            style={{ '--delay': '0.2s' }}
          >
            Free estimate in about two minutes, no card needed — and a 24-hour
            re-clean guarantee if anything is missed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4" data-reveal="" style={{ '--delay': '0.3s' }}>
            <a href="/book-now" className="a-button">Book a cleaning</a>
            <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
          </div>
        </div>
      </section>
    </>
  )
}
