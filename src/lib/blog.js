import { rooms } from '../assets/images.js'

/**
 * Single source of truth for journal / blog posts. Used by the homepage
 * Journal section, the blog listing page (/blog) and each post (/blog/<slug>).
 * `body` is an array of blocks: { h } for a subheading, { p } for a paragraph,
 * { list } for a bullet list.
 */
export const POSTS = [
  {
    slug: 'deep-cleaning-chicago-homes',
    img: rooms.bathroomDeep,
    category: 'Deep cleaning',
    date: '06/15/2026',
    readTime: '6 min read',
    title: 'The Real Reasons Chicago Homes Are Paying for Deep Cleaning',
    excerpt:
      'Allergies, lake humidity, radiator dust — the case for a seasonal reset goes far beyond looks. Here is what a deep clean actually covers.',
    body: [
      { p: "A standard clean keeps the surface tidy. A deep clean resets everything underneath it — and in Chicago, there are a few very specific reasons homeowners book one every season." },
      { h: 'Lake-effect humidity feeds grime' },
      { p: "Living near Lake Michigan means higher humidity, and humidity is what turns everyday dust into sticky buildup on tile, grout and glass. A deep clean tackles the film that a quick wipe just smears around." },
      { h: 'Radiator and forced-air dust' },
      { p: "Older Chicago buildings run on radiators and forced air that push fine dust into every corner — behind furniture, along baseboards and into vents. Left alone it becomes the grey haze you only notice in direct sunlight." },
      { h: "What a deep clean actually covers" },
      { list: [
        'Baseboards, door frames, trim and light switches by hand',
        'Inside appliances on request — oven, fridge and dishwasher',
        'Grout, tile, glass and fixtures descaled and polished',
        'Behind and under movable furniture and appliances',
        'High-touch surfaces sanitised throughout',
      ] },
      { h: 'Is it worth it?' },
      { p: "If it has been more than a few months, or you have never had a professional deep clean, the difference is dramatic — and it makes your regular upkeep far easier to maintain afterward. Most clients pair a first-time deep clean with a recurring plan to keep that finish." },
    ],
  },
  {
    slug: 'cleaning-your-mattress',
    img: rooms.bedroom,
    category: 'How-to',
    date: '05/28/2026',
    readTime: '4 min read',
    title: '5 Tips for Cleaning Your Mattress',
    excerpt:
      'Your mattress collects more than dreams. Five practical steps to freshen it up between professional visits.',
    body: [
      { p: "You spend a third of your life on it, but the mattress is one of the most overlooked things in the house. Here are five simple steps to keep yours fresh between deeper cleans." },
      { h: '1. Strip and wash everything' },
      { p: "Start by washing all bedding — sheets, protectors and pillowcases — on the warmest setting the fabric allows. This is the single biggest freshness win." },
      { h: '2. Vacuum the surface' },
      { p: "Use the upholstery attachment to lift dust, dead skin and allergens from the surface and seams. Pay attention to the edges where debris collects." },
      { h: '3. Spot-treat stains' },
      { p: "Blot (never rub) stains with a little mild detergent and water, or an enzyme cleaner for organic stains. Let it dry fully before re-covering." },
      { h: '4. Deodorise with baking soda' },
      { p: "Sprinkle baking soda across the surface, leave it for an hour or two, then vacuum it up. It neutralises odours without any harsh chemicals." },
      { h: '5. Flip, rotate and air it out' },
      { p: "Rotate the mattress every few months for even wear, and open the windows to let it breathe. A little airflow goes a long way." },
    ],
  },
  {
    slug: 'airbnb-cleaning-checklist',
    img: rooms.renovated,
    category: 'Hosts',
    date: '05/02/2026',
    readTime: '5 min read',
    title: 'The Airbnb Cleaning Checklist Every Host Needs',
    excerpt:
      'Five-star reviews start with the turnover. The room-by-room checklist our teams use between guests.',
    body: [
      { p: "Guests forgive a lot, but rarely a dirty space. A consistent turnover checklist is the difference between a scramble and a five-star review. Here is the room-by-room list our teams work from." },
      { h: 'Kitchen' },
      { list: [
        'Counters, sink and appliance exteriors wiped',
        'Inside the microwave and fridge checked and cleared',
        'Dishes done and put away; bins emptied',
        'Floor swept and mopped',
      ] },
      { h: 'Bathrooms' },
      { list: [
        'Shower, tub, toilet and mirror scrubbed and shined',
        'Fresh towels folded and restocked',
        'Toiletries and paper restocked',
      ] },
      { h: 'Bedrooms & living areas' },
      { list: [
        'Fresh linens, beds made hotel-style',
        'Surfaces dusted, floors vacuumed',
        'Remotes, switches and handles sanitised',
      ] },
      { h: 'Final walkthrough' },
      { p: "Do a last lap as if you were the guest arriving: lights, smells, a welcome note. That final pass is what turns a clean listing into a memorable stay — and repeat bookings." },
    ],
  },
]

export function findPost(slug) {
  return POSTS.find((p) => p.slug === slug) ?? null
}
