import { Plus } from 'lucide-react'

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
  return (
    <section id="faq" className="faq-simple" data-scroll="">
      <header className="faq-simple__head" data-reveal="">
        <div><span className="a-sticker">FAQ</span><h2>Answers before we arrive.</h2></div>
        <div><p>Booking details, what we clean and what happens after the visit—all in one place.</p><a href="/contact">Ask us anything <span>→</span></a></div>
      </header>

      <div className="faq-simple__groups">
        {FAQ_GROUPS.map((group, groupIndex) => (
          <section className="faq-group" key={group.title} data-reveal="">
            <div className="faq-group__label"><span>0{groupIndex + 1}</span><h3>{group.title}</h3><small>{group.items.length} questions</small></div>
            <div>
              {group.items.map(([question, answer]) => (
                <details className="faq-item" key={question}>
                  <summary><span>{question}</span><Plus /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
