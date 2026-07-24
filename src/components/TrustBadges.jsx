import { LogoCarousel } from './ui/logo-carousel.tsx'
import { Title } from '../lib/scrollfx.jsx'

function PlatformLogo({ src, label, ...props }) {
  return (
    <img
      src={`/platform-logos/${src}`}
      alt={`${label} logo`}
      loading="eager"
      decoding="async"
      {...props}
    />
  )
}

const RedfinLogo = (props) => <PlatformLogo {...props} src="redfin.png" label="Redfin" />
const NewYorkTimesLogo = (props) => <PlatformLogo {...props} src="new-york-times.png" label="The New York Times" />
const KyuhyungLogo = (props) => <PlatformLogo {...props} src="kyuhyung-cho.png" label="Kyuhyung Cho" />
const AllureLogo = (props) => <PlatformLogo {...props} src="allure.png" label="Allure Lifestyle Communities" />
const HouzzLogo = (props) => <PlatformLogo {...props} src="houzz.png" label="Houzz" />
const SwitchplaceLogo = (props) => <PlatformLogo {...props} src="switchplace.png" label="Switchplace" />

const FEATURES = [
  { name: 'The New York Times', id: 1, img: NewYorkTimesLogo },
  { name: 'Redfin', id: 2, img: RedfinLogo },
  { name: 'Houzz', id: 3, img: HouzzLogo },
  { name: 'Switchplace', id: 4, img: SwitchplaceLogo },
  { name: 'Kyuhyung Cho', id: 5, img: KyuhyungLogo },
  { name: 'Allure Lifestyle Communities', id: 6, img: AllureLogo },
]

export default function TrustBadges() {
  return (
    <section className="trust-badges" aria-label="Featured on trusted platforms" data-scroll="">
      <div className="text-center">
        <p className="mb-6" data-reveal="">
          <span className="a-sticker">Trusted around Chicago</span>
        </p>
        <Title lines={['Featured on', { text: 'trusted platforms' }]} />
        <p
          className="mx-auto mt-5 max-w-[560px] text-[15px] leading-relaxed text-primary/70"
          data-reveal=""
        >
          The neighbors, customers and publications who know our work best.
        </p>
      </div>

      <div className="featured-platforms" data-reveal="">
        <div className="featured-platforms__carousel">
          <LogoCarousel columnCount={3} logos={FEATURES} />
        </div>
      </div>
    </section>
  )
}
