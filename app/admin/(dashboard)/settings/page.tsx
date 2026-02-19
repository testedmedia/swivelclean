'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface AdminSettings {
  googleAccessToken?: string | null
  googleTokenExpiry?: string | null
}

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<AdminSettings | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [loadingSettings, setLoadingSettings] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState('')
  const [disconnecting, setDisconnecting] = useState(false)

  // Password change form
  const [pwForm, setPwForm] = useState({ newPassword: '', confirm: '' })
  const [pwMsg, setPwMsg] = useState('')
  const [pwSaving, setPwSaving] = useState(false)

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? '')
    })
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoadingSettings(true)
    try {
      const res = await fetch('/api/admin/settings')
      if (res.ok) {
        const data = await res.json()
        setSettings(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingSettings(false)
    }
  }

  const isGoogleConnected =
    settings?.googleAccessToken &&
    (!settings.googleTokenExpiry || new Date(settings.googleTokenExpiry) > new Date())

  const connectGoogle = () => {
    window.location.href = '/api/admin/calendar/auth'
  }

  const syncAll = async () => {
    setSyncing(true)
    setSyncResult('')
    try {
      const res = await fetch('/api/admin/calendar/sync-all', { method: 'POST' })
      const data = await res.json()
      setSyncResult(res.ok ? `✓ Synced ${data.count} upcoming bookings` : data.error || 'Sync failed')
    } catch {
      setSyncResult('Sync failed — check Google Calendar connection')
    } finally {
      setSyncing(false)
    }
  }

  const disconnectGoogle = async () => {
    setDisconnecting(true)
    try {
      await fetch('/api/admin/calendar/disconnect', { method: 'POST' })
      setSettings((s) => (s ? { ...s, googleAccessToken: null } : s))
    } catch (e) {
      console.error(e)
    } finally {
      setDisconnecting(false)
    }
  }

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirm) {
      setPwMsg('Passwords do not match')
      return
    }
    if (pwForm.newPassword.length < 8) {
      setPwMsg('Password must be at least 8 characters')
      return
    }
    setPwSaving(true)
    setPwMsg('')
    try {
      const supabase = createBrowserClient()
      const { error } = await supabase.auth.updateUser({ password: pwForm.newPassword })
      if (error) {
        setPwMsg(error.message)
      } else {
        setPwMsg('✓ Password updated successfully')
        setPwForm({ newPassword: '', confirm: '' })
      }
    } catch {
      setPwMsg('Failed to update password')
    } finally {
      setPwSaving(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-10">
        <h1 className="text-xl font-extrabold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Integrations & account management</p>
      </div>

      <div className="px-6 py-6 space-y-6 max-w-2xl">
        {/* Google Calendar Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" fill="#4285F4" />
                <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Google Calendar</h2>
              <p className="text-xs text-gray-500">Sync bookings to mom&apos;s calendar</p>
            </div>
          </div>

          {loadingSettings ? (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
              Loading...
            </div>
          ) : isGoogleConnected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm font-semibold text-green-700">Connected</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={syncAll}
                  disabled={syncing}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-60"
                >
                  {syncing ? 'Syncing...' : 'Sync All Upcoming'}
                </button>
                <button
                  onClick={disconnectGoogle}
                  disabled={disconnecting}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-xl border border-red-200 transition-all disabled:opacity-60"
                >
                  Disconnect
                </button>
              </div>
              {syncResult && (
                <p
                  className={`text-sm font-semibold ${
                    syncResult.startsWith('✓') ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {syncResult}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Connect your Google Calendar to automatically sync cleaning appointments.
              </p>
              <button
                onClick={connectGoogle}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Connect Google Calendar
              </button>
            </div>
          )}
        </div>

        {/* Account Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Account</h2>
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">Signed in as</p>
            <p className="text-sm font-semibold text-gray-800">{userEmail}</p>
          </div>

          <h3 className="text-sm font-bold text-gray-700 mb-3">Change Password</h3>
          <form onSubmit={changePassword} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">New Password</label>
              <input
                type="password"
                minLength={8}
                value={pwForm.newPassword}
                onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
                placeholder="Min. 8 characters"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={pwForm.confirm}
                onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                placeholder="Repeat new password"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            {pwMsg && (
              <p
                className={`text-xs font-semibold ${
                  pwMsg.startsWith('✓') ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {pwMsg}
              </p>
            )}
            <button
              type="submit"
              disabled={pwSaving}
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-60"
            >
              {pwSaving ? 'Saving...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
