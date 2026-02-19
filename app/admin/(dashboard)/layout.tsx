import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import SidebarNav from './SidebarNav'
import SignOutButton from './SignOutButton'
import AdminTopBar from './AdminTopBar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-background border-r border-border flex flex-col z-20 shadow-depth-1">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-base font-extrabold text-foreground">Ready Rental Cleaning</span>
            <span className="text-xs font-bold bg-secondary text-primary px-2 py-0.5 rounded-full ml-auto">
              Admin
            </span>
          </div>
        </div>

        {/* Nav */}
        <SidebarNav />

        {/* User + Sign Out */}
        <SignOutButton email={user.email ?? ''} />
      </aside>

      {/* Right side: top bar + content + footer */}
      <div className="pl-64 flex-1 flex flex-col min-h-screen">
        {/* Custom admin top bar */}
        <AdminTopBar email={user.email ?? ''} />

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Custom admin footer */}
        <footer className="border-t border-border bg-background px-6 py-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ready Rental Cleaning — Admin Portal
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="https://readyrentalcleaning.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              View Live Site →
            </a>
            <span>v2.3</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
