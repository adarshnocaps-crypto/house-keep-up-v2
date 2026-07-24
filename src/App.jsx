import { useState, useCallback, useEffect } from 'react'
import { useScrollFx } from './lib/scrollfx.jsx'
import { useRoute } from './lib/router.jsx'
import { useSeo } from './lib/seo.js'
import { findArea } from './lib/areas.js'
import { findService } from './lib/services.js'
import { findPost } from './lib/blog.js'
import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Steps from './components/Steps.jsx'
import PushPages from './components/PushPages.jsx'
import Story from './components/Story.jsx'
import Reviews from './components/Reviews.jsx'
import TrustBadges from './components/TrustBadges.jsx'
import ServicesSlider from './components/ServicesSlider.jsx'
import Faq from './components/Faq.jsx'
import Journal from './components/Journal.jsx'
import LocationHub from './components/LocationHub.jsx'
import Family from './components/Family.jsx'
import AreaPage from './components/AreaPage.jsx'
import LocationsPage from './components/LocationsPage.jsx'
import ServicesPage from './components/ServicesPage.jsx'
import ServiceDetailPage from './components/ServiceDetailPage.jsx'
import BookPage from './components/BookPage.jsx'
import ContactPage from './components/ContactPage.jsx'
import BlogPage from './components/BlogPage.jsx'
import BlogPostPage from './components/BlogPostPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import GalleryPage from './components/GalleryPage.jsx'
import GalleryTeaser from './components/GalleryTeaser.jsx'
import AdminAccess from './components/AdminAccess.jsx'
import PopinContact from './components/PopinContact.jsx'
import Footer from './components/Footer.jsx'

const SITE = 'House Keep Up'
const HOME_DESC =
  "House Keep Up is Chicago's trusted house cleaning service since 2016. Standard, deep, move-in/out, post-construction and commercial cleaning with a 24-hour happiness guarantee."

