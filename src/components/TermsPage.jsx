import { LegalPage } from './LegalLayout.jsx'
import { LEGAL_EMAIL, LEGAL_PHONE, LEGAL_PHONE_HREF, LEGAL_UPDATED } from '../lib/legal.js'

/**
 * Terms of service (/terms).
 *
 * Built from the policies the site already states in the FAQ — 24-hour
 * cancellation, the $50 late-change fee, card charged after completion, the
 * 24-hour re-clean window, and the scope exclusions — so the terms and the FAQ
 * say the same thing. If a policy changes, change it in both places.
 *
 * Clauses a cleaning business normally needs but that this codebase cannot
 * infer (damage-claim window, non-solicitation, recurring-plan commitments,
 * gift-card expiry, dispute resolution) are marked with `lg-todo` callouts
 * rather than invented.
 */
const SECTIONS = [
  {
    title: 'About these terms',
    body: (
      <>
        <p>These terms cover cleaning services booked from House Keep Up, whether you book online, by phone or by email. Booking a clean means you accept them.</p>
        <p>Where your written booking confirmation says something different from this page — a specific price, scope or arrival window — the confirmation wins for that job.</p>
      </>
    ),
  },
  {
    title: 'Booking and confirmation',
    body: (
      <>
        <p>Prices shown on this site and in online quotes are estimates based on the details you give us: property size, service type and any extras. They are not binding until we confirm the booking.</p>
        <p>Your booking is confirmed when you receive a confirmation from us. If the property turns out to be substantially larger, or in a substantially different condition, than described, we will contact you to agree a revised price or scope before continuing.</p>
        <p>Most appointments are staffed by one to three professionals. Team size depends on the size of the property and the service booked.</p>
      </>
    ),
  },
  {
    title: 'Pricing, payment and tips',
    body: (
      <>
        <ul className="lg-list">
          <li>Your card is stored securely with our payment processor when you book, and charged after the cleaning is completed.</li>
          <li>The final amount may include approved extras, your tip, and documented paid parking where it was necessary to reach the property.</li>
          <li>Tips are optional, can be set during booking, and go directly to the cleaning team.</li>
          <li>Card details are handled by Stripe. We do not see or store your card number.</li>
        </ul>
        <p className="lg-todo">
          <b>To confirm before publishing:</b> what happens when a payment fails or a
          card is declined — retry window, late fee if any, and at what point a
          recurring plan is paused.
        </p>
      </>
    ),
  },
  {
    title: 'Cancellations, rescheduling and access',
    body: (
      <>
        <p>Cancel or reschedule at no cost by giving at least 24 hours&rsquo; notice before your arrival window.</p>
        <p>A $50 fee may apply where you cancel or change inside 24 hours, or where our team cannot get in — for example a door code that does not work, a lockbox we were not told about, or no one available to let us in. We would always rather reschedule than charge the fee, so tell us as early as you can.</p>
        <p>If you have asked us to clean while you are out, please make sure the entry details you gave us are current. We use that information only to carry out the service you booked.</p>
      </>
    ),
  },
  {
    title: 'What we clean, and what we do not',
    body: (
      <>
        <p>We provide interior housekeeping. Your team arrives with the products and equipment needed for the booked service. Extras such as ovens, refrigerators, interior cabinets, interior windows and laundry can be added when you book.</p>
        <p>The following sit outside our scope, and our teams will not attempt them:</p>
        <ul className="lg-list">
          <li>exterior maintenance and exterior window work;</li>
          <li>hazardous-material removal, including mould remediation and biohazards;</li>
          <li>pest treatment;</li>
          <li>licensed repair, electrical or plumbing work;</li>
          <li>moving heavy furniture or appliances, or anything that would put a team member at risk.</li>
        </ul>
        <p>If you need something not listed on the booking form, ask us before the visit and we will confirm whether we can do it or point you to the right specialist.</p>
      </>
    ),
  },
  {
    title: 'Getting the property ready',
    body: (
      <>
        <p>So the team can do a proper job in the time booked, please:</p>
        <ul className="lg-list">
          <li>tell us in advance about product preferences, allergies or surfaces needing particular care;</li>
          <li>secure cash, jewellery and anything fragile or irreplaceable;</li>
          <li>make sure running water, power and heating are available;</li>
          <li>tell us about pets, and secure any animal that may be anxious around strangers;</li>
          <li>flag anything unsafe — pests, unsanitary conditions, damage — before the visit.</li>
        </ul>
        <p>If the team arrives to conditions that are unsafe, or substantially different from what was described, we may reduce the scope or reschedule. We will always talk to you first where we can reach you.</p>
      </>
    ),
  },
  {
    title: 'Our satisfaction promise',
    body: (
      <>
        <p>If something on the checklist was missed, tell us within 24 hours of the visit with the details and we will arrange a complimentary re-clean of the affected areas.</p>
        <p>The promise covers a re-clean rather than a refund, and applies to work inside the booked scope. Please give us the chance to put it right before raising it elsewhere — we would rather fix it.</p>
      </>
    ),
  },
  {
    title: 'Damage, loss and claims',
    body: (
      <>
        <p>Our professionals are screened and trained, and House Keep Up is bonded and insured. Accidents are rare, but if something is damaged during a visit, contact us as soon as you notice it so we can investigate while the facts are fresh.</p>
        <p>We are not able to accept claims for pre-existing damage, normal wear, items that were already loose or unstable, or valuables that were left out after we asked for them to be secured.</p>
        <p className="lg-todo">
          <b>To confirm before publishing:</b> the window for reporting damage
          (48 hours and 72 hours are both common), what evidence you ask for, and
          whether claims are handled directly or through your insurer.
        </p>
      </>
    ),
  },
  {
    title: 'Our team',
    body: (
      <>
        <p>The professionals who clean your home are our people, and we invest in training and retaining them.</p>
        <p className="lg-todo">
          <b>To confirm before publishing:</b> whether you want a non-solicitation
          clause — most cleaning companies ask clients not to hire a team member
          directly for a set period, or to pay a placement fee. Your attorney
          should set the period and the amount, and confirm it is enforceable in
          Illinois.
        </p>
      </>
    ),
  },
  {
    title: 'Recurring plans and gift cards',
    body: (
      <>
        <p>Recurring plans repeat at the frequency you choose, and you can change or pause them by contacting us.</p>
        <p className="lg-todo">
          <b>To confirm before publishing:</b> whether recurring plans carry a
          minimum commitment, how much notice is needed to cancel one, how far in
          advance you notify price changes, and the gift-card terms — expiry
          period, whether they are refundable, and what happens to any unused
          balance.
        </p>
      </>
    ),
  },
  {
    title: 'Liability',
    body: (
      <>
        <p>We stand behind the work we do, and nothing in these terms limits any liability that cannot lawfully be limited — including for death or personal injury caused by negligence.</p>
        <p>Beyond that, and to the fullest extent permitted by Illinois law, our liability arising from a booking is limited to the amount paid for the service in question, and we are not liable for indirect or consequential loss.</p>
      </>
    ),
  },
  {
    title: 'Changes, governing law and contact',
    body: (
      <>
        <p>We may update these terms. The version in force for your booking is the one published when you booked, and the date at the top of this page shows when it last changed.</p>
        <p>These terms are governed by the laws of the State of Illinois.</p>
        <p>Questions about anything here: <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> or <a href={LEGAL_PHONE_HREF}>{LEGAL_PHONE}</a>. See also our <a href="/privacy">privacy notice</a> and <a href="/legal-notice">legal notice</a>.</p>
        <p className="lg-todo">
          <b>To confirm before publishing:</b> whether you want a dispute-resolution
          clause — mediation, arbitration or venue — which is an attorney decision,
          not a drafting one.
        </p>
        <p className="lg-disclaimer">
          These terms are provided for information and are not legal advice. Have a
          qualified attorney review them against how your business actually
          operates before you rely on them.
        </p>
      </>
    ),
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Terms of service"
      title="How we work together"
      intro="What you can expect from a House Keep Up clean, what we need from you, and how cancellations, payment and our satisfaction promise work."
      updated={LEGAL_UPDATED}
      sections={SECTIONS}
    />
  )
}
