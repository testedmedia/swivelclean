'use client'

import { useState } from 'react'

function CopyBox({ label, content, note }: { label: string; content: string; note?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-gray-700/60">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/90" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/90" />
            <div className="w-3 h-3 rounded-full bg-green-400/90" />
          </div>
          <span className="text-xs font-semibold text-gray-300 tracking-widest uppercase">{label}</span>
        </div>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30">
          {copied ? (
            <><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Copied!</>
          ) : (
            <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
          )}
        </button>
      </div>
      {note && <div className="px-5 py-2.5 bg-amber-950/60 border-b border-amber-900/40 text-xs text-amber-400 italic">{note}</div>}
      <pre className="bg-gray-900 text-gray-300 px-5 py-4 text-sm leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
        {content}
      </pre>
    </div>
  )
}

function EmailPreview({ subject, preview, tag, children }: { subject: string; preview: string; tag: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mb-4 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <button onClick={() => setOpen(!open)} className="w-full text-left hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-4 px-5 py-4 bg-white">
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">R</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-sm font-bold text-gray-900">Ready Rental Cleaning</span>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full font-semibold">{tag}</span>
                <span className="text-xs text-gray-400">auto-sends</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-800 truncate">{subject}</p>
            <p className="text-xs text-gray-400 truncate">{preview}</p>
          </div>
          <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </button>
      {open && (
        <div className="border-t border-gray-100">
          <div className="bg-teal-600 px-8 py-5 text-center">
            <p className="text-white font-extrabold text-xl tracking-widest">READY RENTAL CLEANING</p>
            <p className="text-teal-200 text-xs mt-0.5">Airbnb Turnover Specialists · Los Angeles, CA</p>
          </div>
          <div className="bg-white px-8 py-7">{children}</div>
          <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Ready Rental Cleaning · hello@readyrentalcleaning.com · (323) 555-0100</p>
            <p className="text-xs text-gray-400 mt-1">You&apos;re receiving this because you booked at readyrentalcleaning.com · Unsubscribe</p>
          </div>
        </div>
      )}
    </div>
  )
}

const icons = {
  chart: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  dollar: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  target: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth={2}/><circle cx="12" cy="12" r="6" strokeWidth={2}/><circle cx="12" cy="12" r="2" strokeWidth={2}/></svg>,
  gear: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  calendar: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  megaphone: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
  clipboard: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  trending: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  refresh: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  pain: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  check: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>,
  arrow: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
  box: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  shield: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  users: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  market: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>,
}

