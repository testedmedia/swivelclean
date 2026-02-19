'use client'

import { usePathname } from 'next/navigation'
import { Plus } from 'lucide-react'

const PAGE_TITLES: Record<string, string> = {
  '/admin/mission-board': 'Mission Board',
  '/admin/bookings': 'Bookings',
  '/admin/calendar': 'Calendar',
  '/admin/clients': 'Clients',
  '/admin/cleaners': 'Cleaners',
  '/admin/revenue': 'Revenue',
  '/admin/settings': 'Settings',
}

export default function AdminTopBar({ email }: { email: string }) {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? 'Dashboard'
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border px-6 py-3 flex items-center justify-between shadow-depth-1">
      <div>
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{today}</p>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="/admin/bookings"
          className="hidden sm:flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Booking
        </a>

        <div className="flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-1.5">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">{email.charAt(0).toUpperCase()}</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block max-w-[160px] truncate">{email}</span>
        </div>
      </div>
    </header>
  )
}
