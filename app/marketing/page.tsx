'use client'

import { useState } from 'react'

const sections = [
  { id: 'emails', label: 'Email Templates' },
  { id: 'facebook', label: 'Facebook Posts' },
  { id: 'twitter', label: 'X / Twitter' },
  { id: 'nextdoor', label: 'Nextdoor' },
  { id: 'google', label: 'Google Profile' },
  { id: 'cold', label: 'Cold Outreach' },
]

function CopyBox({ label, content }: { label: string; content: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{label}</h4>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs text-teal-600 hover:text-teal-700 font-semibold bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-all">
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-950 text-gray-200 rounded-xl p-5 text-sm leading-relaxed whitespace-pre-wrap font-mono border border-gray-800 overflow-x-auto">
        {content}
      </pre>
    </div>
  )
}

function EmailCard({ subject, preview, body }: { subject: string; preview: string; body: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden mb-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors text-left">
        <div className="flex-1 min-w-0 pr-4">
          <div className="font-bold text-gray-900 mb-0.5">{subject}</div>
          <div className="text-sm text-gray-500 truncate">{preview}</div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={(e) => { e.stopPropagation(); copy() }} className="flex items-center gap-1 text-xs text-teal-600 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg font-semibold">
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </button>
      {open && (
        <div className="border-t border-gray-100 bg-gray-50 p-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
            {body}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Marketing() {
  const [activeSection, setActiveSection] = useState('emails')

  const emailTemplates = [
    {
      subject: 'Your Ready Rental Cleaning booking is confirmed — [Property Address], [Date]',
      preview: 'Hi [Name], your cleaning is scheduled and everything is set.',
      body: `Hi [Name],

Great news — your cleaning is confirmed. Here are the details:

Service: [Service Type]
Property: [Address]
Date: [Date]
Time: [Time]
Cleaner: Will be assigned 24 hours before

You'll receive a reminder the day before with your cleaner's name and contact info.

After the cleaning, we'll send you before/after photos and your invoice.

Questions? Reply to this email or text us at (323) 555-0100.

– The Ready Rental Cleaning Team
hello@readyrentalcleaning.com | readyrentalcleaning.com`,
    },
    {
      subject: 'Reminder: Your Ready Rental Cleaning cleaning is tomorrow at [Time]',
      preview: "Just a heads up — we'll be there at [Time] tomorrow.",
      body: `Hi [Name],

Friendly reminder — your cleaning is tomorrow.

Date: [Date]
Time: [Time]
Address: [Address]
Cleaner: [Cleaner Name] — (323) 555-0101

Access Notes: [Notes]

Your cleaner will text you when they arrive. If anything changes, reply to this email ASAP.

See you tomorrow!

– Ready Rental Cleaning
hello@readyrentalcleaning.com`,
    },
    {
      subject: '[Address] is clean and guest-ready — photos inside',
      preview: "All done! Here's your cleaning report and before/after photos.",
      body: `Hi [Name],

Your property is spotless and guest-ready. Cleaning completed at [Time].

What we did:
- Linens changed and beds made
- Bathrooms deep cleaned and restocked
- Kitchen wiped down and appliances cleaned
- Floors vacuumed and mopped
- Trash removed and liners replaced
- Essentials restocked

Before/after photos: [Photo Link]

Invoice: [Invoice Link] — $[Amount] — paid

Leave us a review? It takes 30 seconds and means the world to us:
→ Google: [Google Review Link]

Thank you for choosing Ready Rental Cleaning. We'll see you next time.

– The Ready Rental Cleaning Team`,
    },
    {
      subject: 'How was your cleaning? Leave us a quick review',
      preview: '30 seconds. Helps us grow. Means everything.',
      body: `Hi [Name],

Your Ready Rental Cleaning cleaning was completed [X hours] ago. We hope [Address] is looking perfect for your next guest.

Would you take 30 seconds to leave us a review? It helps other hosts find us and helps our business grow.

⭐ Leave a Google Review: [Link]

Already on Airbnb? A mention to your guests works too.

If anything wasn't right with your cleaning, please reply to this email. We will make it right — guaranteed.

Thank you!

– [Cleaner Name] & The Ready Rental Cleaning Team`,
    },
    {
      subject: "You've been assigned a job — [Property Address], [Date] at [Time]",
      preview: 'New cleaning job assigned. Review details below.',
      body: `Hi [Cleaner Name],

You have a new job assigned. Here are the details:

Client: [Client Name]
Property: [Address]
Service: [Service Type]
Date: [Date]
Time: [Time]
Pay: $[Amount]

Access Instructions: [Notes]

Special requests: [Requests]

Please confirm by replying "Confirmed" to this message. If you can't make it, let us know immediately at (323) 555-0100.

Bring:
- All cleaning supplies
- Camera for before/after photos
- Linen set (if changing)

See you there!

– Ready Rental Cleaning Operations`,
    },
  ]

  const facebookPosts = [
    {
      label: 'Launch Post (Casual)',
      content: `Hey West Hollywood / Airbnb host community 👋

Launched a professional Airbnb turnover cleaning service right here in LA — Ready Rental Cleaning.

We handle everything: linens, bathrooms, kitchen, floors, restocking. Before/after photos after every clean. $180 for standard turnovers, same-day available.

Fully insured, background-checked cleaners only.

If you're tired of unreliable cleaners or doing it yourself between guests, we've got you.

Link to book in 60 seconds: readyrentalcleaning.com

Drop a comment or DM me if you have questions. Happy to answer anything.`,
    },
    {
      label: 'Social Proof Post',
      content: `Just completed our 50th Airbnb turnover in Los Angeles.

Starting to see a pattern with the hosts we work with: the ones who automate their cleaning with Ready Rental Cleaning consistently have 4.8+ star ratings. The ones doing it themselves or using inconsistent cleaners average 4.2.

It's not magic. It's just reliability.

We show up on time. We clean to hotel standards. We send photos so you can verify from your phone.

If you're hosting in WeHo, Venice, Silver Lake, Santa Monica, or anywhere in LA — we'd love to earn your business.

Book at readyrentalcleaning.com. First clean? We'll make sure it's perfect.`,
    },
    {
      label: 'Problem/Solution Post',
      content: `The #1 complaint I hear from LA Airbnb hosts:

"My cleaner cancelled last minute and I had a guest checking in at 3 PM."

We built Ready Rental Cleaning specifically to solve that. Same-day availability (book before 10 AM), backup cleaners for every job, and a 100% satisfaction guarantee — if something's off, we come back and re-clean for free.

$180 for a standard turnover. Linens, bathrooms, kitchen, floors, photos.

Serving West Hollywood, Venice, Santa Monica, Silver Lake, and all of LA.

Book at readyrentalcleaning.com`,
    },
    {
      label: 'Value Post (No Sell)',
      content: `For LA Airbnb hosts — 5 things to include in your cleaning checklist that most people miss:

1. Check under seat cushions (guests leave things)
2. Wipe the inside of the microwave (most overlooked)
3. Check the trash cans for liners (not just empty, but relined)
4. Dust the TV screen and remotes
5. Check the shower drain for hair

We go through a 47-point checklist on every clean. The details are what separate 4.5-star from 5-star reviews.

Running a short-term rental in LA? Happy to chat — DM me.`,
    },
    {
      label: 'Neighborhood-Specific Post',
      content: `West Hollywood Airbnb hosts — are you covered for summer?

WeHo has over 2,000 active short-term rental listings and occupancy is about to spike.

Ready Rental Cleaning is your on-call cleaning team. We specialize in Airbnb turnovers — $180 flat for 1-2BR, same-day available, fully insured, before/after photos every time.

No contracts. No minimum bookings. Just reliable, professional cleaning whenever you need it.

Book in 60 seconds at readyrentalcleaning.com`,
    },
  ]

  const twitterPosts = [
    {
      label: 'Thread Opener',
      content: `Running an Airbnb in LA?

5 things I learned after cleaning 1,000+ short-term rental turnovers in Los Angeles:

Thread 🧵`,
    },
    {
      label: 'Thread 1/5',
      content: `1/ Guests notice the smell first.

Before anything visual registers, they're already forming an opinion based on how the place smells.

Fresh linens + no chemical smell = 5-star review territory. Musty or heavy cleaner smell = instant 3 stars.`,
    },
    {
      label: 'Thread 2/5',
      content: `2/ The bathroom is your most important room.

A clean bathroom overrides almost everything else.
A dirty bathroom tanks your review no matter how good everything else is.

We spend 30% of our turnaround time in the bathroom. That ratio is correct.`,
    },
    {
      label: 'Single Tweet — Value',
      content: `LA Airbnb hosts: your cleaning cost is not your biggest expense.

Your biggest expense is the bookings you lose from a 4.2-star review.

Reliable cleaning isn't a cost. It's insurance.`,
    },
    {
      label: 'Single Tweet — Offer',
      content: `If you host on Airbnb in Los Angeles, we will make your property guest-ready in 3 hours.

$180 flat. Fully insured. Before/after photos. Same-day available.

readyrentalcleaning.com`,
    },
    {
      label: 'Single Tweet — Pain Point',
      content: `The worst feeling as an Airbnb host:

Guest checking in at 2 PM. Cleaner texts at noon: "Can't make it today."

We built Ready Rental Cleaning to end that. Same-day backup cleaners in LA. Always.`,
    },
    {
      label: 'Reply to Airbnb Host Complaint',
      content: `This is exactly why we started Ready Rental Cleaning. Reliable, insured turnovers with same-day availability in LA. $180 flat, before/after photos, 100% guarantee. readyrentalcleaning.com — happy to help.`,
    },
  ]

  const nextdoorPosts = [
    {
      label: 'Neighborhood Introduction',
      content: `Neighbors — just wanted to introduce myself.

I run Ready Rental Cleaning, a professional Airbnb turnover cleaning service right here in Los Angeles. We work with short-term rental hosts across WeHo, Venice, Silver Lake, Santa Monica, and the greater LA area.

What we do: professional turnovers between guest checkouts. Linens, bathrooms, kitchen, floors, restocking — $180 flat for 1-2BR units. Same-day available. Fully insured.

If you or anyone you know hosts on Airbnb and wants reliable cleaning they can count on, I'd love to connect.

Feel free to DM me or visit readyrentalcleaning.com.`,
    },
    {
      label: 'Recommendation Request Response',
      content: `Hi [Name] — I can help with this!

I run Ready Rental Cleaning, a professional Airbnb turnover cleaning service in LA. We specialize in short-term rental turnovers — $180 for 1-2BR, $220 for 3BR+. Fully insured, background-checked cleaners, before/after photos with every clean.

DM me or book directly at readyrentalcleaning.com. Happy to answer any questions.`,
    },
    {
      label: 'Helpful Tip Post',
      content: `For anyone hosting on Airbnb in this neighborhood —

One thing that made the biggest difference for my clients' ratings: a laminated house manual next to the TV. Wifi password, checkout instructions, nearby restaurants, parking info.

Guests who feel informed leave better reviews. Simple as that.

If you need reliable cleaning for your short-term rental, that's what Ready Rental Cleaning does. Happy to help — readyrentalcleaning.com`,
    },
  ]

  const coldEmail = `Subject: Reliable Airbnb cleaning for your [X] properties — Ready Rental Cleaning LA

Hi [Property Manager Name],

I noticed you manage several short-term rental properties in [Neighborhood/Area]. I'm reaching out because I think we can help.

Ready Rental Cleaning is a professional Airbnb turnover cleaning service based in LA. We work with property managers running anywhere from 2 to 20+ units.

What we offer:
- $180/turnover for 1-2BR (volume discounts available for 5+ units)
- Same-day availability (book by 10 AM)
- Dedicated cleaner per property after first 3 cleans
- Before/after photos emailed after every job
- $2M general liability insurance
- 100% satisfaction guarantee — we re-clean for free if anything's off

For property managers, we also offer:
- Consolidated billing (monthly invoice for all properties)
- Priority scheduling
- Direct cleaner communication

I'd love to offer a free trial cleaning on one of your properties so you can see the quality firsthand.

Would 15 minutes this week work to talk?

Best,
[Your Name]
Ready Rental Cleaning LA
hello@readyrentalcleaning.com
(323) 555-0100
readyrentalcleaning.com`

  const googleProfile = `Ready Rental Cleaning LA — Professional Airbnb & Short-Term Rental Cleaning Service in Los Angeles

We specialize in fast, reliable turnover cleaning for Airbnb and short-term rental hosts across Los Angeles — from West Hollywood to Venice, Silver Lake to Santa Monica.

Services:
• Standard Turnover — $180 (1-2BR, 3-4 hours)
• Premium Turnover — $220 (3BR+, 4-5 hours)
• Deep Clean — $295 (full property, 5-6 hours)

What's included: all cleaning supplies, $2M liability insurance, before/after photo documentation, 24h reminder, 100% satisfaction guarantee.

Background-checked, insured professionals. Same-day availability (book before 10 AM).

Serving: West Hollywood, Venice, Santa Monica, Silver Lake, Los Feliz, Downtown LA, Beverly Hills, Hollywood, Koreatown, Echo Park, Mar Vista, Culver City, and surrounding areas.

Book in 60 seconds at readyrentalcleaning.com or call (323) 555-0100.`

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero section-padding-lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge mb-6">Marketing Assets</div>
          <h1 className="heading-xl mb-6">
            Everything Ready to{' '}
            <span className="text-teal-600">Launch</span>
          </h1>
          <p className="subtext max-w-2xl mx-auto">
            Email templates, Facebook posts, Twitter threads, Nextdoor copy, cold outreach scripts, and your Google Business profile — all written and ready to copy-paste.
          </p>
        </div>
      </section>

      {/* Nav Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2 no-scrollbar">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeSection === s.id
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="max-w-5xl mx-auto">

          {/* EMAIL TEMPLATES */}
          {activeSection === 'emails' && (
            <div>
              <div className="mb-10">
                <h2 className="heading-lg mb-3">Email Templates</h2>
                <p className="text-gray-500">5 production-ready emails. These fire automatically via Resend when you use the booking system. Click any email to preview the full body — copy to customize.</p>
              </div>

              <div className="grid md:grid-cols-5 gap-4 mb-10">
                {[
                  { label: 'Booking Confirmed', num: '01', desc: 'Fires immediately after booking' },
                  { label: '24h Reminder', num: '02', desc: 'Day before the cleaning' },
                  { label: 'Job Complete', num: '03', desc: 'After marked done in admin' },
                  { label: 'Review Request', num: '04', desc: '2 hours after completion' },
                  { label: 'Cleaner Assignment', num: '05', desc: 'When you assign a cleaner' },
                ].map((item, i) => (
                  <div key={i} className="card p-5 text-center">
                    <div className="text-2xl font-extrabold text-teal-600 mb-1">{item.num}</div>
                    <div className="font-bold text-gray-900 text-sm mb-1">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {emailTemplates.map((email, i) => (
                  <EmailCard key={i} subject={email.subject} preview={email.preview} body={email.body} />
                ))}
              </div>

              <div className="mt-8 bg-teal-50 border border-teal-200 rounded-2xl p-6">
                <h3 className="font-bold text-teal-800 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  How These Are Sent
                </h3>
                <p className="text-sm text-teal-700 leading-relaxed">
                  All 5 emails are pre-coded in <code className="bg-teal-100 px-1.5 py-0.5 rounded font-mono text-xs">lib/email.ts</code> and sent via <strong>Resend</strong>. Email 1 fires automatically when a booking is created. Emails 2-5 are triggered from the admin dashboard or automatically by the system. Configure your Resend API key in <code className="bg-teal-100 px-1.5 py-0.5 rounded font-mono text-xs">.env</code>.
                </p>
              </div>
            </div>
          )}

          {/* FACEBOOK */}
          {activeSection === 'facebook' && (
            <div>
              <div className="mb-10">
                <h2 className="heading-lg mb-3">Facebook Posts</h2>
                <p className="text-gray-500 mb-6">5 post variations ready to copy-paste into LA Airbnb host Facebook groups. Post in <strong>WeHo Airbnb Hosts, LA Short-Term Rental Network, Airbnb Hosts of LA</strong>, and any neighborhood-specific groups.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                  <strong>Strategy:</strong> Don't spam. Post 1 per week, rotate variations, and engage with comments. Mix value posts (tips) with offer posts (2:1 ratio). Always reply to every comment within 1 hour.
                </div>
              </div>
              {facebookPosts.map((post, i) => (
                <CopyBox key={i} label={post.label} content={post.content} />
              ))}
            </div>
          )}

          {/* TWITTER */}
          {activeSection === 'twitter' && (
            <div>
              <div className="mb-10">
                <h2 className="heading-lg mb-3">X / Twitter Posts</h2>
                <p className="text-gray-500 mb-6">Thread and standalone tweet options. The thread gets the most reach — post it first, then single tweets for ongoing presence.</p>
                <div className="bg-gray-800 text-gray-200 rounded-xl p-4 text-sm">
                  <strong className="text-white">Hashtags to add:</strong> #Airbnb #AirbnbHost #LosAngeles #ShortTermRental #STR #WestHollywood
                </div>
              </div>
              {twitterPosts.map((post, i) => (
                <CopyBox key={i} label={post.label} content={post.content} />
              ))}
            </div>
          )}

          {/* NEXTDOOR */}
          {activeSection === 'nextdoor' && (
            <div>
              <div className="mb-10">
                <h2 className="heading-lg mb-3">Nextdoor Posts</h2>
                <p className="text-gray-500 mb-6">Nextdoor is hyperlocal. Post in your specific neighborhood + adjacent areas. These perform best as genuine neighborhood introductions, not ads.</p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
                  <strong>Tip:</strong> On Nextdoor, lead with value and community. Heavy selling gets flagged. These posts are written to feel genuine. Also scan for anyone asking for cleaning recommendations — the reply template is perfect for that.
                </div>
              </div>
              {nextdoorPosts.map((post, i) => (
                <CopyBox key={i} label={post.label} content={post.content} />
              ))}
            </div>
          )}

          {/* GOOGLE */}
          {activeSection === 'google' && (
            <div>
              <div className="mb-10">
                <h2 className="heading-lg mb-3">Google Business Profile</h2>
                <p className="text-gray-500 mb-6">Copy this into your Google Business Profile description. Set up your profile at <a href="https://business.google.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">business.google.com</a> — it's free and drives massive organic traffic from hosts searching "Airbnb cleaning LA".</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800 mb-6">
                  <strong>Priority setup checklist:</strong><br />
                  1. Create Google Business Profile (15 min)<br />
                  2. Add this description<br />
                  3. Upload 10+ photos of cleaned properties<br />
                  4. Get your first 5 reviews (ask your first clients!)<br />
                  5. Respond to every review within 24 hours
                </div>
              </div>
              <CopyBox label="Google Business Description" content={googleProfile} />

              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-4">Suggested Business Profile Categories</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {['House Cleaning Service', 'Cleaning Service', 'Maid Service', 'Janitorial Service'].map((cat, i) => (
                    <div key={i} className="flex items-center gap-3 card p-3">
                      <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span className="text-sm font-medium text-gray-700">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COLD OUTREACH */}
          {activeSection === 'cold' && (
            <div>
              <div className="mb-10">
                <h2 className="heading-lg mb-3">Cold Outreach — Property Managers</h2>
                <p className="text-gray-500 mb-6">One property manager with 10 units = $1,800+/month guaranteed. This email targets them directly. Find them on LinkedIn, Airbnb host forums, or search "{`"[Neighborhood] property management"`}" on Google.</p>
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-teal-800 mb-6">
                  <strong>Where to find property managers:</strong><br />
                  • LinkedIn search: "short-term rental property manager Los Angeles"<br />
                  • Google: "Airbnb management company West Hollywood"<br />
                  • TurnoverBnB.com — list your services, get inbound leads<br />
                  • Guesty, Lodgify, Hostaway partner directories
                </div>
              </div>
              <CopyBox label="Cold Email — Property Manager" content={coldEmail} />

              <div className="mt-8">
                <h3 className="font-bold text-gray-900 mb-4">TurnoverBnB Listing Description</h3>
                <CopyBox label="TurnoverBnB / Marketplace Profile" content={`Ready Rental Cleaning LA — Professional Airbnb Turnover Cleaning in Los Angeles

Serving: West Hollywood, Venice, Santa Monica, Silver Lake, Los Feliz, Downtown LA, Beverly Hills, Hollywood, and all of LA County.

Services:
• Standard Turnover — $180 (1-2BR)
• Premium Turnover — $220 (3BR+)
• Deep Clean — $295

Why choose us:
• $2M general liability insurance — your property is protected
• Background-checked and vetted cleaners
• Before/after photos with every clean
• 100% satisfaction guarantee — free re-clean if anything is off
• Same-day availability (book before 10 AM)
• 24h confirmation and reminder emails

We've completed 1,200+ turnovers in LA. Consistent, reliable, professional.

Response time: under 2 hours
Minimum notice: 4 hours (same-day available with rush fee)`} />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-cta text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Start Booking?</h2>
          <p className="text-lg text-teal-100 mb-8">The website is live. The emails are wired. The copy is ready. Time to get clients.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="btn-white">
              Book First Cleaning
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="/admin" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
              View Admin Dashboard
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
