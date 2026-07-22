import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import TeamMemberCard from './ui/team-member-card.jsx'
import member1 from '../assets/images/team/member-1.jpg'
import member2 from '../assets/images/team/member-2.jpg'
import member3 from '../assets/images/team/member-3.jpg'

/**
 * About Us page (/about). Standard brand hero (green rounded container) over a
 * cream page, then a bold statement, a curvy dashed "journey" timeline with
 * layered milestone cards, the team, and a CTA. Depth via soft shadows and
 * layered rings; motion via framer-motion directional reveals.
 */
const ease = [0.22, 1, 0.36, 1]

const JOURNEY = [
  { no: '01', year: '2016', title: 'It started with one mop', body: 'Maria cleaned her first Chicago apartment. Word spread down the block within a week.', side: 'left', x: 36, y: 21.4 },
  { no: '02', year: '2019', title: 'A team worth trusting', body: 'We built a background-checked, trained crew — the same faces, home after home.', side: 'right', x: 64, y: 42.9 },
  { no: '03', year: '2021', title: 'All of Chicagoland', body: 'From Oak Park to Evanston, our vans became a familiar sight across the metro.', side: 'left', x: 36, y: 64.3 },
  { no: '04', year: '2024', title: '12,000 homes & counting', body: 'Tens of thousands of cleans later, we still treat every space like our own.', side: 'right', x: 64, y: 85.7 },
]

const TEAM = [
  {
    position: 'left',
    jobPosition: 'Founder & Operations',
    firstName: 'Maria',
    lastName: 'Alvarez',
    imageUrl: member1,
    description:
      'Maria started House Keep Up in 2016 with one mop and a promise. She still hand-picks every cleaner and knows most clients by name.',
  },
  {
    position: 'right',
    jobPosition: 'Head of Cleaning',
    firstName: 'David',
    lastName: 'Okafor',
    imageUrl: member2,
    description:
      'David builds the checklists our crews clean by and trains every new team member — so a deep clean means the same thing, every home.',
  },
  {
    position: 'left',
    jobPosition: 'Client Care Lead',
    firstName: 'Priya',
    lastName: 'Nair',
    imageUrl: member3,
    description:
      'Priya makes booking effortless and follow-ups painless. If you ever call the office, chances are she is the friendly voice on the line.',
  },
]

function Step({ s }) {
  const reduce = useReducedMotion()
  const right = s.side === 'right'
  return (
    <div className={`abx-step abx-step--${s.side}`} style={{ top: `${s.y}%` }}>
      <motion.div
        className="abx-stepInner"
        initial={reduce ? {} : { opacity: 0, x: right ? 44 : -44 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 0.6, ease }}
      >
        <motion.span
          className="abx-stepNo"
          initial={reduce ? {} : { opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
        >
          {s.no}
        </motion.span>
        <div className="abx-stepCard">
          <p className="abx-stepYear">{s.year}</p>
          <h3 className="abx-stepTitle">{s.title}</h3>
          <p className="abx-stepText">{s.body}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="abx">
      {/* ============ STANDARD HERO ============ */}
      <section className="px-[15px] pt-[15px]">
        <div className="is-inview relative overflow-hidden rounded-[30px] bg-primary text-cream">
          <div className="relative mx-auto max-w-[1100px] px-6 pb-16 pt-[150px] text-center">
            <p className="tx-xs mb-6" data-reveal="">Our story · Est. 2016</p>
            <Title as="h1" lines={['Cleaning Chicago', { text: 'like family' }]} className="text-cream" />
            <p
              className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-cream/90"
              data-reveal=""
              style={{ '--delay': '0.6s' }}
            >
              House Keep Up began with a simple belief — a clean home should feel
              effortless. This is how one mop became Chicago's most trusted crew.
            </p>
          </div>
        </div>
      </section>

      {/* ============ STATEMENT ============ */}
      <section className="abx-statement" data-scroll="">
        <span className="abx-deco abx-deco--ringA" aria-hidden="true" />
        <p className="abx-statementText" data-reveal="">
          We don't just clean spaces. We hand people back their weekends, their
          calm and a home that finally feels <em>done</em>.
        </p>
        <p className="abx-statementSub" data-reveal="" style={{ '--delay': '0.15s' }}>
          Flat pricing, the same trusted faces and a 24-hour guarantee on every
          visit — that's kept us busy across Chicagoland for the better part of a decade.
        </p>
      </section>

      {/* ============ CURVY STORY PATH ============ */}
      <section className="abx-journey" data-scroll="">
        <p className="abx-journeyKick" data-reveal="">the journey</p>
        <h2 className="abx-journeyTitle" data-reveal="" style={{ '--delay': '0.1s' }}>Eight years, one promise</h2>

        <div className="abx-path">
          <svg className="abx-pathSvg" viewBox="0 0 1000 1400" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="journey-line" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#09543d"/><stop offset=".52" stopColor="#d65da2"/><stop offset="1" stopColor="#09543d"/></linearGradient></defs>
            <path
              className="abx-pathLine"
              d="M500,10 C500,130 360,160 360,300 C360,390 520,405 525,310 C530,235 408,245 430,360 C452,475 640,460 640,600 C640,692 505,720 500,638 C495,565 650,565 620,700 C592,824 360,780 360,900 C360,1010 520,1025 530,930 C540,842 405,865 440,1010 C470,1130 640,1088 640,1200 C640,1310 525,1340 500,1390"
              fill="none"
            />
            {JOURNEY.map((s) => (
              <circle key={s.no} className="abx-pathDot" cx={s.x * 10} cy={s.y * 14} r="8" />
            ))}
          </svg>

          {JOURNEY.map((s) => <Step key={s.no} s={s} />)}
        </div>

        <p className="abx-journeyEnd" data-reveal="">The journey never stops</p>
      </section>

      {/* ============ MEET THE TEAM ============ */}
      <section className="mx-auto max-w-[1180px] px-6 pt-8" data-scroll="">
        <div className="mb-4 text-center">
          <p className="abx-journeyKick" data-reveal="">the people behind the clean</p>
          <Title lines={['Meet the', { text: 'team' }]} />
        </div>
        <div className="flex flex-col">
          {TEAM.map((m) => (
            <TeamMemberCard key={`${m.firstName}-${m.lastName}`} {...m} />
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24 pt-16" data-scroll="">
        <div className="abx-cta">
          <div>
            <p className="font-display text-[clamp(1.8rem,4vw,2.8rem)] uppercase leading-tight text-cream">
              Add your home to the story
            </p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream/85">
              Get a free estimate in about two minutes — no card needed, same-week
              slots across Chicagoland.
            </p>
          </div>
          <div className="flex flex-none flex-wrap gap-4">
            <a href="/book" className="a-button">Book now <ArrowRight className="h-4 w-4" /></a>
            <a href="/contact" className="a-button -cream">Contact us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
