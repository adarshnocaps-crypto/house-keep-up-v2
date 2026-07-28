import { reviewAvatars } from '../assets/images.js'

/**
 * Every review we show, grouped by the platform it was left on.
 *
 * IMPORTANT: only real, verbatim reviews belong in these arrays. Nothing here
 * is written by us — the Google set below is transcribed from the live
 * housekeepup.com review widget. Leave a platform's array empty until its real
 * reviews are copied across; the testimonials page renders a "read them on
 * <platform>" state rather than showing anything invented.
 *
 * `url` deep-links a card to that exact review. To fill one in: open the
 * listing → find the review → its share/permalink menu → copy link. Cards left
 * without a `url` fall back to the platform's review list.
 */

/** Our Google listing's review panel (place id encodes feature id 0x880fd19cb614b4fd:0x49e44eec5436e515). */
export const GOOGLE_URL = 'https://search.google.com/local/reviews?placeid=ChIJ_bQUtpzRD4gRFeU2VOxO5Ek'
export const YELP_URL = 'https://www.yelp.com/biz/house-keep-up-chicago-5'
// TODO: swap for the real profile URL once we have it.
export const NEXTDOOR_URL = 'https://nextdoor.com/search/?query=House%20Keep%20Up'

const GOOGLE_REVIEWS = [
  {
    name: 'Dee Williams',
    url: '',
    text: 'She did an amazing job! My apartment looks spotless. I was so happy to come home to such a clean space. Can’t wait for my next appointment.',
    card: 'bg-pink text-cocoa',
    bar: 'border-cocoa/30',
    avatar: reviewAvatars.deeWilliams,
  },
  {
    name: 'M Petsod',
    url: '',
    text: 'I booked a deep cleaning post construction. Booking was easy. Excellent communication from beginning to end. Excellent job throughout — I will rebook and I am considering a regular service.',
    card: 'bg-primary text-cream',
    bar: 'border-cream/40',
    avatar: reviewAvatars.mPetsod,
  },
  {
    name: 'Mariel Tishma',
    url: '',
    text: 'The ladies did a great job tackling our apartment after a rough patch of not being able to keep up with it. They were fast too! I’m definitely booking again.',
    card: 'bg-white text-primary',
    bar: 'border-primary/30',
    avatar: reviewAvatars.marielTishma,
  },
  {
    name: 'Ryan Villanueva',
    url: '',
    text: 'Very communicative, excellent job cleaning. Will be using House Keep Up for future rental turnover.',
    card: 'bg-magenta text-white',
    bar: 'border-white/40',
    avatar: reviewAvatars.ryanVillanueva,
  },
  {
    name: 'Emilia Cervantes',
    url: '',
    text: 'Sandra has always been a great person providing cleaning services at my home. I highly recommend her services.',
    card: 'bg-cream text-primary border-2 border-cocoa/15',
    bar: 'border-primary/30',
    avatar: reviewAvatars.emiliaCervantes,
  },
  {
    name: 'Neda Svrakic',
    url: '',
    text: 'Had a wonderful experience! Will book again.',
    card: 'bg-violet text-white',
    bar: 'border-white/40',
    avatar: reviewAvatars.nedaSvrakic,
  },
  {
    name: 'María José Martín',
    url: '',
    text: 'Great experience overall — the whole process, since booking to the day of cleaning.',
    card: 'bg-white text-primary',
    bar: 'border-primary/30',
    avatar: reviewAvatars.mariaJoseMartin,
  },
  {
    name: 'J and D Torres',
    url: '',
    text: 'They were on time, respectful, and did a thorough job.',
    card: 'bg-primary text-cream',
    bar: 'border-cream/40',
  },
  {
    name: 'Ebrahim Arian',
    url: '',
    text: 'They were on time, professional, and worked quickly.',
    card: 'bg-white text-primary',
    bar: 'border-primary/30',
  },
  {
    name: 'All Glory to the Most High God',
    url: '',
    text: 'Tanya and her partner were phenomenal.',
    card: 'bg-pink text-cocoa',
    bar: 'border-cocoa/30',
  },
]

