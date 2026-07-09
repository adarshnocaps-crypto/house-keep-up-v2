import { useState } from 'react'

/**
 * Fixed bottom-center contact widget: collapsed it sits scaled down at the
 * viewport bottom; clicking scales it up and unfolds two pink choice rows.
 */
export default function PopinContact() {
  const [open, setOpen] = useState(false)

  return (
    <div id="contact" className={`o-popin ${open ? '-open' : ''}`}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-3 text-left"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="flex items-center gap-4">
          <span>
            <span className="tx-xs block text-cream/90">So, that clean</span>
            <span className="font-display block text-[1.35rem] leading-none">
              shall we talk?
            </span>
          </span>
        </span>
        <span className="a-button -cream -round flex-none">
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 5v14m-6-6 6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div className="o-popin__content">
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 px-4 pb-4">
            {[
              ['I need', 'a home clean', 'tel:+17087378722'],
              ['I need', 'an office clean', 'tel:+17087378722'],
            ].map(([eyebrow, label, href]) => (
              <a
                key={label}
                href={href}
                className="flex items-center justify-between gap-4 rounded-[20px] bg-pink px-6 py-4 text-cocoa transition-colors duration-300 hover:bg-cream"
              >
                <span>
                  <span className="tx-xs block">{eyebrow}</span>
                  <span className="font-display block text-xl leading-none">
                    {label}
                  </span>
                </span>
                <span className="a-button -primary -round flex-none">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path
                      d="M4 12h15m-6-6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
