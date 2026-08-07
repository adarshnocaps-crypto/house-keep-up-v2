import { ArrowRight, Users } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import { stock } from '../assets/images.js'

/**
 * Careers page (/hiring). The path is carried over from the previous site so
 * its inbound links and search ranking land here directly.
 *
 * Written for someone deciding whether this job beats the one they have, so
 * the sections answer the questions asked on a first call rather than listing
 * adjectives. Deliberately no pay figures, headcounts or timelines: those are
 * promises to an applicant, and the site has no source for them.
 *
 * Applications route to the existing phone/email rather than a new form:
 * there is no backend endpoint for job applications, and a form that silently
 * goes nowhere is worse than an honest mailto.
 */
const TERMS = [
  ['Pay', 'Competitive hourly rates on a predictable schedule. Tips go to the cleaner who earned them.'],
  ['Hours', 'Full-time and part-time routes across Chicagoland. Tell us the days you can work and we build around them.'],
  ['Supplies', 'Products and equipment are stocked by us. You never buy your own.'],
  ['Support', 'Experienced cleaners you can call and an office that answers when you need a hand.'],
  ['Cover', 'Every job is insured and bonded, so you are covered on site.'],
  ['Next step', 'Team-lead and trainer roles open up first to people already on the crew.'],
]

const ROLES = [
  {
    no: '01',
    title: 'Residential Cleaner',
    type: 'Full-time / Part-time',
    blurb: 'Standard and deep cleans in homes across Chicago and nearby suburbs, working solo or in a pair.',
    wants: ['Cleaning experience preferred, not required', 'Reliable transport to job sites', 'Comfortable English or Spanish'],
  },
  {
    no: '02',
    title: 'Move-Out & Post-Construction Cleaner',
    type: 'Full-time',
    blurb: 'Detailed turnovers on empty properties and finished build sites, working from a checklist.',
    wants: ['Prior deep or construction cleaning experience', 'Comfortable with longer job durations', 'Strong attention to detail'],
  },
  {
    no: '03',
    title: 'Team Lead',
    type: 'Full-time',
    blurb: 'Run a small crew, set the standard on site and be the point of contact for clients during the visit.',
    wants: ['2+ years cleaning experience', 'Experience guiding a small team', 'Confident client communication'],
  },
]

const STEPS = [
  ['Get in touch', 'Call, text or email with your experience and the days you can work. No formal résumé needed.'],
  ['A short talk', 'A quick conversation about the work, the routes and what you are looking for.'],
  ['Meet the crew', 'Spend time alongside an experienced cleaner so you both know the fit is right.'],
  ['On the schedule', 'Route assigned, supplies handed over and your first week planned around you.'],
]

export default function HiringPage() {
  return (
    <div className="hr">
      {/* ---- Hero ---- */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="relative mx-auto grid max-w-[1100px] items-center gap-12 px-6 pb-16 pt-[150px] lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="tx-xs mb-6" data-reveal="">Now hiring across Chicagoland</p>
              <Title as="h1" align="start" lines={['Join the', { text: 'team' }]} className="text-left text-cream" />
              <p
                className="mt-6 max-w-xl text-[16px] leading-relaxed text-cream/90"
                data-reveal=""
                style={{ '--delay': '0.6s' }}
              >
                House Keep Up has cleaned Chicago homes since 2016. We are looking for
                dependable people who take pride in the work — and we make sure the
                job is worth showing up for.
              </p>
              <div className="mt-8 flex flex-wrap gap-3" data-reveal="" style={{ '--delay': '0.7s' }}>
                <a href="#apply" className="a-button -cream">Apply now <ArrowRight className="h-4 w-4" /></a>
                <a href="#roles" className="a-button">See open roles</a>
              </div>
            </div>

            <figure className="ct-heroPhoto" data-reveal="" style={{ '--delay': '0.5s' }}>
              <img src={stock.cleaningWindow} alt="A House Keep Up cleaner at work in a bright Chicago home" />
              <figcaption><Users className="h-4 w-4" /> Cleaning Chicago homes since 2016</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---- Terms, as a plain list of answers ---- */}
      <section className="hr-terms" data-scroll="">
        <div className="hr-terms__head">
          <div>
            <p className="tx-xs mb-6" data-reveal="">The straight answers</p>
            <Title as="h2" align="start" lines={['What the job', { text: 'is' }]} className="text-left" />
          </div>
          <p data-reveal="" style={{ '--delay': '0.2s' }}>
            The things people ask on the first call, answered before you have to
            ask them.
          </p>
        </div>
        <dl className="hr-terms__list">
          {TERMS.map(([term, body], i) => (
            <div key={term} className="hr-term" data-reveal="" style={{ '--delay': `${0.05 + i * 0.05}s` }}>
              <dt>{term}</dt>
              <dd>{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---- Open roles ---- */}
      <section id="roles" className="hr-roles" data-scroll="">
        <p className="tx-xs mb-6" data-reveal="">Open positions</p>
        <Title as="h2" align="start" lines={['Roles we are', { text: 'hiring' }]} className="text-left" />
        <div className="hr-roles__list">
          {ROLES.map(({ no, title, type, blurb, wants }, i) => (
            <article key={title} className="hr-role" data-reveal="" style={{ '--delay': `${0.08 + i * 0.07}s` }}>
              <span className="hr-role__no">{no}</span>
              <div className="hr-role__body">
                <div className="hr-role__head">
                  <h3>{title}</h3>
                  <span className="hr-role__type">{type}</span>
                </div>
                <p className="hr-role__blurb">{blurb}</p>
                <ul className="hr-role__wants">
                  {wants.map((w) => <li key={w}>{w}</li>)}
                </ul>
              </div>
              <a href="#apply" className="hr-role__go" aria-label={`Apply for ${title}`}>
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ---- How hiring runs ---- */}
      <section className="hr-steps" data-scroll="">
        <p className="tx-xs mb-6" data-reveal="">From first call to first shift</p>
        <Title as="h2" align="start" lines={['How hiring', { text: 'works' }]} className="text-left" />
        <ol className="hr-steps__list">
          {STEPS.map(([label, body], i) => (
            <li key={label} className="hr-step" data-reveal="" style={{ '--delay': `${0.08 + i * 0.08}s` }}>
              <span className="hr-step__no">{i + 1}</span>
              <h3>{label}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Apply ---- */}
      <section id="apply" className="mx-auto max-w-[1100px] px-6 py-20" data-scroll="">
        <div className="is-inview overflow-hidden rounded-[30px] bg-primary px-6 py-16 text-center text-cream">
          <p className="tx-xs mb-6" data-reveal="">Ready when you are</p>
          <Title as="h2" align="center" lines={['Apply in a', { text: 'minute' }]} className="text-cream" />
          <p
            className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-cream/90"
            data-reveal=""
            style={{ '--delay': '0.6s' }}
          >
            Call or text us, or send an email with a little about your experience and
            the days you are available. No formal résumé needed — we reply to every
            application.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal="" style={{ '--delay': '0.7s' }}>
            <a href="tel:+17087378722" className="a-button -cream">Call (708) 737-8722</a>
            <a
              href="mailto:hello@housekeepup.com?subject=Job%20application"
              className="a-button"
            >
              Email your application <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
