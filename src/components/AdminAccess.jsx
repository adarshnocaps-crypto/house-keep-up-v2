import { useEffect, useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react'
import { navigate } from '../lib/router.jsx'
import BookingCRM from './BookingCRM.jsx'

function AdminLogin({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const login = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const data = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), password: data.get('password') }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to sign in')
      onSuccess()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return <main className="admin-login">
    <section className="admin-login__brand">
      <a href="/">HOUSE KEEP UP</a>
      <div><span>Operations workspace</span><h1>A calmer way to run every clean.</h1><p>Bookings, crews, customers and daily performance—kept in one secure place.</p></div>
      <small>Private staff access</small>
    </section>
    <section className="admin-login__formWrap">
      <form className="admin-login__form" onSubmit={login}>
        <span className="admin-login__lock"><ShieldCheck /></span>
        <p className="admin-login__eyebrow">Admin portal</p>
        <h2>Welcome back</h2>
        <p className="admin-login__intro">Sign in to manage today’s cleaning operation.</p>
        <label>Email address<input name="email" type="email" required autoComplete="username" placeholder="you@housekeepup.com" /></label>
        <label>Password<div className="admin-login__password"><LockKeyhole/><input name="password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" placeholder="Enter your password"/><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff/> : <Eye/>}</button></div></label>
        {error && <p className="admin-login__error" role="alert">{error}</p>}
        <button className="admin-login__submit" type="submit" disabled={submitting}>{submitting ? 'Signing in…' : <>Sign in <ArrowRight/></>}</button>
        <a className="admin-login__back" href="/">← Return to website</a>
      </form>
    </section>
  </main>
}

export default function AdminAccess({ loginPage = false }) {
  const [auth, setAuth] = useState('checking')

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/admin/session', { credentials: 'same-origin', signal: controller.signal })
      .then((response) => setAuth(response.ok ? 'authenticated' : 'anonymous'))
      .catch((error) => { if (error.name !== 'AbortError') setAuth('anonymous') })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (auth === 'authenticated' && loginPage) navigate('/admin', { replace: true })
    if (auth === 'anonymous' && !loginPage) navigate('/admin/login', { replace: true })
  }, [auth, loginPage])

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {})
    setAuth('anonymous')
    navigate('/admin/login', { replace: true })
  }

  if (auth === 'checking') return <main className="admin-authCheck"><span>HOUSE KEEP UP</span><i/></main>
  if (loginPage && auth === 'anonymous') return <AdminLogin onSuccess={() => { setAuth('authenticated'); navigate('/admin', { replace: true }) }} />
  if (!loginPage && auth === 'authenticated') return <main className="admin-app"><BookingCRM onLogout={logout} /></main>
  return null
}
