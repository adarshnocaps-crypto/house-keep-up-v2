import { ChevronDown } from 'lucide-react'

const DROPDOWNS = {
  Services: [
    ['Standard Cleaning', '#services'],
    ['Deep Cleaning', '#services'],
    ['Move-In / Move-Out', '#services'],
    ['Commercial & Office', '#services'],
    ['Post-Construction', '#services'],
  ],
  Locations: [
    ['Chicago', '#locations'],
    ['Evanston', '#family'],
    ['Lincoln Park', '#family'],
    ['Wicker Park', '#family'],
    ['Oak Park', '#family'],
    ['Skokie', '#family'],
  ],
}

const LEFT = [
  ['Home', '#top'],
  ['Services', '#services', true],
  ['Locations', '#locations', true],
  ['About us', '#family'],
]
const RIGHT = [
  ['Contact', '#contact'],
  ['Login', '#login'],
]

/**
 * Fixed header inspired by the live House Keep Up menu: transparent on the
 * hero, compact cream bar after scroll, centered brand, relevant nav actions.
 */
export default function Header() {
  return (
    <header className="o-header">
      <div className="o-header__bar">
        <nav className="o-header__links" aria-label="Primary">
          {LEFT.map(([label, href, hasMenu]) => (
            <span key={label} className="o-header__item">
              <a href={href}>
                {label}
                {hasMenu && <ChevronDown size={16} strokeWidth={2.4} />}
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

        <a href="#top" className="o-header__logo" aria-label="House Keep Up — home">
          HOUSE KEEP UP
        </a>

        <nav className="o-header__links o-header__actions" aria-label="Secondary">
          {RIGHT.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
          <a href="#estimate" className="o-header__book">
            Book now
          </a>
        </nav>
      </div>
    </header>
  )
}
