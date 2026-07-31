import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, ChevronDown, LogIn, Mail, MapPin, Phone, X } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { useRoute } from '../lib/router.jsx'
import { GIFT_CARD_PATH, PORTAL_LOGIN_URL } from '../lib/links.js'
import { LiquidGlass } from './ui/liquid-glass.jsx'

// inline desktop bar: links flank the centred wordmark, everything about the
// company itself collapses into one dropdown
const NAV_LEFT = [['Services', '/services'], ['Locations', '/locations']]
const NAV_RIGHT = [['Contact', '/contact']]
const COMPANY_LINKS = [
  ['About us', '/about'], ['Blog', '/blog'],
  ['Testimonials', '/testimonials'], ['Gift cards', GIFT_CARD_PATH],
]

const MENU_LINKS = [
  ['Home', '/'], ['Services', '/services'], ['Gallery', '/gallery'],
  ['Locations', '/locations'], ['Testimonials', '/testimonials'],
  ['Blog', '/blog'], ['About us', '/about'], ['Contact', '/contact'],
  ['Gift cards', GIFT_CARD_PATH],
]

const menuWidth = () => window.innerWidth > 767
  ? Math.min(window.innerWidth - 30, 520)
  : Math.max(280, window.innerWidth - 30)

const menuHeight = () => {
  const viewportHeight = window.visualViewport?.height || window.innerHeight
  return window.innerWidth > 767
    ? Math.min(viewportHeight - 30, 460)
    : Math.max(280, viewportHeight - 20)
}

export default function Header() {
  const { path } = useRoute()
  const [open, setOpen] = useState(false)
  const companyActive = COMPANY_LINKS.some(([, href]) => path.startsWith(href))
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduced ? 0 : 0.64
    const entries = menu.querySelectorAll('[data-menu-entry]')
    const divider = menu.querySelector('[data-menu-divider]')
    const tl = gsap.timeline({ paused: true, onReverseComplete: () => gsap.set(menu, { display: 'none', pointerEvents: 'none' }) })
      .set(menu, { display: 'grid', opacity: 0, width: 0, height: 0, pointerEvents: 'auto' })
      .set(entries, { autoAlpha: 0, y: 12 })
      .set(divider, { scaleY: 0, transformOrigin: 'top center' })
      .to(menu, { opacity: 1, width: menuWidth, height: menuHeight, duration, ease: 'expo.out' })
      .to(menu.querySelectorAll('[data-menu-info] [data-menu-entry]'), { autoAlpha: 1, y: 0, duration: reduced ? 0 : .5, ease: 'power3.out', stagger: .075 }, .4)
      .to(divider, { scaleY: 1, duration: reduced ? 0 : .5, ease: 'power2.out' }, .52)
      .to(menu.querySelectorAll('[data-menu-nav] [data-menu-entry]'), { autoAlpha: 1, y: 0, duration: reduced ? 0 : .42, ease: 'power3.out', stagger: .07 }, .62)
      .to(menu.querySelectorAll('[data-menu-social] [data-menu-entry]'), { autoAlpha: 1, y: 0, duration: reduced ? 0 : .32, ease: 'power2.out', stagger: .055 }, .86)
    timelineRef.current = tl
    return () => tl.kill()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false)
    const closeOnOutsideClick = (event) => {
      if (open && !menuRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOnOutsideClick)
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    const syncMenuSize = () => {
      if (menuRef.current) {
        gsap.set(menuRef.current, { width: menuWidth(), height: menuHeight() })
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('resize', syncMenuSize)
    window.visualViewport?.addEventListener('resize', syncMenuSize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('resize', syncMenuSize)
      window.visualViewport?.removeEventListener('resize', syncMenuSize)
    }
  }, [open])

  useEffect(() => {
    if (!timelineRef.current) return
    if (open) timelineRef.current.timeScale(1).invalidate().play()
    else timelineRef.current.timeScale(1.65).reverse()
  }, [open])

  return (
    <header className={`o-header ${open ? 'is-menu-open' : ''}`}>
      <LiquidGlass className="o-header__bar">
        <a href={PORTAL_LOGIN_URL} className="o-header__login">
          <LogIn aria-hidden="true" /><span>Login</span>
        </a>
        <a href="/" className="o-header__logo" aria-label="House Keep Up — home">HOUSE KEEP UP</a>
        <nav className="o-header__nav -left" aria-label="Primary">
          {NAV_LEFT.map(([label, href]) => (
            <a key={label} href={href} aria-current={path.startsWith(href) ? 'page' : undefined}>{label}</a>
          ))}
        </nav>

        <nav className="o-header__nav -right" aria-label="Company">
          <div className="o-header__drop">
            <button type="button" className={companyActive ? 'is-active' : ''} aria-haspopup="true">
              Company <ChevronDown aria-hidden="true" />
            </button>
            <div className="o-header__dropMenu">
              {COMPANY_LINKS.map(([label, href]) => (
                <a key={label} href={href} aria-current={path.startsWith(href) ? 'page' : undefined}>{label}</a>
              ))}
            </div>
          </div>
          {NAV_RIGHT.map(([label, href]) => (
            <a key={label} href={href} aria-current={path.startsWith(href) ? 'page' : undefined}>{label}</a>
          ))}
        </nav>

        <a href="/book" className="o-header__cta">Book now</a>
        <button ref={toggleRef} type="button" className="o-header__menuToggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-menu">
          <span>{open ? 'Close' : 'Menu'}</span><i><b/><b/><b/><b/></i>
        </button>
      </LiquidGlass>

      <aside ref={menuRef} id="site-menu" className="o-menu" aria-hidden={!open}>
        <button type="button" className="o-menu__close" onClick={() => setOpen(false)} aria-label="Close menu" tabIndex={open ? 0 : -1}>
          <X aria-hidden="true" />
        </button>
        <div className="o-menu__info" data-menu-info>
          <p data-menu-entry><strong>HOUSE KEEP UP</strong><span>Chicago home cleaning</span></p>
          <div className="o-menu__contact">
            <div data-menu-entry><MapPin/><span>8 S Michigan Ave, Suite #1313<br />Chicago, IL 60603</span></div>
            <div data-menu-entry><Phone/><a href="tel:+17087378722">(708) 737-8722</a></div>
            <div data-menu-entry><Mail/><a href="mailto:hello@housekeepup.com">hello@housekeepup.com</a></div>
            <div className="o-menu__social" data-menu-social>
              <a data-menu-entry href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a data-menu-entry href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a data-menu-entry href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <span className="o-menu__divider" data-menu-divider />
        <nav className="o-menu__nav" data-menu-nav aria-label="Expanded site navigation">
          {MENU_LINKS.map(([label, href], index) => {
            const external = href.startsWith('http')
            return <a data-menu-entry key={label} href={href} onClick={() => setOpen(false)} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}><span>0{index + 1}</span>{label}<ArrowUpRight/></a>
          })}
        </nav>
      </aside>
    </header>
  )
}
