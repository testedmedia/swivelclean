'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign, TrendingUp, Users, Copy, Check, AlertCircle,
  Loader2, ArrowUpRight, Clock, Wallet, Banknote,
} from 'lucide-react'
import { PAYOUT_THRESHOLD } from '@/lib/referral-constants'

interface Conversion {
  id: string
  service: string
  commissionAmount: number
  status: string
  createdAt: string
}

interface PayoutRecord {
  id: string
  amount: number
  method: string
  status: string
  requestedAt: string
  paidAt: string | null
}

interface DashboardData {
  id: string
  name: string
  email: string
  code: string
  balance: number
  totalEarned: number
  payoutMethod: string
  payoutHandle: string
  conversions: Conversion[]
  payouts: PayoutRecord[]
}

const SERVICE_LABELS: Record<string, string> = {
  standard: 'Standard Turnover',
  premium: 'Premium Turnover',
  deep: 'Deep Clean',
}

export default function ReferrerDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [payoutLoading, setPayoutLoading] = useState(false)
  const [payoutMsg, setPayoutMsg] = useState('')

  useEffect(() => {
    fetchDashboard()
  }, [])

  async function fetchDashboard() {
    try {
      const res = await fetch('/api/referrer/dashboard')
      if (res.status === 401) {
        window.location.href = '/referrer/login'
        return
      }
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Failed to load dashboard')
        return
      }
      setData(json)
    } catch {
      setError('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  function copyLink() {
    if (!data) return
    const link = `${window.location.origin}/api/referral/track?code=${data.code}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function requestPayout() {
    setPayoutLoading(true)
    setPayoutMsg('')
    try {
      const res = await fetch('/api/referrer/request-payout', { method: 'POST' })
      const json = await res.json()
      if (!res.ok) {
        setPayoutMsg(json.error || 'Payout failed')
        setPayoutLoading(false)
        return
      }
      setPayoutMsg(`Payout of $${json.amount.toFixed(2)} requested via ${json.method}. Processed every Friday.`)
      fetchDashboard()
    } catch {
      setPayoutMsg('Something went wrong')
    } finally {
      setPayoutLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="w-5 h-5" /> {error || 'Something went wrong'}
        </div>
      </div>
    )
  }

  const payoutProgress = Math.min((data.balance / PAYOUT_THRESHOLD) * 100, 100)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back, {data.name.split(' ')[0]}</h1>
        <p className="text-sm text-muted-foreground mt-1">Your referral code: <span className="font-mono font-semibold text-foreground">{data.code}</span></p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-background border border-border rounded-xl p-5 shadow-depth-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Balance</span>
          </div>
          <p className="text-3xl font-bold text-foreground">${data.balance.toFixed(2)}</p>
        </div>

        <div className="bg-background border border-border rounded-xl p-5 shadow-depth-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Total Earned</span>
          </div>
          <p className="text-3xl font-bold text-foreground">${data.totalEarned.toFixed(2)}</p>
        </div>

        <div className="bg-background border border-border rounded-xl p-5 shadow-depth-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Referrals</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{data.conversions.length}</p>
        </div>
      </motion.div>

      {/* Referral Link */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-background border border-border rounded-xl p-5 shadow-depth-1 mb-6"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <ArrowUpRight className="w-4 h-4 text-primary" /> Your Referral Link
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-muted/50 border border-input/40 rounded-lg px-4 py-2.5 text-sm text-muted-foreground font-mono truncate">
            {typeof window !== 'undefined' ? `${window.location.origin}/api/referral/track?code=${data.code}` : `readyrentalcleaning.com/api/referral/track?code=${data.code}`}
          </div>
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 h-10 px-4 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 active:scale-[0.97] transition-all whitespace-nowrap"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </motion.div>

      {/* Payout Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-background border border-border rounded-xl p-5 shadow-depth-1 mb-6"
      >
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-primary" /> Payout Progress
        </h2>
        <div className="mb-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>${data.balance.toFixed(2)}</span>
            <span>${PAYOUT_THRESHOLD} threshold</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${payoutProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {data.balance >= PAYOUT_THRESHOLD ? (
          <div className="space-y-2">
            <button
              onClick={requestPayout}
              disabled={payoutLoading}
              className="w-full h-10 bg-primary text-primary-foreground rounded-lg font-semibold text-sm shadow-depth-1 hover:bg-primary/90 active:scale-[0.97] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {payoutLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Banknote className="w-4 h-4" />}
              {payoutLoading ? 'Requesting...' : `Request Payout — $${data.balance.toFixed(2)} via ${data.payoutMethod}`}
            </button>
            {payoutMsg && <p className="text-sm text-primary">{payoutMsg}</p>}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Earn ${(PAYOUT_THRESHOLD - data.balance).toFixed(2)} more to unlock payout requests.{' '}
            {payoutMsg && <span className="text-destructive">{payoutMsg}</span>}
          </p>
        )}
      </motion.div>

      {/* Conversions Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-background border border-border rounded-xl shadow-depth-1 mb-6 overflow-hidden"
      >
        <div className="p-5 pb-3 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Conversions
          </h2>
        </div>
        {data.conversions.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No conversions yet. Share your referral link to start earning.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                  <th className="text-right px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Commission</th>
                  <th className="text-right px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.conversions.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 last:border-0">
                    <td className="px-5 py-3 text-muted-foreground">
                      {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-3 text-foreground font-medium">
                      {SERVICE_LABELS[c.service] || c.service}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-primary">
                      +${c.commissionAmount.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        c.status === 'credited' ? 'bg-primary/10 text-primary' :
                        c.status === 'paid' ? 'bg-green-500/10 text-green-600' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Payout History */}
      {data.payouts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-background border border-border rounded-xl shadow-depth-1 overflow-hidden"
        >
          <div className="p-5 pb-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Payout History
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Requested</th>
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
                  <th className="text-right px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="text-right px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.payouts.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0">
                    <td className="px-5 py-3 text-muted-foreground">
                      {new Date(p.requestedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-3 text-foreground capitalize">{p.method}</td>
                    <td className="px-5 py-3 text-right font-semibold text-foreground">${p.amount.toFixed(2)}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.status === 'paid' ? 'bg-green-500/10 text-green-600' :
                        p.status === 'approved' ? 'bg-primary/10 text-primary' :
                        p.status === 'rejected' ? 'bg-destructive/10 text-destructive' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}
