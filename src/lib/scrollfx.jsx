import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const prefersLightweightScroll = () =>
  window.matchMedia('(pointer: coarse)').matches ||
  window.matchMedia('(max-width: 900px)').matches

/**
 * Global scroll systems, mirroring the reference site's behavior:
 *  - Lenis smooth scrolling synced to GSAP's ticker
 *  - [data-scroll]: gets .is-inview once (drives .a-title line + [data-reveal] CSS)
 *  - .o-listCards__item: --scroll-progress scrubbed from 1 -> 0 as the card
 *    enters, so it slides up over the previous card
 *  - .o-scatter__item: enter-once class with per-item delay (CSS handles motion)
 *  - .o-header: gains -bg once the page is scrolled past the hero's top edge
 */
export function useScrollFx(ready, routeKey = null) {
  useEffect(() => {
    if (!ready) return

    // Land at the top BEFORE measuring triggers. Without this, navigating to an
    // area page from a deep-scrolled section (e.g. the map pins in the Family
    // section) leaves the window mid-page, so ScrollTrigger measures every
    // reveal as already-passed and fires them instantly with no animation.
    window.scrollTo(0, 0)

    const lightweight = prefersLightweightScroll()
    let lenis
    if (!prefersReduced() && !lightweight) {
      lenis = new Lenis({ lerp: 0.16, wheelMultiplier: 1.05 })
      lenis.on('scroll', ScrollTrigger.update)
      // keep Lenis's internal position in sync with the reset above
      lenis.scrollTo(0, { immediate: true })
    }
    const tick = (time) => lenis && lenis.raf(time * 1000)
    if (lenis) {
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    // listeners registered inside the gsap context that ctx.revert() won't undo
    const headerCleanups = []

    const ctx = gsap.context(() => {
      document.querySelectorAll('[data-scroll]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => el.classList.add('is-inview'),
        })
      })

      document.querySelectorAll('.o-listCards__item').forEach((el) => {
        if (lightweight) {
          gsap.set(el, { '--scroll-progress': 0 })
          return
        }
        gsap.fromTo(
          el,
          { '--scroll-progress': 1 },
          {
            '--scroll-progress': 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'top 55%',
              scrub: 0.4,
            },
          },
        )
      })

      // Scroll-linked parallax: [data-speed] elements drift vertically at
      // their own rate while their section crosses the viewport. Purely
      // scrubbed to scroll — nothing moves when the page is still.
      if (!lightweight) {
        document.querySelectorAll('[data-speed]').forEach((el) => {
          const speed = parseFloat(el.dataset.speed) || 0
          gsap.to(el, {
            yPercent: speed * -100,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          })
        })
      }

      // Flow lines: the path draws itself in, scrubbed to the section's
      // progress through the viewport
      if (!lightweight) {
        document.querySelectorAll('.js-flowline').forEach((path) => {
          const len = path.getTotalLength()
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: path.closest('section') || path.parentElement,
              start: 'top 70%',
              end: 'bottom 75%',
              scrub: 0.6,
            },
          })
        })
      }

      document.querySelectorAll('.o-scatter__item').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () => el.classList.add('is-inview'),
        })
      })

      const header = document.querySelector('.o-header')
      if (header) {
        // Keep the glass header visible so page content moves beneath its
        // backdrop blur and displacement layers. Scrolling down shrinks it to a
        // compact pill (logo + login + book now).
        //
        // Restoring the full bar needs a deliberate gesture, not a flicked
        // trackpad: we accumulate how far the page has actually travelled
        // upward and only expand past UP_TO_EXPAND. Any downward movement
        // spends that budget back to zero, so jitter never re-opens it.
        const UP_TO_EXPAND = 120
        const COMPACT_AFTER = 140
        let upTravel = 0
        let lastY = ScrollTrigger.isTouch ? 0 : window.scrollY

        // onUpdate runs on every scroll frame, so nothing in here may read
        // layout. `window.innerWidth` is a forced synchronous reflow and the
        // class writes each invalidate style, which together stall the frame
        // and make the fixed glass bar visibly lag the page. Width is cached
        // and updated on resize; classes are only written when they change.
        let isNarrow = window.innerWidth <= 900
        const onResize = () => { isNarrow = window.innerWidth <= 900 }
        window.addEventListener('resize', onResize, { passive: true })
        headerCleanups.push(() => window.removeEventListener('resize', onResize))

        let hasBg = null
        let isCompact = null
        const setBg = (on) => {
          if (on === hasBg) return
          hasBg = on
          header.classList.toggle('-bg', on)
        }
        const setCompact = (on) => {
          if (on === isCompact) return
          isCompact = on
          header.classList.toggle('-compact', on)
        }

        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const y = self.scroll()
            setBg(y > 8)

            const delta = lastY - y
            lastY = y
            upTravel = delta > 0 ? upTravel + delta : 0

            if (isNarrow || header.classList.contains('is-menu-open')) {
              setCompact(false)
              return
            }
            if (y <= COMPACT_AFTER) {
              setCompact(false)
            } else if (self.direction === 1) {
              setCompact(true)
            } else if (upTravel > UP_TO_EXPAND) {
              setCompact(false)
            }
          },
        })
        setBg(window.scrollY > 8)
        if (isNarrow) setCompact(false)
      }
    })

    ScrollTrigger.refresh()

    // Re-measure trigger positions once images/fonts finish loading — layout
    // shifts after the initial measure otherwise leave late-page reveals
    // (footer, family map) permanently hidden.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    const lateRefresh = lightweight ? null : setTimeout(onLoad, 1500)

    return () => {
      window.removeEventListener('load', onLoad)
      if (lateRefresh) clearTimeout(lateRefresh)
      headerCleanups.forEach((fn) => fn())
      ctx.revert()
      if (lenis) gsap.ticker.remove(tick)
      if (lenis) lenis.destroy()
    }
  }, [ready, routeKey])
}

/**
 * Split-line Anton title with the pink highlighter <strong> sweep.
 * `lines` is an array of strings or { text, hl: true } items; each line gets
 * a staggered --delay exactly like the reference (0.2s, 0.4s, 0.6s...).
 */
export function Title({ as: Tag = 'h2', lines, className = '', align = 'center' }) {
  return (
    <Tag className={`a-title tx-xl ${className}`} data-scroll="">
      {lines.map((line, i) => (
        <span
          className="line"
          key={i}
          style={{ '--delay': `${0.2 * (i + 1)}s`, textAlign: align }}
        >
          {typeof line === 'string' ? line : <strong>{line.text}</strong>}
        </span>
      ))}
    </Tag>
  )
}
