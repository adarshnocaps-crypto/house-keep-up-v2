import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/**
 * The data modules under src/lib import images, so Node cannot import them
 * directly. Slugs are instead read straight out of the source text, which
 * keeps this list derived from the same single source of truth the app uses
 * rather than a hand-maintained copy that silently drifts.
 */
function slugsFrom(file, key) {
  const src = readFileSync(join(root, file), 'utf8')
  const re = new RegExp(`${key}:\\s*'([\\w-]+)'`, 'g')
  return [...src.matchAll(re)].map((m) => m[1])
}

const areas = slugsFrom('src/lib/areas.js', 'slug')
const services = slugsFrom('src/lib/services.js', 'id')
const posts = slugsFrom('src/lib/blog.js', 'slug')

/** Static routes that carry SEO value. /admin and /login are deliberately
 *  excluded: they are noindex and gated. */
const staticRoutes = [
  '/',
  '/services',
  '/locations',
  // /book-now and /privacy-policy are the canonical paths, carried over from
  // the previous site so its ranking URLs resolve without a redirect.
  '/book-now',
  '/contact',
  '/hiring',
  '/about',
  '/gallery',
  '/testimonials',
  '/blog',
  '/gift-cards',
  '/legal-notice',
  '/privacy-policy',
  '/terms',
]

export const ROUTES = [
  ...staticRoutes,
  ...services.map((id) => `/services/${id}`),
  ...areas.map((slug) => `/areas/${slug}`),
  ...posts.map((slug) => `/blog/${slug}`),
]

export { areas, services, posts, staticRoutes }
