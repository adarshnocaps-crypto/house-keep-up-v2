/**
 * Reusable liquid-glass surface.
 *
 * Each visual layer clips itself instead of clipping the outer element, so
 * menus and popovers inside the glass surface can still extend beyond it.
 */
export function LiquidGlass({ children, className = '', style }) {
  return (
    <div className={`liquid-glass ${className}`} style={style}>
      <span className="liquid-glass__clip" aria-hidden="true">
        <span className="liquid-glass__distortion" />
        <span className="liquid-glass__tint" />
        <span className="liquid-glass__shine" />
      </span>
      <div className="liquid-glass__content">{children}</div>
      <LiquidGlassFilter />
    </div>
  )
}

function LiquidGlassFilter() {
  return (
    <svg className="liquid-glass__filter" aria-hidden="true" focusable="false">
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="#ffffff"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="200"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}
