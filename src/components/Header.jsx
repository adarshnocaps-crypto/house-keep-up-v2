import { ChevronDown } from 'lucide-react'

const DROPDOWNS = {
  Services: [
    ['Standard Cleaning', '/services/standard'],
    ['Deep Cleaning', '/services/deep'],
    ['Move-In / Move-Out', '/services/move'],
    ['Post-Construction', '/services/post'],
    ['Commercial Cleaning', '/services/office'],
    ['Recurring Cleaning', '/services/recurring'],
  ],
  Locations: [
    ['View all locations', '/locations'],
    ['Downtown', '/areas/chicago'],
    ['Evanston', '/areas/evanston'],
    ['Lincoln Park', '/areas/lincoln-park'],
    ['Wicker Park', '/areas/wicker-park'],
    ['Oak Park', '/areas/oak-park'],
    ['Skokie', '/areas/skokie'],
    ['Oak Lawn', '/areas/oak-lawn'],
    ['Des Plaines', '/areas/des-plaines'],
  ],
}

const LEFT = [
  ['Services', '/services', true],
  ['Locations', '/locations', true],
]
const RIGHT = [
  ['About us', '/#family'],
  ['Contact', '/contact'],
]

/**
 * Solid green top bar with rounded corners: the wordmark sits centered,
 * the nav links split evenly to the left and right of it.
 */
export default function Header() {
  return (
    <header className="o-header">
      <div className="o-header__bar">
        <nav className="o-header__links o-header__links--left" aria-label="Primary">
          {LEFT.map(([label, href, hasMenu]) => (
            <span key={label} className="o-header__item">
              <a href={href}>
                {label}
                {hasMenu && <ChevronDown size={15} strokeWidth={2.4} />}
              </a>

              {hasMenu && (
                <span className="o-header__dropdown">
                  {DROPDOWNS[label].map(([item, itemHref]) => (
                    <a key={item} href={itemHref}>
                      {item}
                    </a>
                  ))}
                </span>
              )}
            </span>
          ))}
        </nav>

        <a href="/" className="o-header__logo" aria-label="House Keep Up — home">
          HOUSE KEEP UP
        </a>

        <nav className="o-header__links o-header__links--right" aria-label="Secondary">
          {RIGHT.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
          <a href="/book" className="o-header__book">
            Book now
          </a>
        </nav>
      </div>
    </header>
  )
}
