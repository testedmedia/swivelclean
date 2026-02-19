'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

export default function SignOutButton({ email }: { email: string }) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="px-4 py-4 border-t border-border">
      <p className="text-xs text-muted-foreground truncate mb-2 font-medium">{email}</p>
      <button
        onClick={handleSignOut}
        className="w-full text-left text-xs font-semibold text-destructive hover:text-destructive/80 transition-colors flex items-center gap-1.5"
      >
        <LogOut className="w-3.5 h-3.5" />
        Sign Out
      </button>
    </div>
  )
}
