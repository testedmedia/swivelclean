'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  DollarSign, Share2, Banknote, Gift, Clock, TrendingUp, ArrowRight, Check, Star,
  Home, Sparkles, Building2, CalendarCheck, MessageSquare, Copy, Mail, User, Wallet,
  Loader2, Link2, ExternalLink,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

// ── Helpers ──

function AnimateOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: 'easeOut' }} className={className}>{children}</motion.div>
  )
}

function AnimatedIcon({ Icon, size = 'md', delay = 0 }: { Icon: LucideIcon; size?: 'sm' | 'md' | 'lg'; delay?: number }) {
  const sizeMap = {
    sm: { container: 'w-11 h-11 rounded-xl', icon: 'w-5 h-5' },
    md: { container: 'w-14 h-14 rounded-xl', icon: 'w-7 h-7' },
    lg: { container: 'w-16 h-16 rounded-2xl', icon: 'w-8 h-8' },
  }
  const s = sizeMap[size]
  return (
    <motion.div
      className={`${s.container} bg-primary/10 flex items-center justify-center mx-auto`}
      initial={{ scale: 0, rotate: -20 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 400, damping: 20, delay }}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: delay * 3 }}>
        <Icon className={`${s.icon} text-primary`} />
      </motion.div>
    </motion.div>
  )
}

function StatIcon({ Icon, delay = 0 }: { Icon: LucideIcon; delay?: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 500, damping: 25, delay }}
      className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-1.5 mx-auto"
    >
      <Icon className="w-4 h-4 text-primary" />
    </motion.div>
  )
}

// ── Constants ──

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 28 } } }

const STEPS = [
  { Icon: Link2, title: 'Get Your Link', description: 'One click. No signup. No email. Your link is ready instantly — plus $25 free in your account.', highlight: '$25 Free' },
  { Icon: Share2, title: 'Share & Earn', description: 'Share with Airbnb hosts, property managers, or anyone who needs cleaning.', highlight: '$25 per referral' },
  { Icon: Banknote, title: 'Get Paid', description: 'Earn $25-$100 for every new client who books. No cap on earnings.', highlight: 'Unlimited' },
]

const EARNINGS = [
  { service: 'Standard Turnover', price: '$180', commission: '$25', Icon: Home },
  { service: 'Premium Turnover', price: '$220', commission: '$25', Icon: Building2 },
  { service: 'Deep Clean', price: '$350', commission: '$50', Icon: Sparkles },
  { service: 'Monthly Contract (4+)', price: '$720+/mo', commission: '$100', Icon: CalendarCheck },
]

const FEATURES = [
  { Icon: DollarSign, title: '$25-$100 Per Referral', description: 'Earn on every first booking your referral makes.' },
  { Icon: Gift, title: 'Your Referral Gets $25 Off', description: 'They save money, you make money. Win-win.' },
  { Icon: Clock, title: '90-Day Tracking', description: 'Your link tracks referrals for 90 days. They book later, you still earn.' },
  { Icon: TrendingUp, title: 'No Cap on Earnings', description: 'Refer 10 hosts? Earn $250+. No limits, no catch.' },
]

const FAQ = [
  { q: 'How much can I earn?', a: '$25 for standard turnovers, $50 for deep cleans, $100 for monthly contracts. No cap — refer as many hosts as you want.' },
  { q: 'When do I get paid?', a: 'Commissions are paid out every Friday via Venmo, Zelle, or direct deposit once your balance hits $50.' },
  { q: 'Do my referrals get a discount?', a: 'Yes! Every person you refer gets $25 off their first booking. It helps them try us risk-free.' },
  { q: 'How long does my link last?', a: '90 days. If someone clicks your link and books within 90 days, you get credit — even if they don\'t book right away.' },
  { q: 'Who should I refer?', a: 'Airbnb hosts, Vrbo hosts, property managers, real estate agents, anyone who manages short-term rentals in LA.' },
  { q: 'Is there a limit on referrals?', a: 'No. We have hosts who refer 5-10 people per month and earn $125-$500+ consistently.' },
]

const STATS = [
  { value: '$25-$100', label: 'Per Referral', Icon: DollarSign },
  { value: '90 Days', label: 'Cookie Duration', Icon: Clock },
  { value: 'No Cap', label: 'On Earnings', Icon: TrendingUp },
  { value: 'Every Friday', label: 'Payouts', Icon: Banknote },
]

// ── Inline Dashboard (shown after one-click generation) ──

