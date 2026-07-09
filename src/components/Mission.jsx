import { Title } from '../lib/scrollfx.jsx'
import { ArrowDoodle, FlowLine } from './Decor.jsx'

const CARDS = [
  {
    title: 'A stress-free clean',
    body: 'Total transparency: flat quotes, clear checklists and honest timing, so you always know exactly what your clean includes.',
    wrap: 'lg:mr-[33%]',
    delay: '0s',
  },
  {
    title: 'Effortless booking',
    body: 'Book online in minutes with a process built for busy people — reminders, easy rescheduling and keyless entry options.',
    wrap: 'lg:ml-[26%] lg:-mt-10',
    delay: '0.12s',
  },
  {
    title: 'A team that shows up',
    body: 'The same trusted, background-checked cleaners visit after visit — on time, every time, greeting you like family.',
    wrap: 'lg:mr-[20%] lg:-mt-6',
    delay: '0.24s',
  },
]

/**
 * Mission section: centered Anton title, then three white shadow cards
 * scattered left/right that enter with a slight rotation.
 */
export default function Mission() {
  return (
    <section className="relative mx-auto max-w-[1320px] px-6 pb-32 pt-28" data-scroll="">
      <FlowLine className="-z-10" />

      <div className="text-center">
        <p className="tx-xs mb-6" data-reveal="">
          Your place, off your plate
        </p>
        <Title
          lines={['Beyond a simple', 'cleaning visit:', { text: 'our mission' }]}
        />
        <ArrowDoodle className="mx-auto mt-4 hidden w-[110px] translate-x-[130px] md:block" />
      </div>

      <div className="mt-14 flex flex-col gap-8">
        {CARDS.map(({ title, body, wrap, delay }) => (
          <div
            key={title}
            className={`o-scatter__item ${wrap}`}
            style={{ '--delay': delay }}
          >
            <div className="m-card max-w-[720px]">
              <h3 className="tx-m">{title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center" data-reveal="">
        <a href="#services" className="a-button">
          Discover our services
        </a>
      </div>
    </section>
  )
}
