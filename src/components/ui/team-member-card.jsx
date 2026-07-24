'use client'

/**
 * Editorial team-member card, rebranded for House Keep Up.
 * Overlapping portrait + large display name + circular CTA, restyled from the
 * emerald-ui original into the brand palette (green / cream / cocoa / pink,
 * Anton display type). Alternates layout with the `position` prop.
 */
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils.js'

const ease = [0.22, 1, 0.36, 1]

export default function TeamMemberCard({
  position = 'left',
  jobPosition = 'Lead Cleaner',
  firstName = 'Jennie',
  lastName = 'Garcia',
  imageUrl = '',
  description = '',
  className,
}) {
  const fullName = `${firstName} ${lastName}`
  const right = position === 'right'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.6, ease }}
      className={cn('relative my-10 flex flex-col justify-center sm:my-14', className)}
    >
      {/* role label */}
      <motion.p
        initial={{ opacity: 0, x: right ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn('tm-role', right && 'text-right')}
      >
        {jobPosition}
      </motion.p>

      <div className="tm-layout flex items-center justify-end">
        {/* portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className={cn('tm-photo', right && 'order-1')}
        >
          <span className="tm-photoVeil" aria-hidden="true" />
          <img src={imageUrl} alt={fullName} className="tm-photoImg" loading="lazy" />
        </motion.div>

        {/* info block — overlaps the portrait */}
        <motion.div
          initial={{ opacity: 0, x: right ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className={cn('tm-info', right && 'tm-info--right')}
        >
          <p className="tm-name">
            {firstName}
            <br />
            <span className="tm-name--strong">{lastName}</span>
          </p>

          <div className={cn('tm-row', right && 'justify-end')}>
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={cn('tm-cta group', right && 'order-1')}
            >
              <ArrowRight
                size={22}
                className={cn('tm-ctaIcon', right && 'rotate-180 group-hover:rotate-[225deg]')}
              />
            </motion.div>

            <p className={cn('tm-bio', right && 'text-right')}>{description}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
