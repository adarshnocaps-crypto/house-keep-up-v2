import { FaGoogle, FaYelp } from 'react-icons/fa6'
import { SiNextdoor } from 'react-icons/si'
import { LogoCarousel } from './ui/logo-carousel.tsx'

const BADGES = [
  { platform: 'Google', stat: '4.9', label: 'Average customer rating', Icon: FaGoogle, tone: 'google' },
  { platform: 'Nextdoor', stat: '2023', label: 'Neighborhood favorite', Icon: SiNextdoor, tone: 'nextdoor' },
  { platform: 'Yelp', stat: '4.5', label: 'Average customer rating', Icon: FaYelp, tone: 'yelp' },
]

const LIVE_LOGO_ROOT = 'https://housekeepup.com/wp-content/uploads/2026/03'

function PlatformLogo({ src, label, ...props }) {
  return <img src={`${LIVE_LOGO_ROOT}/${src}`} alt={`${label} logo`} loading="lazy" {...props} />
}

const RedfinLogo = (props) => <PlatformLogo {...props} src="1-e1774944611697.png" label="Redfin" />
const NewYorkTimesLogo = (props) => <PlatformLogo {...props} src="2-e1774944500182.png" label="The New York Times" />
const KyuhyungLogo = (props) => <PlatformLogo {...props} src="3-e1774944749829.png" label="Kyuhyung Cho" />
const AllureLogo = (props) => <PlatformLogo {...props} src="4-e1774944712331.png" label="Allure Lifestyle Communities" />
const HouzzLogo = (props) => <PlatformLogo {...props} src="5-e1774944680949.png" label="Houzz" />
const SwitchplaceLogo = (props) => <PlatformLogo {...props} src="6-e1774944648284.png" label="Switchplace" />

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
    <section className="trust-badges" aria-label="Customer ratings and recognition" data-scroll="">
      <div className="trust-badges__head" data-reveal="">
        <p className="tx-xs">Trusted around Chicago</p>
        <p>Recognized by the neighbors and customers we clean for.</p>
      </div>
      <div className="trust-badges__grid">
        {BADGES.map(({ platform, stat, label, Icon, tone }) => (
          <article className={`trust-badge trust-badge--${tone}`} key={platform} data-reveal="">
            <div className="trust-badge__brand"><Icon /><strong>{platform}</strong></div>
            {tone === 'nextdoor'
              ? <span className="trust-badge__award">🏆 Award winner</span>
              : <span className="trust-badge__stars" aria-label={`${stat} out of 5 stars`}>★★★★★</span>}
            <strong className="trust-badge__stat">{stat}</strong>
            <p>{label}</p>
          </article>
        ))}
      </div>
      <div className="featured-platforms" data-reveal="">
        <p>Featured on trusted platforms</p>
        <div className="featured-platforms__carousel">
          <LogoCarousel columnCount={3} logos={FEATURES} />
        </div>
      </div>
    </section>
  )
}
