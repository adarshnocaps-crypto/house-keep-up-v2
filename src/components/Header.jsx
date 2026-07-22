import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
const MENU_LINKS = [
  ['Home', '/'], ['Services', '/services'], ['Locations', '/locations'],
  ['Journal', '/blog'], ['Contact', '/contact'], ['About us', '/about'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduced ? 0 : 0.64
    const desktop = () => window.innerWidth > 767
    const getWidth = () => desktop() ? Math.min(window.innerWidth - 30, 520) : window.innerWidth - 20
    const getHeight = () => desktop() ? Math.min(window.innerHeight - 30, 350) : window.innerHeight - 20
    const entries = menu.querySelectorAll('[data-menu-entry]')
    const divider = menu.querySelector('[data-menu-divider]')
    const tl = gsap.timeline({ paused: true, onReverseComplete: () => gsap.set(menu, { display: 'none', pointerEvents: 'none' }) })
      .set(menu, { display: 'grid', opacity: 0, width: 0, height: 0, pointerEvents: 'auto' })
      .set(entries, { autoAlpha: 0, y: 12 })
      .set(divider, { scaleY: 0, transformOrigin: 'top center' })
      .to(menu, { opacity: 1, width: getWidth, height: getHeight, duration, ease: 'expo.out' })
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
    if (!timelineRef.current) return
    if (open) timelineRef.current.timeScale(1).invalidate().play()
    else timelineRef.current.timeScale(1.65).reverse()
  }, [open])

  return (
    <header className={`o-header ${open ? 'is-menu-open' : ''}`}>
      <div className="o-header__bar">
        <a href="/" className="o-header__logo" aria-label="House Keep Up — home">HOUSE KEEP UP</a>
        <button ref={toggleRef} type="button" className="o-header__menuToggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="site-menu">
          <span>{open ? 'Close' : 'Menu'}</span><i><b/><b/><b/><b/></i>
        </button>
      </div>

      <aside ref={menuRef} id="site-menu" className="o-menu" aria-hidden={!open}>
        <div className="o-menu__info" data-menu-info>
          <p data-menu-entry><strong>HOUSE KEEP UP</strong><span>Chicago home cleaning</span></p>
          <div data-menu-entry><MapPin/><span>Serving Chicago and nearby neighborhoods.</span></div>
          <div data-menu-entry><Phone/><a href="tel:+13125550124">(312) 555-0124</a></div>
          <div className="o-menu__social" data-menu-social>
            <a data-menu-entry href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a data-menu-entry href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a data-menu-entry href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
        <span className="o-menu__divider" data-menu-divider />
        <nav className="o-menu__nav" data-menu-nav aria-label="Expanded site navigation">
          {MENU_LINKS.map(([label, href], index) => <a data-menu-entry key={label} href={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}<ArrowUpRight/></a>)}
        </nav>
      </aside>
    </header>
  )
}