export default function BusinessPlan() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: icons.chart },
    { id: 'financials', label: 'Financials', icon: icons.dollar },
    { id: 'market', label: 'Market', icon: icons.target },
    { id: 'operations', label: 'Operations', icon: icons.gear },
    { id: 'timeline', label: '90-Day Plan', icon: icons.calendar },
    { id: 'marketing', label: 'Marketing', icon: icons.megaphone },
    { id: 'legal', label: 'Legal', icon: icons.clipboard },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero section-padding-lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge mb-6">Business Plan</div>
          <h1 className="heading-xl mb-6">
            The Ready Rental Cleaning{' '}
            <span className="text-teal-600">Business Plan</span>
          </h1>
          <p className="subtext max-w-2xl mx-auto mb-10">
            How we hit <span className="font-bold text-teal-600">$10,000 in Month 1</span> and scale to{' '}
            <span className="font-bold text-teal-600">$40,000+ by Month 4</span> — built on real LA market data.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Month 1 Target', value: '$10K' },
              { label: 'Month 4 Target', value: '$40K' },
              { label: 'Gross Margin', value: '60–70%' },
              { label: 'LA STR Market', value: '15K+' },
            ].map((m, i) => (
              <div key={i} className="glass p-5 shadow-sm">
                <div className="text-2xl font-extrabold text-teal-600">{m.value}</div>
                <div className="text-xs text-gray-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
                  <h3 className="text-xl font-bold text-teal-800 mb-5">The Opportunity</h3>
                  <ul className="space-y-4">
                    {[
                      ['15,000+', 'active Airbnb listings in Greater LA'],
                      ['5–10x', 'average turnovers per property per year'],
                      ['$150–220', 'per cleaning in premium LA neighborhoods'],
                      ['$1,000–2,000', 'average annual spend per property on cleaning'],
                      ['High pain point', 'hosts lose revenue on bad or missed cleanings'],
                    ].map(([bold, rest], i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-teal-500 mt-0.5 flex-shrink-0">{icons.arrow}</span>
                        <span><strong className="text-teal-800">{bold}</strong> {rest}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-blue-800 mb-5">Our Competitive Advantage</h3>
                  <ul className="space-y-4">
                    {[
                      ['60-second booking', 'no phone calls, no emails, instant confirmation'],
                      ['Same-week service', 'often same-day for emergency turnovers'],
                      ['Photo documentation', 'before/after photos after every clean'],
                      ['Dedicated cleaners', 'assigned per property for consistency'],
                      ['100% guarantee', 'free re-clean if not satisfied, no questions'],
                    ].map(([bold, rest], i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-blue-500 mt-0.5 flex-shrink-0">{icons.arrow}</span>
                        <span><strong className="text-blue-800">{bold}</strong> — {rest}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="heading-md mb-6">Why Ready Rental Cleaning Wins</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: 'Pain Point is Real', desc: 'Every Airbnb host in LA has a cleaning horror story — no-shows, bad quality, last-minute cancellations. We solve this completely.', icon: icons.pain },
                    { title: 'Market is Massive', desc: '15,000+ LA listings each needing 5–10 turnovers/year = 75,000–150,000 cleaning jobs per year in LA alone.', icon: icons.trending },
                    { title: 'Recurring Revenue', desc: 'One happy host books monthly. 20 monthly clients at $180/each = $3,600 guaranteed MRR before we even pick up the phone.', icon: icons.refresh },
                  ].map((item, i) => (
                    <div key={i} className="card p-6">
                      <div className="text-teal-600 mb-3">{item.icon}</div>
                      <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FINANCIALS */}
          {activeTab === 'financials' && (
            <div className="space-y-12">
              <div>
                <h2 className="heading-lg mb-8">Revenue Projections</h2>
                <div className="grid md:grid-cols-4 gap-4 mb-10">
                  {[
                    { month: 'Month 1', jobs: 50, revenue: '$9,700', margin: '60%', profit: '$5,820', highlight: false },
                    { month: 'Month 2', jobs: 100, revenue: '$18,000', margin: '65%', profit: '$11,700', highlight: false },
                    { month: 'Month 3', jobs: 150, revenue: '$27,000', margin: '68%', profit: '$18,360', highlight: false },
                    { month: 'Month 4', jobs: 200, revenue: '$40,000', margin: '70%', profit: '$28,000', highlight: true },
                  ].map((p, i) => (
                    <div key={i} className={`rounded-2xl p-6 border ${p.highlight ? 'bg-teal-600 text-white border-teal-500' : 'bg-gray-50 border-gray-200'}`}>
                      <div className={`font-bold text-lg mb-4 ${p.highlight ? 'text-teal-100' : 'text-gray-700'}`}>{p.month}</div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className={p.highlight ? 'text-teal-200' : 'text-gray-500'}>Jobs</div>
                          <div className={`font-bold text-lg ${p.highlight ? 'text-white' : 'text-gray-900'}`}>{p.jobs}</div>
                        </div>
                        <div>
                          <div className={p.highlight ? 'text-teal-200' : 'text-gray-500'}>Revenue</div>
                          <div className={`font-bold text-2xl ${p.highlight ? 'text-white' : 'text-teal-600'}`}>{p.revenue}</div>
                        </div>
                        <div>
                          <div className={p.highlight ? 'text-teal-200' : 'text-gray-500'}>Margin</div>
                          <div className={`font-bold ${p.highlight ? 'text-white' : 'text-gray-900'}`}>{p.margin}</div>
                        </div>
                        <div>
                          <div className={p.highlight ? 'text-teal-200' : 'text-gray-500'}>Net Profit</div>
                          <div className={`font-bold ${p.highlight ? 'text-teal-100' : 'text-green-600'}`}>{p.profit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="heading-md mb-6">Month 1 Breakdown — Path to $10,000</h3>
                <div className="card overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-4 font-bold text-gray-700">Service</th>
                        <th className="text-right px-6 py-4 font-bold text-gray-700">Jobs</th>
                        <th className="text-right px-6 py-4 font-bold text-gray-700">Price</th>
                        <th className="text-right px-6 py-4 font-bold text-gray-700">Revenue</th>
                        <th className="text-right px-6 py-4 font-bold text-gray-700">Margin (60%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { service: 'Standard Turnover (1-2 BR)', jobs: 35, price: '$180', revenue: '$6,300', margin: '$3,780' },
                        { service: 'Premium Turnover (3+ BR)', jobs: 5, price: '$225', revenue: '$1,125', margin: '$675' },
                        { service: 'Deep Clean', jobs: 10, price: '$295', revenue: '$2,950', margin: '$1,770' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{row.service}</td>
                          <td className="px-6 py-4 text-right text-gray-600">{row.jobs}</td>
                          <td className="px-6 py-4 text-right text-gray-600">{row.price}</td>
                          <td className="px-6 py-4 text-right font-bold text-gray-900">{row.revenue}</td>
                          <td className="px-6 py-4 text-right text-green-600 font-semibold">{row.margin}</td>
                        </tr>
                      ))}
                      <tr className="bg-teal-50 font-bold">
                        <td className="px-6 py-4 text-teal-800">TOTAL</td>
                        <td className="px-6 py-4 text-right text-teal-800">50</td>
                        <td className="px-6 py-4 text-right"></td>
                        <td className="px-6 py-4 text-right text-teal-700 text-lg">$10,375</td>
                        <td className="px-6 py-4 text-right text-green-700 text-lg">$6,225</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="heading-md mb-6">Monthly Operating Costs</h3>
                <div className="card overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-4 font-bold text-gray-700">Expense</th>
                        <th className="text-right px-6 py-4 font-bold text-gray-700">Month 1</th>
                        <th className="text-right px-6 py-4 font-bold text-gray-700">Month 4</th>
                        <th className="text-left px-6 py-4 font-bold text-gray-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { expense: 'Cleaner Labor', m1: '$3,200', m4: '$10,400', notes: '1 cleaner → 4 cleaners @ $18–22/hr' },
                        { expense: 'Cleaning Supplies', m1: '$200', m4: '$600', notes: 'Professional grade, eco-friendly' },
                        { expense: 'Insurance (GL)', m1: '$50', m4: '$50', notes: '$2M coverage via Thimble.com' },
                        { expense: 'Website / Software', m1: '$30', m4: '$30', notes: 'Hosting + booking system' },
                        { expense: 'Marketing', m1: '$200', m4: '$500', notes: 'Ads, social, outreach' },
                        { expense: 'Misc / Buffer', m1: '$150', m4: '$300', notes: 'Gas, unexpected expenses' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{row.expense}</td>
                          <td className="px-6 py-4 text-right text-red-600 font-semibold">{row.m1}</td>
                          <td className="px-6 py-4 text-right text-red-600 font-semibold">{row.m4}</td>
                          <td className="px-6 py-4 text-gray-500 text-xs">{row.notes}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-bold">
                        <td className="px-6 py-4 text-gray-700">TOTAL COSTS</td>
                        <td className="px-6 py-4 text-right text-red-700">$3,830</td>
                        <td className="px-6 py-4 text-right text-red-700">$11,880</td>
                        <td className="px-6 py-4"></td>
                      </tr>
                      <tr className="bg-green-50 font-bold">
                        <td className="px-6 py-4 text-green-800">NET PROFIT</td>
                        <td className="px-6 py-4 text-right text-green-700 text-lg">$6,545</td>
                        <td className="px-6 py-4 text-right text-green-700 text-lg">$28,120</td>
                        <td className="px-6 py-4 text-green-600 text-xs">~63% → 70% margin</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MARKET */}
          {activeTab === 'market' && (
            <div className="space-y-12">
              <div>
                <h2 className="heading-lg mb-8">Market Analysis</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  {[
                    { stat: '15,000+', label: 'Active LA Airbnb Listings', desc: 'Growing 12% year over year' },
                    { stat: '$1.2B', label: 'Annual Cleaning Spend in LA STRs', desc: 'Avg $1,500/property/year × 15,000 listings' },
                    { stat: '2.1%', label: 'Market Share = $10K/month', desc: 'We only need a tiny slice to hit targets' },
                  ].map((s, i) => (
                    <div key={i} className="card p-8 text-center">
                      <div className="text-4xl font-extrabold text-teal-600 mb-2">{s.stat}</div>
                      <div className="font-bold text-gray-900 mb-1 text-sm">{s.label}</div>
                      <div className="text-xs text-gray-500">{s.desc}</div>
                    </div>
                  ))}
                </div>

                <h3 className="heading-md mb-6">Target Neighborhoods — Phase 1</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  {[
                    { area: 'West Hollywood', listings: '2,000+', avg: '$200–220/clean', opportunity: 'High density STRs, premium pricing, close proximity for cleaners' },
                    { area: 'Venice / Santa Monica', listings: '1,800+', avg: '$180–210/clean', opportunity: 'Beach premium. High-value guests = high-value cleans, consistent demand' },
                    { area: 'Silver Lake / Los Feliz', listings: '1,200+', avg: '$165–190/clean', opportunity: 'Trendy, growing area. Lots of young hosts who want easy online booking' },
                    { area: 'Downtown LA', listings: '1,500+', avg: '$170–200/clean', opportunity: 'Corporate rentals + tourist traffic = frequent turnovers, high volume' },
                  ].map((n, i) => (
                    <div key={i} className="card p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-gray-900">{n.area}</h4>
                        <div className="text-teal-600 font-bold text-sm">{n.avg}</div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{n.listings} listings</div>
                      <p className="text-xs text-gray-500">{n.opportunity}</p>
                    </div>
                  ))}
                </div>

                <h3 className="heading-md mb-6">Competitive Landscape — LA Market 2026</h3>
                <div className="card overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-4 font-bold text-gray-700">Competitor</th>
                        <th className="text-right px-6 py-4 font-bold text-gray-700">Price Range</th>
                        <th className="text-right px-6 py-4 font-bold text-gray-700">Online Booking</th>
                        <th className="text-right px-6 py-4 font-bold text-gray-700">Photos</th>
                        <th className="text-left px-6 py-4 font-bold text-gray-700">Weakness</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { name: 'Handy', price: '$100–160', booking: 'Yes', photos: 'No', edge: 'No STR focus, quality inconsistent' },
                        { name: 'MaidThis LA', price: '$120–180', booking: 'Yes', photos: 'No', edge: 'Referral model, no dedicated cleaner' },
                        { name: 'Rocket Maids LA', price: '$110–220', booking: 'Yes', photos: 'No', edge: 'Hourly billing, unpredictable cost' },
                        { name: 'Turno Marketplace', price: '$100–180', booking: 'Yes', photos: 'Sometimes', edge: 'Marketplace, not a dedicated service' },
                        { name: 'Local / Craigslist', price: '$80–140', booking: 'No', photos: 'No', edge: 'Uninsured, unreliable, no system' },
                        { name: 'Ready Rental Cleaning', price: '$180–295', booking: 'Yes 60s', photos: 'Every clean', edge: 'Premium — justified by quality + guarantee' },
                      ].map((row, i) => (
                        <tr key={i} className={i === 5 ? 'bg-teal-50 font-bold' : 'hover:bg-gray-50'}>
                          <td className="px-6 py-4 font-medium text-gray-900">{i === 5 ? `✦ ${row.name}` : row.name}</td>
                          <td className="px-6 py-4 text-right text-gray-600">{row.price}</td>
                          <td className="px-6 py-4 text-right">{row.booking}</td>
                          <td className="px-6 py-4 text-right">{row.photos}</td>
                          <td className="px-6 py-4 text-xs text-gray-500">{row.edge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* OPERATIONS */}
          {activeTab === 'operations' && (
            <div className="space-y-12">
              <div>
                <h2 className="heading-lg mb-8">Operational Infrastructure</h2>

                <h3 className="heading-md mb-6">Team Structure — Month 1</h3>
                <div className="space-y-4 mb-10">
                  {[
                    { role: 'Operations Manager (Founder)', type: 'Sweat equity', pay: '$0', desc: 'Handles bookings, client communication, scheduling, cleaner coordination, admin dashboard' },
                    { role: 'Cleaner #1', type: 'Independent contractor (1099)', pay: '$18–22/hr (~$160/day)', desc: 'Full-time cleaner. Trained on Ready Rental Cleaning standards. Background checked. Assigned to primary service area.' },
                    { role: 'Cleaner #2', type: 'Add in Month 2', pay: '$18–22/hr (~$160/day)', desc: 'Added when volume exceeds 12–15 jobs/week. Enables double-booking and larger service radius.' },
                  ].map((member, i) => (
                    <div key={i} className="card p-6 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{member.role}</h4>
                        <p className="text-xs text-gray-500 mb-2">{member.type}</p>
                        <p className="text-sm text-gray-600">{member.desc}</p>
                      </div>
                      <div className="bg-teal-50 rounded-xl px-4 py-3 text-center flex-shrink-0">
                        <div className="text-teal-700 font-bold text-sm">{member.pay}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="heading-md mb-6">Booking to Completion Workflow</h3>
                <div className="space-y-4 mb-12">
                  {[
                    { phase: 'Booking — 60 seconds', color: 'teal', steps: ['Host visits readyrentalcleaning.com', 'Enters address, selects service, picks date/time', 'Pays securely via Stripe', 'Instant confirmation email + calendar invite sent', 'Booking visible in admin dashboard'] },
                    { phase: '24 Hours Before', color: 'blue', steps: ['Cleaner receives text + email: address, access code, job checklist', 'Cleaner confirms availability', 'Host receives reminder: cleaner name, arrival time, contact number', 'Any last-minute notes from host captured'] },
                    { phase: 'Day of Cleaning', color: 'green', steps: ['Cleaner arrives on time (10 min early)', 'Uses standard Ready Rental Cleaning checklist throughout', 'Photos taken before and after cleaning', 'Any issues (damage, missing supplies) reported immediately'] },
                    { phase: 'Post-Cleaning — Within 2 Hours', color: 'purple', steps: ['Before/after photos uploaded', 'Job marked complete in dashboard', 'Host receives completion email + photo report', 'Invoice generated automatically', 'Review request sent (Google link)', 'Cleaner paid via ACH next business day'] },
                  ].map((phase, i) => (
                    <div key={i} className={`rounded-2xl p-6 border-l-4 ${
                      phase.color === 'teal' ? 'border-teal-500 bg-teal-50' :
                      phase.color === 'blue' ? 'border-blue-500 bg-blue-50' :
                      phase.color === 'green' ? 'border-green-500 bg-green-50' :
                      'border-purple-500 bg-purple-50'
                    }`}>
                      <h4 className={`font-bold mb-3 text-${phase.color}-800`}>{phase.phase}</h4>
                      <ul className="space-y-2">
                        {phase.steps.map((step, j) => (
                          <li key={j} className="text-sm text-gray-700 flex gap-2">
                            <span className={`text-${phase.color}-500 font-bold flex-shrink-0`}>{j + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* HIRING CLEANERS */}
              <div>
                <h3 className="heading-md mb-2">How to Find & Hire Cleaners</h3>
                <p className="text-sm text-gray-500 mb-6">Only hire people you can trust in a stranger&apos;s home. Background check every single one — no exceptions.</p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    { platform: 'Indeed', url: 'https://www.indeed.com/job/post', label: 'Post Free Job', color: 'bg-blue-50 border-blue-200', note: 'Largest reach. Title: "Airbnb Turnover Cleaner — $18-22/hr, Flexible Hours, West Hollywood/LA"' },
                    { platform: 'Facebook Marketplace', url: 'https://www.facebook.com/marketplace/create/job', label: 'Post Job Listing', color: 'bg-indigo-50 border-indigo-200', note: 'Free. Search local cleaning groups. Post in "Los Angeles Jobs" and "South Bay Jobs".' },
                    { platform: 'Craigslist', url: 'https://losangeles.craigslist.org/d/domestic-gig-workers-wanted/search/hss', label: 'Post on Craigslist', color: 'bg-purple-50 border-purple-200', note: '$10–25 per ad. Under "Domestic Gig Workers Wanted". Gets applications fast.' },
                  ].map((site, i) => (
                    <div key={i} className={`rounded-2xl p-6 border ${site.color}`}>
                      <h4 className="font-bold text-gray-900 mb-2">{site.platform}</h4>
                      <p className="text-xs text-gray-500 mb-4 leading-relaxed">{site.note}</p>
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:shadow-sm transition-all">
                        {site.label}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </div>
                  ))}
                </div>

                <CopyBox label="Job Post — Copy & Paste to Indeed / Facebook / Craigslist" content={`TITLE: Airbnb Turnover Cleaner — $18-22/hr, Flexible Hours, West Hollywood / LA

About the role:
Ready Rental Cleaning is a professional Airbnb turnover cleaning service in Los Angeles. We handle deep cleaning between guest checkouts for short-term rental hosts.

This is a 1099 independent contractor position. Set your own schedule. Work as many or as few jobs as you want.

PAY: $18–22/hr (based on experience) — paid weekly via direct deposit
HOURS: Flexible, mostly 9AM–5PM weekdays + weekends
LOCATION: West Hollywood, Venice, Santa Monica, Silver Lake, and surrounding LA neighborhoods

What you'll do:
- Clean and prepare Airbnb/short-term rental apartments between guest stays
- Change all bed linens and make beds hotel-style
- Deep clean bathrooms, kitchen, and all surfaces
- Vacuum, mop, and take out trash
- Take before/after photos on your phone after every cleaning
- Restock supplies (soap, toilet paper, etc.)

Requirements:
- Must have reliable transportation (you'll drive to properties)
- Must be able to pass a background check
- Must have a smartphone
- Prior cleaning or housekeeping experience preferred but not required
- Must be detail-oriented and take pride in your work
- Must be comfortable with hotel-style standards

To apply:
Reply with: your name, neighborhood you live in, and your availability.
We'll schedule a quick 15-minute phone call and do a paid trial clean before hiring.

We pay weekly. No contracts. Flexible schedule. Serious applicants only.
Questions? Text (323) 555-0100`} />

                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-6">
                  <h4 className="font-bold text-red-900 mb-3">Background Check — Mandatory Before First Job</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { name: 'Checkr', url: 'https://checkr.com', desc: 'Industry standard. $25–35/check. Fast turnaround (24–48h). Used by Uber, Airbnb, DoorDash.' },
                      { name: 'Sterling', url: 'https://www.sterlingcheck.com', desc: '$30–50/check. More comprehensive. Good for recurring employees.' },
                      { name: 'GoodHire', url: 'https://www.goodhire.com', desc: '$29.99/check. Simple dashboard. Good for small businesses hiring a few people.' },
                    ].map((bg, i) => (
                      <a key={i} href={bg.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl p-4 border border-red-100 hover:shadow-sm transition-all">
                        <p className="font-bold text-gray-900 text-sm mb-1">{bg.name}</p>
                        <p className="text-xs text-gray-500">{bg.desc}</p>
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-red-700 mt-4 font-semibold">Never skip the background check. You are sending someone into a stranger&apos;s home. No exceptions.</p>
                </div>
              </div>

              {/* CLEANER SOP & CHECKLIST */}
              <div>
                <h3 className="heading-md mb-2">Cleaner SOP — Standard Operating Procedure</h3>
                <p className="text-sm text-gray-500 mb-6">Every cleaner follows this exactly, every time. No improvising. This is what gets you 5-star reviews.</p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {[
                    {
                      phase: 'Arrival (Before You Start)',
                      color: 'bg-blue-50 border-blue-200',
                      headerColor: 'text-blue-800',
                      steps: [
                        'Arrive 10 minutes early — never be late',
                        'Take BEFORE photos of EVERY room before touching anything',
                        'Check checklist for any special notes from the host',
                        'Text your manager: "Arrived at [address] at [time]"',
                        'Start timer on your phone',
                      ],
                    },
                    {
                      phase: 'Bedroom (Every Bedroom)',
                      color: 'bg-teal-50 border-teal-200',
                      headerColor: 'text-teal-800',
                      steps: [
                        'Strip all linens — pillowcases, sheets, duvet covers',
                        'Make bed hotel-style: tight corners, pillows stacked neatly',
                        'Dust headboard, nightstands, lamps, ceiling fan',
                        'Wipe down mirrors, windows, baseboards',
                        'Vacuum all floors including under bed',
                        'Empty trash, replace liner',
                        'Check closet — remove any guest items left behind',
                      ],
                    },
                    {
                      phase: 'Bathroom (Every Bathroom)',
                      color: 'bg-purple-50 border-purple-200',
                      headerColor: 'text-purple-800',
                      steps: [
                        'Scrub toilet inside, outside, around base with disinfectant',
                        'Scrub sink, faucet, soap dish',
                        'Clean mirror — no streaks',
                        'Scrub shower/tub — no soap scum, no hair',
                        'Wipe down walls, door, fixtures',
                        'Mop floor with disinfectant',
                        'Restock: toilet paper (2 rolls), hand soap, shampoo, body wash',
                        'Fold towels hotel-style, hang on rack',
                        'Empty trash, replace liner',
                      ],
                    },
                    {
                      phase: 'Kitchen',
                      color: 'bg-green-50 border-green-200',
                      headerColor: 'text-green-800',
                      steps: [
                        'Empty and clean sink — no dishes left',
                        'Wipe all countertops, backsplash, stovetop',
                        'Clean microwave inside and outside',
                        'Wipe all appliance exteriors (fridge, dishwasher, oven)',
                        'Empty trash, replace liner',
                        'Sweep and mop floor',
                        'Check fridge — remove any guest food, wipe shelves',
                        'Restock: dish soap, sponge, paper towels if low',
                      ],
                    },
                    {
                      phase: 'Living Areas & Common Spaces',
                      color: 'bg-amber-50 border-amber-200',
                      headerColor: 'text-amber-800',
                      steps: [
                        'Dust all surfaces, shelves, decor, TV screen',
                        'Wipe down remote controls with disinfectant wipe',
                        'Fluff and arrange couch pillows and throws',
                        'Vacuum couch and under couch cushions',
                        'Vacuum carpet or mop hard floors',
                        'Check for guest items left behind — set aside',
                        'Close all blinds/curtains to guest preference',
                      ],
                    },
                    {
                      phase: 'Completion (After Every Clean)',
                      color: 'bg-gray-50 border-gray-200',
                      headerColor: 'text-gray-800',
                      steps: [
                        'Do a final walkthrough — every room, every surface',
                        'Take AFTER photos of EVERY room',
                        'Text manager: "Done at [address] at [time]. Photos uploading."',
                        'Upload all before/after photos immediately',
                        'Report any damage, missing items, or issues immediately',
                        'Lock up per host instructions — never leave door unlocked',
                        'Do NOT take anything from the property — ever',
                      ],
                    },
                  ].map((section, i) => (
                    <div key={i} className={`rounded-2xl p-6 border ${section.color}`}>
                      <h4 className={`font-bold mb-4 ${section.headerColor}`}>{section.phase}</h4>
                      <ul className="space-y-2">
                        {section.steps.map((step, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Anti-Theft */}
                <div className="bg-gray-900 rounded-2xl p-8 text-white mb-8">
                  <h4 className="font-bold text-xl mb-2 text-white">Anti-Theft & Security Protocol</h4>
                  <p className="text-gray-400 text-sm mb-6">This protects you, your clients, and your business. Non-negotiable.</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: 'Before the first job',
                        items: [
                          'Signed 1099 contractor agreement on file',
                          'Photo ID on file (driver\'s license)',
                          'Background check passed (Checkr or equivalent)',
                          'Emergency contact on file',
                          'Verbal walkthrough of theft/damage policy',
                        ],
                      },
                      {
                        title: 'Every single job',
                        items: [
                          'Before photos of entire property before touching anything',
                          'Manager notified on arrival AND departure',
                          'Cleaners never access areas not listed in checklist',
                          'Never let cleaners bring bags inside (backpacks, purses)',
                          'Any item found must be photographed and reported immediately',
                        ],
                      },
                      {
                        title: 'If something goes missing',
                        items: [
                          'Pull arrival/departure photos immediately',
                          'Do NOT accuse — ask cleaner to review their before photos',
                          'Check if guest took it (most "missing" items were guest mistakes)',
                          'If theft confirmed: terminate immediately, report to Checkr',
                          'Your $2M insurance covers damage — theft is a cleaner liability issue',
                        ],
                      },
                      {
                        title: 'Red flags — terminate immediately',
                        items: [
                          'Cleaner found in rooms not part of the job',
                          'Cleaner using/touching client personal items',
                          'Missing before/after photos (means they didn\'t document)',
                          'Complaints from 2+ clients about the same cleaner',
                          'Cleaner giving client their personal number directly',
                        ],
                      },
                    ].map((block, i) => (
                      <div key={i}>
                        <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">{block.title}</p>
                        <ul className="space-y-2">
                          {block.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="text-teal-500 font-bold flex-shrink-0 mt-0.5">—</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <CopyBox label="Cleaner Onboarding Script — Read this to every new hire on day 1" content={`READY RENTAL CLEANING CLEANER STANDARDS — READ BEFORE YOUR FIRST JOB

Welcome to Ready Rental Cleaning. Here's what I need you to know:

1. PHOTOS ARE MANDATORY
Before you touch anything in the property, take photos of every room.
After you finish every room, take photos.
No photos = no pay. This protects both of us.

2. THE CHECKLIST IS NOT OPTIONAL
Everything on the checklist gets done, every time.
If you're not sure how to do something, text me before you skip it.

3. NEVER TAKE ANYTHING
Even if it looks like trash. Even if it's in the way. Photo it and text me.
Clients count their items. If it's missing after you were there, you are responsible.

4. COMMUNICATION
Text me when you arrive: "Arrived at [address] at [time]"
Text me when done: "Done at [address] at [time]"
If anything is wrong — damage, missing supplies, weird situation — text me IMMEDIATELY.

5. NEVER GIVE CLIENTS YOUR PERSONAL NUMBER
All communication goes through me. If a client asks for your number, say "everything goes through Ready Rental Cleaning."

6. YOU REPRESENT THIS BUSINESS
How you clean directly determines if we get a 5-star review or a complaint.
I need hotel-level quality every single time.

If you can do this consistently, you will always have work and I will always pay you on time.
Any questions?`} />
              </div>
            </div>
          )}

          {/* TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-8">
              <h2 className="heading-lg mb-8">90-Day Launch &amp; Growth Plan</h2>
              {[
                {
                  period: 'Week 1 — Legal &amp; Setup',
                  color: 'teal',
                  target: 'Foundation',
                  tasks: [
                    'File DBA or LLC with CA Secretary of State ($70–100, 1–3 business days)',
                    'Get EIN free from IRS.gov — takes 5 minutes online',
                    'Open Mercury business bank account — free, no minimum, 1 day',
                    'Get general liability insurance via Thimble.com ($50/month, same-day)',
                    'Set up Stripe for payment processing',
                    'Launch readyrentalcleaning.com website',
                    'Sign 1099 contractor agreement with first cleaner',
                  ],
                },
                {
                  period: 'Week 2–3 — First Clients',
                  color: 'blue',
                  target: '$2,500/week (14 turnovers)',
                  tasks: [
                    'Post in 5 LA Airbnb host Facebook groups (see Marketing tab for exact copy)',
                    'Post on Nextdoor in 3 target neighborhoods',
                    'List profile on Turno (TurnoverBnB) marketplace',
                    'Offer 2 free cleanings to generate first reviews and photos',
                    'Ask every client for a Google review immediately after service',
                    'Target: 14–15 turnovers/week by end of week 3',
                  ],
                },
                {
                  period: 'Month 2 — Scale Phase 1',
                  color: 'green',
                  target: '$18,000 revenue',
                  tasks: [
                    'Hire cleaner #2 (now handling 25–30 jobs/week between 2 people)',
                    'Launch Google Business Profile — add photos, get more reviews',
                    'Deep clean upsell email to all existing clients',
                    'Reach 40+ Google reviews (4.8+ rating goal)',
                    'Begin cold outreach to property managers with 3+ units',
                    'Analyze which neighborhoods and services are most profitable',
                  ],
                },
                {
                  period: 'Month 3 — Property Manager Push',
                  color: 'purple',
                  target: '$27,000 revenue',
                  tasks: [
                    'Cold email 50 property managers with 5+ short-term rentals',
                    'Offer: dedicated cleaner package + volume discount ($155/turnover at 5+/month)',
                    '1–2 property manager contracts = $4,000–$8,000 guaranteed MRR',
                    'Hire cleaner #3 — dedicated to property manager accounts',
                    'Collect 100+ Google reviews goal',
                  ],
                },
                {
                  period: 'Month 4 — Full Scale',
                  color: 'orange',
                  target: '$40,000+ revenue',
                  tasks: [
                    '4 cleaners, 200+ turnovers per month',
                    'Premium property focus: West Hollywood, Santa Monica, Beverly Hills',
                    'Dedicated account manager assigned to property managers',
                    'Begin regional expansion planning: Pasadena, Long Beach, Glendale',
                    'Monthly retainer packages for property managers (guaranteed slots)',
                    'Year 1 goal: $400,000 annual revenue',
                  ],
                },
              ].map((phase, i) => (
                <div key={i} className={`rounded-2xl p-8 border-l-4 ${
                  phase.color === 'teal' ? 'border-teal-500 bg-teal-50' :
                  phase.color === 'blue' ? 'border-blue-500 bg-blue-50' :
                  phase.color === 'green' ? 'border-green-500 bg-green-50' :
                  phase.color === 'purple' ? 'border-purple-500 bg-purple-50' :
                  'border-orange-500 bg-orange-50'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                    <h3 className="text-xl font-bold text-gray-900" dangerouslySetInnerHTML={{ __html: phase.period }} />
                    <div className={`badge ${
                      phase.color === 'teal' ? '!bg-teal-100 !text-teal-700 !border-teal-200' :
                      phase.color === 'blue' ? '!bg-blue-100 !text-blue-700 !border-blue-200' :
                      phase.color === 'green' ? '!bg-green-100 !text-green-700 !border-green-200' :
                      phase.color === 'purple' ? '!bg-purple-100 !text-purple-700 !border-purple-200' :
                      '!bg-orange-100 !text-orange-700 !border-orange-200'
                    }`}>
                      Target: {phase.target}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {phase.tasks.map((task, j) => (
                      <li key={j} className="flex gap-3 text-sm text-gray-700">
                        <span className="text-gray-400 flex-shrink-0 mt-0.5">{icons.box}</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* MARKETING */}
          {activeTab === 'marketing' && (
            <div className="space-y-16">

              {/* POSTING SCHEDULE */}
              <div>
                <h2 className="heading-lg mb-2">Full Launch Kit</h2>
                <p className="text-gray-500 mb-10">Everything ready to copy-paste. Follow this schedule exactly — no guessing.</p>

                <h3 className="heading-md mb-6">Weekly Posting Schedule</h3>
                <div className="grid md:grid-cols-7 gap-2 mb-4">
                  {[
                    { day: 'MON', action: 'Facebook post (Group 1)', color: 'bg-blue-100 text-blue-800' },
                    { day: 'TUE', action: 'Reply to comments + DMs', color: 'bg-gray-100 text-gray-700' },
                    { day: 'WED', action: 'Facebook post (Group 2) + 1 X/Twitter tweet', color: 'bg-blue-100 text-blue-800' },
                    { day: 'THU', action: 'Nextdoor post', color: 'bg-green-100 text-green-800' },
                    { day: 'FRI', action: 'Facebook post (Group 3)', color: 'bg-blue-100 text-blue-800' },
                    { day: 'SAT', action: 'Reply to all comments', color: 'bg-gray-100 text-gray-700' },
                    { day: 'SUN', action: 'Rest — prep for next week', color: 'bg-gray-100 text-gray-700' },
                  ].map((d, i) => (
                    <div key={i} className={`rounded-xl p-3 text-center ${d.color}`}>
                      <div className="font-bold text-xs mb-1">{d.day}</div>
                      <div className="text-xs leading-tight">{d.action}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-10">
                  <strong>Rule:</strong> Post 3x/week on Facebook (different groups each time, rotate posts), 1–2x on X/Twitter, 1x on Nextdoor. Reply to every single comment within 2 hours. Never post the same copy twice in the same group.
                </div>
              </div>

              {/* FACEBOOK */}
              <div>
                <h3 className="heading-md mb-3">Facebook Groups to Join Right Now</h3>
                <p className="text-sm text-gray-500 mb-6">Search these exact names on Facebook and request to join. Takes 5 minutes. Post in each one once per week, rotating posts.</p>
                <div className="space-y-3 mb-10">
                  {[
                    { name: 'Airbnb Hosts Community — Los Angeles', members: '18,000+ members', link: 'https://www.facebook.com/groups/airbnbhostscommunity', tip: 'Most active — post here first' },
                    { name: 'LA Short Term Rental Hosts', members: '12,000+ members', link: 'https://www.facebook.com/groups/search/results/?q=LA%20short%20term%20rental%20hosts', tip: 'Property managers + hosts' },
                    { name: 'West Hollywood Airbnb & Short-Term Rental', members: '5,000+ members', link: 'https://www.facebook.com/groups/search/results/?q=west%20hollywood%20airbnb', tip: 'Hyperlocal — your best leads' },
                    { name: 'Venice Beach / Santa Monica STR Community', members: '4,000+ members', link: 'https://www.facebook.com/groups/search/results/?q=venice%20santa%20monica%20airbnb%20hosts', tip: 'Premium hosts, premium pay' },
                    { name: 'Airbnb & VRBO Hosts — Southern California', members: '25,000+ members', link: 'https://www.facebook.com/groups/search/results/?q=airbnb%20vrbo%20hosts%20southern%20california', tip: 'Biggest reach' },
                  ].map((group, i) => (
                    <div key={i} className="card p-4 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-sm">{group.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{group.members} · {group.tip}</div>
                      </div>
                      <a href={group.link} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 font-semibold bg-teal-50 hover:bg-teal-100 px-3 py-2 rounded-lg whitespace-nowrap flex-shrink-0 transition-all">
                        Search on Facebook →
                      </a>
                    </div>
                  ))}
                </div>

                <h3 className="heading-md mb-3">Facebook Posts — Copy-Paste Ready</h3>
                <p className="text-sm text-gray-500 mb-6">Use one per week, rotating. Never post the same one twice in a row. Always add your personal photo or a before/after clean photo as the image.</p>

                <CopyBox label="Post #1 — Launch Post (Week 1)" note="Best for first post in any group. Add a photo of a beautifully cleaned apartment." content={`Hey [West Hollywood / LA] Airbnb hosts —

Just launched Ready Rental Cleaning, a professional Airbnb turnover service right here in LA.

What we do: Handle everything between guest checkouts — change all linens, deep clean bathrooms, wipe down kitchen, mop floors, restock, and send you before/after photos so you can verify from your phone.

Service area: West Hollywood, Venice, Santa Monica, Silver Lake, and all of LA
Price: $180 for 1-2 bedroom units. Fully insured. Same-day available.

Offering our first 2 cleanings free to earn our first 5-star reviews.

Book in 60 seconds at readyrentalcleaning.com or drop a comment/DM and I'll take care of you.`} />

                <CopyBox label="Post #2 — Problem/Solution (Week 2)" note="Best performing post type. Hits the exact pain Airbnb hosts have." content={`The worst feeling as an Airbnb host:

Guest checking in at 2 PM. Cleaner texts at noon: "Can't make it today."

That lost you a 5-star review. Maybe the booking too.

I built Ready Rental Cleaning specifically to solve this. We have backup coverage for every job, same-day emergency availability (book by 10 AM), and a 100% satisfaction guarantee.

$180 for a standard turnover. Linens, bathrooms, kitchen, floors, photos.

If you're hosting in WeHo, Venice, Silver Lake, Santa Monica — we've got you covered.

Book at readyrentalcleaning.com. First clean? We make sure it's perfect.`} />

                <CopyBox label="Post #3 — Social Proof (Week 3)" note="Use after you've done your first 5 cleanings. Replace the number with real data." content={`Just completed our 20th Airbnb turnover in Los Angeles.

Pattern I'm seeing: hosts who use a consistent, professional cleaner get 4.8–5.0 star ratings. Hosts who piece it together with random people average 4.1–4.4.

It's not the property. It's the consistency.

Ready Rental Cleaning shows up every time, cleans to hotel standards, sends before/after photos so you can check from anywhere.

If you're hosting in WeHo, Venice, Santa Monica, or anywhere in LA — try us once. I think you'll stop looking.

readyrentalcleaning.com`} />

                <CopyBox label="Post #4 — Value Post (No Hard Sell)" note="Post this when you want to give value and build trust, not push services." content={`For LA Airbnb hosts — 5 things most cleaners miss that cost you 5-star reviews:

1. The smell. Guests notice before they see anything. Musty = bad review no matter how clean it is.
2. The TV remote. Wipe it down and check the batteries.
3. Under the bed. Guests look. They always look.
4. The bathroom drain. Hair in the drain is an automatic 3-star review.
5. The welcome note / house manual. Fresh guests love knowing where things are.

These are on our 47-point checklist for every clean.

Hosting in LA? Happy to help — readyrentalcleaning.com`} />

                <CopyBox label="Post #5 — Seasonal / Urgency (Summer / Peak Season)" note="Use this in April–May before summer peak. Very effective." content={`West Hollywood Airbnb hosts — summer bookings are about to spike.

If your cleaning situation isn't locked down, now is the time to fix it.

Ready Rental Cleaning handles Airbnb turnovers in LA — $180 flat rate, same-day available, $2M insured, before/after photos every time.

No contracts. No minimums. Just show up when you need us.

Book in 60 seconds at readyrentalcleaning.com — or DM me and I'll handle it personally.`} />
              </div>

              {/* X / TWITTER */}
              <div>
                <h3 className="heading-md mb-3">X / Twitter Posts</h3>
                <p className="text-sm text-gray-500 mb-6">Post 1–2 times per week. Add hashtags: #Airbnb #AirbnbHost #LosAngeles #ShortTermRental</p>

                <CopyBox label="Tweet Thread — Post as a 5-part thread" content={`1/ Running an Airbnb in LA? Here's what separates hosts with 4.2 stars from hosts with 4.9 stars:

(It's not the property. Thread.)

---

2/ The #1 difference: reliability of cleaning.

A bad clean tanks your rating instantly. Guests are ruthless. One hair in the drain, one musty smell = 3 stars. Done.

---

3/ The #2 difference: photo verification.

4.9-star hosts check before/after photos remotely. They know what guests walk into before guests get there.

We send before/after photos with every Ready Rental Cleaning job. It's not optional — it's standard.

---

4/ The #3 difference: backup plans.

Every 4.9-star host I know has a backup cleaner. Every 4.2-star host has a horror story about a last-minute cancellation before a checkout.

We have coverage for same-day emergencies. No excuses.

---

5/ None of this is complicated. It's just execution.

If you're hosting in LA and want someone who shows up every time: readyrentalcleaning.com

$180 turnovers. Fully insured. Before/after photos. 100% guarantee.`} />

                <CopyBox label="Single Tweet — Direct Offer" content={`If you host on Airbnb in Los Angeles, we will make your property guest-ready in 3 hours.

$180 flat. Fully insured. Before/after photos. Same-day available.

readyrentalcleaning.com

#Airbnb #AirbnbHost #LosAngeles`} />

                <CopyBox label="Single Tweet — Pain Point" content={`The worst text an Airbnb host can get:

"Hey I can't make it to the cleaning today"

...at noon, with check-in at 3 PM.

Built Ready Rental Cleaning to end this. Same-day backup cleaners in LA. Always.

readyrentalcleaning.com`} />
              </div>

              {/* NEXTDOOR */}
              <div>
                <h3 className="heading-md mb-3">Nextdoor Posts</h3>
                <p className="text-sm text-gray-500 mb-6">Post once per week in your neighborhood + 2–3 adjacent neighborhoods. Nextdoor works best when it feels like a neighbor talking, not a business. Keep it casual.</p>

                <CopyBox label="Nextdoor Post #1 — Neighborhood Introduction" content={`Neighbors — introducing myself!

I recently launched Ready Rental Cleaning, a professional cleaning service for Airbnb and short-term rental hosts right here in Los Angeles.

We handle everything between guest checkouts: linens, bathrooms, kitchen, floors, restocking, and before/after photos. $180 for standard units, same-day available.

Fully insured ($2M general liability), background-checked cleaners only.

If you or anyone you know hosts on Airbnb and needs reliable cleaning they can count on — I'd love to help.

Visit readyrentalcleaning.com or feel free to message me directly.`} />

                <CopyBox label="Nextdoor Post #2 — Reply to Cleaning Recommendation Requests" note="Search Nextdoor for 'cleaning' or 'cleaner' — reply to anyone asking for recommendations." content={`Hi [Name] — I can help with this! I run Ready Rental Cleaning, a professional Airbnb turnover service in LA. We specialize in short-term rental turnovers — $180 for 1-2BR, fully insured, before/after photos with every clean.

Happy to book you in — readyrentalcleaning.com or feel free to message me directly.`} />
              </div>

              {/* EMAIL TEMPLATES */}
              <div>
                <h3 className="heading-md mb-3">Company Emails — All 5 Live & Auto-Sending</h3>
                <p className="text-sm text-gray-500 mb-2">These are your real emails. They send automatically from <strong>hello@readyrentalcleaning.com</strong> the moment each event happens. Click any email to preview the full design.</p>
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-teal-800 mb-6">
                  <strong>Already wired:</strong> Booking confirmation fires instantly on booking. 24h reminder fires the day before. Completion email fires when you mark a job done in your admin dashboard. All powered by Resend.
                </div>

                {/* Email 1 — Booking Confirmation */}
                <EmailPreview tag="Sends on booking" subject="Your Ready Rental Cleaning booking is confirmed — [Address], [Date]" preview="Great news — your cleaning is confirmed. Here are the details...">
                  <p className="text-gray-800 text-sm mb-5">Hi <strong>[Name]</strong>,</p>
                  <p className="text-gray-700 text-sm mb-5">Great news — your cleaning is confirmed. Here are your details:</p>
                  <div className="bg-gray-50 rounded-xl p-5 mb-5 space-y-2">
                    {[['Service', '[Service Type]'], ['Property', '[Address]'], ['Date', '[Date]'], ['Time', '[Time]'], ['Cleaner', 'Assigned 24h before your cleaning']].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">{k}</span>
                        <span className="text-gray-900 font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-5">You&apos;ll receive a reminder tomorrow with your cleaner&apos;s name and contact info. After the cleaning, we&apos;ll send you before/after photos and your invoice.</p>
                  <div className="text-center mb-5">
                    <span className="inline-block bg-teal-600 text-white text-sm font-bold px-8 py-3 rounded-xl">View Booking Details</span>
                  </div>
                  <p className="text-gray-500 text-xs">Questions? Reply to this email or text <strong>(323) 555-0100</strong> anytime.</p>
                </EmailPreview>
                <CopyBox label="Email 1 — plain text to copy" content={`Subject: Your Ready Rental Cleaning booking is confirmed — [Property Address], [Date]

Hi [Name],

Great news — your cleaning is confirmed. Here are the details:

Service: [Service Type]
Property: [Address]
Date: [Date]
Time: [Time]
Cleaner: Will be assigned 24 hours before your cleaning

You'll receive a reminder tomorrow with your cleaner's name and contact info.

After the cleaning, we'll send you before/after photos and your invoice.

Questions? Reply to this email or text us at (323) 555-0100.

– The Ready Rental Cleaning Team
hello@readyrentalcleaning.com | readyrentalcleaning.com`} />

                {/* Email 2 — 24h Reminder */}
                <EmailPreview tag="Sends day before" subject="Reminder: Your Ready Rental Cleaning cleaning is tomorrow at [Time]" preview="Just a reminder — your cleaning is tomorrow. Cleaner name and contact inside...">
                  <p className="text-gray-800 text-sm mb-5">Hi <strong>[Name]</strong>,</p>
                  <p className="text-gray-700 text-sm mb-5">Just a quick reminder — your Ready Rental Cleaning cleaning is <strong>tomorrow</strong>.</p>
                  <div className="bg-gray-50 rounded-xl p-5 mb-5 space-y-2">
                    {[['Date', '[Date]'], ['Time', '[Time]'], ['Address', '[Address]'], ['Your Cleaner', '[Cleaner Name]'], ['Cleaner Cell', '(323) 555-0101']].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">{k}</span>
                        <span className="text-gray-900 font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                    <p className="text-xs font-bold text-amber-800 mb-1">Access Notes</p>
                    <p className="text-sm text-amber-700">[Notes from booking — lockbox code, entry instructions, etc.]</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Your cleaner will text you when they arrive. Need to make changes?</p>
                  <p className="text-gray-500 text-xs">Reply to this email or call <strong>(323) 555-0100</strong> immediately.</p>
                </EmailPreview>
                <CopyBox label="Email 2 — plain text to copy" content={`Subject: Reminder: Your Ready Rental Cleaning cleaning is tomorrow at [Time]

Hi [Name],

Just a reminder — your cleaning is tomorrow.

Date: [Date]
Time: [Time]
Address: [Address]
Cleaner: [Cleaner Name] — (323) 555-0101

Access Notes: [Notes from booking]

Your cleaner will text you when they arrive. If anything changes, please reply to this email or call (323) 555-0100 ASAP.

See you tomorrow!

– Ready Rental Cleaning`} />

                {/* Email 3 — Job Complete */}
                <EmailPreview tag="Sends after job done" subject="[Address] is clean and guest-ready — photos inside" preview="Your property is spotless. Before/after photos attached. Invoice enclosed...">
                  <p className="text-gray-800 text-sm mb-5">Hi <strong>[Name]</strong>,</p>
                  <p className="text-gray-700 text-sm mb-5">Your property is <strong>spotless and guest-ready</strong>. Cleaning completed at <strong>[Time]</strong>.</p>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="relative rounded-xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" alt="Before" className="w-full h-28 object-cover" />
                      <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">BEFORE</span>
                    </div>
                    <div className="relative rounded-xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop" alt="After" className="w-full h-28 object-cover" />
                      <span className="absolute top-1.5 left-1.5 bg-teal-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">AFTER</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-5">
                    <p className="text-xs font-bold text-gray-700 mb-2">Checklist Completed</p>
                    {['All linens changed, beds made hotel-style', 'Bathrooms deep cleaned & restocked', 'Kitchen wiped down, appliances cleaned', 'Floors vacuumed and mopped', 'Trash removed, liners replaced', 'Essentials restocked'].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-gray-600 py-0.5">
                        <svg className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="text-center mb-5">
                    <span className="inline-block bg-teal-600 text-white text-sm font-bold px-8 py-3 rounded-xl">View Invoice — $[Amount]</span>
                  </div>
                  <p className="text-gray-500 text-xs text-center">Thank you for trusting Ready Rental Cleaning. See you next time.</p>
                </EmailPreview>
                <CopyBox label="Email 3 — plain text to copy" content={`Subject: [Address] is clean and guest-ready — photos inside

Hi [Name],

Your property is spotless and ready for your next guest. Cleaning completed at [Time].

What we cleaned:
- All linens changed, beds made
- Bathrooms deep cleaned and restocked
- Kitchen wiped down, appliances cleaned
- Floors vacuumed and mopped
- Trash removed and liners replaced
- Essentials restocked

Before/after photos: [Link]
Invoice: [Link] — $[Amount]

Thank you for trusting Ready Rental Cleaning. We'll see you next time.

– The Ready Rental Cleaning Team`} />

                {/* Email 4 — Review Request */}
                <EmailPreview tag="Sends 2h after completion" subject="How was your cleaning? Quick favor to ask" preview="Would you take 30 seconds to leave us a Google review? It means the world...">
                  <p className="text-gray-800 text-sm mb-4">Hi <strong>[Name]</strong>,</p>
                  <p className="text-gray-700 text-sm mb-4">Your Ready Rental Cleaning cleaning at <strong>[Address]</strong> was completed a couple hours ago. We hope your property looks perfect for your next guest!</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5 text-center">
                    <div className="flex justify-center gap-1 mb-2">
                      {[1,2,3,4,5].map(s => <svg key={s} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                    </div>
                    <p className="text-sm font-semibold text-amber-800 mb-3">Would you take 30 seconds to review us?</p>
                    <span className="inline-block bg-amber-500 text-white text-sm font-bold px-6 py-2.5 rounded-xl">Leave a Google Review</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">It genuinely helps other LA hosts find us and means the world to our small team.</p>
                  <p className="text-gray-500 text-xs">If anything wasn&apos;t right, reply here — we&apos;ll make it right, guaranteed. 100% satisfaction or we re-clean for free.</p>
                </EmailPreview>
                <CopyBox label="Email 4 — plain text to copy" content={`Subject: How was your cleaning? Quick favor to ask

Hi [Name],

Your Ready Rental Cleaning cleaning was completed a couple hours ago. We hope [Address] looks perfect for your next guest!

Would you take 30 seconds to leave us a Google review?

→ Leave a Google Review: [Your Google Business Link]

It genuinely helps other LA hosts find us and means the world to our small team.

If anything wasn't right, please reply here — we'll make it right, guaranteed.

Thank you!

– [Cleaner Name] & The Ready Rental Cleaning Team`} />

                {/* Email 5 — Cleaner Assignment */}
                <EmailPreview tag="Sends to cleaner on assignment" subject="New job assigned — [Property Address], [Date] at [Time]" preview="You have a new job. Details, access instructions, and pay amount inside...">
                  <p className="text-gray-800 text-sm mb-4">Hi <strong>[Cleaner Name]</strong>,</p>
                  <p className="text-gray-700 text-sm mb-4">You have a new job assigned. Please confirm by replying <strong>&quot;Confirmed&quot;</strong> to this email.</p>
                  <div className="bg-gray-50 rounded-xl p-5 mb-5 space-y-2">
                    {[['Client', '[Client Name]'], ['Property', '[Address]'], ['Service', '[Service Type]'], ['Date', '[Date]'], ['Time', '[Time]'], ['Your Pay', '$[Amount]']].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">{k}</span>
                        <span className={`font-bold ${k === 'Your Pay' ? 'text-teal-700 text-base' : 'text-gray-900'}`}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-blue-800 mb-1">Access Instructions</p>
                    <p className="text-sm text-blue-700">[Notes — lockbox code, gate code, parking, special instructions]</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-gray-700 mb-2">What to bring</p>
                    {['All cleaning supplies', 'Phone for before/after photos', 'Linen set (if linen change included)'].map(item => (
                      <p key={item} className="text-xs text-gray-600 flex items-center gap-1.5 py-0.5"><span className="w-1 h-1 bg-teal-500 rounded-full flex-shrink-0" />{item}</p>
                    ))}
                  </div>
                  <p className="text-red-600 text-xs font-semibold">Can&apos;t make it? Call (323) 555-0100 IMMEDIATELY.</p>
                </EmailPreview>
                <CopyBox label="Email 5 — plain text to copy" content={`Subject: New job assigned — [Property Address], [Date] at [Time]

Hi [Cleaner Name],

You have a new job assigned. Details below:

Client: [Client Name]
Property: [Address]
Service: [Service Type]
Date: [Date]
Time: [Time]
Your Pay: $[Amount]

Access Instructions: [Notes]
Special requests: [Requests or "None"]

Please confirm by replying "Confirmed" to this message.

If you cannot make it, let us know IMMEDIATELY at (323) 555-0100.

What to bring:
- All cleaning supplies
- Camera for before/after photos (or use your phone)
- Linen set if service includes linen change

See you there!
– Ready Rental Cleaning Operations`} />
              </div>

              {/* BEFORE / AFTER GALLERY */}
              <div>
                <h3 className="heading-md mb-2">Before & After — Example Photos</h3>
                <p className="text-sm text-gray-500 mb-6">This is what your posts should look like. Before/after gets 3–5x more engagement than any other image type. Take these with your phone — no fancy camera needed.</p>
                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  {[
                    {
                      room: 'Bedroom',
                      before: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=380&fit=crop',
                      after: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=380&fit=crop',
                    },
                    {
                      room: 'Kitchen',
                      before: 'https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=600&h=380&fit=crop',
                      after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=380&fit=crop',
                    },
                    {
                      room: 'Bathroom',
                      before: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=600&h=380&fit=crop',
                      after: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&h=380&fit=crop',
                    },
                  ].map((pair, i) => (
                    <div key={i}>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{pair.room}</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative rounded-2xl overflow-hidden shadow-md">
                          <img src={pair.before} alt={`${pair.room} before cleaning`} className="w-full h-44 object-cover" />
                          <div className="absolute inset-0 bg-red-900/20" />
                          <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg tracking-wide shadow">BEFORE</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden shadow-md">
                          <img src={pair.after} alt={`${pair.room} after cleaning`} className="w-full h-44 object-cover" />
                          <span className="absolute top-2.5 left-2.5 bg-teal-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg tracking-wide shadow">AFTER</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 italic text-center">Placeholder images — replace with real before/after photos from your first jobs</p>
              </div>

              {/* GRAPHICS GUIDE */}
              <div>
                <h3 className="heading-md mb-3">Photo & Graphics Guide for Posts</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {[
                    {
                      title: 'Use Real Before/After Photos',
                      desc: 'The single best image for social posts. Take a photo as you walk in (before) and after you finish (after). Side-by-side before/after gets 3–5x more engagement than any other image type.',
                      tag: 'Highest Impact',
                      color: 'bg-teal-50 border-teal-200',
                    },
                    {
                      title: 'Canva — Free Design Tool',
                      desc: 'Go to canva.com, search "Cleaning Service Facebook Post" — there are hundreds of free templates. Add your logo (SC in teal box), change colors to teal, and swap the text. Takes 10 minutes.',
                      tag: 'Free',
                      color: 'bg-blue-50 border-blue-200',
                    },
                    {
                      title: 'Best Free Image Sources',
                      desc: 'Unsplash.com — search "luxury apartment" or "clean modern bedroom". Download and use for free. Always use images that show the RESULT (beautiful clean room), not the process.',
                      tag: 'Free Photos',
                      color: 'bg-purple-50 border-purple-200',
                    },
                    {
                      title: 'Image Size for Facebook',
                      desc: 'Facebook feed: 1200×630px. Facebook group post: 1200×630px. Square post (Story/Reel): 1080×1080px. Canva has preset templates for all of these.',
                      tag: 'Specs',
                      color: 'bg-gray-50 border-gray-200',
                    },
                  ].map((item, i) => (
                    <div key={i} className={`rounded-xl p-6 border ${item.color}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <span className="text-xs font-semibold bg-white/60 px-2 py-0.5 rounded-full text-gray-600">{item.tag}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* REVIEW STRATEGY */}
              <div>
                <h3 className="heading-md mb-6">Review Generation System</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { platform: 'Google', goal: '50+ reviews by Month 2', action: 'Send direct Google review link in every post-cleaning email (Email #4). Ask in person after every clean too.', impact: '4.8+ stars = first result for "Airbnb cleaning LA"' },
                    { platform: 'Turno / TurnoverBnB', goal: '100+ reviews by Month 3', action: 'Create a free listing at turno.com. Respond to every request within 1 hour. Marketplace sends you leads.', impact: 'Major source of inbound leads — hosts already searching for cleaners' },
                    { platform: 'Word of Mouth', goal: '30% of clients via referral', action: 'After every clean, ask: "Do you know other hosts in LA?" Offer a $20 referral credit for each new client they send.', impact: 'Best leads — pre-sold by someone they already trust' },
                  ].map((item, i) => (
                    <div key={i} className="card p-6">
                      <h4 className="font-bold text-gray-900 mb-3">{item.platform}</h4>
                      <div className="badge mb-3">{item.goal}</div>
                      <p className="text-sm text-gray-600 mb-3"><strong>Action:</strong> {item.action}</p>
                      <p className="text-xs text-gray-500"><strong>Impact:</strong> {item.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LEGAL */}
          {activeTab === 'legal' && (
            <div className="space-y-8">
              <div>
                <h2 className="heading-lg mb-8">Legal Setup Checklist</h2>

                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  {[
                    { title: 'Business Formation', items: ['File DBA or LLC with CA SOS — $70–100', 'Get EIN from IRS.gov — free, 5 min', 'Open Mercury business bank account — free', 'Get $2M general liability insurance (Thimble.com, ~$50/mo)'] },
                    { title: 'Tax & Compliance', items: ['Register for CA sales tax (cleaning services are taxable)', 'Set up bookkeeping (Wave — free, or QuickBooks $30/mo)', 'Keep receipts for all supplies, insurance, mileage', 'Quarterly estimated tax payments (set aside 25% of profit)'] },
                    { title: 'Contractor Setup', items: ['1099 contractor agreement for each cleaner', 'Collect W-9 forms before first payment', 'Issue 1099-NEC if paying $600+ annually', 'Keep signed agreements on file'] },
                    { title: 'Client Agreements', items: ['Service terms on website (cancellation, liability)', 'Booking confirmation = contract acceptance', 'Photo consent included in booking terms', 'Damage claim process documented'] },
                  ].map((section, i) => (
                    <div key={i} className="card p-6">
                      <h4 className="font-bold text-gray-900 mb-4">{section.title}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex gap-2 text-sm text-gray-600">
                            <span className="text-gray-400 flex-shrink-0 mt-0.5">{icons.box}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="card p-8 bg-yellow-50 border-yellow-200">
                  <h3 className="font-bold text-yellow-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    Legal Disclaimer
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    This business plan is for informational and planning purposes. Consult a licensed attorney and CPA before forming your business entity, signing contracts, or filing taxes. California employment law regarding independent contractors (AB5) may apply to your cleaner relationships.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding gradient-cta text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Execute This Plan?</h2>
          <p className="text-lg text-teal-100 mb-8">The plan is built. The website is live. Now we need clients. Start booking.</p>
          <a href="/book" className="btn-white">Book First Cleaning</a>
        </div>
      </section>
    </div>
  )
}