/** Transcribed verbatim from yelp.com/biz/house-keep-up-chicago-5 (recommended reviews). */
const YELP_REVIEWS = [
  {
    name: 'Mary H.',
    location: 'Oak Forest, IL',
    date: 'Jun 6, 2026',
    url: '',
    text: "I have been using this company for about 6 months. A Fantastic job Maryana does in cleaning my home. Sometimes a second cleaner comes with her. I didn't catch her name- But a great job also. Highly recommend!",
  },
  {
    name: 'Arnie Z.',
    location: 'Overland Park, KS',
    date: 'Jun 6, 2026',
    url: '',
    text: 'We rented an apartment in Chicago and needed it deep cleaned quickly. House Keep Up was very responsive and scheduled the cleaning within a few days. They also kept in touch with updates. Sandra did a thorough job, worked diligently to deep clean and was very nice. Great experience. Highly recommend!',
  },
  {
    name: 'Emma M.',
    location: 'Arlington Heights, IL',
    date: 'Apr 20, 2026',
    url: '',
    text: "We love House Keep Up! We have them come once a month and they always do such a great job. They're so helpful and kind, they even love our dog! It's absolutely worth the price of having a clean home every month :)",
  },
  {
    name: 'Anne R.',
    location: 'Worth, IL',
    date: 'Jan 20, 2026',
    url: '',
    text: 'Had a great experience the ladies were absolutely wonderful and they made the house sparkle! Definitley booking again.',
  },
  {
    name: 'Junhua Y.',
    location: 'Chicago, IL',
    date: 'Jul 28, 2025',
    url: '',
    text: 'They responded quickly and scheduled a cleaning for my apartment. The whole experience was made easy.',
  },
  {
    name: 'Josephine I.',
    location: 'Chicago, IL',
    date: 'May 2, 2025',
    url: '',
    text: 'two young women showed up to clean my apartment and did a wonderful job. I will definitely call on House Keep Up again.',
  },
  {
    name: 'Nadine B.',
    location: 'Chicago, IL',
    date: 'Apr 7, 2025',
    url: '',
    text: 'I recently had my first cleaning through House Keep Up and was astounded by the high quality of service and value I received, especially for the cost! Krystyna S was very thorough and professional, I honestly cannot recommend her enough!',
  },
  {
    name: 'Raquel P.',
    location: 'Chicago, IL',
    date: 'Mar 31, 2025',
    url: '',
    text: 'house keep up sent a wonderful resource to my home who uncluttered and cleaned my home. Still more to be done but she exceeded my expectations and made a great space for my new venture!! 10 stars.',
  },
  {
    name: 'Sonia G.',
    location: 'River Forest, IL',
    date: 'Nov 21, 2024',
    url: '',
    text: "I can't say how happy I am to have found House Keep Up!\nScheduling could not be easier through their online platform and they are so responsive to questions and requests.\nOur house was in bad need of a professional cleaning and the two women who came did a phenomenal job. they were thorough and they tackled even the most problematic areas.\nI am so excited to be using this service for monthly cleaning!\nHighly recommend!",
  },
  {
    name: 'Toni B.',
    location: 'Chicago, IL',
    date: 'May 21, 2024',
    url: '',
    text: 'We had HouseKeepUp clean the bathroom and kitchen today and they did an excellent job! They started working as soon as they got here and never stopped until the job was done. The refrigerator looks like new! The floor is spotless! I will be hiring them again.',
  },
  {
    name: 'EJ C.',
    location: 'South Side, Chicago, IL',
    date: 'Dec 27, 2023',
    elite: true,
    url: '',
    text: 'Super quick response to my request, very good work and handled my 2 bed and 2 bath quickly and efficiently. I hired them for a regular cleaning of the apartment and the ladies got it done way faster than I expected and the customer service and value was amazing.',
  },
  {
    name: 'Sandeep C.',
    location: 'Chicago, IL',
    date: 'Sep 1, 2022',
    elite: true,
    url: '',
    text: "Getting good home cleaning in Chicago shouldn't be that hard but it certainly was when we decided to find someone new.\n\nAbsolutely impressed by their customer service, online experience and responsiveness.\n\nThat matched with really good cleaning in a reasonable amount of time/money just put it over the top.\n\nSigned up for regular cleanings and hoping the quality stays the same!",
  },
  {
    name: 'Shirley P.',
    location: 'Oak Lawn, IL',
    date: 'Sep 26, 2022',
    elite: true,
    url: '',
    text: "My partner requested a quote on Yelp yesterday for a cleaning of our condo unit. They had the best rate and was able to come out today. The two ladies were really friendly and reliable, and I loved how they worked together and also divide up tasks. My kitchen appliances and 2 bathrooms are sparkling like never before. I didn't take any before pictures, but our home really needed a clean. The company itself is also only a phone call away if I have questions or concerns. When it was 11, I had no idea the ladies had already arrived, and I'm glad I called to have that communicated. It's our first time ever having our home professionally cleaned since moving in last May, the entire team at House Keep Up made everything easy and stress free, and we're already thinking about how we can continue working with them. I highly recommend House Keep Up to anyone in the area looking for a cleaning company that's honest, reliable, efficient, friendly, and affordable.",
  },
]

/** Paste real Nextdoor reviews here — see the note at the top of this file. */
const NEXTDOOR_REVIEWS = []

export const PLATFORMS = [
  {
    id: 'google',
    name: 'Google',
    heading: 'Google testimonials',
    eyebrow: 'Google Business Profile',
    score: '4.9',
    detail: '272 reviews',
    blurb:
      'The bulk of our testimonials live here — booked cleans across Chicago and the suburbs, written by customers on our Google Business Profile.',
    url: GOOGLE_URL,
    reviews: GOOGLE_REVIEWS,
  },
  {
    id: 'yelp',
    name: 'Yelp',
    heading: 'Yelp testimonials',
    eyebrow: 'Yelp for Business',
    score: '4.5',
    detail: 'star rating',
    blurb:
      'Deep cleans, move-outs and post-construction jobs booked through Yelp, written up by the people who hired us.',
    url: YELP_URL,
    reviews: YELP_REVIEWS,
  },
  {
    id: 'nextdoor',
    name: 'Nextdoor',
    heading: 'Nextdoor testimonials',
    eyebrow: 'Neighborhood recommendations',
    score: '2023',
    detail: 'Neighborhood Favorite',
    blurb:
      'Recommendations from neighbors on the blocks we clean — the closest thing to word of mouth, in writing.',
    url: NEXTDOOR_URL,
    reviews: NEXTDOOR_REVIEWS,
  },
]

export const REVIEWS = GOOGLE_REVIEWS
