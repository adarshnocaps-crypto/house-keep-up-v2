import { useEffect } from 'react'

const SITE_NAME = 'House Keep Up'
const DEFAULT_TITLE = `${SITE_NAME} | Trusted House Cleaning in Chicago`

function setMetaByName(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaByProp(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps the document title and the SEO/social meta tags in sync with the
 * current client-side route. The canonical + og:url are derived from the live
 * origin so they stay correct across environments.
 */
export function useSeo({ title, description, noindex = false }) {
  useEffect(() => {
    const fullTitle = title || DEFAULT_TITLE
    const url = window.location.origin + window.location.pathname

    document.title = fullTitle
    if (description) setMetaByName('description', description)
    setCanonical(url)
    setMetaByName('robots', noindex ? 'noindex, nofollow' : 'index, follow')

    setMetaByProp('og:title', fullTitle)
    setMetaByProp('og:url', url)
    if (description) setMetaByProp('og:description', description)

    setMetaByName('twitter:title', fullTitle)
    if (description) setMetaByName('twitter:description', description)
  }, [title, description, noindex])
}
