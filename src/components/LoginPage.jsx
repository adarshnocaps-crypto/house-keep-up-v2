import { ArrowUpRight, CalendarCheck, Gift, LifeBuoy, UserRound } from 'lucide-react'
import { GIFT_CARD_PATH, PORTAL_LOGIN_URL } from '../lib/links.js'

/**
 * Account sign-in (/login). Shares the split-panel layout of the admin login,
 * but hands off to the BookingKoala portal rather than taking a password here:
 * accounts live in BookingKoala and there is no API for us to authenticate
 * against, so collecting credentials on this domain would be both
 * non-functional and unsafe. Staff sign-in stays at /admin/login.
 */
export default function LoginPage() {
  return (
    <main className="admin-login">
      <section className="admin-login__brand">
        <a href="/">HOUSE KEEP UP</a>
        <div>
          <span>My account</span>
          <h1>Your cleans, all in one place.</h1>
          <p>
            See upcoming visits, reschedule or skip a clean, update payment
            details and manage your recurring plan.
          </p>
        </div>
        <small>Secure account access</small>
      </section>

      <section className="admin-login__formWrap">
        <div className="admin-login__form">
          <span className="admin-login__lock"><UserRound /></span>
          <p className="admin-login__eyebrow">Account portal</p>
          <h2>Welcome back</h2>
          <p className="admin-login__intro">
            Your account lives in our secure booking portal. Sign in there to
            manage your visits, invoices and payment details.
          </p>

          <a
            className="admin-login__submit"
            href={PORTAL_LOGIN_URL}
            target="_blank"
            rel="noreferrer"
          >
            Sign in to my account <ArrowUpRight />
          </a>

          <p className="lg-newHere">
            First time here? <a href="/book">Book your first clean</a> and we&rsquo;ll
            set the account up for you.
          </p>

          <ul className="lg-links">
            <li>
              <a href="/book"><CalendarCheck /> Book a cleaning</a>
            </li>
            <li>
              <a href={GIFT_CARD_PATH}><Gift /> Buy a gift card</a>
            </li>
            <li>
              <a href="/contact"><LifeBuoy /> Trouble signing in?</a>
            </li>
          </ul>

          <a className="admin-login__back" href="/">← Return to website</a>
        </div>
      </section>
    </main>
  )
}
