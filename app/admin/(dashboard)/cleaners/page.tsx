'use client'

import { useEffect, useState } from 'react'

interface Cleaner {
  id: string
  name: string
  phone: string
  email: string
  hourlyRate: number
  active: boolean
  notes?: string
  createdAt: string
  _count?: { bookings: number }
}

export default function CleanersPage() {
  const [cleaners, setCleaners] = useState<Cleaner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toggling, setToggling] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    hourlyRate: '18',
    notes: '',
  })

  useEffect(() => {
    fetchCleaners()
  }, [])

  const fetchCleaners = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/cleaners')
      if (res.ok) {
        const data = await res.json()
        setCleaners(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/cleaners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          hourlyRate: parseFloat(form.hourlyRate),
        }),
      })
      if (res.ok) {
        const newCleaner = await res.json()
        setCleaners((prev) => [newCleaner, ...prev])
        setForm({ name: '', phone: '', email: '', hourlyRate: '18', notes: '' })
        setShowForm(false)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (cleaner: Cleaner) => {
    setToggling(cleaner.id)
    try {
      const res = await fetch(`/api/admin/cleaners/${cleaner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !cleaner.active }),
      })
      if (res.ok) {
        setCleaners((prev) =>
          prev.map((c) => (c.id === cleaner.id ? { ...c, active: !c.active } : c))
        )
      }
    } catch (e) {
      console.error(e)
    } finally {
      setToggling(null)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Cleaners</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {cleaners.filter((c) => c.active).length} active ·{' '}
              {cleaners.filter((c) => !c.active).length} inactive
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Cleaner
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Add form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-teal-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">New Cleaner</h3>
            <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Maria Garcia"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone *</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="(310) 555-0100"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="maria@email.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.50"
                  value={form.hourlyRate}
                  onChange={(e) => setForm((f) => ({ ...f, hourlyRate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Notes</label>
                <input
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Optional notes..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl transition-all disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Add Cleaner'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cleaners table */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : cleaners.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-gray-400">No cleaners yet. Add your first cleaner above.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Contact</div>
              <div className="col-span-2 text-center">Rate/hr</div>
              <div className="col-span-2 text-center">Jobs</div>
              <div className="col-span-2 text-center">Status</div>
            </div>
            <div className="divide-y divide-gray-50">
              {cleaners.map((cleaner) => (
                <div key={cleaner.id} className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="col-span-3">
                    <p className="font-semibold text-sm text-gray-900">{cleaner.name}</p>
                    {cleaner.notes && (
                      <p className="text-xs text-gray-400 truncate">{cleaner.notes}</p>
                    )}
                  </div>
                  <div className="col-span-3">
                    <a
                      href={`mailto:${cleaner.email}`}
                      className="text-xs text-teal-600 hover:underline block truncate"
                    >
                      {cleaner.email}
                    </a>
                    <a href={`tel:${cleaner.phone}`} className="text-xs text-gray-500 block">
                      {cleaner.phone}
                    </a>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm font-bold text-gray-800">${cleaner.hourlyRate}/hr</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm font-bold text-gray-700">
                      {cleaner._count?.bookings ?? 0}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() => toggleActive(cleaner)}
                      disabled={toggling === cleaner.id}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
                        cleaner.active ? 'bg-teal-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          cleaner.active ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
