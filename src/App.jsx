import { useState, useCallback } from 'react'
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
import EstimateCard from './components/EstimateCard.jsx'
import Faq from './components/Faq.jsx'
import Journal from './components/Journal.jsx'
import LocationHub from './components/LocationHub.jsx'
import Family from './components/Family.jsx'
import PopinContact from './components/PopinContact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const onLoaderDone = useCallback(() => setLoaded(true), [])

  useScrollFx(loaded)

  return (
    <>
      {!loaded && <Loader onDone={onLoaderDone} />}

      <Header />

      <main>
        <Hero ready={loaded} />
        <Mission />
        <ServicesSlider />
        <Steps />
        <ImpactSection />
        <Reviews />
        <LocationHub />
        <Family />
        <Journal />
        <Faq />
        <PushPages />
        <EstimateCard />
      </main>

      <PopinContact />
      <Footer />
    </>
  )
}
