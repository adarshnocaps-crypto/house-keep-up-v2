import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Title } from '../lib/scrollfx.jsx'
import house from '../assets/images/areas/forest-park-cutout.webp'
import member1 from '../assets/images/team/member-1.jpg'
import member2 from '../assets/images/team/member-2.jpg'
import member3 from '../assets/images/team/member-3.jpg'

/**
 * Closing scene above the footer: the crew standing behind a house that rises
 * full-bleed out of the page.
 *
 * The house is a cutout: its sky was keyed out to transparency (see
 * scripts/cut-sky.py), so the roof silhouette itself occludes the maids rather
 * than the photo's straight rectangular edge slicing across their faces.
 *
 * Centering here is done with inset + margin, never `transform: translateX`.
 * Framer Motion writes the whole `transform` property on the layers it
 * animates, so a CSS translate would be silently overwritten and the layer
 * would slide off-centre.
 *
 * These portraits are stock, not our actual crew, so they carry no names and
 * no alt text that would claim an identity.
 */
const CREW = [member1, member2, member3]

export default function CrewScene() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const crewY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [52, -52])
  const houseY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [14, -14])

  return (
    <section className="cs" data-scroll="" ref={ref}>
      <div className="cs-copy">
        <p data-reveal="">
          <span className="a-sticker">The maids who show up</span>
        </p>
        <div className="cs-title">
          <Title lines={['Real maids,', { text: 'real homes.' }]} />
        </div>
        <p className="cs-lede" data-reveal="" style={{ '--delay': '0.2s' }}>
          Vetted, background-checked and local — the same maids coming back to
          the same doors, week after week, right across Chicagoland.
        </p>
      </div>

      <div className="cs-stage">
        <motion.div className="cs-crew" style={{ y: crewY }}>
          {CREW.map((src, i) => (
            <div key={i} className="cs-face">
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </motion.div>

        <motion.figure className="cs-house" style={{ y: houseY }}>
          <img src={house} alt="A Chicagoland home on a House Keep Up route" loading="lazy" />
        </motion.figure>
      </div>
    </section>
  )
}
