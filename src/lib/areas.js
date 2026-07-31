import { areas, hoods } from '../assets/images.js'

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
  {
    slug: 'albany-park',
    name: 'Albany Park',
    title: 'Albany Park',
    kind: 'Chicago neighborhood',
    img: hoods.albanyPark,
    blurb:
      'Albany Park is brick bungalows, two-flats and courtyard buildings, home to one of the most varied populations in the city.',
    landmark: 'Ronan Park and the river',
    intro: [
      'Albany Park is brick bungalows, two-flats and courtyard buildings, home to one of the most varied populations in the city. Multi-generational households and rented flats sit side by side, so we scale the visit to the home rather than the postcode.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Two-flats', 'Multi-unit ready'],
      ['Bungalows', 'Detail-first'],
      ['Families', 'Weekend slots'],
    ],
    neighborhoods: [
      'Ronan Park', 'Mayfair', 'North Mayfair', 'Kimball Avenue', 'Lawrence Avenue',
    ],
    highlights: [
      ['Multi-unit homes', 'Two-flats and coach houses cleaned unit by unit.'],
      ['Family schedules', 'Weekend and after-school windows when the house is quiet.'],
      ['Vintage detail', 'Woodwork, radiators and tile treated with the care they need.'],
    ],
    faqs: [
      ['Do you clean two-flats and coach houses?',
        'Yes. Tell us how many units and we will price and staff the visit accordingly.'],
      ['Can you work around a large household?',
        'We can. Weekend and evening windows are usually easiest when the house is full.'],
    ],
  },
  {
    slug: 'andersonville',
    name: 'Andersonville',
    title: 'Andersonville',
    kind: 'Chicago neighborhood',
    img: hoods.andersonville,
    blurb:
      'Andersonville is greystones, condo conversions and flats above the Clark Street shopfronts.',
    landmark: 'Clark Street',
    intro: [
      'Andersonville is greystones, condo conversions and flats above the Clark Street shopfronts. Many homes here are period conversions with original detail, which is where a careful clean shows most.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Greystones', 'Period-safe'],
      ['Condos', 'Building-rule ready'],
      ['Above shops', 'Access planned'],
    ],
    neighborhoods: [
      'Clark Street', 'Bowmanville edge', 'Summerdale', 'Balmoral', 'Berwyn Avenue',
    ],
    highlights: [
      ['Period interiors', 'Original woodwork, plaster and tile cleaned without harsh products.'],
      ['Walk-up access', 'Stairs, tight landings and no lift — we plan for it.'],
      ['Condo buildings', 'We follow service windows and any board requirements.'],
    ],
    faqs: [
      ['Do you clean flats above shops?',
        'Yes. Let us know the entry route and any delivery-window rules for the block.'],
      ['Can you use gentler products on original finishes?',
        'We can. Flag the surfaces when you book and the crew will bring the right kit.'],
    ],
  },
  {
    slug: 'avondale',
    name: 'Avondale',
    title: 'Avondale',
    kind: 'Chicago neighborhood',
    img: hoods.avondale,
    blurb:
      'Avondale mixes workers\' cottages and two-flats with newer infill around the basilica and the river.',
    landmark: 'St. Hyacinth Basilica',
    intro: [
      'Avondale mixes workers\' cottages and two-flats with newer infill around the basilica and the river. It is a neighbourhood in the middle of changing hands, so we see everything from untouched originals to full gut rehabs.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Cottages', 'Original detail'],
      ['Rehabs', 'Post-work ready'],
      ['Two-flats', 'Unit by unit'],
    ],
    neighborhoods: [
      'St. Hyacinth', 'Jackowo', 'Belmont Gardens', 'Kosciuszko Park', 'Milwaukee Avenue',
    ],
    highlights: [
      ['After a rehab', 'Fine construction dust cleared from trim, vents and glass.'],
      ['Workers\' cottages', 'Compact plans cleaned thoroughly rather than quickly.'],
      ['Recurring plans', 'The same crew learns your home and its quirks.'],
    ],
    faqs: [
      ['Do you do post-renovation cleans here?',
        'Yes. Tell us the scope and we will schedule the right team and time.'],
      ['Can I keep the same cleaner?',
        'We prioritise the same professional on recurring visits, subject to availability.'],
    ],
  },
  {
    slug: 'beverly',
    name: 'Beverly',
    title: 'Beverly',
    kind: 'Chicago neighborhood',
    img: hoods.beverly,
    blurb:
      'Beverly is one of the city\'s largest stretches of historic single-family homes, on wide lots and tree-lined streets.',
    landmark: 'Givens Irish Castle',
    intro: [
      'Beverly is one of the city\'s largest stretches of historic single-family homes, on wide lots and tree-lined streets. Big houses take real time, so we quote on the actual floor plan rather than a flat rate.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Large homes', 'Room-by-room'],
      ['Historic', 'Period-safe'],
      ['Family', 'Recurring plans'],
    ],
    neighborhoods: [
      'Longwood Drive', 'North Beverly', 'Ridge Historic District', '111th Street', 'Walden Parkway',
    ],
    highlights: [
      ['Bigger floor plans', 'Priced on the actual home, with a team sized to match.'],
      ['Historic finishes', 'Hardwood, leaded glass and original trim handled carefully.'],
      ['Seasonal resets', 'Deep cleans timed to spring and the holidays.'],
    ],
    faqs: [
      ['How do you price a larger historic home?',
        'On the floor plan and condition, not a flat rate. We will confirm before the visit.'],
      ['Do you bring a bigger team for big houses?',
        'Yes. Larger or time-sensitive homes get more professionals so the visit still fits the day.'],
    ],
  },
  {
    slug: 'bronzeville',
    name: 'Bronzeville',
    title: 'Bronzeville',
    kind: 'Chicago neighborhood',
    img: hoods.bronzeville,
    blurb:
      'Bronzeville is greystones, restored mansions and newer mid-rise buildings across a historic South Side district.',
    landmark: 'The historic district',
    intro: [
      'Bronzeville is greystones, restored mansions and newer mid-rise buildings across a historic South Side district. Restoration is ongoing here, so homes range from carefully preserved to freshly finished.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Greystones', 'Period-safe'],
      ['Mid-rise', 'Building-rule ready'],
      ['Rehabs', 'Post-work ready'],
    ],
    neighborhoods: [
      '35th Street', 'King Drive', 'Douglas', 'Grand Boulevard', 'Oakland edge',
    ],
    highlights: [
      ['Restored homes', 'Original stone, wood and plaster cleaned without damage.'],
      ['Mid-rise buildings', 'Service lifts, loading windows and front-desk rules followed.'],
      ['Move-in cleans', 'Freshly finished units made ready before the furniture lands.'],
    ],
    faqs: [
      ['Do you clean restored greystones?',
        'Yes, and we adjust products to whatever the original finishes need.'],
      ['Can you work with my building\'s service window?',
        'We can. Share the rules when you book and we will schedule inside them.'],
    ],
  },
  {
    slug: 'bucktown',
    name: 'Bucktown',
    title: 'Bucktown',
    kind: 'Chicago neighborhood',
    img: hoods.bucktown,
    blurb:
      'Bucktown is rehabbed two-flats and new-construction single-family homes either side of The 606 trail.',
    landmark: 'The 606',
    intro: [
      'Bucktown is rehabbed two-flats and new-construction single-family homes either side of The 606 trail. Open plans, big glass and finished basements are the norm, and each adds time to a thorough visit.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['New builds', 'Large-plan ready'],
      ['Rehabs', 'Detail-first'],
      ['Glass', 'Interior windows'],
    ],
    neighborhoods: [
      'The 606', 'Holstein Park', 'Damen Avenue', 'Armitage', 'Western edge',
    ],
    highlights: [
      ['Open-plan homes', 'Big shared spaces cleaned to the same standard as the bedrooms.'],
      ['Interior glass', 'Windows, stair rails and shower screens polished on request.'],
      ['Finished basements', 'Lower levels included when they are part of the brief.'],
    ],
    faqs: [
      ['Are basements included?',
        'If you want them cleaned, add them when booking so the time is allowed for.'],
      ['Can you clean interior windows?',
        'Yes, as an add-on. Exterior window work is outside our scope.'],
    ],
  },
  {
    slug: 'chinatown',
    name: 'Chinatown',
    title: 'Chinatown',
    kind: 'Chicago neighborhood',
    img: hoods.chinatown,
    blurb:
      'Chinatown is two-flats, condos and flats above the shopfronts around Wentworth and Archer.',
    landmark: 'The Wentworth gate',
    intro: [
      'Chinatown is two-flats, condos and flats above the shopfronts around Wentworth and Archer. Kitchens work hard in this neighbourhood, and that is usually where a deep clean earns its keep.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Kitchens', 'Degrease specialists'],
      ['Two-flats', 'Unit by unit'],
      ['Above shops', 'Access planned'],
    ],
    neighborhoods: [
      'Wentworth Avenue', 'Archer Avenue', 'Ping Tom Park', '22nd Place', 'Bridgeport edge',
    ],
    highlights: [
      ['Hard-working kitchens', 'Range hoods, tile and grout degreased properly.'],
      ['Multi-unit buildings', 'Each flat quoted and cleaned on its own terms.'],
      ['Tight access', 'Narrow stairs and shared entries planned for in advance.'],
    ],
    faqs: [
      ['Can you deep clean a heavily used kitchen?',
        'Yes. A deep clean covers grout, tile, fixtures and inside appliances on request.'],
      ['Do you clean inside the oven and fridge?',
        'Both are available as add-ons — select them when you book.'],
    ],
  },
  {
    slug: 'edgewater',
    name: 'Edgewater',
    title: 'Edgewater',
    kind: 'Chicago neighborhood',
    img: hoods.edgewater,
    blurb:
      'Edgewater runs from vintage courtyard buildings to lakefront high-rises a block from the water.',
    landmark: 'The lakefront',
    intro: [
      'Edgewater runs from vintage courtyard buildings to lakefront high-rises a block from the water. Doorman towers and 1920s walk-ups need different handling, and we plan the visit around which you are in.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['High-rise', 'Doorman-ready'],
      ['Courtyards', 'Period-safe'],
      ['Lakefront', 'Glass and dust'],
    ],
    neighborhoods: [
      'Broadway', 'Bryn Mawr', 'Edgewater Beach', 'Andersonville edge', 'Granville',
    ],
    highlights: [
      ['High-rise buildings', 'Freight lifts, fobs and front-desk sign-in handled routinely.'],
      ['Vintage courtyards', 'Original tile, radiators and woodwork cleaned with care.'],
      ['Lake-facing homes', 'Windows and sills where lake air leaves its mark.'],
    ],
    faqs: [
      ['Do you handle doorman buildings?',
        'Yes — we are used to fobs, freight lifts and booking a service window.'],
      ['Can you clean interior windows on a high floor?',
        'Interior glass, yes. We do not do exterior window work at height.'],
    ],
  },
  {
    slug: 'gold-coast',
    name: 'Gold Coast',
    title: 'Gold Coast',
    kind: 'Chicago neighborhood',
    img: hoods.goldCoast,
    blurb:
      'The Gold Coast is historic mansions on Astor Street and doorman high-rises along the park and the lake.',
    landmark: 'Astor Street',
    intro: [
      'The Gold Coast is historic mansions on Astor Street and doorman high-rises along the park and the lake. Discretion and building protocol matter as much as the clean itself here.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Mansions', 'Room-by-room'],
      ['Doorman', 'Protocol-first'],
      ['Discreet', 'Vetted crews'],
    ],
    neighborhoods: [
      'Astor Street', 'Oak Street', 'Rush Street', 'Division', 'Lake Shore Drive',
    ],
    highlights: [
      ['Building protocol', 'Front desk, freight lift and service windows followed exactly.'],
      ['Fine finishes', 'Marble, hardwood and antique surfaces given the right products.'],
      ['Vetted professionals', 'Background-checked crews, consistent faces where possible.'],
    ],
    faqs: [
      ['Do you follow building service rules?',
        'Always. Share your building\'s requirements and we will schedule inside them.'],
      ['Can I have the same cleaner each visit?',
        'We prioritise it on recurring plans, subject to availability.'],
    ],
  },
  {
    slug: 'irving-park',
    name: 'Irving Park',
    title: 'Irving Park',
    kind: 'Chicago neighborhood',
    img: hoods.irvingPark,
    blurb:
      'Irving Park is bungalows, gabled frame houses and the bungalow-belt streets of the Villa District.',
    landmark: 'The Villa District',
    intro: [
      'Irving Park is bungalows, gabled frame houses and the bungalow-belt streets of the Villa District. These are homes with a lot of trim, and trim is where a rushed clean shows.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Bungalows', 'Trim-first'],
      ['Families', 'Weekend slots'],
      ['Recurring', 'Same crew'],
    ],
    neighborhoods: [
      'Independence Park', 'The Villa', 'Old Irving Park', 'Kilbourn Park', 'Irving Park Road',
    ],
    highlights: [
      ['Trim and woodwork', 'Baseboards, door frames and built-ins done by hand.'],
      ['Radiator dust', 'The fine grey film older heating leaves behind, cleared properly.'],
      ['Family timing', 'Weekend and school-hours windows when the house is empty.'],
    ],
    faqs: [
      ['Do you clean baseboards and trim by hand?',
        'On a deep clean, yes — trim, frames and switches are part of the checklist.'],
      ['Can you come while we are at work?',
        'Yes. Leave entry instructions when booking and we will clean while you are out.'],
    ],
  },
  {
    slug: 'lake-view',
    name: 'Lake View',
    title: 'Lake View',
    kind: 'Chicago neighborhood',
    img: hoods.lakeView,
    blurb:
      'Lake View is three-flats, condo conversions and walk-up apartments stretching from the lake back to Southport.',
    landmark: 'Belmont Harbor',
    intro: [
      'Lake View is three-flats, condo conversions and walk-up apartments stretching from the lake back to Southport. Turnover is constant here, so move-in and move-out cleans are a big part of what we do.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Walk-ups', 'Stairs planned'],
      ['Turnovers', 'Deposit-focused'],
      ['Condos', 'Rule-ready'],
    ],
    neighborhoods: [
      'Southport Corridor', 'Belmont Harbor', 'West Lakeview', 'Roscoe Village edge', 'Sheridan Road',
    ],
    highlights: [
      ['Move-outs', 'Empty-home cleans aimed at getting the deposit back.'],
      ['Walk-up flats', 'No lift, tight stairs — we bring what fits.'],
      ['Condo buildings', 'Service windows and access rules followed.'],
    ],
    faqs: [
      ['Do you do end-of-lease cleans?',
        'Yes. An empty property lets us reach the detail landlords inspect.'],
      ['Is there a surcharge for stairs?',
        'No. Just tell us the floor so we plan the right kit and time.'],
    ],
  },
  {
    slug: 'lincoln-square',
    name: 'Lincoln Square',
    title: 'Lincoln Square',
    kind: 'Chicago neighborhood',
    img: hoods.lincolnSquare,
    blurb:
      'Lincoln Square is brick two-flats and courtyard buildings around the plaza and Lincoln Avenue.',
    landmark: 'Giddings Plaza',
    intro: [
      'Lincoln Square is brick two-flats and courtyard buildings around the plaza and Lincoln Avenue. It is a settled, family-heavy neighbourhood where recurring plans do most of the work.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Two-flats', 'Multi-unit ready'],
      ['Families', 'Recurring plans'],
      ['Courtyards', 'Period-safe'],
    ],
    neighborhoods: [
      'Giddings Plaza', 'Lincoln Avenue', 'Ravenswood', 'Welles Park', 'Western Avenue',
    ],
    highlights: [
      ['Recurring rhythm', 'Weekly or fortnightly visits that keep ahead of the mess.'],
      ['Vintage buildings', 'Original tile, wood and radiators cleaned appropriately.'],
      ['Family homes', 'Kitchens and bathrooms first, every visit.'],
    ],
    faqs: [
      ['What frequency suits a family home?',
        'Fortnightly suits most; weekly if you have pets or a full house.'],
      ['Can I skip a visit when we travel?',
        'Yes — reschedule or skip without managing a long-term contract.'],
    ],
  },
  {
    slug: 'pilsen',
    name: 'Pilsen',
    title: 'Pilsen',
    kind: 'Chicago neighborhood',
    img: hoods.pilsen,
    blurb:
      'Pilsen is workers\' cottages, two-flats and converted loft space along and around 18th Street.',
    landmark: 'The 18th Street murals',
    intro: [
      'Pilsen is workers\' cottages, two-flats and converted loft space along and around 18th Street. Old buildings and new conversions sit on the same block, and both need a different touch.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Cottages', 'Original detail'],
      ['Lofts', 'Hard-floor care'],
      ['Rehabs', 'Post-work ready'],
    ],
    neighborhoods: [
      '18th Street', 'Thalia Hall', 'Halsted', 'Damen edge', 'Lower West Side',
    ],
    highlights: [
      ['Loft conversions', 'Exposed brick, concrete and duct work cleaned without damage.'],
      ['Workers\' cottages', 'Compact homes done thoroughly, not quickly.'],
      ['After building work', 'Fine dust cleared from ledges, vents and glass.'],
    ],
    faqs: [
      ['Do you clean exposed brick and concrete?',
        'Yes, with products suited to the surface rather than a general-purpose spray.'],
      ['Can you do a one-off deep clean?',
        'Absolutely — many clients start with one and add a recurring plan after.'],
    ],
  },
  {
    slug: 'river-north',
    name: 'River North',
    title: 'River North',
    kind: 'Chicago neighborhood',
    img: hoods.riverNorth,
    blurb:
      'River North is loft conversions and high-rise condos packed between the river and the galleries.',
    landmark: 'Marina City',
    intro: [
      'River North is loft conversions and high-rise condos packed between the river and the galleries. Almost every building here has a front desk, a freight lift and a service window to book.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['High-rise', 'Doorman-ready'],
      ['Lofts', 'Hard-floor care'],
      ['Downtown', 'Service windows'],
    ],
    neighborhoods: [
      'Marina City', 'Merchandise Mart', 'Erie Street', 'Kingsbury', 'Hubbard Street',
    ],
    highlights: [
      ['Building logistics', 'Freight lifts, fobs and loading docks are routine for us.'],
      ['Loft interiors', 'Concrete, exposed duct and big glass handled properly.'],
      ['Short-notice cleans', 'Same-week slots when a local crew is free.'],
    ],
    faqs: [
      ['Do you book the freight lift?',
        'Tell us your building\'s process and we will work inside its service window.'],
      ['Can you clean a loft with exposed ceilings?',
        'Yes. Reachable surfaces are cleaned; anything needing height equipment is out of scope.'],
    ],
  },
  {
    slug: 'rogers-park',
    name: 'Rogers Park',
    title: 'Rogers Park',
    kind: 'Chicago neighborhood',
    img: hoods.rogersPark,
    blurb:
      'Rogers Park is vintage courtyard buildings and apartments a short walk from the beaches, with Loyola at its centre.',
    landmark: 'The lakefront',
    intro: [
      'Rogers Park is vintage courtyard buildings and apartments a short walk from the beaches, with Loyola at its centre. Student flats and long-settled family homes share the same streets, and the brief differs for each.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Courtyards', 'Period-safe'],
      ['Turnovers', 'Deposit-focused'],
      ['Students', 'Term timing'],
    ],
    neighborhoods: [
      'Loyola', 'Jarvis Square', 'Sheridan Road', 'Glenwood Avenue', 'Howard Street',
    ],
    highlights: [
      ['End-of-term cleans', 'Move-out visits timed to the academic calendar.'],
      ['Vintage flats', 'Original tile, tubs and woodwork cleaned with the right products.'],
      ['Lake-air windows', 'Interior glass and sills where the lake leaves its mark.'],
    ],
    faqs: [
      ['Do you clean around term dates?',
        'Yes — move-in and move-out weeks are our busiest here, so book early.'],
      ['Do you clean shared student flats?',
        'We do. Tell us how many rooms and we will size the visit accordingly.'],
    ],
  },
  {
    slug: 'south-loop',
    name: 'South Loop',
    title: 'South Loop',
    kind: 'Chicago neighborhood',
    img: hoods.southLoop,
    blurb:
      'The South Loop is loft conversions, Printers Row walk-ups and newer high-rise towers by the museums.',
    landmark: 'Museum Campus',
    intro: [
      'The South Loop is loft conversions, Printers Row walk-ups and newer high-rise towers by the museums. Downtown living means building rules, and we plan every visit around them.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['High-rise', 'Doorman-ready'],
      ['Lofts', 'Hard-floor care'],
      ['Downtown', 'Service windows'],
    ],
    neighborhoods: [
      'Printers Row', 'Museum Campus', 'Dearborn Park', 'Motor Row', 'Roosevelt Road',
    ],
    highlights: [
      ['Tower buildings', 'Front desk, freight lift and service windows handled routinely.'],
      ['Printers Row lofts', 'Timber, brick and big windows cleaned appropriately.'],
      ['Recurring plans', 'A steady baseline for a home you are not always in.'],
    ],
    faqs: [
      ['Can you clean while I am at work?',
        'Yes. Leave access instructions with the desk or in the booking.'],
      ['Do you handle high-rise service windows?',
        'Routinely — tell us the rules and we will schedule inside them.'],
    ],
  },
  {
    slug: 'streeterville',
    name: 'Streeterville',
    title: 'Streeterville',
    kind: 'Chicago neighborhood',
    img: hoods.streeterville,
    blurb:
      'Streeterville is doorman high-rises and condos between the river, the lake and Michigan Avenue.',
    landmark: 'Navy Pier',
    intro: [
      'Streeterville is doorman high-rises and condos between the river, the lake and Michigan Avenue. Nearly every home here sits in a managed building with its own access protocol.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['High-rise', 'Doorman-ready'],
      ['Condos', 'Protocol-first'],
      ['Downtown', 'Service windows'],
    ],
    neighborhoods: [
      'Navy Pier', 'Ohio Street Beach', 'Michigan Avenue', 'Illinois Street', 'Lake Shore Drive',
    ],
    highlights: [
      ['Managed buildings', 'Sign-in, fobs and freight lifts are part of the routine.'],
      ['Compact condos', 'Kitchens and bathrooms done properly in a smaller footprint.'],
      ['Guest-ready resets', 'A polished reset before visitors arrive.'],
    ],
    faqs: [
      ['Do you work with my front desk?',
        'Yes. Leave us on the approved list and we will handle the rest.'],
      ['Can you clean before guests arrive?',
        'Book a standard or deep clean timed to the day before and we will make it ready.'],
    ],
  },
  {
    slug: 'uptown',
    name: 'Uptown',
    title: 'Uptown',
    kind: 'Chicago neighborhood',
    img: hoods.uptown,
    blurb:
      'Uptown is vintage courtyard buildings, lakefront co-ops and restored flats around the theatre district.',
    landmark: 'The Uptown Theatre',
    intro: [
      'Uptown is vintage courtyard buildings, lakefront co-ops and restored flats around the theatre district. There is a lot of original 1920s detail still in place here, and it rewards a careful clean.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Vintage', 'Period-safe'],
      ['Co-ops', 'Building-rule ready'],
      ['Lakefront', 'Glass and dust'],
    ],
    neighborhoods: [
      'Uptown Theatre', 'Argyle Street', 'Buena Park', 'Sheridan Road', 'Montrose Harbor',
    ],
    highlights: [
      ['1920s interiors', 'Tile, plaster and original woodwork cleaned without harsh products.'],
      ['Co-op buildings', 'We follow board rules and service-window requirements.'],
      ['Seasonal resets', 'Deep cleans that clear settled dust from older heating.'],
    ],
    faqs: [
      ['Do you clean vintage tile and tubs?',
        'Yes, with products chosen for the surface rather than a general-purpose spray.'],
      ['Do you work with co-op boards?',
        'We do — share the requirements and we will schedule inside them.'],
    ],
  },
  {
    slug: 'west-loop',
    name: 'West Loop',
    title: 'West Loop',
    kind: 'Chicago neighborhood',
    img: hoods.westLoop,
    blurb:
      'The West Loop is loft conversions and new towers around Randolph, Fulton Market and the old meatpacking streets.',
    landmark: 'Fulton Market',
    intro: [
      'The West Loop is loft conversions and new towers around Randolph, Fulton Market and the old meatpacking streets. Open-plan lofts with hard floors and big glass are the standard brief here.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Lofts', 'Hard-floor care'],
      ['New towers', 'Doorman-ready'],
      ['Open plan', 'Large-space ready'],
    ],
    neighborhoods: [
      'Randolph Street', 'Fulton Market', 'Greektown', 'Union Park', 'Halsted',
    ],
    highlights: [
      ['Hard floors', 'Concrete, timber and tile cleaned with the right method for each.'],
      ['Open-plan living', 'Large shared spaces held to the same standard throughout.'],
      ['Building access', 'Freight lifts and service windows planned in advance.'],
    ],
    faqs: [
      ['Do you clean polished concrete floors?',
        'Yes — we use a method suited to the finish rather than a generic floor cleaner.'],
      ['Can you clean a large open-plan loft?',
        'We size the team to the floor plan so the visit still fits the day.'],
    ],
  },
  {
    slug: 'wrigleyville',
    name: 'Wrigleyville',
    title: 'Wrigleyville',
    kind: 'Chicago neighborhood',
    img: hoods.wrigleyville,
    blurb:
      'Wrigleyville is three-flats, rooftop buildings and rental apartments in the streets around the ballpark.',
    landmark: 'Wrigley Field',
    intro: [
      'Wrigleyville is three-flats, rooftop buildings and rental apartments in the streets around the ballpark. Game days shape the calendar here, and we schedule around them rather than through them.',
      'Every visit brings its own supplies, works to a written checklist, and is backed by our 24-hour re-clean promise.',
    ],
    stats: [
      ['Three-flats', 'Multi-unit ready'],
      ['Rentals', 'Turnover-focused'],
      ['Game days', 'Timed around'],
    ],
    neighborhoods: [
      'Wrigley Field', 'Clark Street', 'Southport edge', 'Sheffield Avenue', 'Addison',
    ],
    highlights: [
      ['Around the schedule', 'Visits timed away from game-day traffic and street closures.'],
      ['Rental turnovers', 'Fast, thorough resets between tenants.'],
      ['After hosting', 'Kitchens and bathrooms reset after a full house.'],
    ],
    faqs: [
      ['Can you clean on a game day?',
        'We would rather not — access and parking are difficult. We will find a nearby slot.'],
      ['Do you do turnovers between tenants?',
        'Yes. Empty-property cleans are quicker and reach far more detail.'],
    ],
  },
]

export const findArea = (slug) => AREAS.find((a) => a.slug === slug)
