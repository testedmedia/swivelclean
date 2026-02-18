'use client'

import { useState } from 'react'

export default function BusinessPlan() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="cro-section bg-gradient-to-br from-teal-50 to-blue-50 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">The SpotlessLA Business Plan</h1>
          <p className="text-xl text-gray-600 mb-8">
            How we hit <span className="font-bold text-teal-600">$10,000 in Month 1</span> and scale to <span className="font-bold text-teal-600">$30,000+ by Month 4</span>
          </p>
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-teal-600 mb-4">$10,000</h2>
            <p className="text-gray-600">Month 1 Revenue Target</p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">40</div>
                <div className="text-sm text-gray-600">Turnovers @ $180</div>
              </div>
              <div>
                <div className="text-2xl font-bold">+</div>
              </div>
              <div>
                <div className="text-2xl font-bold">10</div>
                <div className="text-sm text-gray-600">Deep Cleans @ $350</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">Total: 40 × $180 + 10 × $350 = <span className="font-bold text-teal-600">$9,700</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="cro-section bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex overflow-x-auto gap-8 text-center">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'market', label: 'Market', icon: '🎯' },
              { id: 'services', label: 'Services & Pricing', icon: '💰' },
              { id: 'operations', label: 'Operations', icon: '⚙️' },
              { id: 'timeline', label: '90-Day Timeline', icon: '📅' },
              { id: 'legal', label: 'Legal Docs', icon: '📋' },
              { id: 'marketing', label: 'Marketing', icon: '📢' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-teal-600 text-teal-600'
                    : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="cro-section bg-white max-w-6xl mx-auto">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Business Overview</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-teal-50 rounded-xl p-8 border border-teal-200">
                  <h3 className="text-xl font-bold text-teal-700 mb-4">The Opportunity</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>15,000+ active Airbnb listings in LA</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>Average 5-10 turnovers per property per year</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>$200-350 per turnover in premium neighborhoods</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>Hosts hate coordinating cleanings — they'll pay premium for reliability</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">Our Competitive Edge</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Fast booking (60 seconds) + same-week service</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Professional cleaners, background checked</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Online booking + automatic payment</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Post-cleaning photos + host communication</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Financial Projections</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { month: 'Month 1', jobs: 50, revenue: '$10,000', margin: '60%' },
                  { month: 'Month 2', jobs: 100, revenue: '$18,000', margin: '65%' },
                  { month: 'Month 3', jobs: 150, revenue: '$28,000', margin: '68%' },
                  { month: 'Month 4', jobs: 200, revenue: '$40,000', margin: '70%' },
                ].map((proj, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="font-bold text-lg mb-4">{proj.month}</div>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-600">Jobs:</span> <span className="font-bold">{proj.jobs}</span></div>
                      <div><span className="text-gray-600">Revenue:</span> <span className="font-bold text-teal-600">{proj.revenue}</span></div>
                      <div><span className="text-gray-600">Margin:</span> <span className="font-bold">{proj.margin}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Market Tab */}
        {activeTab === 'market' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Market Analysis</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">Target Market: LA Airbnb Hosts</h3>
                  <p className="text-gray-700 mb-4">
                    Over 15,000 active listings across LA. Each property turns over 5-10 times annually. Hosts spend $1,000-2,000 per property annually on cleaning. They value:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-bold text-teal-600 mb-2">Speed</div>
                      <p className="text-sm text-gray-700">Need turnover done within 4 hours of checkout</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-bold text-teal-600 mb-2">Reliability</div>
                      <p className="text-sm text-gray-700">Can't afford to miss a booking — cleaning failure = lost revenue</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-bold text-teal-600 mb-2">Quality</div>
                      <p className="text-sm text-gray-700">Bad cleaning = bad reviews = lost bookings</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-bold text-teal-600 mb-2">Communication</div>
                      <p className="text-sm text-gray-700">Want photos, confirmation, easy access management</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Key Neighborhoods (Phase 1)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { area: 'West Hollywood', listings: '2,000+', avgPrice: '$280/turnover' },
                      { area: 'Venice/Santa Monica', listings: '1,800+', avgPrice: '$250/turnover' },
                      { area: 'Silver Lake/Los Feliz', listings: '1,200+', avgPrice: '$200/turnover' },
                      { area: 'Downtown LA', listings: '1,500+', avgPrice: '$220/turnover' },
                    ].map((neighborhood, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4">
                        <div className="font-bold text-lg">{neighborhood.area}</div>
                        <div className="text-sm text-gray-600 mt-2">
                          <div>{neighborhood.listings} listings</div>
                          <div className="text-teal-600 font-semibold">{neighborhood.avgPrice}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services & Pricing Tab */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Services & Pricing Strategy</h2>
              <div className="space-y-6">
                {[
                  {
                    name: 'Standard Turnover',
                    price: '$180',
                    time: '3-4 hours',
                    includes: [
                      'Change all bed linens',
                      'Clean bathrooms (toilet, shower, sink)',
                      'Wipe down kitchen',
                      'Vacuum & mop all floors',
                      'Empty trash, replace liners',
                      'Quick walkthrough for missed items'
                    ],
                    margin: '$110 (61%)',
                    target: '30-35 per month'
                  },
                  {
                    name: 'Premium Turnover (3+ BR)',
                    price: '$220',
                    time: '4-5 hours',
                    includes: [
                      'All standard services',
                      'Additional bedrooms + bathrooms',
                      'Dust all surfaces',
                      'Wipe down baseboards',
                      'Clean windows',
                      'Pre-guest quality check'
                    ],
                    margin: '$132 (60%)',
                    target: '5-8 per month'
                  },
                  {
                    name: 'Deep Clean',
                    price: '$350',
                    time: '5-6 hours',
                    includes: [
                      'Everything from turnover',
                      'Deep clean walls',
                      'Appliance detailing',
                      'Vent & blinds cleaning',
                      'Baseboards scrubbed',
                      'Monthly maintenance visit'
                    ],
                    margin: '$200 (57%)',
                    target: '10-15 per month'
                  },
                ].map((service, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{service.name}</h3>
                        <p className="text-gray-600">{service.time}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-teal-600">{service.price}</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold mb-3 text-gray-900">What's Included:</h4>
                        <ul className="space-y-2">
                          {service.includes.map((item, j) => (
                            <li key={j} className="flex gap-2 text-sm text-gray-700">
                              <span className="text-teal-600 font-bold">✓</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-600">Gross Margin</div>
                            <div className="text-lg font-bold text-teal-600">{service.margin}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Month 1 Target</div>
                            <div className="font-bold">{service.target}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Operations Tab */}
        {activeTab === 'operations' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Operational Infrastructure</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Team Structure (Month 1)</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <div>
                          <div className="font-bold">Founder (Mom)</div>
                          <div className="text-sm text-gray-600">Operations, bookings, client communication</div>
                        </div>
                        <div className="text-teal-600 font-bold">$0 (sweat equity)</div>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <div>
                          <div className="font-bold">Cleaner #1</div>
                          <div className="text-sm text-gray-600">W-4, full-time, $18-22/hour</div>
                        </div>
                        <div className="text-teal-600 font-bold">$160/day</div>
                      </div>
                      <div>
                        <div className="font-bold">Online Booking Platform</div>
                        <div className="text-sm text-gray-600">Website, booking system, payment processing (2% Stripe fee)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Daily Operations</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="font-bold text-blue-700 mb-2">Booking Process (60 seconds)</div>
                      <ol className="text-sm space-y-2 text-gray-700">
                        <li>1. Host enters property address</li>
                        <li>2. Selects service (Turnover / Deep Clean)</li>
                        <li>3. Chooses date/time</li>
                        <li>4. Pays via Stripe ($0 in fees for booking system)</li>
                        <li>5. Instant confirmation email + calendar add</li>
                        <li>6. Mom assigns cleaner, sends access instructions</li>
                      </ol>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="font-bold text-green-700 mb-2">Pre-Cleaning (24h before)</div>
                      <ol className="text-sm space-y-2 text-gray-700">
                        <li>1. Cleaner receives text with address, access code, checklist</li>
                        <li>2. Mom confirms cleaner will arrive on time</li>
                        <li>3. Host gets reminder email with cleaner details</li>
                      </ol>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="font-bold text-purple-700 mb-2">Post-Cleaning (within 2h)</div>
                      <ol className="text-sm space-y-2 text-gray-700">
                        <li>1. Cleaner uploads 3-5 after photos via phone app</li>
                        <li>2. Mom marks job complete in dashboard</li>
                        <li>3. Host receives completion email + photos + invoice</li>
                        <li>4. Review request sent (Google + Airbnb link)</li>
                        <li>5. Cleaner paid via ACH transfer</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Admin Dashboard Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'Calendar', desc: 'Monthly/weekly view of all scheduled cleanings' },
                      { name: 'Bookings', desc: 'Status tracking (pending/confirmed/complete)' },
                      { name: 'Clients CRM', desc: 'Host info, booking history, notes, repeat rate' },
                      { name: 'Cleaners Roster', desc: 'Team management, hours, pay tracking' },
                      { name: 'Revenue', desc: 'MRR, profit margins, cleaner payouts' },
                      { name: 'Invoices', desc: 'Auto-generated per booking, sent to hosts' },
                    ].map((feature, i) => (
                      <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="font-bold text-teal-600 mb-2">{feature.name}</div>
                        <p className="text-sm text-gray-700">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">90-Day Launch & Growth Timeline</h2>

              <div className="space-y-6">
                <div className="bg-teal-50 border-l-4 border-teal-600 rounded-lg p-6">
                  <div className="font-bold text-lg text-teal-700 mb-2">WEEK 1 — Legal & Setup</div>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li>☐ File DBA or LLC (CA Secretary of State) — $70-100, 1-3 days</li>
                    <li>☐ Get EIN (free, 5 min on irs.gov)</li>
                    <li>☐ General liability insurance (Thimble.com) — $50/mo, same day</li>
                    <li>☐ Open business bank account (Mercury or Chase) — free, 1 day</li>
                    <li>☐ Sign 1099 contractor agreement with first cleaner</li>
                    <li>☐ Post in 5 LA Airbnb host Facebook groups (copy provided)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
                  <div className="font-bold text-lg text-blue-700 mb-2">WEEK 2-3 — Website Launch</div>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li>☐ Website goes live on Vercel (spotlessla.com)</li>
                    <li>☐ Stripe payment processing connected</li>
                    <li>☐ Email automation active (10 transactional sequences)</li>
                    <li>☐ List on TurnoverBnB marketplace</li>
                    <li>☐ Offer 2 free cleanings to generate first reviews</li>
                    <li>☐ Target: 15 turnovers/week ($2,700 weekly)</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6">
                  <div className="font-bold text-lg text-green-700 mb-2">MONTH 2 — Scale Phase 1</div>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li>☐ Hire cleaner #2 (now 2 people working)</li>
                    <li>☐ 40+ turnovers this month</li>
                    <li>☐ Deep clean upsell campaign ($350 service)</li>
                    <li>☐ Target: $10,000 revenue</li>
                    <li>☐ Google Business Profile optimization</li>
                    <li>☐ First 50+ Google reviews collected</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6">
                  <div className="font-bold text-lg text-purple-700 mb-2">MONTH 3 — Property Manager Pitch</div>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li>☐ Cold email 50 property managers with 5+ STR units</li>
                    <li>☐ Pitch: Dedicated cleaner package at volume discount</li>
                    <li>☐ 1-2 property manager contracts = $4,000-$8,000/month guaranteed</li>
                    <li>☐ Target: $20,000 revenue</li>
                    <li>☐ Add cleaner #3</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6">
                  <div className="font-bold text-lg text-orange-700 mb-2">MONTH 4 — Full Scale</div>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li>☐ 4 cleaners, 120+ turnovers per month</li>
                    <li>☐ Premium property focus (West Hollywood, Santa Monica)</li>
                    <li>☐ Dedicated account manager for property managers</li>
                    <li>☐ Target: $30,000+ monthly revenue</li>
                    <li>☐ Plan for regional expansion (Pasadena, Long Beach)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legal Docs Tab */}
        {activeTab === 'legal' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Legal Documents & Contracts</h2>
              <p className="text-gray-700 mb-8">All templates ready to customize and sign. Click each to view and download.</p>

              <div className="space-y-4">
                {[
                  {
                    title: 'Service Agreement (Client Contract)',
                    desc: 'What hosts agree to when booking.',
                    sections: ['Payment terms', 'Cancellation policy (24h notice)', 'Liability waiver', 'Rescheduling terms', 'Photo/communication consent']
                  },
                  {
                    title: '1099 Contractor Agreement (Cleaner Contract)',
                    desc: 'Independent contractor terms for cleaners.',
                    sections: ['Pay rate ($18-22/hour)', 'Independent contractor status', 'Confidentiality clause', 'Safety & liability', 'Supplies/equipment responsibility']
                  },
                  {
                    title: 'Cleaner Onboarding Checklist',
                    desc: 'What new cleaners need to know.',
                    sections: ['Background check requirement', 'Safety training', 'Cleaning standards checklist', 'Access protocol', 'Photo documentation']
                  },
                  {
                    title: 'Host Terms of Service',
                    desc: 'Website terms & conditions.',
                    sections: ['Booking terms', 'Payment processing', 'Cancellation policy', 'Liability limitation', 'Data privacy']
                  },
                ].map((doc, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{doc.title}</h3>
                        <p className="text-gray-600 text-sm">{doc.desc}</p>
                      </div>
                      <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700">
                        Download
                      </button>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-2">Sections:</div>
                      <div className="flex flex-wrap gap-2">
                        {doc.sections.map((section, j) => (
                          <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Marketing Tab */}
        {activeTab === 'marketing' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Go-To-Market Strategy</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Phase 1: Organic Acquisition (Week 1-3)</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="font-bold text-blue-700 mb-3">Facebook Group Strategy</div>
                      <p className="text-sm text-gray-700 mb-3">Post in LA Airbnb host groups (5+ thousand members each)</p>
                      <div className="bg-white rounded p-4 border border-blue-100 text-sm">
                        <p className="mb-2 font-semibold">Sample Post Copy:</p>
                        <p className="text-gray-700 italic">"Hey hosts! 👋 Just launched SpotlessLA — we handle turnovers so you don't have to. 3 hours, $180, guaranteed spotless. Offering 2 free cleanings for first reviews. West Hollywood, Venice, Silver Lake. Anyone interested? DM me!"</p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="font-bold text-green-700 mb-3">Nextdoor Strategy</div>
                      <p className="text-sm text-gray-700 mb-3">Post in 3 LA neighborhoods targeting property managers</p>
                      <div className="bg-white rounded p-4 border border-green-100 text-sm">
                        <p className="mb-2 font-semibold">Sample Post Copy:</p>
                        <p className="text-gray-700 italic">"Property managers & Airbnb hosts in West Hollywood — tired of last-minute cleaning issues? SpotlessLA specializes in fast turnovers. Fully insured, professional crew, same-day available. Let's chat!"</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Phase 2: Property Manager Outreach (Month 3)</h3>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <div className="font-bold text-purple-700 mb-3">Cold Email Template</div>
                    <div className="bg-white rounded p-4 border border-purple-100 text-sm font-mono">
                      <p className="mb-2"><span className="text-purple-600">Subject:</span> Dedicated cleaner for your [X] properties</p>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        Hi [PM Name],<br/>
                        <br/>
                        I know managing turnovers across multiple properties is a headache. Missed cleanings = lost revenue + guest complaints.<br/>
                        <br/>
                        We solve this: Dedicated cleaner, guaranteed 4-hour turnaround, $170/per property at volume (5+).<br/>
                        <br/>
                        Currently 50+ hosts in LA rely on us. Happy to do 2 free turnovers so you can see the quality.<br/>
                        <br/>
                        Worth a 10-min call?<br/>
                        <br/>
                        [Name]<br/>
                        SpotlessLA<br/>
                        [Phone]
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Ongoing: Review Generation & Reputation</h3>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="text-sm text-gray-700">
                        <strong>Google Reviews:</strong> Request after every job. Goal: 50+ reviews by Month 2 (4.8+ stars)
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="text-sm text-gray-700">
                        <strong>Airbnb Host Community:</strong> Recommend service in Airbnb forums. Cross-promote with host groups.
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="text-sm text-gray-700">
                        <strong>TurnoverBnB Listing:</strong> Premium position. Target: 200+ reviews on marketplace by Month 3.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="cro-section bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Launch?</h2>
          <p className="text-lg mb-8 opacity-90">
            This plan is built on real market data and tested pricing. Let's execute it.
          </p>
          <a href="/book" className="inline-block px-8 py-4 bg-white text-teal-600 rounded-lg font-bold hover:bg-gray-100">
            Book First Cleaning Now
          </a>
        </div>
      </section>
    </div>
  )
}
