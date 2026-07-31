import { LegalPage } from './LegalLayout.jsx'
import { LEGAL_UPDATED } from '../lib/legal.js'

/**
 * Legal notice / imprint (/legal-notice).
 *
 * Everything here is drawn from details already present in the site. Anything
 * only the business can confirm — registered entity name, filing numbers,
 * licence and insurance numbers — is marked with a `lg-todo` callout rather
 * than invented. Fill those in before this goes live.
 */
const SECTIONS = [
  {
    title: 'Site operator',
    body: (
      <>
        <p>This website, housekeepup.com, is operated by House Keep Up, a residential and commercial cleaning company serving Chicago and the surrounding suburbs since 2016.</p>
        <dl className="lg-facts">
          <div><dt>Business name</dt><dd>House Keep Up</dd></div>
          <div><dt>Email</dt><dd><a href="mailto:hello@housekeepup.com">hello@housekeepup.com</a></dd></div>
          <div><dt>Phone</dt><dd><a href="tel:+17087378722">(708) 737-8722</a></dd></div>
          <div><dt>Service area</dt><dd>Chicago and Chicagoland suburbs, Illinois</dd></div>
        </dl>
        <p className="lg-todo">
          <b>To confirm before publishing:</b> registered legal entity name and form
          (for example &ldquo;House Keep Up LLC&rdquo;), registered business address,
          Illinois Secretary of State file number, and the name of the person
          responsible for the content of this site.
        </p>
      </>
    ),
  },
  {
    title: 'Licensing and insurance',
    body: (
      <>
        <p>House Keep Up operates as an insured cleaning service. Certificates of insurance are available on request for clients, building management and commercial accounts — email us and we will send them across.</p>
        <p className="lg-todo">
          <b>To confirm before publishing:</b> insurance carrier and policy numbers,
          bonding details, and any City of Chicago or Illinois business licence
          numbers you want stated publicly.
        </p>
      </>
    ),
  },
  {
    title: 'Accuracy of content',
    body: (
      <>
        <p>We prepare the content of this site with care and keep prices, service descriptions and coverage areas as current as we can. Even so, we do not warrant that everything here is complete, accurate or up to date at any given moment.</p>
        <p>Prices shown are estimates based on the information provided at the time of enquiry. A binding price is the one confirmed in your booking confirmation. Availability, arrival windows and scope can change with the condition and size of the property.</p>
      </>
    ),
  },
  {
    title: 'External links',
    body: <p>This site links to services we do not control, including our booking and gift-card portal (BookingKoala), our payment processor (Stripe), and third-party review platforms. We check external links when we add them, but we are not responsible for the content, availability or practices of those sites. Following an external link means the other party&rsquo;s terms and privacy policy apply.</p>,
  },
  {
    title: 'Copyright and imagery',
    body: (
      <>
        <p>The text, layout, design, wordmark and original photography on this site belong to House Keep Up unless stated otherwise. Reproduction, adaptation or redistribution beyond ordinary browsing needs our written permission.</p>
        <p>Some neighborhood photographs on our <a href="/locations">areas we serve</a> page come from Wikimedia Commons and are reused under Creative Commons licences. Each is credited to its photographer, with its licence and a link to the original, in the <b>Image credits</b> section at the foot of that page. Map data is © OpenStreetMap contributors, with tiles by CARTO.</p>
      </>
    ),
  },
  {
    title: 'Liability',
    body: <p>To the fullest extent permitted by Illinois law, House Keep Up is not liable for indirect or consequential loss arising from use of this website or reliance on its content. Nothing here limits our liability for the cleaning services we actually perform, which is governed by our <a href="/terms">terms of service</a> and the booking confirmation you receive.</p>,
  },
  {
    title: 'Questions and complaints',
    body: (
      <>
        <p>If something on this site is wrong, out of date, or you believe your rights have been infringed, tell us and we will look at it promptly. Email <a href="mailto:hello@housekeepup.com">hello@housekeepup.com</a> or call <a href="tel:+17087378722">(708) 737-8722</a>. See also our <a href="/terms">terms of service</a> and <a href="/privacy">privacy notice</a>.</p>
        <p className="lg-disclaimer">
          This notice is provided for information and is not legal advice. Have a
          qualified attorney review it against your business registration,
          insurance and licensing before you rely on it.
        </p>
      </>
    ),
  },
]

export default function LegalNoticePage() {
  return (
    <LegalPage
      kicker="Legal notice"
      title="The small print"
      intro="Who operates this website, how to reach us, and the terms on which the information here is published."
      updated={LEGAL_UPDATED}
      sections={SECTIONS}
    />
  )
}
