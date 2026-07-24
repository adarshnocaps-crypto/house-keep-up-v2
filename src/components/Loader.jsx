import { useEffect, useState } from 'react'

/**
 * Fullscreen green loader: the "HOUSE KEEP UP" wordmark rises into view,
 * holds, then the whole layer shrinks slightly, rounds its corners and
 * fades out.
 */
export default function Loader({ onDone }) {
  const [done, setDone] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const hold = setTimeout(() => setDone(true), isMobile ? 950 : 1700)
    const reveal = setTimeout(() => onDone?.(), isMobile ? 1550 : 2450)
    const remove = setTimeout(() => setRemoved(true), isMobile ? 1800 : 2750)
    return () => {
      clearTimeout(hold)
      clearTimeout(reveal)
      clearTimeout(remove)
    }
  }, [onDone])

  if (removed) return null

  return (
    <div className={`o-loader ${done ? '-done' : ''}`} aria-hidden="true">
      <div className="o-loader__mask">
        <span className="o-loader__word">HOUSE KEEP UP</span>
      </div>
    </div>
  )
}
