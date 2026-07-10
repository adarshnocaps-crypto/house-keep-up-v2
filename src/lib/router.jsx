import { useState, useEffect, useCallback } from 'react'

/**
 * Minimal History-API router — clean paths, no hash.
 *   /              → homepage
 *   /services      → services page
 *   /areas/<slug>  → dedicated location page
 *   /#section      → homepage, scrolled to that section
 *
 * A single global click handler intercepts same-origin <a> clicks so
 * navigation stays client-side (no full reload). External links, new-tab
 * clicks, downloads and tel:/mailto: fall through to the browser.
 */
export function navigate(to, { replace = false } = {}) {
  const url = new URL(to, window.location.origin)
  if (url.origin !== window.location.origin) {
    window.location.href = to
    return
  }
  const method = replace ? 'replaceState' : 'pushState'
  window.history[method]({}, '', url.pathname + url.search + url.hash)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function useRoute() {
  const read = useCallback(
    () => ({ path: window.location.pathname, hash: window.location.hash }),
    [],
  )
  const [route, setRoute] = useState(read)

  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [read])

  // Intercept in-app link clicks once, globally.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(href, window.location.origin)
      if (url.origin !== window.location.origin) return // external
      // tel:, mailto: etc. have a different protocol
      if (url.protocol !== window.location.protocol) return
      e.preventDefault()
      navigate(url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return route
}
