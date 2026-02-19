'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Booking {
  id: string
  service: string
  scheduledDate: string
  status: string
  price: number
  cleaner?: { name: string; hourlyRate: number } | null
  client: { name: string }
}

const SERVICE_LABELS: Record<string, string> = {
  standard: 'Standard Turnover',
  premium: 'Premium Turnover',
  deep: 'Deep Clean',
}

const SERVICE_HOURS: Record<string, number> = {
  standard: 3.5,
  premium: 4.5,
  deep: 5.5,
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function RevenuePage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const completed = bookings.filter((b) => b.status === 'completed')

  const stats = useMemo(() => {
    const now = new Date()
    const thisMonth = bookings.filter((b) => {
      const d = new Date(b.scheduledDate)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    const gross = completed.reduce((s, b) => s + b.price, 0)
    const cleanerPay = completed.reduce((b, booking) => {
      const rate = booking.cleaner?.hourlyRate ?? 18
      const hours = SERVICE_HOURS[booking.service] ?? 4
      return b + rate * hours
    }, 0)
    const net = gross - cleanerPay
    const thisMonthRevenue = thisMonth
      .filter((b) => b.status !== 'cancelled')
      .reduce((s, b) => s + b.price, 0)
    const avg = completed.length > 0 ? gross / completed.length : 0
    return { gross, cleanerPay, net, thisMonthRevenue, avg, completedCount: completed.length }
  }, [bookings, completed])

  const chartData = useMemo(() => {
    const now = new Date()
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
      const monthBookings = bookings.filter((b) => {
        const bd = new Date(b.scheduledDate)
        return bd.getMonth() === d.getMonth() && bd.getFullYear() === d.getFullYear() && b.status !== 'cancelled'
      })
      const revenue = monthBookings.reduce((s, b) => s + b.price, 0)
      return { label: MONTH_NAMES[d.getMonth()], revenue }
    })
  }, [bookings])

  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 1)

  const exportCSV = () => {
    const rows = [
      ['Date', 'Client', 'Service', 'Price', 'Cleaner Pay', 'Net', 'Status'],
      ...completed.map((b) => {
        const rate = b.cleaner?.hourlyRate ?? 18
        const hours = SERVICE_HOURS[b.service] ?? 4
        const pay = rate * hours
        return [
          new Date(b.scheduledDate).toLocaleDateString(),
          b.client.name,
          SERVICE_LABELS[b.service] ?? b.service,
          b.price.toFixed(2),
          pay.toFixed(2),
          (b.price - pay).toFixed(2),
          b.status,
        ]
      }),
    ]
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `readyrentalcleaning-revenue-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-background border-b border-border px-6 py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground">Revenue</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Financial overview & analytics</p>
          </div>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Gross Revenue', value: `$${stats.gross.toLocaleString()}`, sub: 'All completed jobs', color: 'text-foreground', bg: 'bg-background' },
            { label: 'Net Revenue', value: `$${stats.net.toLocaleString()}`, sub: 'After cleaner pay', color: 'text-emerald-700', bg: 'bg-emerald-50' },
            { label: 'This Month', value: `$${stats.thisMonthRevenue.toLocaleString()}`, sub: 'Pending + confirmed', color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Avg Job Value', value: `$${stats.avg.toLocaleString()}`, sub: `${stats.completedCount} completed jobs`, color: 'text-primary', bg: 'bg-secondary' },
          ].map((s, i) => (
            <Card key={i} depth={1} className={cn('p-5', s.bg)}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
              <p className={cn('text-3xl font-extrabold', s.color)}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </Card>
          ))}
        </div>

        {/* Bar chart */}
        <Card depth={1} className="p-6">
          <h2 className="font-bold text-foreground mb-5">Revenue — Last 6 Months</h2>
          {loading ? (
            <div className="h-40 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex items-end gap-3 h-40">
              {chartData.map((d, i) => {
                const heightPct = maxRevenue > 0 ? (d.revenue / maxRevenue) * 100 : 0
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-muted-foreground">
                      {d.revenue > 0 ? `$${d.revenue.toLocaleString()}` : ''}
                    </span>
                    <div className="w-full flex items-end" style={{ height: '100px' }}>
                      <motion.div
                        className="w-full bg-primary rounded-t-lg hover:bg-primary/80 transition-colors"
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(heightPct, d.revenue > 0 ? 4 : 0)}%` }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.08 }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{d.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Completed bookings table */}
        <Card depth={1} className="overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-bold text-foreground">Completed Bookings</h2>
            <span className="text-sm text-muted-foreground">{completed.length} jobs</span>
          </div>
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : completed.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">No completed bookings yet</div>
          ) : (
            <>
              <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-muted/50 border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <div className="col-span-2">Date</div>
                <div className="col-span-3">Client</div>
                <div className="col-span-3">Service</div>
                <div className="col-span-1 text-right">Price</div>
                <div className="col-span-1 text-right">Pay</div>
                <div className="col-span-2 text-right">Net</div>
              </div>
              <div className="divide-y divide-border/50">
                {completed.map((b) => {
                  const rate = b.cleaner?.hourlyRate ?? 18
                  const hours = SERVICE_HOURS[b.service] ?? 4
                  const pay = rate * hours
                  const net = b.price - pay
                  return (
                    <div key={b.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center hover:bg-muted/30 transition-colors text-sm">
                      <div className="col-span-2 text-xs text-muted-foreground">{fmtDate(b.scheduledDate)}</div>
                      <div className="col-span-3 font-medium text-foreground truncate">{b.client.name}</div>
                      <div className="col-span-3 text-muted-foreground text-xs truncate">
                        {SERVICE_LABELS[b.service] ?? b.service}
                        {b.cleaner && <span className="ml-1 text-purple-600">· {b.cleaner.name}</span>}
                      </div>
                      <div className="col-span-1 text-right font-bold text-foreground">${b.price}</div>
                      <div className="col-span-1 text-right text-destructive text-xs">-${pay.toLocaleString()}</div>
                      <div className="col-span-2 text-right font-bold text-primary">${net.toLocaleString()}</div>
                    </div>
                  )
                })}
              </div>
              <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-muted/50 border-t border-border text-sm font-bold">
                <div className="col-span-8 text-foreground">TOTAL</div>
                <div className="col-span-1 text-right text-foreground">${stats.gross.toLocaleString()}</div>
                <div className="col-span-1 text-right text-destructive">-${stats.cleanerPay.toLocaleString()}</div>
                <div className="col-span-2 text-right text-primary">${stats.net.toLocaleString()}</div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
