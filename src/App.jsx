import { useState, useCallback, useEffect } from 'react'
import { useScrollFx } from './lib/scrollfx.jsx'
import { useRoute } from './lib/router.jsx'
import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Mission from './components/Mission.jsx'
import Steps from './components/Steps.jsx'
import PushPages from './components/PushPages.jsx'
import ImpactSection from './components/ui/impact-section.tsx'
import Reviews from './components/Reviews.jsx'
import ServicesSlider from './components/ServicesSlider.jsx'
import Faq from './components/Faq.jsx'
import Journal from './components/Journal.jsx'
import VideoShowcase from './components/VideoShowcase.jsx'
import LocationHub from './components/LocationHub.jsx'
import Family from './components/Family.jsx'
import AreaPage from './components/AreaPage.jsx'
import ServicesPage from './components/ServicesPage.jsx'
import PopinContact from './components/PopinContact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const onLoaderDone = useCallback(() => setLoaded(true), [])

  const { path, hash } = useRoute()
  const areaSlug = path.match(/^\/areas\/([\w-]+)/)?.[1] ?? null
  const isServices = /^\/services\/?$/.test(path)

  useScrollFx(loaded, areaSlug || (isServices ? 'services' : 'home'))

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
      {!loaded && <Loader onDone={onLoaderDone} />}

      <Header />

      {areaSlug ? (
        <main>
          <AreaPage slug={areaSlug} />
        </main>
      ) : isServices ? (
        <main>
          <ServicesPage />
        </main>
      ) : (
        <main>
          <Hero ready={loaded} />
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
