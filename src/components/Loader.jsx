import { useEffect, useState } from 'react'

/**
 * Fullscreen green loader: the "HOUSE KEEP UP" wordmark rises into view,
 * holds, then the whole layer shrinks slightly, rounds its corners and
 * fades out.
 */
export default function Loader({ onDone }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const hold = setTimeout(() => setDone(true), 1700)
    const finish = setTimeout(() => onDone(), 2400)
    return () => {
      clearTimeout(hold)
      clearTimeout(finish)
    }
  }, [onDone])

  return (
    <div className={`o-loader ${done ? '-done' : ''}`} aria-hidden="true">
      <div className="o-loader__mask">
        <span className="o-loader__word">HOUSE KEEP UP</span>
      </div>
    </div>
  )
}
