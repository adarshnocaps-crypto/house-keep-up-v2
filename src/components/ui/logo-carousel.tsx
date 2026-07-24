"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export interface Logo {
  name: string
  id: number
  img: React.ComponentType<{ className?: string }>
}

interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const shuffled = shuffleArray(allLogos)
  const columns: Logo[][] = Array.from({ length: columnCount }, () => [])

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  const maxLength = Math.max(...columns.map((column) => column.length))
  columns.forEach((column) => {
    while (column.length < maxLength) {
      column.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 4000
    const columnDelay = index * 200
    const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)
    const CurrentLogo = useMemo(() => logos[currentIndex].img, [logos, currentIndex])

    return (
      <motion.div
        className="relative h-20 w-24 overflow-hidden sm:h-24 sm:w-32 md:h-32 md:w-64"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${logos[currentIndex].id}-${currentIndex}`}
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.7,
              },
            }}
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
              transition: { type: "tween", ease: "easeIn", duration: 0.45 },
            }}
          >
            <CurrentLogo className="h-11 w-20 max-w-[92%] object-contain sm:h-14 sm:w-28 md:h-20 md:w-56" />
            <span className="mt-2 max-w-full text-center text-[10px] font-bold leading-tight text-primary sm:text-[11px] md:text-[15px]">
              {logos[currentIndex].name}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  },
)

interface LogoCarouselProps {
  columnCount?: number
  logos: Logo[]
}

export function LogoCarousel({ columnCount = 2, logos }: LogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  const updateTime = useCallback(() => {
    setCurrentTime((previousTime) => previousTime + 100)
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(updateTime, 100)
    return () => window.clearInterval(intervalId)
  }, [updateTime])

  useEffect(() => {
    setLogoSets(distributeLogos(logos, columnCount))
  }, [logos, columnCount])

  return (
    <div className="flex w-full justify-center gap-2 sm:gap-4 md:gap-10">
      {logoSets.map((columnLogos, index) => (
        <LogoColumn
          key={index}
          logos={columnLogos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  )
}

export { LogoColumn }
