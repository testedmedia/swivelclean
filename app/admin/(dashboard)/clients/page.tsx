'use client'

import { useEffect, useState, useMemo } from 'react'

interface Booking {
  id: string
  service: string
  scheduledDate: string
  status: string
  price: number
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  notes?: string
  createdAt: string
  bookings: Booking[]
}

const SERVICE_LABELS: Record<string, string> = {
  standard: 'Standard Turnover',
  premium: 'Premium Turnover',
  deep: 'Deep Clean',
}

const BLANK_CLIENT = { name: '', email: '', phone: '', address: '', notes: '' }

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [showNewClient, setShowNewClient] = useState(false)
  const [newClient, setNewClient] = useState(BLANK_CLIENT)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/clients')
      if (res.ok) {
        const data = await res.json()
        setClients(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    if (!search) return clients
    const q = search.toLowerCase()
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
    )
  }, [clients, search])

  const getClientStats = (client: Client) => {
    const totalSpent = client.bookings
      .filter((b) => b.status !== 'cancelled')
      .reduce((s, b) => s + b.price, 0)
    const lastBooking = client.bookings[0]
    return { totalSpent, lastBooking }
  }

  const createClient = async () => {
    setCreating(true)
    setCreateError('')
    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      })
      const data = await res.json()
      if (!res.ok) {
        setCreateError(data.error || 'Failed to create client')
      } else {
        setShowNewClient(false)
        setNewClient(BLANK_CLIENT)
        fetchClients()
      }
    } catch {
      setCreateError('Network error — try again')
    } finally {
      setCreating(false)
    }
  }

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Clients</h1>
            <p className="text-sm text-gray-500 mt-0.5">{clients.length} total clients</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-56">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={() => setShowNewClient(true)}
              className="flex items-center gap-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2.5 rounded-xl transition-all shadow-sm whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Client
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <div className="col-span-3">Client</div>
              <div className="col-span-3">Contact</div>
              <div className="col-span-2 text-center">Bookings</div>
              <div className="col-span-2 text-right">Total Spent</div>
              <div className="col-span-2 text-right">Last Booking</div>
            </div>

            {filtered.length === 0 ? (
              <div className="px-5 py-12 text-center text-gray-400">
                {search ? 'No clients match your search' : 'No clients yet'}
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map((client) => {
                  const { totalSpent, lastBooking } = getClientStats(client)
                  return (
                    <div key={client.id}>
                      {/* Row */}
                      <div
                        className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors items-center"
                        onClick={() => setExpanded(expanded === client.id ? null : client.id)}
                      >
                        <div className="col-span-3">
                          <p className="font-semibold text-gray-900 text-sm">{client.name}</p>
                          <p className="text-xs text-gray-400 truncate">{client.address}</p>
                        </div>
                        <div className="col-span-3">
                          <a
                            href={`mailto:${client.email}`}
                            className="text-xs text-teal-600 hover:underline block truncate"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {client.email}
                          </a>
                          <a
                            href={`tel:${client.phone}`}
                            className="text-xs text-gray-500 hover:text-teal-600 block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {client.phone}
                          </a>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="text-sm font-bold text-gray-900">
                            {client.bookings.length}
                          </span>
                        </div>
                        <div className="col-span-2 text-right">
                          <span className="text-sm font-bold text-teal-600">
                            ${totalSpent.toLocaleString()}
                          </span>
                        </div>
                        <div className="col-span-2 text-right">
                          <span className="text-xs text-gray-500">
                            {lastBooking ? fmtDate(lastBooking.scheduledDate) : '—'}
                          </span>
                        </div>
                      </div>

                      {/* Expanded */}
                      {expanded === client.id && (
                        <div className="px-5 py-5 bg-gray-50 border-t border-gray-100">
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                Contact
                              </p>
                              <div className="space-y-2">
                                <div className="flex gap-2">
                                  <a
                                    href={`mailto:${client.email}`}
                                    className="flex items-center gap-1.5 text-xs font-semibold bg-teal-50 text-teal-700 px-3 py-1.5 rounded-xl border border-teal-200 hover:bg-teal-100 transition-colors"
                                  >
                                    Email Client
                                  </a>
                                  <a
                                    href={`tel:${client.phone}`}
                                    className="flex items-center gap-1.5 text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-xl hover:bg-gray-200 transition-colors"
                                  >
                                    Call Client
                                  </a>
                                </div>
                                {client.notes && (
                                  <p className="text-xs text-gray-500 mt-2 bg-white rounded-xl px-3 py-2 border border-gray-100">
                                    📝 {client.notes}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                Booking History
                              </p>
                              {client.bookings.length === 0 ? (
                                <p className="text-xs text-gray-400">No bookings</p>
                              ) : (
                                <div className="space-y-2">
                                  {client.bookings.slice(0, 5).map((b) => (
                                    <div
                                      key={b.id}
                                      className="flex items-center justify-between text-xs bg-white px-3 py-2 rounded-xl border border-gray-100"
                                    >
                                      <span className="text-gray-600">
                                        {fmtDate(b.scheduledDate)}
                                      </span>
                                      <span className="text-gray-500">
                                        {SERVICE_LABELS[b.service] ?? b.service}
                                      </span>
                                      <span className="font-bold text-teal-600">${b.price}</span>
                                      <span
                                        className={`px-2 py-0.5 rounded-full font-bold ${
                                          b.status === 'completed'
                                            ? 'bg-green-100 text-green-700'
                                            : b.status === 'confirmed'
                                              ? 'bg-blue-100 text-blue-700'
                                              : b.status === 'cancelled'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-amber-100 text-amber-700'
                                        }`}
                                      >
                                        {b.status}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* New Client Modal */}
      {showNewClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">New Client</h2>
                <p className="text-xs text-gray-400 mt-0.5">Add a host to your client directory</p>
              </div>
              <button
                onClick={() => { setShowNewClient(false); setNewClient(BLANK_CLIENT); setCreateError('') }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={e => setNewClient(p => ({ ...p, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={e => setNewClient(p => ({ ...p, phone: e.target.value }))}
                    placeholder="(310) 555-0123"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Email *</label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={e => setNewClient(p => ({ ...p, email: e.target.value }))}
                    placeholder="jane@example.com"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Property Address</label>
                  <input
                    type="text"
                    value={newClient.address}
                    onChange={e => setNewClient(p => ({ ...p, address: e.target.value }))}
                    placeholder="1234 Sunset Blvd, West Hollywood, CA 90028"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Notes</label>
                  <textarea
                    value={newClient.notes}
                    onChange={e => setNewClient(p => ({ ...p, notes: e.target.value }))}
                    placeholder="Any special notes about this client..."
                    rows={2}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                </div>
              </div>

              {createError && (
                <p className="text-sm text-red-600 font-medium bg-red-50 border border-red-100 rounded-xl px-4 py-3">{createError}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setShowNewClient(false); setNewClient(BLANK_CLIENT); setCreateError('') }}
                  className="flex-1 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createClient}
                  disabled={creating || !newClient.name || !newClient.email || !newClient.phone}
                  className="flex-1 py-3 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? 'Creating...' : 'Add Client'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
