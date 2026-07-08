import { areas } from '../assets/images.js'
import { Title } from '../lib/scrollfx.jsx'

/**
 * "Areas we serve" — a hand-drawn California outline with landmark photo
 * markers shown directly on the map (circular thumbnail + name tag).
 * Area list comes from the live housekeepup.com homepage.
 */
const MARKERS = [
  { name: 'Chicago', img: areas.chicago, pos: 'left-[38%] top-[13%]' },
  { name: 'Evanston', img: areas.evanston, pos: 'left-[29%] top-[30%]' },
  { name: 'Lincoln Park', img: areas.lincolnPark, pos: 'left-[46%] top-[38%]' },
  { name: 'Wicker Park', img: areas.wickerPark, pos: 'left-[35%] top-[52%]' },
  { name: 'Oak Park', img: areas.oakPark, pos: 'left-[53%] top-[56%]' },
  { name: 'Logan Square', img: areas.loganSquare, pos: 'left-[46%] top-[70%]' },
  { name: 'Hyde Park', img: areas.hydePark, pos: 'left-[63%] top-[76%]' },
  { name: 'Skokie', img: areas.skokie, pos: 'left-[72%] top-[87%]' },
]

const ALL_AREAS = [
  'Chicago', 'Oak Lawn', 'Lincoln Park', 'Lakeview', 'West Loop', 'River North',
  'Gold Coast', 'South Loop', 'Logan Square', 'Wicker Park', 'Bucktown',
  'Hyde Park', 'Old Town', 'Streeterville', 'Uptown', 'Rogers Park',
  'Edgewater', 'Oak Park', 'Evanston', 'Cicero', 'Skokie', 'Berwyn',
  'Elmwood Park', 'Forest Park', 'Park Ridge', 'Des Plaines', 'Niles',
  'Morton Grove',
]

export default function Family() {
  return (
    <section id="family" className="mx-auto max-w-[1320px] px-4 pb-32 sm:px-6" data-scroll="">
      <p className="tx-s text-center" data-reveal="">
        Areas we serve
      </p>

      <div className="relative mx-auto mt-8 aspect-[4/5] max-w-[560px] px-2 sm:px-0">
        <svg
          viewBox="0 0 400 480"
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {/* Simplified hand-drawn California outline */}
          <path
            d="M95 20
               C140 12 190 18 230 26
               C231 66 230 110 232 150
               L355 330
               C351 364 366 398 362 432
               C331 438 299 440 268 438
               C259 428 249 419 240 410
               C230 399 220 389 210 378
               C197 369 184 361 172 352
               C163 341 156 330 150 318
               C145 306 141 294 138 282
               C134 270 131 258 128 246
               C124 234 121 222 118 210
               C114 199 111 187 108 176
               C104 164 101 152 100 140
               C96 125 92 111 88 96
               C90 71 92 45 95 20 Z"
            stroke="#171512"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {MARKERS.map(({ name, img, pos }, i) => (
          <figure
            key={name}
            className={`o-scatter__item group absolute ${pos} -translate-x-1/2 -translate-y-1/2 text-center`}
            style={{ '--delay': `${i * 0.08}s` }}
          >
            <img
              src={img}
              alt={`${name} landmark`}
              className="mx-auto h-[48px] w-[48px] rounded-full border-[3px] border-white object-cover shadow-[0_8px_30px_rgba(0,0,0,0.22)] transition-transform duration-300 group-hover:scale-110 sm:h-[84px] sm:w-[84px]"
            />
            <figcaption className="mx-auto mt-1.5 inline-block max-w-[82px] rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold leading-none text-cream shadow-sm sm:max-w-none sm:px-3 sm:text-[11px]">
              {name}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Title lines={['Trusted by families', { text: 'since 2016' }]} />

        <ul className="mx-auto mt-10 flex max-w-[820px] flex-wrap justify-center gap-2" data-reveal="">
          {ALL_AREAS.map((area) => (
            <li key={area} className="a-tag bg-pink/60 text-cocoa">
              {area}
            </li>
          ))}
        </ul>

        <div className="mt-10" data-reveal="">
          <a href="tel:+17087378722" className="a-button">
            Book in your neighborhood
          </a>
        </div>
      </div>
    </section>
  )
}
