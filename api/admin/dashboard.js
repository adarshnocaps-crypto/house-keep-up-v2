import { readSession } from './_session.js'

export const dashboard = {
  updatedAt: '2026-07-21T06:30:00.000Z',
  metrics: {
    jobsToday: 8,
    expectedRevenue: 2480,
    newRequests: 12,
    completionRate: 98,
  },
  jobs: [
    { time: '8:00 AM', client: 'Nora Williams', initials: 'NW', service: 'Deep cleaning', address: 'West Loop', team: 'Maya + 1', status: 'Confirmed', value: '$280' },
    { time: '9:30 AM', client: 'Jordan Kim', initials: 'JK', service: 'Recurring clean', address: 'Lincoln Park', team: 'Ava', status: 'In progress', value: '$145' },
    { time: '11:00 AM', client: 'Priya Shah', initials: 'PS', service: 'Move-out clean', address: 'River North', team: 'Maya + 2', status: 'Confirmed', value: '$360' },
    { time: '1:30 PM', client: 'Marcus Reed', initials: 'MR', service: 'Standard clean', address: 'Oak Park', team: 'No team', status: 'Needs assignment', value: '$160' },
    { time: '3:00 PM', client: 'Elena Torres', initials: 'ET', service: 'Deep cleaning', address: 'Evanston', team: 'Ava + 1', status: 'Confirmed', value: '$245' },
  ],
  leads: [
    { name: 'Amelia Parker', service: 'Post-construction', area: 'Wicker Park', age: '12 min ago', value: '$320' },
    { name: 'Chris Morgan', service: 'Recurring clean', area: 'Lakeview', age: '38 min ago', value: '$120' },
    { name: 'Dana Wells', service: 'Move-out clean', area: 'Logan Square', age: '1 hr ago', value: '$280' },
  ],
  customers: [
    { name: 'Nora Williams', email: 'nora.w@example.com', phone: '(312) 555-0184', visits: 14, next: 'Today, 8:00 AM', tag: 'Recurring' },
    { name: 'Jordan Kim', email: 'jordan.k@example.com', phone: '(773) 555-0152', visits: 8, next: 'Today, 9:30 AM', tag: 'Recurring' },
    { name: 'Priya Shah', email: 'priya.s@example.com', phone: '(312) 555-0161', visits: 1, next: 'Today, 11:00 AM', tag: 'New' },
    { name: 'Elena Torres', email: 'elena.t@example.com', phone: '(847) 555-0198', visits: 5, next: 'Today, 3:00 PM', tag: 'Recurring' },
  ],
}

export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  if (!readSession(request)) return response.status(401).json({ error: 'Authentication required' })

  response.setHeader('Cache-Control', 'no-store')
  return response.status(200).json(dashboard)
}
