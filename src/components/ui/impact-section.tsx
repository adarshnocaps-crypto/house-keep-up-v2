import { useEffect, useState } from 'react'
import { rooms } from '../../assets/images.js'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

/**
 * Expanding case-study cards (adapted from the provided impact-section:
 * Next-only bits removed, reskinned to the site's exact clone palette —
 * pink #FFA9E9 / green #09543D / cocoa #461E10 / cream #FFFDF7 — with
 * Anton metrics, 30px radii and local imagery).
 */
const impactCards = [
  {
    id: 0,
    metric: '3x',
    title: 'Faster Airbnb turnovers',
    description:
      'Same-day turnover cleans with a host checklist tripled how fast a Lincoln Park host could rebook between guests.',
    image: rooms.renovated,
    bg: 'bg-pink',
    text: 'text-cocoa',
    isFeature: true,
  },
  {
    id: 1,
    metric: '45%',
    title: 'Less weekend chore time',
    description:
      'Recurring bi-weekly visits gave a Wicker Park family nearly half their weekend back — no more Saturday scrub sessions.',
    image: rooms.living,
    bg: 'bg-cream',
    text: 'text-primary',
  },
  {
    id: 2,
    metric: '98%',
    title: 'On-time arrival rate',
    description:
      'Dedicated teams and tight routing keep us on schedule across Chicagoland — with a text when we are on the way.',
    image: rooms.officeLobby,
    bg: 'bg-primary',
    text: 'text-cream',
  },
  {
    id: 3,
    metric: '100%',
    title: 'Re-clean guarantee',
    description:
      'Any spot not right within 24 hours gets re-cleaned free. Every client, every visit, no fine print.',
    image: rooms.bathroomDeep,
    bg: 'bg-cocoa',
    text: 'text-cream',
  },
]

export default function ImpactSection() {
  const [openCard, setOpenCard] = useState(0)
  // Desktop: the row is a fixed 500px and cards stretch to fill it, so only
  // width animates (no height jump). Mobile: cards stack, so height animates
  // between closed and open.
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const openHeight = 500
  const closedHeight = 320

  const step = (dir: number) =>
    setOpenCard((c) => (c + dir + impactCards.length) % impactCards.length)

  return (
    <section className="w-full py-12 sm:py-16 md:py-20" data-scroll="">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 md:px-8">
        <div className="mb-8 flex items-start justify-between gap-6 sm:mb-10">
          <div className="max-w-[620px]">
            <p className="tx-xs mb-4" data-reveal="">
              Proof of the keep-up
            </p>
            <h2 className="tx-l text-primary">Results that speak for themselves</h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed">
              From turnovers to guarantees, our clients see the difference in
              every metric that matters.
            </p>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              aria-label="Previous case study"
              onClick={() => step(-1)}
              className="a-button -round"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next case study"
              onClick={() => step(1)}
              className="a-button -round"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:h-[500px] md:flex-row md:items-stretch md:gap-4">
          {impactCards.map((card, idx) => {
            const isOpen = openCard === idx

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setOpenCard(idx)}
                onFocus={() => setOpenCard(idx)}
                onClick={() => setOpenCard(idx)}
                tabIndex={0}
                animate={{ flex: isOpen ? 4.8 : 1.5 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className={`${card.bg} ${card.text} relative cursor-pointer overflow-hidden rounded-[30px] shadow-[0_0_100px_rgba(0,0,0,0.08)]`}
              >
                <motion.div
                  animate={{
                    height: isDesktop ? '100%' : isOpen ? openHeight : closedHeight,
                  }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full"
                >
                  {isOpen ? (
                    <div className="flex h-full min-h-[440px] flex-col p-6 sm:p-8 md:p-10">
                      <div className="max-w-[320px]">
                        <p className="text-[11px] font-semibold uppercase tracking-[1.3px] opacity-80">
                          Case study
                        </p>
                        <h3 className="tx-s mt-2">{card.title}</h3>
                        <p className="mt-3 text-[14px] leading-relaxed opacity-90">
                          {card.description}
                        </p>
                        <button
                          type="button"
                          className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.4px]"
                        >
                          Read case study <ArrowRight size={14} />
                        </button>
                      </div>

                      <div className="mt-6 grid flex-1 grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_minmax(0,1.1fr)]">
                        <div className="min-w-0">
                          <p className="font-display text-[52px] leading-none sm:text-[60px] md:text-[68px]">
                            {card.metric}
                          </p>
                          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[1.2px]">
                            {card.title}
                          </p>
                        </div>

                        <div className="relative h-[150px] w-full overflow-hidden rounded-[20px] sm:h-[170px] md:h-[190px]">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col justify-between p-5 sm:p-6 md:p-7">
                      <div />
                      <div>
                        <p className="font-display text-[28px] leading-none sm:text-[32px] md:text-[36px]">
                          {card.metric}
                        </p>
                        <p className="mt-2 max-w-[130px] text-[11px] font-semibold uppercase tracking-[1.2px]">
                          {card.title}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
