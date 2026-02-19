'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardCheck, CalendarDays, LayoutGrid, Users, UserCircle, DollarSign, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin/mission-board', label: 'Mission Board', icon: ClipboardCheck },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/admin/calendar', label: 'Calendar', icon: LayoutGrid },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/cleaners', label: 'Cleaners', icon: UserCircle },
  { href: '/admin/revenue', label: 'Revenue', icon: DollarSign },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all',
              isActive
                ? 'bg-secondary text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className={cn('w-4 h-4', isActive ? 'text-primary' : 'text-muted-foreground')} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
