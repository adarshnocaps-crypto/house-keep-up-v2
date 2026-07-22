import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getBookings, subscribeBookings, relativeTime } from '../lib/bookingStore.js'
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ClipboardList,
  DollarSign,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Plus,
  Search,
  TrendingUp,
  UsersRound,
  Wifi,
  X,
} from 'lucide-react'

const TODAY_LABEL = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())

const NAV = [
  ['overview', 'Overview', LayoutDashboard],
  ['schedule', 'Schedule', CalendarDays],
  ['customers', 'Customers', UsersRound],
  ['requests', 'Requests', ClipboardList],
  ['reports', 'Reports', BarChart3],
]

const REPORT_DATA = {
  '7 days': { revenue: [1680, 2140, 1950, 2680, 2320, 2910, 2480], bookings: [6, 8, 7, 9, 8, 10, 8], labels: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'], total: 16160, avg: 224, repeat: 68, utilization: 82 },
  '30 days': { revenue: [7420, 8150, 7680, 9340, 8890, 10120, 9840], bookings: [27, 31, 29, 35, 33, 38, 36], labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'], total: 61440, avg: 219, repeat: 71, utilization: 86 },
  '90 days': { revenue: [19800, 22400, 21750, 25900, 28300, 30100, 32600], bookings: [74, 82, 80, 94, 101, 108, 116], labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], total: 180850, avg: 226, repeat: 74, utilization: 88 },
}

const JOBS = [
  { time: '8:00 AM', client: 'Nora Williams', initials: 'NW', service: 'Deep cleaning', address: 'West Loop', team: 'Maya + 1', status: 'Confirmed', value: '$280' },
  { time: '9:30 AM', client: 'Jordan Kim', initials: 'JK', service: 'Recurring clean', address: 'Lincoln Park', team: 'Ava', status: 'In progress', value: '$145' },
  { time: '11:00 AM', client: 'Priya Shah', initials: 'PS', service: 'Move-out clean', address: 'River North', team: 'Maya + 2', status: 'Confirmed', value: '$360' },
  { time: '1:30 PM', client: 'Marcus Reed', initials: 'MR', service: 'Standard clean', address: 'Oak Park', team: 'No team', status: 'Needs assignment', value: '$160' },
  { time: '3:00 PM', client: 'Elena Torres', initials: 'ET', service: 'Deep cleaning', address: 'Evanston', team: 'Ava + 1', status: 'Confirmed', value: '$245' },
]

const LEADS = [
  { name: 'Amelia Parker', service: 'Post-construction', area: 'Wicker Park', age: '12 min ago', value: '$320' },
  { name: 'Chris Morgan', service: 'Recurring clean', area: 'Lakeview', age: '38 min ago', value: '$120' },
  { name: 'Dana Wells', service: 'Move-out clean', area: 'Logan Square', age: '1 hr ago', value: '$280' },
]

const CUSTOMERS = [
  { name: 'Nora Williams', email: 'nora.w@example.com', phone: '(312) 555-0184', visits: 14, next: 'Today, 8:00 AM', tag: 'Recurring' },
  { name: 'Jordan Kim', email: 'jordan.k@example.com', phone: '(773) 555-0152', visits: 8, next: 'Today, 9:30 AM', tag: 'Recurring' },
  { name: 'Priya Shah', email: 'priya.s@example.com', phone: '(312) 555-0161', visits: 1, next: 'Today, 11:00 AM', tag: 'New' },
  { name: 'Elena Torres', email: 'elena.t@example.com', phone: '(847) 555-0198', visits: 5, next: 'Today, 3:00 PM', tag: 'Recurring' },
]

const CHICAGO_POINTS = {
  'West Loop': [41.8827, -87.6441],
  'Lincoln Park': [41.9214, -87.6513],
  'River North': [41.8924, -87.6341],
  'Oak Park': [41.885, -87.7845],
  Evanston: [42.0451, -87.6877],
}

function Status({ children }) {
  const style = children === 'In progress' ? 'is-live' : children === 'Needs assignment' ? 'is-warn' : ''
  return <span className={`crm-status ${style}`}>{children}</span>
}

function NewBooking({ close, onCreate }) {
  const [submitted, setSubmitted] = useState(false)
  const [createdName, setCreatedName] = useState('')
  const createBooking = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name').trim()
    onCreate({
      time: data.get('time'),
      client: name,
      initials: name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
      service: data.get('service'),
      address: data.get('address'),
      team: 'No team',
      status: 'Needs assignment',
      value: `$${Number(data.get('estimate')).toLocaleString()}`,
      estimate: Number(data.get('estimate')),
      date: data.get('date'),
      phone: data.get('phone'),
      email: data.get('email'),
    })
    setCreatedName(name)
    setSubmitted(true)
  }
  return (
    <div className="crm-modal" role="dialog" aria-modal="true" aria-label="Create booking">
      <div className="crm-modal__card">
        <button type="button" className="crm-iconButton" onClick={close} aria-label="Close"><X /></button>
        {submitted ? (
          <div className="crm-success">
            <span><CheckCircle2 /></span>
            <h2>Booking created</h2>
            <p>{createdName} has been saved and marked for team assignment.</p>
            <button type="button" className="crm-button" onClick={close}>Done</button>
          </div>
        ) : (
          <form onSubmit={createBooking}>
            <p className="crm-modal__eyebrow">New appointment</p>
            <h2>Create a booking</h2>
            <div className="crm-formGrid">
              <label>Customer name<input name="name" required placeholder="Full name" autoComplete="name" /></label>
              <label>Phone<input name="phone" type="tel" required placeholder="(312) 555-0123" autoComplete="tel" /></label>
              <label className="crm-formGrid__full">Email<input name="email" type="email" required placeholder="name@example.com" autoComplete="email" /></label>
              <label>Service<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Standard cleaning</option><option>Deep cleaning</option><option>Move-in / move-out</option><option>Recurring cleaning</option></select></label>
              <label>Arrival time<select name="time" defaultValue="11:00 AM"><option>8:00 AM</option><option>9:30 AM</option><option>11:00 AM</option><option>1:30 PM</option><option>3:00 PM</option></select></label>
              <label>Estimate ($)<input name="estimate" type="number" required min="0" step="5" defaultValue="160" /></label>
              <label>Date<input name="date" type="date" required defaultValue={new Date().toISOString().slice(0, 10)} /></label>
              <label className="crm-formGrid__full">Address<input name="address" required placeholder="Street address, Chicago, IL" autoComplete="street-address" /></label>
            </div>
            <button type="submit" className="crm-button">Create booking <ArrowUpRight /></button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function BookingCRM({ onLogout }) {
  const [section, setSection] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('view')
    return NAV.some(([id]) => id === requested) ? requested : 'overview'
  })
  const [search, setSearch] = useState('')
  const [showNewBooking, setShowNewBooking] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [connection, setConnection] = useState('loading')
  const [dashboard, setDashboard] = useState({
    metrics: { jobsToday: 8, expectedRevenue: 2480, newRequests: 12, completionRate: 98 },
    jobs: JOBS,
    leads: LEADS,
    customers: CUSTOMERS,
  })

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/admin/dashboard', { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Dashboard unavailable')))
      .then((data) => { setDashboard((current) => ({ ...current, ...data })); setConnection('live') })
      .catch((error) => { if (error.name !== 'AbortError') setConnection('preview') })
    return () => controller.abort()
  }, [])

  // Surface bookings made on the customer site (/book) in the admin inbox.
  useEffect(() => {
    const toLead = (booking) => ({
      name: booking.name,
      service: booking.service,
      area: booking.city || 'Chicago',
      age: relativeTime(booking.createdAt),
      value: `$${Number(booking.estimate || 0).toLocaleString()}`,
      email: booking.email,
      phone: booking.phone,
      online: true,
    })
    const sync = () => {
      const online = getBookings().map(toLead)
      setDashboard((current) => ({
        ...current,
        leads: [...online, ...LEADS],
        metrics: { ...current.metrics, newRequests: 12 + online.length },
      }))
    }
    sync()
    return subscribeBookings(sync)
  }, [])

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return dashboard.customers.filter((customer) => [customer.name, customer.email, customer.phone].some((value) => value.toLowerCase().includes(query)))
  }, [dashboard.customers, search])
  const createBooking = (booking) => {
    setDashboard((current) => {
      const exists = current.customers.some((customer) => customer.email === booking.email)
      const isToday = booking.date === new Date().toISOString().slice(0, 10)
      const nextDate = isToday ? `Today, ${booking.time}` : `${new Date(`${booking.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${booking.time}`
      return {
        ...current,
        metrics: { ...current.metrics, jobsToday: current.metrics.jobsToday + (isToday ? 1 : 0), expectedRevenue: current.metrics.expectedRevenue + (isToday ? booking.estimate : 0) },
        jobs: isToday ? [...current.jobs, booking] : current.jobs,
        customers: exists ? current.customers : [...current.customers, { name: booking.client, email: booking.email, phone: booking.phone, visits: 1, next: nextDate, tag: 'New' }],
      }
    })
  }

  return (
    <div className="crm-shell">
      <aside className="crm-sidebar">
        <a href="/" className="crm-wordmark">HOUSE KEEP UP</a>
        <p className="crm-sidebar__label">Operations</p>
        <nav className="crm-nav" aria-label="CRM sections">
          {NAV.map(([id, label, Icon]) => (
            <button type="button" key={id} onClick={() => setSection(id)} className={section === id ? 'is-active' : ''}>
              <Icon /> {label}
            </button>
          ))}
        </nav>
        <button type="button" className="crm-user" onClick={onLogout} title="Sign out"><span>AM</span><div><strong>Amrit Mohanty</strong><p>Administrator</p></div><LogOut /></button>
      </aside>

      <main className="crm-main">
        <header className="crm-topbar">
          <div>
            <p>{section === 'overview' ? `Operations · ${TODAY_LABEL}` : `Operations / ${NAV.find(([id]) => id === section)?.[1]}`}</p>
            <h1>{section === 'overview' ? 'Overview' : NAV.find(([id]) => id === section)?.[1]}</h1>
          </div>
          <div className="crm-topbar__actions">
            <span className={`crm-connection is-${connection}`}><Wifi /> {connection === 'live' ? 'Synced' : connection === 'loading' ? 'Connecting' : 'Preview data'}</span>
            <div className="crm-notifications">
              <button type="button" className="crm-iconButton" aria-label="Notifications" aria-expanded={showNotifications} onClick={() => setShowNotifications((open) => !open)}><Bell /><i>3</i></button>
              {showNotifications && <div className="crm-notifications__menu"><header><strong>Notifications</strong><span>3 new</span></header><button type="button" onClick={() => { setSection('schedule'); setShowNotifications(false) }}><AlertCircle /><span><strong>Marcus needs a team</strong><small>1:30 PM · Oak Park</small></span></button><button type="button" onClick={() => { setSection('requests'); setShowNotifications(false) }}><UsersRound /><span><strong>4 requests need replies</strong><small>Oldest request is 38 min</small></span></button><button type="button"><CheckCircle2 /><span><strong>Jordan is in progress</strong><small>Started at 9:34 AM</small></span></button></div>}
            </div>
            <button type="button" className="crm-button" onClick={() => setShowNewBooking(true)}><Plus /> New booking</button>
          </div>
        </header>

        {section === 'overview' && <Overview setSection={setSection} dashboard={dashboard} />}
        {section === 'schedule' && <Schedule jobs={dashboard.jobs} />}
        {section === 'customers' && <Customers search={search} setSearch={setSearch} customers={filteredCustomers} totalCustomers={dashboard.customers.length} />}
        {section === 'requests' && <Requests leads={dashboard.leads} />}
        {section === 'reports' && <Reports />}
      </main>
      {showNewBooking && <NewBooking close={() => setShowNewBooking(false)} onCreate={createBooking} />}
    </div>
  )
}

function Overview({ setSection, dashboard }) {
  return (
    <div className="crm-content">
      <section className="crm-metrics">
        <article><span className="crm-metricIcon"><CalendarDays /></span><p>Today’s jobs</p><strong>{dashboard.metrics.jobsToday}</strong><small>2 more than Monday</small></article>
        <article><span className="crm-metricIcon"><DollarSign /></span><p>Expected revenue</p><strong>${dashboard.metrics.expectedRevenue.toLocaleString()}</strong><small>+14% from last week</small></article>
        <article><span className="crm-metricIcon"><UsersRound /></span><p>New requests</p><strong>{dashboard.metrics.newRequests}</strong><small>4 need a reply</small></article>
        <article><span className="crm-metricIcon"><CheckCircle2 /></span><p>Completion rate</p><strong>{dashboard.metrics.completionRate}%</strong><small>Last 30 days</small></article>
      </section>

      <section className="crm-attention" aria-label="Action queue">
        <div><span className="crm-attention__icon"><AlertCircle /></span><div><small>Action queue</small><strong>{dashboard.jobs.filter((job) => job.status === 'Needs assignment').length} booking needs an owner</strong><p>Marcus Reed · Today at 1:30 PM</p></div></div>
        <div className="crm-attention__secondary"><strong>{dashboard.leads.length}</strong><span>new requests<br/><small>Oldest: 38 min</small></span></div>
        <div className="crm-attention__actions"><button type="button" onClick={() => setSection('schedule')}>Open dispatch</button><button type="button" onClick={() => setSection('requests')}>Review inbox <ArrowRight /></button></div>
      </section>

      <section className="crm-grid">
        <div className="crm-panel crm-panel--wide">
          <header className="crm-panel__head"><div><p>Today’s schedule</p><span>{TODAY_LABEL}</span></div><button type="button" onClick={() => setSection('schedule')}>View calendar <ArrowUpRight /></button></header>
          <div className="crm-jobs">
            <div className="crm-job crm-job--header"><span>Time</span><span /><span>Customer</span><span>Area</span><span>Team</span><span>Status</span><span>Total</span></div>
            {dashboard.jobs.map((job) => <JobRow key={job.client} job={job} />)}
          </div>
        </div>
        <div className="crm-panel crm-panel--leads">
          <header className="crm-panel__head"><div><p>New requests</p><span>Needs follow-up</span></div><button type="button" onClick={() => setSection('requests')}>View all <ArrowUpRight /></button></header>
          <div className="crm-leads">
            {dashboard.leads.map((lead) => <div key={`${lead.name}-${lead.service}`}><div><strong>{lead.name}{lead.online && <i className="crm-liveDot" title="New online booking" />}</strong><span>{lead.service} · {lead.area}</span></div><p>{lead.value}<small>{lead.age}</small></p></div>)}
          </div>
        </div>
      </section>
    </div>
  )
}

function JobRow({ job }) {
  return <article className="crm-job"><time>{job.time}</time><span className="crm-avatar">{job.initials}</span><div className="crm-job__client"><strong>{job.client}</strong><span>{job.service}</span></div><div className="crm-job__place"><MapPin />{job.address}</div><div className="crm-job__team">{job.team}</div><Status>{job.status}</Status><strong className="crm-job__value">{job.value}</strong></article>
}

function Schedule({ jobs }) {
  const mapNode = useRef(null)
  const mapInstance = useRef(null)
  const jobLayer = useRef(null)
  const markers = useRef(new Map())
  const [crew, setCrew] = useState('All crews')
  const [selectedClient, setSelectedClient] = useState(jobs[0]?.client)
  const crewFor = (job) => job.team.startsWith('Maya') ? 'Maya' : job.team.startsWith('Ava') ? 'Ava' : 'Unassigned'
  const visibleJobs = useMemo(() => jobs.filter((job) => crew === 'All crews' || crewFor(job) === crew), [crew, jobs])
  const durations = { 'Deep cleaning': '2 hr 30 min', 'Recurring clean': '2 hr', 'Move-out clean': '3 hr', 'Standard clean': '2 hr' }
  const routeStats = crew === 'Maya' ? ['Maya crew', '18.4 miles', '3 cleanings'] : crew === 'Ava' ? ['Ava crew', '20.1 miles', '2 cleanings'] : crew === 'Unassigned' ? ['Open work', '8.3 miles', '1 cleaning needs a crew'] : ['Today’s coverage', '3 crews', `${jobs.length} cleanings · 1 open`]

  useEffect(() => {
    if (!mapNode.current || mapInstance.current) return
    const map = L.map(mapNode.current, { zoomControl: false, attributionControl: true }).setView([41.91, -87.68], 11)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map)
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    mapInstance.current = map
    window.setTimeout(() => map.invalidateSize(), 0)
    return () => { map.remove(); mapInstance.current = null }
  }, [])

  useEffect(() => {
    if (!mapInstance.current) return
    if (jobLayer.current) jobLayer.current.remove()
    const group = L.layerGroup().addTo(mapInstance.current)
    markers.current = new Map()
    const colors = { Maya: '#1769e0', Ava: '#168267', Unassigned: '#c6504b' }
    const routeGroups = visibleJobs.reduce((groups, job) => {
      const team = crewFor(job)
      return { ...groups, [team]: [...(groups[team] || []), job] }
    }, {})
    Object.entries(routeGroups).forEach(([team, teamJobs]) => {
      const route = teamJobs.map((job, index) => CHICAGO_POINTS[job.address] || [41.89 + index * .012, -87.66 - index * .008])
      if (route.length > 1) L.polyline(route, { color: colors[team], weight: 4, opacity: .78, dashArray: '1 10', lineCap: 'round' }).addTo(group)
    })
    const bounds = []
    visibleJobs.forEach((job, visibleIndex) => {
      const originalIndex = jobs.findIndex((item) => item.client === job.client)
      const point = CHICAGO_POINTS[job.address] || [41.89 + visibleIndex * .012, -87.66 - visibleIndex * .008]
      bounds.push(point)
      const team = crewFor(job)
      const icon = L.divIcon({ className: 'crm-mapMarkerWrap', html: `<span class="crm-mapMarker is-${team.toLowerCase()}"><b>${originalIndex + 1}</b></span>`, iconSize: [34, 42], iconAnchor: [17, 38] })
      const tooltip = document.createElement('div')
      const title = document.createElement('strong')
      title.textContent = `${job.time} · ${job.client}`
      tooltip.append(title, document.createElement('br'), document.createTextNode(`${job.service} · ${job.team}`))
      const marker = L.marker(point, { icon }).addTo(group).bindTooltip(tooltip, { direction: 'top', offset: [0, -30] })
      marker.on('click', () => setSelectedClient(job.client))
      markers.current.set(job.client, marker)
    })
    jobLayer.current = group
    if (bounds.length > 1) mapInstance.current.fitBounds(bounds, { padding: [55, 55], maxZoom: 12 })
    else if (bounds.length === 1) mapInstance.current.flyTo(bounds[0], 13, { duration: .45 })
  }, [visibleJobs, jobs])

  useEffect(() => {
    if (!visibleJobs.some((job) => job.client === selectedClient)) setSelectedClient(visibleJobs[0]?.client)
  }, [selectedClient, visibleJobs])

  const chooseJob = (job) => {
    setSelectedClient(job.client)
    const point = CHICAGO_POINTS[job.address]
    if (point) mapInstance.current?.flyTo(point, 13, { duration: .65 })
    markers.current.get(job.client)?.openTooltip()
  }

  return <div className="crm-content"><section className="crm-dispatch">
    <header className="crm-dispatch__head"><div><p>{TODAY_LABEL}</p><span>{jobs.length} cleanings · 2 active crews · 1 unassigned</span></div><div><span className="crm-routeHealth"><i/> Crews on time</span><button type="button">Today <ChevronDown /></button></div></header>
    <div className="crm-dispatch__body">
      <aside className="crm-stopList">
        <div className="crm-crewFilters" aria-label="Filter schedule by crew">{['All crews', 'Maya', 'Ava', 'Unassigned'].map((name) => <button type="button" key={name} className={crew === name ? 'is-active' : ''} onClick={() => setCrew(name)}>{name}{name === 'Unassigned' && <i>1</i>}</button>)}</div>
        <div className="crm-routeSummary"><span><Navigation /></span><div><small>{routeStats[0]}</small><strong>{routeStats[1]}</strong><p>{routeStats[2]}</p></div><button type="button" aria-label="Open route"><ArrowUpRight /></button></div>
        <div className="crm-stopList__label"><span>Cleaning schedule</span><small>Arrival → duration</small></div>
        {visibleJobs.map((job) => { const index = jobs.findIndex((item) => item.client === job.client); const team = crewFor(job); return <button type="button" key={`${job.time}-${job.client}`} className={`crm-stop ${selectedClient === job.client ? 'is-active' : ''}`} onClick={() => chooseJob(job)}>
          <span className={`crm-stop__number is-${team.toLowerCase()}`}><b>{index + 1}</b></span>
          <div><strong>{job.client}</strong><p>{job.service} · {job.address}</p><span><Clock3 /> {job.time}<i>→</i>{durations[job.service] || '2 hr'} </span><small className={`crm-crewTag is-${team.toLowerCase()}`}>{job.team}</small></div>
          <em>{job.value}</em>
        </button>})}
      </aside>
      <div className="crm-mapWrap"><div ref={mapNode} className="crm-map" aria-label="Chicago cleaning crew dispatch map"/><div className="crm-mapSearch"><Search/><span>Search service area</span></div><div className="crm-mapLegend"><span><i className="is-maya"/>Maya crew</span><span><i className="is-ava"/>Ava crew</span><span><i className="is-open"/>Unassigned</span></div></div>
    </div>
  </section></div>
}

function Customers({ search, setSearch, customers, totalCustomers }) {
  return <div className="crm-content"><section className="crm-panel"><header className="crm-panel__head"><div><p>Customer directory</p><span>{totalCustomers} customers in this workspace</span></div><label className="crm-search"><Search /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, email or phone" /></label></header><div className="crm-customers">{customers.length ? customers.map((customer) => <article key={customer.email}><span className="crm-avatar">{customer.name.split(' ').map((part) => part[0]).join('')}</span><div><strong>{customer.name}</strong><span><Mail /> {customer.email}</span><span><Phone /> {customer.phone}</span></div><p><strong>{customer.visits}</strong><span>visits</span></p><p><strong>{customer.next}</strong><span>next appointment</span></p><em>{customer.tag}</em></article>) : <div className="crm-empty"><Search /><strong>No customers found</strong><p>Try a different name, email, or phone number.</p></div>}</div></section></div>
}

function Requests({ leads }) {
  const [pipeline, setPipeline] = useState({ new: leads, quoted: [{ name: 'Theo Martin', service: 'Deep cleaning', area: 'Gold Coast', value: '$240' }], scheduled: [{ name: 'Mina Ali', service: 'Standard clean', area: 'Hyde Park', value: '$160' }] })
  const stages = [['new', 'New'], ['quoted', 'Quoted'], ['scheduled', 'Scheduled']]
  const advance = (lead, from) => {
    const next = from === 'new' ? 'quoted' : 'scheduled'
    setPipeline((current) => ({ ...current, [from]: current[from].filter((item) => item.name !== lead.name), [next]: [...current[next], lead] }))
  }
  return <div className="crm-content"><section className="crm-board">{stages.map(([id, title]) => <div key={id}><header><strong>{title}</strong><span>{pipeline[id].length}</span></header>{pipeline[id].map((lead) => <article key={`${lead.name}-${lead.service}`}><span>{lead.service}{lead.online && <em className="crm-onlineTag">Online</em>}</span><h2>{lead.name}</h2><p><MapPin /> {lead.area}</p><footer>{lead.value}{id === 'scheduled' ? <em><CheckCircle2 /> Ready</em> : <button type="button" onClick={() => advance(lead, id)}>{id === 'new' ? 'Create quote' : 'Schedule'} <ArrowRight /></button>}</footer></article>)}</div>)}</section></div>
}

function Reports() {
  const [range, setRange] = useState('30 days')
  const data = REPORT_DATA[range]
  const chartWidth = 720
  const chartHeight = 220
  const maxRevenue = Math.max(...data.revenue) * 1.12
  const points = data.revenue.map((value, index) => ({
    x: 20 + (index * (chartWidth - 40)) / (data.revenue.length - 1),
    y: chartHeight - 35 - (value / maxRevenue) * (chartHeight - 60),
  }))
  const line = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ')
  const area = `${line} L ${points.at(-1).x} ${chartHeight - 35} L ${points[0].x} ${chartHeight - 35} Z`
  const maxBookings = Math.max(...data.bookings)
  const totalBookings = data.bookings.reduce((total, value) => total + value, 0)
  const teams = [
    { name: 'Maya Chen', jobs: 34, utilization: 92, revenue: '$8,460', quality: '4.9' },
    { name: 'Ava Brooks', jobs: 29, utilization: 86, revenue: '$7,180', quality: '4.8' },
    { name: 'Luis Rivera', jobs: 27, utilization: 81, revenue: '$6,920', quality: '4.9' },
  ]

  return <div className="crm-content crm-reports">
    <div className="crm-reportTop">
      <div><strong>Business performance</strong><p>Revenue, demand and team capacity in one view.</p></div>
      <div className="crm-range" aria-label="Report period">{Object.keys(REPORT_DATA).map((option) => <button type="button" key={option} className={range === option ? 'is-active' : ''} onClick={() => setRange(option)}>{option}</button>)}</div>
    </div>

    <section className="crm-reportKpis" aria-label="Performance summary">
      <article><span><TrendingUp /></span><p>Total revenue</p><strong>${data.total.toLocaleString()}</strong><small>↑ 12.4% vs prior period</small></article>
      <article><span><DollarSign /></span><p>Average ticket</p><strong>${data.avg}</strong><small>+$18 per booking</small></article>
      <article><span><UsersRound /></span><p>Repeat clients</p><strong>{data.repeat}%</strong><small>Healthy retention</small></article>
      <article><span><CheckCircle2 /></span><p>Team utilization</p><strong>{data.utilization}%</strong><small>6% capacity available</small></article>
    </section>

    <section className="crm-reportGrid">
      <article className="crm-chartPanel crm-chartPanel--wide">
        <header><div><h2>Revenue trend</h2><p>Completed and scheduled work</p></div><strong>+$6,840 <span>forecast</span></strong></header>
        <div className="crm-lineChart">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={`Revenue trend for ${range}`}>
            <defs><linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b674d" stopOpacity=".22"/><stop offset="1" stopColor="#0b674d" stopOpacity="0"/></linearGradient></defs>
            {[55, 105, 155].map((y) => <line key={y} x1="20" x2={chartWidth - 20} y1={y} y2={y} className="crm-chartGrid" />)}
            <path d={area} fill="url(#revenue-fill)" />
            <path d={line} className="crm-chartLine" />
            {points.map((point, index) => <circle key={data.labels[index]} cx={point.x} cy={point.y} r="4" className="crm-chartPoint"><title>{data.labels[index]}: ${data.revenue[index].toLocaleString()}</title></circle>)}
          </svg>
          <div className="crm-chartLabels">{data.labels.map((label) => <span key={label}>{label}</span>)}</div>
        </div>
      </article>

      <article className="crm-chartPanel">
        <header><div><h2>Booking volume</h2><p>{totalBookings} bookings this period</p></div></header>
        <div className="crm-bars">{data.bookings.map((value, index) => <div key={data.labels[index]}><strong>{value}</strong><span className="crm-barTrack"><i style={{ height: `${Math.max(18, (value / maxBookings) * 100)}%` }} /></span><small>{data.labels[index]}</small></div>)}</div>
      </article>
    </section>

    <section className="crm-reportGrid crm-reportGrid--lower">
      <article className="crm-chartPanel crm-serviceMix">
        <header><div><h2>Service mix</h2><p>Share of booked revenue</p></div></header>
        <div className="crm-donutRow"><div className="crm-donut"><span><strong>218</strong>jobs</span></div><div className="crm-legend"><p><i className="is-standard" />Standard clean <strong>42%</strong></p><p><i className="is-deep" />Deep clean <strong>31%</strong></p><p><i className="is-move" />Move-out <strong>17%</strong></p><p><i className="is-commercial" />Commercial <strong>10%</strong></p></div></div>
      </article>
      <article className="crm-chartPanel crm-teamPanel">
        <header><div><h2>Team performance</h2><p>Completed work and current capacity</p></div><button type="button">View team <ArrowUpRight /></button></header>
        <div className="crm-teamTable"><div className="crm-teamHeader"><span>Professional</span><span>Jobs</span><span>Utilization</span><span>Revenue</span><span>Rating</span></div>{teams.map((team) => <div className="crm-teamRow" key={team.name}><strong><span className="crm-avatar">{team.name.split(' ').map((part) => part[0]).join('')}</span>{team.name}</strong><span>{team.jobs}</span><span className="crm-util"><i><b style={{ width: `${team.utilization}%` }} /></i>{team.utilization}%</span><span>{team.revenue}</span><span>{team.quality}</span></div>)}</div>
      </article>
    </section>
  </div>
}
