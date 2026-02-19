'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, LogOut, Link as LinkIcon, HelpCircle } from 'lucide-react'

export default function ReferrerDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  function handleLogout() {
    document.cookie = 'referrer_session=; path=/; max-age=0'
    router.push('/referrer/login')
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/referrer/dashboard" className="flex items-center gap-2 font-bold text-foreground text-sm">
              <LayoutDashboard className="w-4 h-4 text-primary" />
              <span>Ready<span className="text-primary">Rental</span> Referrals</span>
            </Link>
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <Link href="/referrer/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
              <Link href="/referral" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5" />
                Program Info
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                Help
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </nav>
      {children}
    </div>
  )
}
