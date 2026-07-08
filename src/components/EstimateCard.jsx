const FIELDS = [
  {
    label: 'Service type',
    options: ['Select', 'Standard cleaning', 'Deep cleaning', 'Move-in / move-out', 'Office cleaning'],
  },
  {
    label: 'Home size',
    options: ['Select', 'Studio / 1 bed', '2 bedrooms', '3 bedrooms', '4+ bedrooms'],
  },
  {
    label: 'Frequency',
    options: ['Select', 'One-time', 'Weekly', 'Bi-weekly', 'Monthly'],
  },
  {
    label: 'ZIP code',
    options: ['Select', 'Chicago', 'Evanston', 'Oak Park', 'Skokie', 'Other Chicagoland'],
  },
]

/**
 * Big white rounded estimate card with underlined selects, a pink submit,
 * a green pill link — plus the two half-width green/pink "ahead" blocks.
 */
export default function EstimateCard() {
  return (
    <section id="estimate" className="relative mx-auto max-w-[1320px] px-6 pb-32" data-scroll="">
      <div className="m-card" data-reveal="">
        <h2 className="tx-s mb-12">What do you need cleaned?</h2>

        <form
          className="grid gap-x-14 gap-y-10 md:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
        >
          {FIELDS.map(({ label, options }) => (
            <label key={label} className="block">
              <span className="tx-xs mb-2 block">{label}</span>
              <select className="w-full appearance-none border-b border-primary/40 bg-white py-4 pr-8 text-[15px] text-primary outline-none focus:border-primary">
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}

          <div className="flex flex-wrap items-center gap-4 pt-2 md:col-span-2">
            <button type="submit" className="a-button">
              Get my free estimate
            </button>
            <a href="#services" className="a-button -primary">
              See all services
            </a>
          </div>
        </form>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-[30px] bg-primary px-8 py-14 text-center text-cream">
            <p className="tx-xs">Short on time?</p>
            <p className="tx-l mt-2">Same-week slots available</p>
            <a href="#contact" className="a-button mt-6">
              Book a time
            </a>
          </div>
          <div className="flex flex-col items-center justify-center rounded-[30px] bg-pink px-8 py-14 text-center text-cocoa">
            <p className="tx-xs">Prefer to talk?</p>
            <p className="tx-l mt-2 text-primary">Call (708) 737-8722</p>
            <a href="tel:+17087378722" className="a-button -cream mt-6">
              Call us now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
