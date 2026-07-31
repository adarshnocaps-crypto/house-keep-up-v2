import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/** A softly masked landmark that fades and drifts behind a cream page section. */
export default function SectionLandmark({ image, side = 'left', tone }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.055])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 0.46, 0.46, 0])

  return (
    <motion.div
      ref={ref}
      className="section-landmark"
      data-side={side}
      data-tone={tone}
      aria-hidden="true"
      style={{
        y: reduceMotion ? 0 : y,
        scale: reduceMotion ? 1 : scale,
        opacity: reduceMotion ? 0.38 : opacity,
      }}
    >
      <img src={image} alt="" width="720" height="900" loading="lazy" decoding="async" />
    </motion.div>
  )
}
