import { useState, useCallback, useEffect } from 'react'
import { useScrollFx } from './lib/scrollfx.jsx'
import { useRoute } from './lib/router.jsx'
import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Steps from './components/Steps.jsx'
import PushPages from './components/PushPages.jsx'
import ImpactSection from './components/ui/impact-section.tsx'
import Reviews from './components/Reviews.jsx'
import TrustBadges from './components/TrustBadges.jsx'
import ServicesSlider from './components/ServicesSlider.jsx'
import Faq from './components/Faq.jsx'
import Journal from './components/Journal.jsx'
import VideoShowcase from './components/VideoShowcase.jsx'
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
import AdminAccess from './components/AdminAccess.jsx'
import PopinContact from './components/PopinContact.jsx'
import Footer from './components/Footer.jsx'

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

  const routeKey =
    serviceId || areaSlug || blogSlug ||
    (isServices ? 'services' : isLocations ? 'locations' : isBook ? 'book' : isContact ? 'contact' : isAdmin ? 'admin' : isBlog ? 'blog' : isAbout ? 'about' : 'home')
  useScrollFx(loaded, routeKey)

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
      {!loaded && !isAdmin && <Loader onDone={onLoaderDone} />}

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
      ) : (
        <main>
          <Hero ready={loaded} />
          <Steps />
          <ServicesSlider />
          <TrustBadges />
          <VideoShowcase />
          <ImpactSection />
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
