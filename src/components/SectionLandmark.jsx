import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/** A softly masked landmark that fades and drifts behind a cream page section. */
export default function SectionLandmark({ image, side = 'left', tone, placement }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // On phones the landmark sits behind the copy rather than beside it, so it
  // peaks dimmer. This lives here because Framer Motion writes opacity inline,
  // which a CSS media query could never override.
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const sync = () => setNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  const peak = narrow ? 0.26 : 0.46

  const y = useTransform(scrollYProgress, [0, 1], [-24, 24])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.055])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, peak, peak, 0])

  return (
    <motion.div
      ref={ref}
      className="section-landmark"
      data-side={side}
      data-tone={tone}
      data-placement={placement}
      aria-hidden="true"
      style={{
        y: reduceMotion ? 0 : y,
        scale: reduceMotion ? 1 : scale,
        opacity: reduceMotion ? peak * 0.8 : opacity,
      }}
    >
      <img src={image} alt="" width="720" height="900" loading="lazy" decoding="async" />
    </motion.div>
  )
}
