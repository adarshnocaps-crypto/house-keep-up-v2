import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'
import puppeteer from 'puppeteer'
import { ROUTES } from './routes.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const PORT = 4178
const ORIGIN = 'https://housekeepup.com'

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon',
}

/**
 * Serves dist/ with an SPA fallback, mirroring the production rewrite so the
 * pages we crawl are the pages that ship.
 */
function serve() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname)
      const candidate = join(dist, urlPath)
      try {
        const body = await readFile(candidate)
        res.setHeader('Content-Type', MIME[extname(candidate)] ?? 'application/octet-stream')
        res.end(body)
      } catch {
        res.setHeader('Content-Type', 'text/html')
        res.end(await readFile(join(dist, 'index.html')))
      }
    })
    server.listen(PORT, () => resolve(server))
  })
}

/**
 * Renders each route in headless Chrome and writes the resulting HTML to
 * dist/<route>/index.html. A real browser is used rather than renderToString
 * because several components read window/matchMedia during render, which
 * server-side rendering cannot provide.
 */
async function main() {
  const server = await serve()
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const failures = []

  for (const route of ROUTES) {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 45_000,
      })
      // The loader gates first paint; wait for real content and a settled title.
      await page.waitForFunction(
        () => document.querySelector('#root')?.children.length > 0,
        { timeout: 20_000 },
      )

      // useSeo derives canonical/og:url from window.location, so the crawl
      // bakes in the local origin. Rewrite it to the production host.
      const html = (await page.content()).replaceAll(`http://localhost:${PORT}`, ORIGIN)
      const title = await page.title()

      if (errors.length) failures.push(`${route} — page error: ${errors[0]}`)
      if (html.includes(`localhost:${PORT}`)) failures.push(`${route} — local origin left in HTML`)

      const dir = route === '/' ? dist : join(dist, route)
      await mkdir(dir, { recursive: true })
      await writeFile(join(dir, 'index.html'), html)
      console.log(`  ✓ ${route.padEnd(38)} ${title.slice(0, 60)}`)
    } catch (e) {
      failures.push(`${route} — ${e.message}`)
      console.log(`  ✗ ${route.padEnd(38)} ${e.message.split('\n')[0]}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  server.close()

  console.log(`\nPrerendered ${ROUTES.length - failures.length}/${ROUTES.length} routes.`)
  if (failures.length) {
    console.error('\nFailures:')
    failures.forEach((f) => console.error(`  ${f}`))
    process.exit(1)
  }
}

main()
