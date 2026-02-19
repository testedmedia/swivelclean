'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createBrowserClient } from '@/lib/supabase'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createBrowserClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    router.push('/admin/bookings')
    router.refresh()
  }

  const inputClasses =
    'w-full h-11 px-4 bg-muted/50 border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors text-sm'

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-cyan-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="w-full max-w-md"
      >
        <Card depth={3} className="overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
              className="mb-2 flex justify-center"
            >
              <svg className="w-10 h-10 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </motion.div>
            <h1 className="text-2xl font-extrabold text-primary-foreground">Ready Rental Cleaning</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">Admin Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClasses}
                placeholder="admin@readyrentalcleaning.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClasses}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
              >
                <p className="text-sm text-destructive font-medium">{error}</p>
              </motion.div>
            )}

            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Ready Rental Cleaning Admin — Authorized access only
        </p>
      </motion.div>
    </div>
  )
}
