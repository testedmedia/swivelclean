'use client'

import { useState } from 'react'

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
            The SwivelClean LA{' '}
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
                <h3 className="heading-md mb-6">Why SwivelClean Wins</h3>
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
                        { name: 'SwivelClean', price: '$180–295', booking: 'Yes 60s', photos: 'Every clean', edge: 'Premium — justified by quality + guarantee' },
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
                    { role: 'Cleaner #1', type: 'Independent contractor (1099)', pay: '$18–22/hr (~$160/day)', desc: 'Full-time cleaner. Trained on SwivelClean standards. Background checked. Assigned to primary service area.' },
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
                <div className="space-y-4">
                  {[
                    { phase: 'Booking — 60 seconds', color: 'teal', steps: ['Host visits swivelclean.com', 'Enters address, selects service, picks date/time', 'Pays securely via Stripe', 'Instant confirmation email + calendar invite sent', 'Booking visible in admin dashboard'] },
                    { phase: '24 Hours Before', color: 'blue', steps: ['Cleaner receives text + email: address, access code, job checklist', 'Cleaner confirms availability', 'Host receives reminder: cleaner name, arrival time, contact number', 'Any last-minute notes from host captured'] },
                    { phase: 'Day of Cleaning', color: 'green', steps: ['Cleaner arrives on time (10 min early)', 'Uses standard SwivelClean checklist throughout', 'Photos taken before and after cleaning', 'Any issues (damage, missing supplies) reported immediately'] },
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
                    'Launch swivelclean.com website',
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
            <div className="space-y-12">
              <div>
                <h2 className="heading-lg mb-8">Go-to-Market Strategy</h2>

                <h3 className="heading-md mb-6">Phase 1: Organic — Week 1–3 (Free)</h3>
                <div className="space-y-6 mb-12">
                  <div className="card p-8">
                    <h4 className="font-bold text-gray-900 mb-2">Facebook Group Strategy</h4>
                    <p className="text-sm text-gray-600 mb-4">Post in these LA Airbnb host groups — each has 3,000–15,000 members:</p>
                    <ul className="text-sm text-gray-500 space-y-1 mb-6">
                      {['LA Airbnb Hosts Community', 'Airbnb Hosts — Los Angeles', 'West Hollywood Short Term Rental Owners', 'Venice Beach Airbnb Hosts', 'LA Property Managers & STR Owners'].map((g, i) => (
                        <li key={i} className="flex gap-2 items-center">
                          <span className="text-teal-500 flex-shrink-0">{icons.arrow}</span>
                          &ldquo;{g}&rdquo;
                        </li>
                      ))}
                    </ul>
                    <div className="bg-gray-900 text-green-400 rounded-xl p-6 text-sm font-mono leading-relaxed">
                      <div className="text-gray-500 text-xs mb-3"># COPY-PASTE POST (customize neighborhood)</div>
                      <p>Hey hosts! Just launched SwivelClean — we handle Airbnb turnovers so you don&apos;t have to stress about them.</p>
                      <br />
                      <p>What we do: 3-hour turnover, change all linens, deep clean bathrooms, mop floors, restock, before/after photos sent to you.</p>
                      <br />
                      <p>Serving: West Hollywood, Venice, Santa Monica, Silver Lake</p>
                      <p>Price: Starts at $180 (1-2 BR) — fully insured + background checked</p>
                      <p>Same-day available if you book before 10am</p>
                      <br />
                      <p>Offering 2 free cleanings for first-time clients to earn our first reviews.</p>
                      <br />
                      <p>Book at swivelclean.com or DM me!</p>
                    </div>
                  </div>

                  <div className="card p-8">
                    <h4 className="font-bold text-gray-900 mb-2">Nextdoor Posts</h4>
                    <div className="bg-gray-900 text-green-400 rounded-xl p-6 text-sm font-mono leading-relaxed">
                      <div className="text-gray-500 text-xs mb-3"># NEXTDOOR POST — [NEIGHBORHOOD]</div>
                      <p>Property managers & Airbnb hosts in [West Hollywood] —</p>
                      <br />
                      <p>Tired of unreliable cleaning crews? Last-minute no-shows costing you bookings?</p>
                      <br />
                      <p>SwivelClean specializes in fast Airbnb turnovers. Local, insured ($2M), and we send before/after photos after every clean.</p>
                      <br />
                      <p>Standard turnover: $180 | Same-week scheduling | 100% satisfaction guarantee</p>
                      <br />
                      <p>Book online in 60 seconds: swivelclean.com</p>
                    </div>
                  </div>
                </div>

                <h3 className="heading-md mb-6">Phase 2: Property Manager Cold Email (Month 3)</h3>
                <div className="card p-8 mb-12">
                  <div className="bg-gray-900 text-green-400 rounded-xl p-6 text-sm font-mono leading-relaxed">
                    <p className="text-gray-500 text-xs mb-3"># COLD EMAIL — Subject: &ldquo;Dedicated cleaner for your [X] properties in WeHo&rdquo;</p>
                    <p>Hi [First Name],</p>
                    <br />
                    <p>I saw you manage [X properties] in West Hollywood. Managing turnovers across multiple properties is a logistical nightmare — missed cleanings = bad reviews = lost revenue.</p>
                    <br />
                    <p>I run SwivelClean. We specialize in Airbnb turnovers for LA property managers:</p>
                    <br />
                    <p>— Dedicated cleaner assigned to your properties (they learn your units)</p>
                    <p>— Priority scheduling + same-day emergency availability</p>
                    <p>— Volume pricing: $155/clean at 5+/month</p>
                    <p>— Before/after photos + digital invoice every time</p>
                    <p>— $2M insured and bonded</p>
                    <br />
                    <p>I&apos;d like to offer you 2 free turnovers so you can see the quality firsthand.</p>
                    <br />
                    <p>Worth a 10-minute call this week?</p>
                    <br />
                    <p>[Your Name] | SwivelClean | (323) 555-0180 | swivelclean.com</p>
                  </div>
                </div>

                <h3 className="heading-md mb-6">Review Generation System</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { platform: 'Google', goal: '50+ reviews by Month 2', action: 'Send direct Google review link in every post-cleaning email', impact: '4.8+ rating = first result for "Airbnb cleaning LA"' },
                    { platform: 'Turno', goal: '100+ reviews by Month 3', action: 'Create premium marketplace listing, respond to all requests within 1 hour', impact: 'Major source of inbound leads from hosts already searching' },
                    { platform: 'Word of Mouth', goal: '30% of new clients via referral', action: 'Ask every client: "Do you know other hosts in LA?" + $20 referral credit', impact: 'Best quality leads — pre-sold by someone they trust' },
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
