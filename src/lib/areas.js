import { areas } from '../assets/images.js'

/**
 * Service-area data shared by the map pins and the per-location pages.
 * Pin positions are percentages inside the Chicago-area map (x west→east,
 * y north→south). Each area also carries rich content for its own page:
 * a display `title`, longer `intro` paragraphs, `stats`, the `neighborhoods`
 * covered, area-specific `highlights`, and location `faqs`.
 */
export const AREAS = [
  {
    slug: 'chicago',
    name: 'Chicago',
    title: 'Downtown / Loop',
    kind: 'The city',
    img: areas.chicago,
    pin: { x: 63, y: 47 },
    blurb:
      'From the Loop to the far North and South Sides, our home base since 2016. High-rise condos, vintage walk-ups, brownstones and downtown offices — we clean them all, seven days a week.',
    landmark: 'The downtown skyline',
    intro: [
      'Downtown Chicago is where House Keep Up started, and it is still the busiest corner of our map. We clean Loop high-rises, River North lofts, Streeterville condos and West Loop conversions — buildings with doormen, freight elevators, key fobs and tight service-window rules our teams already know by heart.',
      'Whether you need a weekly tidy between work trips, a deep reset before guests, or an end-of-lease clean that gets your full deposit back, we bring every supply, work to a written checklist, and text you when we are on the way.',
    ],
    stats: [
      ['500+', 'Downtown cleans a year'],
      ['7 days', 'Including evenings'],
      ['60 min', 'Typical studio clean'],
    ],
    neighborhoods: [
      'The Loop', 'River North', 'West Loop', 'South Loop', 'Streeterville',
      'Gold Coast', 'Fulton Market', 'Old Town',
    ],
    highlights: [
      ['High-rise ready', 'We handle COIs, loading docks and service elevators so your building never blinks.'],
      ['Doorman & fob access', 'No need to be home — leave entry with the desk and we take it from there.'],
      ['After-hours offices', 'Suites and coworking floors cleaned overnight, before your team is back at their desks.'],
    ],
    faqs: [
      ['Do you clean high-rise condos with building requirements?',
        'Yes. We regularly provide certificates of insurance, book freight elevators and follow move-in/service-window rules for downtown buildings.'],
      ['Can you clean my downtown office after hours?',
        'Absolutely — evening and overnight commercial cleaning is one of our specialties in the Loop and River North.'],
    ],
  },
  {
    slug: 'evanston',
    name: 'Evanston',
    title: 'Evanston',
    kind: 'North suburb',
    img: areas.evanston,
    pin: { x: 60, y: 24 },
    blurb:
      'Lakefront homes, vintage courtyard apartments and university rentals. Our Evanston teams know the buildings — and the parking rules — inside out.',
    landmark: 'Grosse Point Lighthouse',
    intro: [
      'Evanston blends grand lakefront houses, century-old courtyard buildings and a steady churn of Northwestern rentals. Each needs a different touch, and our teams tailor every visit — gentle on original hardwood and tilework, thorough on the high-traffic student turnovers.',
      'We work around the neighborhood’s permit-parking blocks and quiet hours, so a clean never means a ticket or a noise complaint.',
    ],
    stats: [
      ['10+ yrs', 'Serving the North Shore'],
      ['4.9 ★', 'Evanston client rating'],
      ['24 hr', 'Re-clean guarantee'],
    ],
    neighborhoods: [
      'Downtown Evanston', 'Northwestern campus', 'Central Street', 'Lakefront',
      'Dempster', 'South Boulevard',
    ],
    highlights: [
      ['Student turnovers', 'Fast, deposit-saving move-out cleans timed to the academic calendar.'],
      ['Vintage-safe products', 'pH-neutral, eco-friendly cleaners that respect old floors and leaded glass.'],
      ['Permit-parking savvy', 'We plan around Evanston’s zoned blocks so access is never a problem.'],
    ],
    faqs: [
      ['Can you handle end-of-year student move-outs?',
        'Yes — we do a high volume of Northwestern-area move-out cleans every spring and can turn a unit around quickly.'],
      ['Are your products safe for old hardwood?',
        'We use pH-neutral, floor-safe products by default and can go fully fragrance-free on request.'],
    ],
  },
  {
    slug: 'skokie',
    name: 'Skokie',
    title: 'Skokie',
    kind: 'North suburb',
    img: areas.skokie,
    pin: { x: 44, y: 24 },
    blurb:
      'Family homes and townhouses across Skokie get the same room-by-room checklist and the same dedicated team, visit after visit.',
    landmark: 'Village of Skokie',
    intro: [
      'Skokie is a neighborhood of families and long-term homeowners, and that is exactly how we like to work — the same trusted team returning on a schedule that fits your week, learning your home and your preferences over time.',
      'From split-levels to newer townhouse developments, we keep kitchens, baths and shared spaces spotless so your weekends are yours again.',
    ],
    stats: [
      ['Weekly', 'Bi-weekly & monthly plans'],
      ['Same team', 'Every visit'],
      ['100%', 'Background-checked'],
    ],
    neighborhoods: [
      'Downtown Skokie', 'Village Green', 'Devonshire', 'East Prairie',
      'Old Orchard',
    ],
    highlights: [
      ['One dedicated team', 'You see familiar faces every visit — never a rotating cast of strangers.'],
      ['Family-friendly', 'Pet- and kid-safe products, with extra care on high-touch surfaces.'],
      ['Flexible scheduling', 'Weekly, bi-weekly or monthly, rescheduled easily when life happens.'],
    ],
    faqs: [
      ['Will I get the same cleaners each time?',
        'Yes. Recurring Skokie clients are matched with a dedicated team that learns your home.'],
      ['Are the products safe for pets and kids?',
        'All standard products are pet- and child-safe, and we can go fragrance-free on request.'],
    ],
  },
  {
    slug: 'des-plaines',
    name: 'Des Plaines',
    title: 'Des Plaines',
    kind: 'Northwest suburb',
    img: areas.desPlaines,
    pin: { x: 16, y: 27 },
    blurb:
      "Minutes from O'Hare, our Des Plaines crews handle everything from split-levels to rental turnovers on tight schedules.",
    landmark: 'Des Plaines Metra station',
    intro: [
      "Right next to O'Hare, Des Plaines runs on a schedule — commuters, frequent flyers and rental hosts who need reliable, on-time cleaning. Our crews are built for exactly that: punctual arrivals, a text when we are on the way, and turnarounds fast enough for same-day guest check-ins.",
      'From classic split-levels to short-term rentals near the airport, every clean follows the same thorough checklist.',
    ],
    stats: [
      ['O’Hare', 'Adjacent coverage'],
      ['Same-day', 'Turnovers available'],
      ['On-time', '98% arrival rate'],
    ],
    neighborhoods: [
      'Downtown Des Plaines', 'Cumberland', 'Riverview', 'South Des Plaines',
      'Big Bend Lake',
    ],
    highlights: [
      ['Airbnb turnovers', 'Guest-ready resets with linens and staging, timed to your check-out/check-in gap.'],
      ['Commuter-friendly', 'Early and evening slots that fit around Metra and O’Hare schedules.'],
      ['Reliable arrivals', 'Live “on the way” texts so you are never left waiting.'],
    ],
    faqs: [
      ['Do you offer same-day Airbnb turnovers near O’Hare?',
        'Yes — quick, guest-ready turnovers are a core service for our Des Plaines hosts.'],
      ['How early can you start?',
        'We offer early-morning and evening windows to fit commuter and travel schedules.'],
    ],
  },
  {
    slug: 'logan-square',
    name: 'Logan Square',
    title: 'Logan Square',
    kind: 'Chicago neighborhood',
    img: areas.loganSquare,
    pin: { x: 43, y: 40 },
    blurb:
      'Greystones and two-flats along the boulevards. We bring eco-friendly products that respect original woodwork and vintage tile.',
    landmark: 'The Centennial Monument',
    intro: [
      'Logan Square is greystones, boulevard two-flats and beautifully rehabbed vintage units — homes with character worth protecting. We clean with eco-friendly, surface-safe products that keep original woodwork, hex tile and plaster looking their age in the best way.',
      'Busy professionals and growing families here lean on our recurring plans to keep up without giving up their weekends.',
    ],
    stats: [
      ['Eco', 'Green products standard'],
      ['Bi-weekly', 'Most popular plan'],
      ['4.9 ★', 'Local rating'],
    ],
    neighborhoods: [
      'The Boulevards', 'Palmer Square', 'Kedzie', 'Logan Blvd', 'Bucktown edge',
    ],
    highlights: [
      ['Vintage-home care', 'Gentle on original hardwood, tile and trim; thorough everywhere else.'],
      ['Green by default', 'Plant-based, low-fragrance products safe for the whole household.'],
      ['Recurring plans', 'Set-and-forget weekly or bi-weekly upkeep for busy schedules.'],
    ],
    faqs: [
      ['Do you use eco-friendly products?',
        'Yes — green, low-fragrance products are our standard, which suits Logan Square’s vintage homes well.'],
      ['Can you clean a two-flat or multi-unit?',
        'We clean single units and whole two-flats; just tell us the layout when you book.'],
    ],
  },
  {
    slug: 'wicker-park',
    name: 'Wicker Park',
    title: 'Wicker Park',
    kind: 'Chicago neighborhood',
    img: areas.wickerPark,
    pin: { x: 49, y: 44 },
    blurb:
      'Lofts, condos and busy Airbnbs around North Avenue. Same-day turnover cleans are our specialty here.',
    landmark: 'North Avenue',
    intro: [
      'Wicker Park moves fast — open-plan lofts, new-build condos and a dense cluster of short-term rentals around the six corners. Our teams keep pace with same-day turnovers, detail-focused deep cleans and recurring upkeep that fits a busy social calendar.',
      'Exposed brick, concrete floors and big industrial windows all get the right treatment, every visit.',
    ],
    stats: [
      ['Same-day', 'Turnover specialists'],
      ['5 ★', 'Host reviews'],
      ['Flexible', 'Last-minute slots'],
    ],
    neighborhoods: [
      'Six Corners', 'Bucktown', 'East Village', 'Damen', 'Milwaukee Ave',
    ],
    highlights: [
      ['Airbnb-ready', 'Hotel-standard turnovers with linens, staging and restock checks.'],
      ['Loft & concrete care', 'The right tools for exposed brick, polished concrete and big glass.'],
      ['Short-notice friendly', 'We keep flex capacity for last-minute booking gaps.'],
    ],
    faqs: [
      ['Can you turn over my Airbnb between guests?',
        'Yes — same-day, guest-ready turnovers are our specialty in Wicker Park.'],
      ['Do you clean lofts with exposed brick and concrete?',
        'We do, using the right approach for each surface so nothing gets damaged.'],
    ],
  },
  {
    slug: 'lincoln-park',
    name: 'Lincoln Park',
    title: 'Lincoln Park',
    kind: 'Chicago neighborhood',
    img: areas.lincolnPark,
    pin: { x: 61, y: 41 },
    blurb:
      "From lakefront high-rises to tree-lined walk-ups, our Lincoln Park teams keep some of the city's busiest households running spotless.",
    landmark: 'Lincoln Park Conservatory',
    intro: [
      'Lincoln Park spans lakefront high-rises, classic greystone row houses and family single-family homes near the park and zoo. It is one of our busiest neighborhoods, and our teams are used to full households — kids, pets, guests and all.',
      'Recurring cleaning here is about buying back time, and we make it effortless: consistent teams, easy rescheduling, and a spotless home every single visit.',
    ],
    stats: [
      ['Weekly', 'Most homes book recurring'],
      ['Family', 'Kid- & pet-safe'],
      ['24 hr', 'Happiness guarantee'],
    ],
    neighborhoods: [
      'Old Town edge', 'DePaul', 'Sheffield', 'Ranch Triangle', 'Lakefront',
    ],
    highlights: [
      ['Whole-home service', 'Big family homes handled top to bottom on a schedule that sticks.'],
      ['Pet-friendly', 'Fur, paw prints and all — safe products and extra attention.'],
      ['Trusted access', 'Vetted, bonded teams you are comfortable giving a key.'],
    ],
    faqs: [
      ['Do you clean large single-family homes?',
        'Yes — whole-home recurring service is very common for our Lincoln Park clients.'],
      ['Can I keep the same team long-term?',
        'That’s the goal — consistency is what makes recurring cleaning actually work.'],
    ],
  },
  {
    slug: 'oak-park',
    name: 'Oak Park',
    title: 'Oak Park',
    kind: 'West suburb',
    img: areas.oakPark,
    pin: { x: 25, y: 47 },
    blurb:
      'Historic homes deserve careful hands. Our Oak Park crews are trusted in Frank Lloyd Wright country — original floors, leaded glass and all.',
    landmark: 'Frank Lloyd Wright Home & Studio',
    intro: [
      'Oak Park is architectural history you actually live in — Prairie-style homes, Victorians and bungalows with original detail on every surface. Our crews treat these houses with the care they deserve, using gentle products and careful methods around leaded glass, quarter-sawn oak and vintage tile.',
      'Families here trust us for both regular upkeep and the occasional white-glove deep clean before events and holidays.',
    ],
    stats: [
      ['Historic', 'Home specialists'],
      ['Gentle', 'Surface-safe methods'],
      ['4.9 ★', 'Oak Park rating'],
    ],
    neighborhoods: [
      'Frank Lloyd Wright District', 'Downtown Oak Park', 'Ridgeland',
      'Hemingway District', 'The Avenue',
    ],
    highlights: [
      ['Heritage-home care', 'Careful hands around original woodwork, glass and tile.'],
      ['Deep-clean events', 'White-glove resets before holidays and gatherings.'],
      ['Consistent quality', 'Written checklists so nothing gets missed in big old homes.'],
    ],
    faqs: [
      ['Are you careful with historic finishes?',
        'Very — we use gentle, surface-appropriate products around original wood, tile and leaded glass.'],
      ['Do you offer one-time deep cleans before events?',
        'Yes, event and holiday deep cleans are popular with Oak Park homeowners.'],
    ],
  },
  {
    slug: 'cicero',
    name: 'Cicero',
    title: 'Cicero',
    kind: 'West suburb',
    img: areas.cicero,
    pin: { x: 31, y: 53 },
    blurb:
      'Bungalows and family two-flats across Cicero, with flexible evening and weekend slots for working households.',
    landmark: 'Cicero Town Hall',
    intro: [
      'Cicero is classic Chicago bungalows and family two-flats, home to hardworking households that need cleaning to fit around real schedules. We offer plenty of evening and weekend slots so a spotless home never costs you a day off.',
      'Straightforward, honest pricing and a dependable team make it easy to keep up week after week.',
    ],
    stats: [
      ['Evenings', '& weekends available'],
      ['Flat', 'Transparent pricing'],
      ['Bonded', '& insured teams'],
    ],
    neighborhoods: [
      'Downtown Cicero', 'Morton Park', 'Warren Park', 'Hawthorne', 'Grant Works',
    ],
    highlights: [
      ['Off-hours slots', 'Evening and weekend windows for working households.'],
      ['Honest pricing', 'Flat quotes with no surprises on the bill.'],
      ['Bungalow-savvy', 'The right routine for classic Chicago bungalow layouts.'],
    ],
    faqs: [
      ['Do you offer evening or weekend cleaning?',
        'Yes — Cicero clients frequently book evening and weekend slots to fit work schedules.'],
      ['How is pricing set?',
        'Flat, upfront quotes based on your home’s size and the service you choose.'],
    ],
  },
  {
    slug: 'berwyn',
    name: 'Berwyn',
    title: 'Berwyn',
    kind: 'West suburb',
    img: areas.berwyn,
    pin: { x: 22, y: 57 },
    blurb:
      "The bungalow belt is our kind of neighborhood. Recurring cleans keep Berwyn's classic brick homes fresh year-round.",
    landmark: 'Historic Route 66',
    intro: [
      'Berwyn sits right in the heart of the bungalow belt, and its tidy brick homes are made for the kind of steady, reliable upkeep we do best. Recurring plans keep everything fresh through every season, from spring pollen to winter salt tracked in at the door.',
      'Friendly, familiar teams and a satisfaction guarantee make keeping up genuinely easy here.',
    ],
    stats: [
      ['Year-round', 'Seasonal upkeep'],
      ['Recurring', 'Weekly to monthly'],
      ['24 hr', 'Re-clean promise'],
    ],
    neighborhoods: [
      'Depot District', 'North Berwyn', 'South Berwyn', 'Historic Route 66',
      'Proksa Park',
    ],
    highlights: [
      ['Seasonal ready', 'Extra attention for pollen season and salty winter entryways.'],
      ['Brick-home rhythm', 'A routine tuned to classic Berwyn bungalow layouts.'],
      ['Guaranteed', 'Not right within 24 hours? We come back free.'],
    ],
    faqs: [
      ['Can you help with seasonal messes like winter salt?',
        'Yes — recurring plans include the entryway and floor care that seasons demand.'],
      ['What’s the satisfaction guarantee?',
        'If any area isn’t right, tell us within 24 hours and we re-clean it free.'],
    ],
  },
  {
    slug: 'hyde-park',
    name: 'Hyde Park',
    title: 'Hyde Park',
    kind: 'Chicago neighborhood',
    img: areas.hydePark,
    pin: { x: 64, y: 59 },
    blurb:
      'Faculty homes, student apartments and lakefront co-ops around the University of Chicago — cleaned around your academic calendar.',
    landmark: 'University of Chicago',
    intro: [
      'Hyde Park revolves around the University of Chicago: faculty homes, graduate apartments and historic lakefront co-ops. We clean around the academic calendar — quiet during exams, ready for move-in, and fast for end-of-term turnovers.',
      'Elegant vintage co-ops and busy student flats each get exactly the level of care they need.',
    ],
    stats: [
      ['Campus', 'Calendar-aware'],
      ['Co-op', 'Building-rule ready'],
      ['Move-in', 'Turnover experts'],
    ],
    neighborhoods: [
      'University of Chicago', 'Kenwood edge', 'East Hyde Park', 'Lakefront co-ops',
      '53rd Street',
    ],
    highlights: [
      ['Academic timing', 'Cleans scheduled around terms, exams and move-in weeks.'],
      ['Co-op friendly', 'We follow building rules and service-window requirements.'],
      ['Student turnovers', 'Deposit-saving move-out cleans done fast.'],
    ],
    faqs: [
      ['Can you clean around the university calendar?',
        'Yes — we schedule around exams and handle the busy move-in and move-out weeks.'],
      ['Do you work with co-op building rules?',
        'We do — including service windows and any access requirements your building sets.'],
    ],
  },
  {
    slug: 'oak-lawn',
    name: 'Oak Lawn',
    title: 'Oak Lawn',
    kind: 'Southwest suburb',
    img: areas.oakLawn,
    pin: { x: 33, y: 69 },
    blurb:
      "Our southwest crews cover Oak Lawn's ranches and split-levels with the same 24-hour re-clean guarantee as everywhere else.",
    landmark: 'Columbus Avenue',
    intro: [
      'Oak Lawn is comfortable ranches, split-levels and family homes across the southwest suburbs — and our teams cover all of it with the same standards you would get downtown. Dependable scheduling, thorough checklists and a real satisfaction guarantee.',
      'Whether it’s regular upkeep or a one-time deep clean, you get the same vetted, insured team every visit.',
    ],
    stats: [
      ['Southwest', 'Full coverage'],
      ['24 hr', 'Re-clean guarantee'],
      ['Insured', '& bonded teams'],
    ],
    neighborhoods: [
      'Downtown Oak Lawn', '95th Street', 'Columbus Manor', 'Nottingham Park',
      'Central Oak Lawn',
    ],
    highlights: [
      ['Ranch & split-level', 'A routine tuned to single-story and split layouts.'],
      ['Consistent teams', 'The same vetted crew, visit after visit.'],
      ['Guaranteed clean', 'Any spot not right within 24 hours, re-cleaned free.'],
    ],
    faqs: [
      ['Do you cover all of Oak Lawn?',
        'Yes — our southwest crews serve the whole village and surrounding blocks.'],
      ['Is there a satisfaction guarantee?',
        'Always — if something isn’t right within 24 hours, we return and fix it free.'],
    ],
  },
  {
    slug: 'niles',
    name: 'Niles',
    title: 'Niles',
    kind: 'North suburb',
    img: areas.niles,
    pin: { x: 40, y: 28 },
    blurb:
      'Recurring home cleaning, deep cleans and move-ready service throughout Niles and the surrounding northwest suburbs.',
    landmark: 'Leaning Tower of Niles',
    intro: [
      'Niles is a tight-knit northwest suburb where families stay for generations. Split-levels, raised ranches and tidy brick homes line the blocks, and our crews clean them with the same reliability neighbors expect from everything else in town.',
      'Whether it is a weekly tidy, a seasonal deep clean or a move-out reset, we bring our own supplies, follow a written checklist and text when we are on the way.',
    ],
    stats: [
      ['Weekly', 'Bi-weekly & monthly'],
      ['Same team', 'Every visit'],
      ['24 hr', 'Re-clean guarantee'],
    ],
    neighborhoods: [
      'Golf Mill', 'Jonquil Terrace', 'Grennan Heights', 'Chesterfield',
      'Notre Dame', 'Oak Mill',
    ],
    highlights: [
      ['Consistent crews', 'The same vetted team returns every visit, learning your home over time.'],
      ['Family-safe products', 'Pet- and kid-friendly cleaners as standard, with fragrance-free options.'],
      ['Flexible plans', 'Weekly, bi-weekly or monthly, rescheduled easily when life changes.'],
    ],
    faqs: [
      ['Do you serve all of Niles?',
        'Yes — we cover every neighborhood in Niles and the surrounding blocks into Morton Grove and Park Ridge.'],
      ['Can I keep the same cleaning team?',
        'That is the plan — recurring Niles clients are matched with a dedicated team.'],
    ],
  },
  {
    slug: 'park-ridge',
    name: 'Park Ridge',
    title: 'Park Ridge',
    kind: 'Northwest suburb',
    img: areas.parkRidge,
    pin: { x: 22, y: 22 },
    blurb:
      'Reliable cleaning teams for Park Ridge homes, condos and busy households, with weekday and weekend availability.',
    landmark: 'Pickwick Theatre',
    intro: [
      'Park Ridge is classic northwest-suburb living — well-kept homes, tree-lined streets and households that run on a schedule. Our crews fit right in: punctual arrivals, thorough checklists and the same trusted team every visit.',
      'From Uptown condos to spacious single-family homes near Maine South, we handle the cleaning so weekends stay yours.',
    ],
    stats: [
      ['Uptown', '& residential coverage'],
      ['On-time', '98% arrival rate'],
      ['Insured', '& bonded teams'],
    ],
    neighborhoods: [
      'Uptown Park Ridge', 'South Park', 'Maine East', 'Country Club',
      'Wildwood', 'Northwest Highway',
    ],
    highlights: [
      ['Punctual service', 'Live "on the way" texts and on-time arrivals you can set your clock by.'],
      ['Big-home ready', 'Thorough checklists for larger homes with multiple levels and living areas.'],
      ['Weekend slots', 'Saturday and Sunday availability for busy working households.'],
    ],
    faqs: [
      ['Do you have weekend availability?',
        'Yes — Saturday and Sunday slots are available for Park Ridge clients.'],
      ['Can you handle a larger home?',
        'Absolutely — we regularly clean multi-level homes and adjust the visit length accordingly.'],
    ],
  },
  {
    slug: 'elmwood-park',
    name: 'Elmwood Park',
    title: 'Elmwood Park',
    kind: 'West suburb',
    img: areas.elmwoodPark,
    pin: { x: 30, y: 38 },
    blurb:
      'Professional cleaning for Elmwood Park homes and apartments — the same trusted teams serving nearby Oak Park and Des Plaines.',
    landmark: 'Conti Parkway',
    intro: [
      'Elmwood Park sits right between Oak Park and Des Plaines, and many of the same crews that clean those neighborhoods serve Elmwood Park too. That means experienced, background-checked teams who already know the area.',
      'Bungalows, brick two-flats and multi-family buildings all get the same careful, checklist-driven service.',
    ],
    stats: [
      ['Local', 'Crews from nearby suburbs'],
      ['Flat', 'Transparent pricing'],
      ['Bonded', '& insured teams'],
    ],
    neighborhoods: [
      'Conti Parkway', 'Fullerton Avenue', 'Grand Avenue', 'North Avenue',
      'Harlem Avenue',
    ],
    highlights: [
      ['Nearby crews', 'Teams based in the western suburbs, so travel time stays short.'],
      ['Multi-unit friendly', 'We clean individual apartments and whole buildings.'],
      ['Honest pricing', 'Flat quotes with no hidden fees or surprise charges.'],
    ],
    faqs: [
      ['Are your teams local to the area?',
        'Yes — our west-suburb crews serve Elmwood Park alongside Oak Park, Berwyn and Des Plaines.'],
      ['Can you clean my apartment in a multi-unit building?',
        'Of course — we clean individual units and can arrange whole-building service too.'],
    ],
  },
  {
    slug: 'forest-park',
    name: 'Forest Park',
    title: 'Forest Park',
    kind: 'West suburb',
    img: areas.forestPark,
    pin: { x: 27, y: 50 },
    blurb:
      'Dependable home cleaning in Forest Park, from bungalows to multi-units, with flexible scheduling.',
    landmark: 'Madison Street',
    intro: [
      'Forest Park has an urban-suburban character all its own — walkable streets, a lively Madison Street corridor and a mix of bungalows, apartment buildings and vintage homes. Our teams bring the same thorough, supply-included service to all of them.',
      'Blue Line commuters and busy families trust our flexible scheduling to keep their homes clean without losing a day off.',
    ],
    stats: [
      ['Blue Line', 'Accessible coverage'],
      ['Flexible', 'Morning & evening slots'],
      ['24 hr', 'Satisfaction guarantee'],
    ],
    neighborhoods: [
      'Madison Street', 'Downtown Forest Park', 'Eisenhower corridor',
      'Harlem & Roosevelt', 'Circle Avenue',
    ],
    highlights: [
      ['Commuter-friendly', 'Early and evening windows so cleaning fits around your train schedule.'],
      ['Vintage-home care', 'Gentle on older hardwood, tile and trim.'],
      ['Guaranteed', 'Not right within 24 hours? We come back free.'],
    ],
    faqs: [
      ['Do you offer evening cleaning slots?',
        'Yes — evening windows are available in Forest Park to fit around work and commutes.'],
      ['Are your products safe for older homes?',
        'We use gentle, pH-neutral products by default that are safe for vintage surfaces.'],
    ],
  },
  {
    slug: 'morton-grove',
    name: 'Morton Grove',
    title: 'Morton Grove',
    kind: 'North suburb',
    img: areas.mortonGrove,
    pin: { x: 38, y: 24 },
    blurb:
      'Weekly, bi-weekly and deep cleans for Morton Grove households — same quality as neighboring Skokie and Niles.',
    landmark: 'Harrer Park',
    intro: [
      'Morton Grove is a quiet, family-centered north suburb where well-maintained homes and friendly neighborhoods set the tone. Our crews serve Morton Grove with the same dedicated teams and quality standards as neighboring Skokie and Niles.',
      'Set-and-forget recurring plans are the most popular choice here, with the same familiar team returning every visit.',
    ],
    stats: [
      ['North', 'Suburb coverage'],
      ['Same team', 'Every visit'],
      ['100%', 'Background-checked'],
    ],
    neighborhoods: [
      'Austin Park', 'Harrer Park', 'Mansfield Park', 'National Park',
      'Dempster corridor', 'Golf Road',
    ],
    highlights: [
      ['Dedicated teams', 'Familiar faces every visit — no revolving door of strangers.'],
      ['Family-first', 'Pet- and child-safe products with extra care on high-touch surfaces.'],
      ['Recurring plans', 'Weekly, bi-weekly or monthly, with easy rescheduling.'],
    ],
    faqs: [
      ['Will I get the same team each time?',
        'Yes — recurring Morton Grove clients are matched with a dedicated crew.'],
      ['Do you cover the whole village?',
        'We do — all Morton Grove neighborhoods plus the surrounding blocks.'],
    ],
  },
]

export const findArea = (slug) => AREAS.find((a) => a.slug === slug)
