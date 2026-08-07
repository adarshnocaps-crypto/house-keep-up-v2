import { useCallback, useEffect, useRef } from 'react'

/* Liquid image — a WebGL port of the Framer "LiquidImage" module
   (framer.com/m/LiquidImage-DMcO.js, by gustavwf).

   The module itself could not be imported: it ships as remote ESM with bare
   `react` / `framer` specifiers and needs Framer's canvas runtime for its
   property controls, so the shader and interaction model are reimplemented
   here against the project's own React.

   Ripples spread from the cursor and from a short trail of recent
   positions, displacing the texture as the pointer crosses it. The source
   component also desaturates everything the cursor is not touching; that
   half is dropped here — the picture stays in full colour throughout. */

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0, 1);
  }
`

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_image;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_strength;
  uniform float u_speed;
  #define MAX_WAKE 16
  uniform int u_wakeCount;
  uniform vec3 u_wake[MAX_WAKE];

  void main() {
    vec2 uv = v_uv;

    /* Trailing ripples: each carries the time it was dropped, so its
       amplitude decays with both distance and age. */
    for (int i = 0; i < MAX_WAKE; ++i) {
      if (i >= u_wakeCount) break;
      vec2 w = u_wake[i].xy;
      float t = u_time - u_wake[i].z;
      float dist = distance(uv, w);
      float amp = exp(-dist * 16.0) * exp(-t * 1.2);
      float ripple = sin(32.0 * dist - t * 8.0 * u_speed) * 0.04;
      uv += normalize(uv - w) * ripple * u_strength * amp * 2.0;
    }

    /* The live ripple under the cursor never decays while it is held. */
    if (u_mouse.x >= 0.0 && u_mouse.x <= 1.0 && u_mouse.y >= 0.0 && u_mouse.y <= 1.0) {
      float dist = distance(uv, u_mouse);
      float ripple = sin(32.0 * dist - u_time * 8.0 * u_speed) * 0.04;
      float effect = exp(-dist * 12.0);
      uv += normalize(uv - u_mouse) * ripple * u_strength * effect * 2.0;
    }

    uv = clamp(uv, 0.0, 1.0);

    /* Full colour always. The source component desaturates everything the
       cursor is not touching; here the picture stays as shot and only the
       ripple responds. */
    gl_FragColor = texture2D(u_image, uv);
  }
`

