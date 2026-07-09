import { useState, useCallback, useEffect } from 'react'
import { useScrollFx } from './lib/scrollfx.jsx'
import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Mission from './components/Mission.jsx'
import Steps from './components/Steps.jsx'
import PushPages from './components/PushPages.jsx'
import ImpactSection from './components/ui/impact-section.tsx'
import Reviews from './components/Reviews.jsx'
import ServicesSlider from './components/ServicesSlider.jsx'
import BookingWizard from './components/BookingWizard.jsx'
import Faq from './components/Faq.jsx'
import Journal from './components/Journal.jsx'
import VideoShowcase from './components/VideoShowcase.jsx'
import LocationHub from './components/LocationHub.jsx'
import Family from './components/Family.jsx'
import AreaPage from './components/AreaPage.jsx'
import PopinContact from './components/PopinContact.jsx'
import Footer from './components/Footer.jsx'

/**
 * Tiny hash router:
 *   #/areas/<slug>  → dedicated location page
 *   #/#anchor       → homepage, scrolled to that section
 *   anything else   → homepage
 */
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return hash
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const onLoaderDone = useCallback(() => setLoaded(true), [])

  const hash = useHashRoute()
  const areaSlug = hash.match(/^#\/areas\/([\w-]+)/)?.[1] ?? null

  useScrollFx(loaded, areaSlug)

  // On route change: area pages start at the top; "#/#section" links land
  // back on the homepage scrolled to that section.
  useEffect(() => {
    const anchor = hash.match(/^#\/#(.+)$/)?.[1]
    if (anchor) {
      const t = setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [hash])

  return (
    <>
      {!loaded && <Loader onDone={onLoaderDone} />}

      <Header />

      {areaSlug ? (
        <main>
          <AreaPage slug={areaSlug} />
        </main>
      ) : (
        <main>
          <Hero ready={loaded} />
          <BookingWizard />
          <Mission />
          <ServicesSlider />
          <Steps />
          <ImpactSection />
          <VideoShowcase />
          <Reviews />
          <LocationHub />
          <Family />
          <Journal />
          <Faq />
          <PushPages />
        </main>
      )}

      <PopinContact />
      <Footer />
    </>
  )
}