/** Resolve the SEO title/description for the current route. */
function seoFor(r) {
  if (r.isAdmin) return { title: `Admin | ${SITE}`, noindex: true }
  if (r.areaSlug) {
    const a = findArea(r.areaSlug)
    if (a)
      return {
        title: `House Cleaning in ${a.name} | ${SITE}`,
        description: `Professional home and office cleaning in ${a.name}, Chicago — standard, deep, move-in/out and recurring cleans with a 24-hour happiness guarantee. Book House Keep Up today.`,
      }
  }
  if (r.serviceId) {
    const s = findService(r.serviceId)
    if (s)
      return {
        title: `${s.title} in Chicago | ${SITE}`,
        description: `${s.title} from House Keep Up — Chicago's vetted, insured cleaners since 2016. Flat, upfront pricing and a 24-hour re-clean guarantee. Get a free estimate.`,
      }
  }
  if (r.blogSlug) {
    const p = findPost(r.blogSlug)
    if (p)
      return {
        title: `${p.title} | ${SITE}`,
        description: p.excerpt || `Cleaning tips and home-care guides from ${SITE}, Chicago's trusted cleaning service.`,
      }
  }
  if (r.isServices)
    return {
      title: `Cleaning Services in Chicago | ${SITE}`,
      description:
        "Explore House Keep Up's cleaning services in Chicago: standard, deep, move-in/out, post-construction, commercial and recurring cleaning. Flat pricing, satisfaction guaranteed.",
    }
  if (r.isLocations)
    return {
      title: `Areas We Serve Across Chicagoland | ${SITE}`,
      description:
        'See the Chicago neighborhoods and suburbs House Keep Up cleans — from the Loop to Evanston, Oak Park, Skokie and beyond.',
    }
  if (r.isBook)
    return {
      title: `Book a Cleaning | ${SITE}`,
      description:
        'Book a professional cleaning with House Keep Up in minutes — choose your service, pick a time and get a flat, upfront price.',
    }
  if (r.isContact)
    return {
      title: `Contact Us | ${SITE}`,
      description:
        'Get in touch with House Keep Up — call (708) 737-8722 or email hello@housekeepup.com for bookings, offices and custom cleans in Chicago.',
    }
  if (r.isBlog)
    return {
      title: `The Keep-Up Journal | ${SITE}`,
      description:
        "Cleaning tips, checklists and home-care guides from House Keep Up, Chicago's trusted cleaning service.",
    }
  if (r.isAbout)
    return {
      title: `About House Keep Up | Chicago Cleaning Since 2016`,
      description:
        "Learn about House Keep Up — Chicago's vetted, insured cleaning team serving homes and businesses since 2016.",
    }
  if (r.isGallery)
    return {
      title: `Before & After Gallery | ${SITE}`,
      description:
        'See real before-and-after results from House Keep Up cleans across Chicago — homes, kitchens, baths and offices transformed.',
    }
  return { title: `${SITE} | Trusted House Cleaning in Chicago`, description: HOME_DESC }
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const onLoaderDone = useCallback(() => setLoaded(true), [])

  const { path, hash } = useRoute()
  const areaSlug = path.match(/^\/areas\/([\w-]+)/)?.[1] ?? null
  const serviceId = path.match(/^\/services\/([\w-]+)/)?.[1] ?? null
  const isServices = /^\/services\/?$/.test(path)
  const isLocations = /^\/locations\/?$/.test(path)
  const isBook = /^\/book\/?$/.test(path)
  const isContact = /^\/contact\/?$/.test(path)
  const isAdmin = /^\/admin(?:\/login)?\/?$/.test(path)
  const isAdminLogin = /^\/admin\/login\/?$/.test(path)
  const blogSlug = path.match(/^\/blog\/([\w-]+)/)?.[1] ?? null
  const isBlog = /^\/blog\/?$/.test(path)
  const isAbout = /^\/about\/?$/.test(path)
  const isGallery = /^\/gallery\/?$/.test(path)

  const routeKey =
    serviceId || areaSlug || blogSlug ||
    (isServices ? 'services' : isLocations ? 'locations' : isBook ? 'book' : isContact ? 'contact' : isAdmin ? 'admin' : isBlog ? 'blog' : isAbout ? 'about' : isGallery ? 'gallery' : 'home')
  useScrollFx(loaded, routeKey)

  useSeo(
    seoFor({
      areaSlug, serviceId, blogSlug, isServices, isLocations,
      isBook, isContact, isAdmin, isBlog, isAbout, isGallery,
    }),
  )

  // On route change: sub-pages start at the top; a "/#section" hash on the
  // homepage lands scrolled to that section.
  useEffect(() => {
    const anchor = hash ? hash.slice(1) : null
    if (anchor) {
      const t = setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [path, hash])

  return (
    <>
      {!isAdmin && <Loader onDone={onLoaderDone} />}

      {!isAdmin && <Header />}

      {isAdmin ? (
        <AdminAccess loginPage={isAdminLogin} />
      ) : areaSlug ? (
        <main>
          <AreaPage slug={areaSlug} />
        </main>
      ) : serviceId ? (
        <main>
          <ServiceDetailPage id={serviceId} />
        </main>
      ) : isServices ? (
        <main>
          <ServicesPage />
        </main>
      ) : isLocations ? (
        <main>
          <LocationsPage />
        </main>
      ) : isBook ? (
        <main>
          <BookPage />
        </main>
      ) : isContact ? (
        <main>
          <ContactPage />
        </main>
      ) : blogSlug ? (
        <main>
          <BlogPostPage slug={blogSlug} />
        </main>
      ) : isBlog ? (
        <main>
          <BlogPage />
        </main>
      ) : isAbout ? (
        <main>
          <AboutPage />
        </main>
      ) : isGallery ? (
        <main>
          <GalleryPage />
        </main>
      ) : (
        <main>
          <Hero ready={loaded} />
          <Steps />
          <ServicesSlider />
          <TrustBadges />
          {/* VideoShowcase temporarily removed (videos hidden for now) */}
          <Story />
          <GalleryTeaser />

          <Reviews />
          <LocationHub />
          <Family />
          <Journal />
          <Faq />
          <PushPages />
        </main>
      )}

      {!isAdmin && !isBook && <PopinContact />}
      {!isAdmin && <Footer />}
    </>
  )
}
