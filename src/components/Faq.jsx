import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { Title } from '../lib/scrollfx.jsx'
import { stock } from '../assets/images.js'

const FAQ_GROUPS = [
  {
    title: 'Booking & scheduling',
    items: [
      ['How do I schedule a cleaning?', 'Book online for the fastest confirmation, or call us at (708) 737-8722 if you would rather schedule with a person.'],
      ['How far ahead should I book?', 'A week ahead gives you the best choice of times. We also accept last-minute requests whenever a local team is available.'],
      ['Do I need to be home?', 'No. Add your door code, lockbox, concierge or other entry instructions when booking and we can clean while you are out.'],
      ['Can I request the same cleaners?', 'Yes. We prioritize the same professional for recurring visits, subject to availability, so your team learns your home and preferences.'],
      ['How many cleaners will arrive?', 'Team size depends on your home and service. Most appointments use one to three professionals, with larger teams assigned to bigger or time-sensitive jobs.'],
      ['What is the cancellation policy?', 'Cancel or reschedule at least 24 hours before arrival at no cost. Changes inside 24 hours or an inability to enter may incur a $50 fee.'],
    ],
  },
  {
    title: 'Services & your home',
    items: [
      ['Do you bring supplies and equipment?', 'Yes. Your team arrives with the products and equipment needed for the booked service. Note any product preferences or allergies before the visit.'],
      ['How long does a cleaning take?', 'Most homes take two to four hours. Home size, condition, service type and selected extras can make the appointment shorter or longer.'],
      ['Can I add extra cleaning tasks?', 'Yes. Add items such as the oven, refrigerator, cabinets, interior windows or laundry while booking. Contact us for anything not listed.'],
      ['Are there services you do not provide?', 'We focus on interior housekeeping. Exterior maintenance, hazardous-material removal, pest treatment and licensed repair work are outside our scope.'],
      ['Can I request carpet or window cleaning?', 'Tell us what you need before booking. We will confirm whether our team can handle it as an add-on or recommend the appropriate specialist.'],
    ],
  },
  {
    title: 'Payments & peace of mind',
    items: [
      ['When is my card charged?', 'Your card is saved securely when you book and charged after the cleaning is completed. The final amount can include approved extras, your tip and documented paid parking.'],
      ['Should I tip the cleaning team?', 'Tips are optional and always appreciated. You can select a percentage or custom amount during booking, and it goes directly to the cleaning team.'],
      ['What if something was missed?', 'Contact us within 24 hours with the details. We will arrange a complimentary re-clean of the areas that did not meet the checklist.'],
      ['Do you guarantee the cleaning?', 'Yes. Our satisfaction promise covers a prompt re-clean when a concern is reported within the stated window.'],
      ['How do you protect my home?', 'Professionals are screened and trained, and House Keep Up is bonded and insured. Entry information is used only to complete your scheduled service.'],
    ],
  },
]

export default function Faq() {
  // Single-open accordion (like the reference). First question opens by default.
  const [openKey, setOpenKey] = useState('0-0')

  return (
    <section id="faq" className="mx-auto max-w-[1320px] px-6 py-24" data-scroll="">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        {/* ---- left: heading, photo, CTA ---- */}
        <div>
          <div className="lg:sticky lg:top-32">
            <p data-reveal="">
              <span className="a-sticker">FAQ</span>
            </p>
            <div className="mt-6" data-reveal="">
              <Title align="start" lines={['Answers before', { text: 'we arrive' }]} className="text-left" />
            </div>
            <p
              className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-primary/75"
              data-reveal=""
            >
              Booking details, what we clean and what happens after the visit — all
              in one place. Still stuck? We are one call away.
            </p>

            <figure
              className="relative mt-9 hidden overflow-hidden rounded-[30px] shadow-[0_30px_80px_rgba(9,84,61,0.14)] lg:block"
              data-reveal=""
              style={{ '--delay': '0.15s' }}
            >
              <img
                src={stock.bedroom}
                alt="A freshly cleaned, restful bedroom by House Keep Up"
                loading="lazy"
                decoding="async"
                className="h-[300px] w-full object-cover"
              />
            </figure>

            <div className="mt-9" data-reveal="">
              <a href="/contact" className="a-button">
                Ask us anything
              </a>
            </div>
          </div>
        </div>

        {/* ---- right: accordion ---- */}
        <div className="flex flex-col gap-9">
          {FAQ_GROUPS.map((group, gi) => (
            <div key={group.title} data-reveal="">
              <h3 className="faq-group-title">{group.title}</h3>
              <ul className="mt-1">
                {group.items.map(([question, answer], ii) => {
                  const key = `${gi}-${ii}`
                  const isOpen = openKey === key
                  return (
                    <li key={question} className="faq-row">
                      <button
                        type="button"
                        className="faq-row__q"
                        aria-expanded={isOpen}
                        onClick={() => setOpenKey(isOpen ? null : key)}
                      >
                        <span>{question}</span>
                        <span className="faq-row__icon" aria-hidden="true">
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </button>
                      <div className="faq-a" data-open={isOpen}>
                        <div className="faq-a__inner">
                          <p>{answer}</p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
