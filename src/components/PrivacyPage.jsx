import { LegalPage } from './LegalLayout.jsx'
import { LEGAL_UPDATED } from '../lib/legal.js'

/**
 * Privacy notice (/privacy).
 *
 * The third parties named here are the ones this codebase actually contacts:
 * BookingKoala (booking and gift cards), Stripe (payments), and CARTO /
 * OpenStreetMap (map tiles). There is no analytics or advertising tracking in
 * the site today — if any is ever added, the cookies section below has to be
 * updated to match, or this notice becomes untrue.
 */
const SECTIONS = [
  {
    title: 'Who we are',
    body: (
      <>
        <p>House Keep Up provides residential and commercial cleaning across Chicago and the surrounding suburbs. We decide how and why your personal information is handled when you contact us or book a clean, which makes us responsible for it.</p>
        <p>Reach us any time at <a href="mailto:hello@housekeepup.com">hello@housekeepup.com</a> or <a href="tel:+17087378722">(708) 737-8722</a>.</p>
        <p className="lg-todo">
          <b>To confirm before publishing:</b> the registered entity name and
          mailing address to name as the responsible party, and whether you want
          a dedicated privacy contact address.
        </p>
      </>
    ),
  },
  {
    title: 'What we collect',
    body: (
      <>
        <ul className="lg-list">
          <li><b>Booking and quote details</b> — your name, email address, phone number, service address, property size, the service you want, access instructions and any notes you add.</li>
          <li><b>Payment details</b> — handled by Stripe. Card numbers are entered directly into Stripe&rsquo;s hosted fields and are never seen or stored by this website or by us.</li>
          <li><b>Correspondence</b> — the content of emails, calls, texts and form messages, so we can answer and keep a record of what was agreed.</li>
          <li><b>Location, only if you ask</b> — the map on our areas page has a &ldquo;My location&rdquo; button. It uses your browser&rsquo;s location only after you grant permission, only to centre the map, and the coordinates are not sent to us or stored.</li>
          <li><b>Basic technical data</b> — your browser sends an IP address and user-agent to any server it loads content from, including our host and our map tile provider. We do not build profiles from this.</li>
        </ul>
        <p>We do not knowingly collect information from children, and we do not ask for sensitive categories of data. Please do not send us information we have not asked for.</p>
      </>
    ),
  },
  {
    title: 'Why we use it',
    body: (
      <ul className="lg-list">
        <li>To quote for, schedule, perform and invoice the cleaning you asked for.</li>
        <li>To reach you about an upcoming visit — arrival windows, access, delays, changes.</li>
        <li>To take payment and keep the accounting and tax records we are required to keep.</li>
        <li>To answer questions, resolve complaints and improve how we work.</li>
        <li>To send occasional updates or offers, only where you have asked for them. Every such message has an unsubscribe link, and opting out never affects your service.</li>
      </ul>
    ),
  },
  {
    title: 'Who else handles it',
    body: (
      <>
        <p>We do not sell your personal information, and we do not share it for anyone else&rsquo;s advertising. We do rely on a small number of providers to run the business:</p>
        <ul className="lg-list">
          <li><b>BookingKoala</b> — our booking, scheduling and gift-card platform. Booking details you submit are processed there.</li>
          <li><b>Stripe</b> — payment processing. Stripe handles your card data under its own privacy policy and security standards.</li>
          <li><b>CARTO and OpenStreetMap</b> — map tiles on our areas page. Loading the map means your browser contacts their servers, which sees your IP address.</li>
          <li><b>Our cleaning teams</b> — the crew assigned to your visit receives the address, access notes and scope of work they need to do the job, and nothing more.</li>
        </ul>
        <p>We may also disclose information where the law requires it, or to establish or defend a legal claim.</p>
      </>
    ),
  },
  {
    title: 'Cookies and local storage',
    body: (
      <>
        <p>This site runs no advertising trackers, no analytics tags and no third-party marketing pixels. We do not set cookies to follow you around the web.</p>
        <p>The site stores a small amount of data in your own browser to keep booking progress and admin sessions working. That data stays on your device and you can clear it at any time through your browser settings. Stripe and BookingKoala may set their own cookies when you use the payment or booking flows, under their policies.</p>
      </>
    ),
  },
  {
    title: 'How long we keep it',
    body: <p>Booking and customer records are kept while you are a client and afterwards for as long as we need them to handle warranty questions, disputes, insurance and tax obligations. Quote enquiries that never became bookings are cleared out once they are plainly stale. When a record is no longer needed, we delete it or strip it of anything identifying.</p>,
  },
  {
    title: 'How we protect it',
    body: <p>The site is served over HTTPS, payments run through Stripe rather than our own servers, and access to customer records is limited to the people who need it to do their jobs. No system is perfectly secure, but if a breach ever affected your information we would tell you and the relevant authorities as required by Illinois law.</p>,
  },
  {
    title: 'Your choices and rights',
    body: (
      <>
        <p>You can ask us to:</p>
        <ul className="lg-list">
          <li>tell you what personal information we hold about you;</li>
          <li>correct anything inaccurate or out of date;</li>
          <li>delete your information, where we are not required to keep it;</li>
          <li>stop sending you marketing, which you can also do from any such email;</li>
          <li>provide a copy of what you gave us.</li>
        </ul>
        <p>Email <a href="mailto:hello@housekeepup.com">hello@housekeepup.com</a> and we will respond as quickly as we can. We may need to confirm your identity first so we do not hand your details to someone else. Depending on where you live, state law may give you further rights — tell us what you need and we will meet it where it applies.</p>
      </>
    ),
  },
  {
    title: 'Changes to this notice',
    body: (
      <>
        <p>If we change how we handle personal information — for example if we ever add analytics — we will update this page and move the &ldquo;last updated&rdquo; date at the top. Material changes will be flagged more prominently. See also our <a href="/terms">terms of service</a> and <a href="/legal-notice">legal notice</a>.</p>
        <p className="lg-disclaimer">
          This notice is provided for information and is not legal advice. Have a
          qualified attorney review it against how your business actually handles
          customer data before you rely on it.
        </p>
      </>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Privacy notice"
      title="Your data, plainly"
      intro="What we collect when you book a clean or browse this site, why we hold it, who else touches it, and how to get it removed."
      updated={LEGAL_UPDATED}
      sections={SECTIONS}
    />
  )
}
