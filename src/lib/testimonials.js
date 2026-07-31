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
    url: 'https://share.google/086VnY0EEnNzC2fqK',
    text: 'She did an amazing job! My apartment looks spotless. I was so happy to come home to such a clean space. Can’t wait for my next appointment.',
    excerpt: 'She did an amazing job! My apartment looks spotless. I was so happy to come home to such a clean space. Can’t wait for my next appointment.',
    card: 'bg-pink text-cocoa',
    bar: 'border-cocoa/30',
    avatar: reviewAvatars.deeWilliams,
  },
  {
    name: 'M Petsod',
    url: 'https://share.google/XhLAh7ZrFKu3xvo6U',
    text: 'I booked a deep cleaning post construction. Booking was easy. Excellent communication from beginning to end with several follow-up calls/texts. Excellent job throughout and satisfying. I will rebook and I am considering a regular service. Thank you.',
    excerpt: 'I booked a deep cleaning post construction. Booking was easy. Excellent communication from beginning to end. Excellent job throughout — I will rebook and I am considering a regular service.',
    card: 'bg-primary text-cream',
    bar: 'border-cream/40',
    avatar: reviewAvatars.mPetsod,
  },
  {
    name: 'Mariel Tishma',
    url: 'https://share.google/wfsBTrWTqHX8DYQKb',
    text: 'The ladies did a great job tackling our apartment after a rough patch of not being able to keep up with it. They were fast too! While a few tough spots remain they emphasized (and I agree) that a second pass would get those out. I’m definitely booking again when I need another reset (and I’m considering some sort of regular maintenance to avoid it altogether). Very happy and recommended.',
    excerpt: 'The ladies did a great job tackling our apartment after a rough patch of not being able to keep up with it. They were fast too! I’m definitely booking again.',
    card: 'bg-white text-primary',
    bar: 'border-primary/30',
    avatar: reviewAvatars.marielTishma,
  },
  {
    name: 'Foster',
    url: 'https://share.google/11K9M9q9wDDx59rJJ',
    text: 'The experience was extremely delightful. Tanya and her partner were phenomenal in cleaning my old apartment. Would highly recommend this service to anyone!',
    excerpt: 'The experience was extremely delightful. Tanya and her partner were phenomenal in cleaning my old apartment. Would highly recommend this service to anyone!',
    card: 'bg-magenta text-white',
    bar: 'border-white/40',
  },
  {
    name: 'Ebrahim Arian',
    url: 'https://share.google/iHbJnaEafcE2d6tcp',
    text: 'I used this cleaning company for my new home, and they did a great job. They were on time, professional, and worked quickly. While cleaning, they also noticed a few issues in the house and gave me helpful tips, which I really appreciated. The price was fair, and the quote matched what I paid. It was also easy to communicate with them, and their website made booking simple. Overall, I’m very happy with the service and would recommend them to others.',
    excerpt: 'I used this cleaning company for my new home, and they did a great job. They were on time, professional, and worked quickly. I’m very happy with the service and would recommend them.',
    card: 'bg-cream text-primary border-2 border-cocoa/15',
    bar: 'border-primary/30',
  },
  {
    name: 'Lauren Bohm',
    url: 'https://share.google/7bKLMf42uUBRU9oxo',
    text: 'Booking on the platform was simple and easy to navigate. I received a call to confirm the details of my booking almost immediately. Meli did an amazing job and paid close attention to my specific requests. The customer service is also very attentive and easy to reach. I also appreciate how often they check in to give you appointment reminders and respond quickly to questions or concerns.',
    excerpt: 'Booking on the platform was simple and easy to navigate. Meli did an amazing job and paid close attention to my specific requests. The customer service is also very attentive and easy to reach.',
    card: 'bg-violet text-white',
    bar: 'border-white/40',
  },
  {
    name: 'Mary Ellen Guest',
    url: 'https://share.google/2climVMJtHkfeItsC',
    text: 'I have been ill and our house was in need of a deep cleaning. Thank goodness for Mely coming to clean today!! She did an EXCELLENT job. The whole house sparkles and smells so good too!!! Plus she is very sweet and kind. My Golden Retriever loved her too!!!',
    excerpt: 'Our house was in need of a deep cleaning. Thank goodness for Mely coming to clean today! She did an excellent job. The whole house sparkles and smells so good too!',
    card: 'bg-white text-primary',
    bar: 'border-primary/30',
  },
  {
    name: 'Hannah Bailey',
    url: 'https://share.google/JAbLssdCghAWqmG7x',
    text: 'Krystyna and Viola are amazing! They are lovely humans and so good at what they do. Both are so sweet with our pup, go above and beyond, and always have us look everything over before they go to make sure we are happy. I always look forward to seeing them knowing how good our homes feels after and how great their energy is while they’re here. Highly recommend!',
    excerpt: 'Krystyna and Viola are amazing! They are lovely humans and so good at what they do. Both are so sweet with our pup, go above and beyond, and make sure we are happy. Highly recommend!',
    card: 'bg-primary text-cream',
    bar: 'border-cream/40',
  },
  {
    name: 'Lauren Doria',
    url: 'https://share.google/cifIcfbIVCsmtqOr3',
    text: 'Jennifer and her team did a great job & we’re so accommodating to my timing issues. Would definitely use them again!',
    excerpt: 'Jennifer and her team did a great job & were so accommodating to my timing issues. Would definitely use them again!',
    card: 'bg-white text-primary',
    bar: 'border-primary/30',
  },
  {
    name: 'Diana Coutu',
    url: 'https://share.google/L0KL1mDIUv8B0Cb3Q',
    text: 'Jennifer was wonderful. We hired for a move in deep clean of our second floor. Needless to say she handled everything and we are ready for the big move!',
    excerpt: 'Jennifer was wonderful. We hired for a move-in deep clean of our second floor. She handled everything and we are ready for the big move!',
    card: 'bg-pink text-cocoa',
    bar: 'border-cocoa/30',
  },
  {
    name: 'Tina Arora',
    url: 'https://share.google/SlErEfXlSXAR7iQeh',
    text: 'Wonderful customer service and staff!! Krystyna and Wiola did a lovely job with my home cleaning! They are friendly and attentive to details. I would definitely recommend them!! Thank you.',
    excerpt: 'Wonderful customer service and staff! Krystyna and Wiola did a lovely job with my home cleaning. They are friendly and attentive to details. I would definitely recommend them!',
    card: 'bg-magenta text-white',
    bar: 'border-white/40',
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
