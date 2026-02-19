'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, User, Wallet, ArrowRight, KeyRound, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

type Step = 'choice' | 'signup' | 'login-email' | 'login-otp'

export default function ReferrerLoginPage() {
  const [step, setStep] = useState<Step>('choice')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Signup fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [payoutMethod, setPayoutMethod] = useState('venmo')
  const [payoutHandle, setPayoutHandle] = useState('')

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [otp, setOtp] = useState('')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/referral/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, payoutMethod, payoutHandle }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Signup failed')
        setLoading(false)
        return
      }

      // Auto-login after signup: send OTP
      setLoginEmail(email)
      const otpRes = await fetch('/api/referrer/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'send-otp' }),
      })

      if (otpRes.ok) {
        setStep('login-otp')
      } else {
        setError('Account created. Please log in with your email.')
        setStep('login-email')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSendOTP(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/referrer/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, action: 'send-otp' }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to send code')
        setLoading(false)
        return
      }

      setStep('login-otp')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOTP(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/referrer/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, otp, action: 'verify-otp' }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid code')
        setLoading(false)
        return
      }

      window.location.href = '/referrer/dashboard'
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full h-11 px-4 bg-muted/50 border border-input/60 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors text-sm'

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Branded header */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-bold text-foreground text-sm">
            Ready<span className="text-primary">Rental</span> Referrals
          </a>
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Back to site
          </a>
        </div>
      </nav>

      <div className="flex items-center justify-center p-4 pt-16 pb-24">
      <div className="w-full max-w-md">
        {/* Urgency banner */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Limited spots open — join before your area fills up
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-background border border-border rounded-2xl shadow-depth-2 overflow-hidden"
        >
          <div className="p-6 pb-4 text-center border-b border-border">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {step === 'signup' ? 'Join the Referral Program' : step === 'login-otp' ? 'Enter Your Code' : 'Referral Partner Portal'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {step === 'signup'
                ? 'Earn $25-$100 per referral. Free to join.'
                : step === 'login-otp'
                  ? `We sent a 6-digit code to ${loginEmail}`
                  : 'Sign up or log in to manage your referrals'}
            </p>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4 text-sm text-destructive"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* Choice screen */}
              {step === 'choice' && (
                <motion.div key="choice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  <button
                    onClick={() => { setError(''); setStep('signup') }}
                    className="w-full flex items-center gap-3 p-4 border border-border rounded-xl hover:bg-muted/50 hover:border-primary/30 transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">Sign Up</p>
                      <p className="text-xs text-muted-foreground">Create your referral account</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>

                  <button
                    onClick={() => { setError(''); setStep('login-email') }}
                    className="w-full flex items-center gap-3 p-4 border border-border rounded-xl hover:bg-muted/50 hover:border-primary/30 transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <KeyRound className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">Log In</p>
                      <p className="text-xs text-muted-foreground">Access your dashboard</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                </motion.div>
              )}

              {/* Signup form */}
              {step === 'signup' && (
                <motion.form key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Payout Method</label>
                    <select value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value)} className={inputClass}>
                      <option value="venmo">Venmo</option>
                      <option value="zelle">Zelle</option>
                      <option value="direct">Direct Deposit</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      {payoutMethod === 'venmo' ? 'Venmo Handle' : payoutMethod === 'zelle' ? 'Zelle Email/Phone' : 'Bank Details'}
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" value={payoutHandle} onChange={(e) => setPayoutHandle(e.target.value)} placeholder={payoutMethod === 'venmo' ? '@janedoe' : payoutMethod === 'zelle' ? 'jane@email.com' : 'Routing + Account #'} className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-lg font-semibold text-sm shadow-depth-1 hover:bg-primary/90 hover:shadow-depth-2 active:scale-[0.97] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>

                  <button type="button" onClick={() => { setError(''); setStep('choice') }} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Back
                  </button>
                </motion.form>
              )}

              {/* Login email */}
              {step === 'login-email' && (
                <motion.form key="login-email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="jane@example.com" className={`${inputClass} pl-10`} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-lg font-semibold text-sm shadow-depth-1 hover:bg-primary/90 hover:shadow-depth-2 active:scale-[0.97] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                    {loading ? 'Sending Code...' : 'Send Login Code'}
                  </button>

                  <button type="button" onClick={() => { setError(''); setStep('choice') }} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Back
                  </button>
                </motion.form>
              )}

              {/* OTP verification */}
              {step === 'login-otp' && (
                <motion.form key="login-otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleVerifyOTP} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">6-Digit Code</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className={`${inputClass} text-center text-2xl font-bold tracking-[0.3em]`}
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-lg font-semibold text-sm shadow-depth-1 hover:bg-primary/90 hover:shadow-depth-2 active:scale-[0.97] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    {loading ? 'Verifying...' : 'Verify & Log In'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOtp('')
                      setError('')
                      handleSendOTP({ preventDefault: () => {} } as React.FormEvent)
                    }}
                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Resend code
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          By signing up you agree to our referral terms. Commissions are paid every Friday for balances over $50.
        </p>
      </div>
      </div>
    </main>
  )
}
