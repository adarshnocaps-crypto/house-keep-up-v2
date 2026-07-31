import { useEffect, useRef, useState } from 'react'
import sweepWide from '../assets/videos/broom-sweep-wide.mp4'
import sweepTall from '../assets/videos/broom-sweep-tall.mp4'

/**
 * Fullscreen green loader, in two overlapping beats:
 *   1. a broom sweeps the dust away (animated clip, portrait or landscape)
 *   2. before the sweep ends, the "HOUSE KEEP UP" wordmark rises through it,
 *      holds, then the whole layer shrinks, rounds its corners and fades out.
 * The overlap is what keeps it reading as one motion rather than two clips.
 */

/* The clips run 4s at 24fps. We play them a touch fast and hand over to the
   wordmark partway through — by then the floor is clear and the broom is on
   its way out, which is the whole story. Waiting for the last frame just
   leaves the visitor watching a finished sweep. */
const PLAYBACK_RATE = 1.3
const SWEEP_MS = 1900
/* If the clip never reports playback (blocked autoplay, decode failure, a data
   saver stripping it), start the clock anyway so the loader always resolves. */
const START_FALLBACK_MS = 650

/* Resolved once, during the first render: the loader only ever mounts on first
   paint, so there is nothing to re-evaluate on resize. */
function pickClip() {
  if (typeof window === 'undefined') return { clip: null, isMobile: false }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  // reduced motion skips the sweep entirely and never downloads the clip
  return { clip: reduced ? null : (isMobile ? sweepTall : sweepWide), isMobile }
}

export default function Loader({ onDone }) {
  const [{ clip, isMobile }] = useState(pickClip)
  const [swept, setSwept] = useState(false)
  const [done, setDone] = useState(false)
  const [removed, setRemoved] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const hold = isMobile ? 1050 : 1350
    const video = videoRef.current
    let timers = []
    let started = false

    // `sweep` is how long the broom gets before the wordmark rises through it
    const begin = (sweep) => {
      if (started) return
      started = true
      timers.push(
        setTimeout(() => setSwept(true), sweep),
        setTimeout(() => setDone(true), sweep + hold),
        setTimeout(() => onDone?.(), sweep + hold + (isMobile ? 600 : 720)),
        setTimeout(() => setRemoved(true), sweep + hold + (isMobile ? 850 : 1020)),
      )
    }

    if (!clip) {
      begin(0)
      return () => timers.forEach(clearTimeout)
    }

    // start the clock on the first painted frame, so the wordmark lands on the
    // sweep instead of drifting from it while the clip is still decoding
    const onPlaying = () => {
      video.playbackRate = PLAYBACK_RATE
      begin(SWEEP_MS)
    }
    video.addEventListener('playing', onPlaying)
    video.playbackRate = PLAYBACK_RATE
    video.play?.().catch(() => begin(0))
    timers.push(setTimeout(() => begin(SWEEP_MS), START_FALLBACK_MS))

    return () => {
      video.removeEventListener('playing', onPlaying)
      timers.forEach(clearTimeout)
    }
  }, [clip, isMobile, onDone])

  if (removed) return null

  return (
    <div className={`o-loader ${done ? '-done' : ''}`} aria-hidden="true">
      {clip && (
        <div className={`o-loader__sweep ${swept ? '-out' : ''}`}>
          <div className="o-loader__sweepInner">
            <video
              ref={videoRef}
              className="o-loader__sweepVid"
              src={clip}
              autoPlay
              muted
              playsInline
              preload="auto"
            />
          </div>
        </div>
      )}

      {swept && (
        <div className="o-loader__mask">
          <span className="o-loader__word">HOUSE KEEP UP</span>
        </div>
      )}
    </div>
  )
}