const compile = (gl, type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export function LiquidImage({
  src,
  alt = '',
  fit = 'cover',
  /* Displacement amount. The Framer default of 0.03 is a shimmer; the shader
     multiplies it by 2.5 before it reaches the uniform. */
  strength = 0.03,
  speed = 0.14,
  objectPosition = 'center center',
  className = '',
}) {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const offscreenRef = useRef(null)

  const sizeRef = useRef({ width: 1, height: 1 })
  const dprRef = useRef(1)
  const fitRef = useRef(fit)
  fitRef.current = fit

  const mouseRef = useRef({ x: -10, y: -10, active: false })
  const wakeRef = useRef([])

  /* The canvas is a decorative duplicate of the <img> beneath it, so it never
     announces itself; the image below carries the alt text. */
  const handleMove = useCallback((event) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const point = event.touches?.[0] ?? event
    const x = Math.max(0, Math.min(1, (point.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (point.clientY - rect.top) / rect.height))

    mouseRef.current = { x, y, active: true }

    const now = Date.now()
    wakeRef.current = [...wakeRef.current.filter((w) => now - w.t < 1200), { x, y, t: now }].slice(-8)
  }, [])

  const handleLeave = useCallback(() => {
    mouseRef.current = { ...mouseRef.current, active: false }
  }, [])

  /* Measure the wrapper rather than the canvas — the canvas is sized from
     this, so observing it would feed back on itself. */
  useEffect(() => {
    const element = wrapperRef.current
    if (!element) return

    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      dprRef.current = dpr
      const rect = element.getBoundingClientRect()
      sizeRef.current = {
        width: Math.max(1, Math.round(rect.width * dpr)),
        height: Math.max(1, Math.round(rect.height * dpr)),
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    /* Anyone who has asked for less motion gets the plain photograph. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const gl = canvas.getContext('webgl', { premultipliedAlpha: false })
    if (!gl) return

    const image = new Image()
    image.crossOrigin = 'anonymous'

    let program
    let texture
    let uniforms
    let frame
    let ready = false
    let appliedWidth = 0
    let appliedHeight = 0
    const startTime = Date.now()

    const setup = () => {
      program = gl.createProgram()
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER))
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
      gl.linkProgram(program)
      gl.useProgram(program)

      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
      const position = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

      uniforms = {
        time: gl.getUniformLocation(program, 'u_time'),
        mouse: gl.getUniformLocation(program, 'u_mouse'),
        strength: gl.getUniformLocation(program, 'u_strength'),
        speed: gl.getUniformLocation(program, 'u_speed'),
        wake: gl.getUniformLocation(program, 'u_wake'),
        wakeCount: gl.getUniformLocation(program, 'u_wakeCount'),
      }

      texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.activeTexture(gl.TEXTURE0)
      gl.uniform1i(gl.getUniformLocation(program, 'u_image'), 0)

      ready = true
    }

    /* The photo is drawn into a 2D canvas first so object-fit maths can be
       applied there, rather than in the shader. */
    const updateTexture = () => {
      const { width, height } = sizeRef.current
      let offscreen = offscreenRef.current
      if (!offscreen) {
        offscreen = document.createElement('canvas')
        offscreenRef.current = offscreen
      }
      if (offscreen.width !== width || offscreen.height !== height) {
        offscreen.width = width
        offscreen.height = height
      }

      const context = offscreen.getContext('2d')
      const iw = image.naturalWidth
      const ih = image.naturalHeight
      if (!iw || !ih) return

      let scale
      if (fitRef.current === 'contain') scale = Math.min(width / iw, height / ih)
      else scale = Math.max(width / iw, height / ih)

      const sw = iw * scale
      const sh = ih * scale
      /* Match CSS object-position so the framing survives the port. */
      const [alignX] = objectPosition.split(' ')
      const anchor = alignX === 'left' ? 0 : alignX === 'right' ? 1 : 0.5

      context.clearRect(0, 0, width, height)
      context.drawImage(image, (width - sw) * anchor, (height - sh) / 2, sw, sh)

      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen)
    }

    const render = () => {
      if (!ready) return

      const { width, height } = sizeRef.current
      if (width !== appliedWidth || height !== appliedHeight) {
        canvas.width = width
        canvas.height = height
        canvas.style.width = `${width / dprRef.current}px`
        canvas.style.height = `${height / dprRef.current}px`
        appliedWidth = width
        appliedHeight = height
      }

      updateTexture()
      gl.viewport(0, 0, width, height)
      gl.clear(gl.COLOR_BUFFER_BIT)

      const now = (Date.now() - startTime) / 1000
      gl.uniform1f(uniforms.time, now)

      const { x, y, active } = mouseRef.current
      gl.uniform2f(uniforms.mouse, active ? x : -10, active ? 1 - y : -10)
      gl.uniform1f(uniforms.strength, strength * 2.5)
      gl.uniform1f(uniforms.speed, speed)

      const wake = wakeRef.current.slice(-16)
      const wakeData = new Float32Array(16 * 3)
      wake.forEach((point, index) => {
        wakeData[index * 3] = point.x
        wakeData[index * 3 + 1] = 1 - point.y
        wakeData[index * 3 + 2] = (point.t - startTime) / 1000
      })
      gl.uniform1i(uniforms.wakeCount, wake.length)
      gl.uniform3fv(uniforms.wake, wakeData)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frame = requestAnimationFrame(render)
    }

    image.onload = () => {
      canvas.dataset.ready = 'true'
      setup()
      render()
    }
    image.src = src

    return () => {
      if (frame) cancelAnimationFrame(frame)
      image.onload = null
    }
  }, [src, strength, speed, objectPosition])

  return (
    <div
      ref={wrapperRef}
      className={`liquid-image ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove}
      onTouchEnd={handleLeave}
    >
      {/* The real photograph. It carries the alt text and stands in wherever
          WebGL is unavailable, reduced motion is asked for, or the canvas has
          yet to draw its first frame. */}
      <img className="liquid-image__still" src={src} alt={alt} style={{ objectFit: fit, objectPosition }} />
      <canvas ref={canvasRef} className="liquid-image__canvas" aria-hidden="true" />
    </div>
  )
}