function ReferralDashboard({ code, url }: { code: string; url: string }) {
  const [copied, setCopied] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [claimError, setClaimError] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [payoutMethod, setPayoutMethod] = useState('venmo')
  const [payoutHandle, setPayoutHandle] = useState('')

  function copyLink() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault()
    setClaiming(true)
    setClaimError('')
    try {
      const res = await fetch('/api/referral/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, email, name, payoutMethod, payoutHandle }),
      })
      const data = await res.json()
      if (!res.ok) {
        setClaimError(data.error || 'Failed to claim account')
        return
      }
      setClaimed(true)
      localStorage.setItem('rr_claimed', 'true')
    } catch {
      setClaimError('Something went wrong')
    } finally {
      setClaiming(false)
    }
  }

  const inputClass = 'w-full h-10 px-3 bg-muted/50 border border-input/60 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors text-sm'

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-2xl mx-auto space-y-6">
      {/* Link card */}
      <Card className="p-6 border border-primary/20 bg-primary/5 rounded-2xl shadow-depth-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Link2 className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-bold text-foreground">Your Referral Link</h3>
          <Badge variant="outline" className="text-xs ml-auto">Code: {code}</Badge>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-sm font-mono text-muted-foreground truncate">
            {url}
          </div>
          <motion.button
            onClick={copyLink}
            className="flex items-center gap-1.5 h-10 px-5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all whitespace-nowrap"
            whileTap={{ scale: 0.95 }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </motion.button>
        </div>

        {/* Social share */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Share:</span>
          {[
            { label: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Know an Airbnb host in LA? They'll save $25 on their first cleaning and I earn a bonus. Win-win! ${url}`)}` },
            { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
            { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`Hey! If you need Airbnb turnover cleaning in LA, check this out. You get $25 off: ${url}`)}` },
            { label: 'Email', href: `mailto:?subject=${encodeURIComponent('$25 off Airbnb cleaning in LA')}&body=${encodeURIComponent(`I use Ready Rental Cleaning for my Airbnb turnovers. Use my link to get $25 off your first booking: ${url}`)}` },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 rounded-full px-3 py-1.5 transition-colors"
            >
              <ExternalLink className="w-3 h-3" /> {s.label}
            </a>
          ))}
        </div>
      </Card>

      {/* Claim account card */}
      <AnimatePresence mode="wait">
        {!claimed && !localStorage.getItem('rr_claimed') ? (
          <motion.div key="claim" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Card className="p-6 border border-border bg-background rounded-2xl shadow-depth-1">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-foreground text-sm">Claim Your Account</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Add your email to get paid when referrals convert. No password needed.</p>

              {claimError && (
                <p className="text-xs text-destructive mb-3">{claimError}</p>
              )}

              <form onSubmit={handleClaim} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Name</label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={`${inputClass} pl-8`} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={`${inputClass} pl-8`} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Payout Method</label>
                    <select value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value)} className={inputClass}>
                      <option value="venmo">Venmo</option>
                      <option value="zelle">Zelle</option>
                      <option value="direct">Direct Deposit</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">
                      {payoutMethod === 'venmo' ? 'Venmo Handle' : payoutMethod === 'zelle' ? 'Zelle Email/Phone' : 'Bank Details'}
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input type="text" value={payoutHandle} onChange={(e) => setPayoutHandle(e.target.value)} placeholder={payoutMethod === 'venmo' ? '@handle' : 'you@email.com'} className={`${inputClass} pl-8`} />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={claiming}
                  className="w-full h-10 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 active:scale-[0.97] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {claiming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {claiming ? 'Claiming...' : 'Claim Account & Get Paid'}
                </button>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div key="claimed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-4 border border-primary/20 bg-primary/5 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-2 text-primary font-semibold text-sm">
                <Check className="w-4 h-4" /> Account claimed — you will be notified when referrals convert
              </div>
              <a href="/referrer/dashboard" className="text-xs text-primary hover:underline mt-1 block">Go to full dashboard</a>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main Page ──

export default function ReferralPage() {
  const [affCode, setAffCode] = useState<string | null>(null)
  const [affUrl, setAffUrl] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  // Restore from localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem('rr_ref_code')
    const savedUrl = localStorage.getItem('rr_ref_url')
    if (savedCode && savedUrl) {
      setAffCode(savedCode)
      setAffUrl(savedUrl)
    }
  }, [])

  const generateLink = useCallback(async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/referral/generate', { method: 'POST' })
      const data = await res.json()
      if (res.ok && data.code) {
        setAffCode(data.code)
        setAffUrl(data.url)
        localStorage.setItem('rr_ref_code', data.code)
        localStorage.setItem('rr_ref_url', data.url)
        localStorage.setItem('rr_ref_created', new Date().toISOString())
      }
    } catch (err) {
      console.error('Failed to generate link:', err)
    } finally {
      setGenerating(false)
    }
  }, [])

  return (
    <main className="pt-20">
      {/* Hero */}
      <Section className="text-center">
        <AnimateOnScroll>
          <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5">
            Referral Program
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4">
            Earn <span className="text-primary">$25-$100</span> Per Referral
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3">
            Know an Airbnb host? Share your link. When they book, you earn cash. They get $25 off. Everyone wins.
          </p>
          <p className="text-sm font-semibold text-primary mb-2">
            Sign up now and get $25 free in your account
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            One click &middot; No signup &middot; No email required &middot; Paid every Friday
          </p>

          {/* One-click CTA or Dashboard */}
          <AnimatePresence mode="wait">
            {affCode && affUrl ? (
              <ReferralDashboard key="dashboard" code={affCode} url={affUrl} />
            ) : (
              <motion.div key="cta" exit={{ opacity: 0, y: -20 }} className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={generateLink}
                  disabled={generating}
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold text-base shadow-depth-1 hover:bg-primary/90 hover:shadow-depth-2 transition-all disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {generating ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
                  ) : (
                    <>Get My Referral Link <ArrowRight className="w-5 h-5" /></>
                  )}
                </motion.button>
                <motion.a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-border rounded-xl font-semibold text-base text-foreground hover:bg-muted transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  How It Works
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimateOnScroll>

        {/* Stats bar */}
        {!affCode && (
          <AnimateOnScroll className="mt-12">
            <div className="inline-flex flex-wrap justify-center gap-6 md:gap-10 bg-muted/50 border border-border rounded-2xl px-8 py-5">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <StatIcon Icon={stat.Icon} delay={i * 0.08} />
                  <p className="text-xl md:text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        )}
      </Section>

      {/* 3-Step Process */}
      <Section id="how-it-works" variant="muted">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Three Steps. That&apos;s It.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            No complicated setup. No approvals. Start earning in under a minute.
          </p>
        </AnimateOnScroll>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {STEPS.map((step, i) => (
            <motion.div key={step.title} variants={item}>
              <Card className="relative p-6 text-center border border-border bg-background shadow-depth-1 rounded-2xl h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <motion.span
                    className="inline-flex items-center justify-center w-7 h-7 bg-primary text-primary-foreground rounded-full text-sm font-bold"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20, delay: i * 0.1 }}
                  >
                    {i + 1}
                  </motion.span>
                </div>
                <div className="mb-4 mt-2">
                  <AnimatedIcon Icon={step.Icon} delay={i * 0.1} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                <Badge variant="outline" className="text-xs">{step.highlight}</Badge>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Earnings Table */}
      <Section>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            What You Earn Per Referral
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Every service your referral books puts money in your pocket.
          </p>
        </AnimateOnScroll>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {EARNINGS.map((earning, i) => (
            <motion.div key={earning.service} variants={item}>
              <Card className="p-5 border border-border bg-background shadow-depth-1 rounded-2xl text-center h-full">
                <div className="mb-3">
                  <AnimatedIcon Icon={earning.Icon} size="sm" delay={i * 0.08} />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{earning.service}</h3>
                <p className="text-xs text-muted-foreground mb-3">Client pays {earning.price}</p>
                <motion.div
                  className="bg-primary/10 rounded-xl py-3 px-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <p className="text-2xl font-extrabold text-primary">{earning.commission}</p>
                  <p className="text-xs text-primary/80">You earn</p>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <AnimateOnScroll className="mt-10 max-w-2xl mx-auto">
          <Card className="p-6 border border-primary/20 bg-primary/5 rounded-2xl">
            <div className="flex items-start gap-4">
              <AnimatedIcon Icon={TrendingUp} size="sm" />
              <div>
                <h3 className="font-bold text-foreground mb-1">Quick Math</h3>
                <p className="text-sm text-muted-foreground">
                  Refer <span className="font-semibold text-foreground">5 hosts</span> who each book a standard turnover ={' '}
                  <span className="font-bold text-primary">$125 in your pocket</span>. Refer a property manager with 10+ units ={' '}
                  <span className="font-bold text-primary">$100 bonus</span>. Most active referrers earn $250-$500+/month.
                </p>
              </div>
            </div>
          </Card>
        </AnimateOnScroll>
      </Section>

      {/* Key Features */}
      <Section variant="muted">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Why Hosts Love Referring Us
          </h2>
        </AnimateOnScroll>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {FEATURES.map((feature, i) => (
            <motion.div key={feature.title} variants={item}>
              <Card className="p-5 border border-border bg-background shadow-depth-1 rounded-2xl h-full flex gap-4">
                <AnimatedIcon Icon={feature.Icon} size="sm" delay={i * 0.06} />
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 90-Day Cookie Explainer */}
      <Section>
        <AnimateOnScroll className="max-w-3xl mx-auto text-center">
          <AnimatedIcon Icon={Clock} size="lg" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 mt-6">
            90-Day Tracking
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Your referral link tracks visitors for <span className="font-semibold text-foreground">90 days</span>. Even if they don&apos;t book right away, you still earn your full commission when they come back and book. Share it once and let it work for you.
          </p>
          <div className="inline-flex flex-wrap justify-center gap-4">
            {['Share on Instagram', 'Text a host friend', 'Post in FB groups', 'Email your network'].map((tip, i) => (
              <motion.span
                key={tip}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/50 border border-border rounded-full px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 400, damping: 25 }}
                whileHover={{ scale: 1.05 }}
              >
                <Check className="w-3.5 h-3.5 text-primary" /> {tip}
              </motion.span>
            ))}
          </div>
        </AnimateOnScroll>
      </Section>

      {/* Social Proof */}
      <Section variant="muted">
        <AnimateOnScroll className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-10">
            What Referrers Say
          </h2>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-5">
            {[
              { name: 'Sarah M.', role: 'Airbnb Superhost, Venice', quote: 'I referred 3 hosts in my building. Easiest $75 I\'ve ever made — and they all became regulars.' },
              { name: 'Marcus T.', role: 'Property Manager, WeHo', quote: 'Sent my referral link to a Facebook host group. Got 8 signups in a week. The $100 PM bonus was a nice surprise.' },
              { name: 'Jessica L.', role: 'Real Estate Agent, DTLA', quote: 'I recommend Ready Rental to every investor I work with. The referral bonus is just a cherry on top.' },
              { name: 'David K.', role: 'Airbnb Host, Silver Lake', quote: 'My cleaner referral link is in my Airbnb guidebook. Other hosts see it and sign up. Passive income.' },
            ].map((testimonial, i) => (
              <motion.div key={testimonial.name} variants={item}>
                <Card className="p-5 border border-border bg-background shadow-depth-1 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20, delay: i * 0.08 }}
                    >
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </motion.div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <motion.div
                          key={j}
                          initial={{ scale: 0, rotate: -45 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 500, damping: 20, delay: i * 0.08 + j * 0.04 }}
                        >
                          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-foreground mb-3">&ldquo;{testimonial.quote}&rdquo;</p>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimateOnScroll>
      </Section>

      {/* FAQ */}
      <Section>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Common Questions
          </h2>
        </AnimateOnScroll>

        <div className="max-w-2xl mx-auto space-y-4">
          {FAQ.map((faq) => (
            <AnimateOnScroll key={faq.q}>
              <Card className="p-5 border border-border bg-background shadow-depth-1 rounded-2xl">
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section variant="muted">
        <AnimateOnScroll className="text-center max-w-2xl mx-auto">
          <AnimatedIcon Icon={ArrowRight} size="lg" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 mt-6">
            {affCode ? 'Keep Sharing, Keep Earning' : 'Start Earning Today'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {affCode
              ? 'Your link is live. Every host who books through it puts money in your pocket.'
              : 'One click. No signup. Get your referral link and start sharing with hosts in LA.'}
          </p>
          {!affCode && (
            <motion.button
              onClick={generateLink}
              disabled={generating}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold text-base shadow-depth-1 hover:bg-primary/90 hover:shadow-depth-2 transition-all disabled:opacity-60"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              {generating ? 'Generating...' : 'Get My Referral Link'}
            </motion.button>
          )}
          {affCode && (
            <motion.button
              onClick={() => {
                navigator.clipboard.writeText(affUrl!)
              }}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold text-base shadow-depth-1 hover:bg-primary/90 hover:shadow-depth-2 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Copy className="w-5 h-5" /> Copy My Link
            </motion.button>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            Questions? Email us at{' '}
            <a href="mailto:hello@readyrentalcleaning.com" className="text-primary hover:underline">
              hello@readyrentalcleaning.com
            </a>
          </p>
        </AnimateOnScroll>
      </Section>
    </main>
  )
}
