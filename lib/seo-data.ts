// ═══════════════════════════════════════════════════════════════
// SEO Data — Neighborhood pages, comparison pages, service pages
// ═══════════════════════════════════════════════════════════════

export interface NeighborhoodData {
  slug: string
  name: string
  title: string
  description: string
  heroStat: string
  heroStatLabel: string
  listings: string
  avgNightlyRate: string
  avgOccupancy: string
  topPropertyTypes: string[]
  painPoints: string[]
  localContext: string
  nearbyAreas: string[]
}

export const NEIGHBORHOODS: NeighborhoodData[] = [
  {
    slug: 'west-hollywood',
    name: 'West Hollywood',
    title: 'Airbnb Cleaning in West Hollywood',
    description: 'Professional turnover cleaning for West Hollywood Airbnb and short-term rental hosts. Same-day available, $2M insured, before/after photos every time.',
    heroStat: '2,100+',
    heroStatLabel: 'Active STR listings in WeHo',
    listings: '2,100+',
    avgNightlyRate: '$195',
    avgOccupancy: '78%',
    topPropertyTypes: ['Luxury condos on Sunset Strip', 'Modern apartments near Melrose', 'Boutique studios in the Design District'],
    painPoints: ['High guest expectations in a premium market', 'Fast turnover needed between back-to-back bookings', 'Competition from 2,100+ other listings means reviews matter more'],
    localContext: 'West Hollywood is one of LA\'s most competitive short-term rental markets. With average nightly rates of $195 and occupancy above 78%, every turnover matters. A single bad review from a dirty unit can cost you $3,000+ in lost bookings over the next quarter.',
    nearbyAreas: ['Hollywood', 'Beverly Hills', 'Silver Lake'],
  },
  {
    slug: 'venice',
    name: 'Venice',
    title: 'Airbnb Cleaning in Venice Beach',
    description: 'Professional turnover cleaning for Venice Beach Airbnb hosts. Sand, salt, and high turnover demand a cleaning team built for beach properties.',
    heroStat: '1,800+',
    heroStatLabel: 'Active STR listings in Venice',
    listings: '1,800+',
    avgNightlyRate: '$210',
    avgOccupancy: '82%',
    topPropertyTypes: ['Beach-adjacent apartments', 'Abbot Kinney lofts', 'Boardwalk-facing studios'],
    painPoints: ['Sand tracked in constantly — requires deep floor attention', 'Salt air corrosion on fixtures needs regular wiping', 'High weekend turnover with Saturday check-in/check-out'],
    localContext: 'Venice properties command premium rates ($210/night avg) but require more intensive cleaning due to beach proximity. Sand in carpets, salt residue on windows, and outdoor furniture all need attention that generic cleaners miss. Our Venice-experienced cleaners know exactly what beach properties need.',
    nearbyAreas: ['Santa Monica', 'Marina del Rey', 'Mar Vista'],
  },
  {
    slug: 'santa-monica',
    name: 'Santa Monica',
    title: 'Airbnb Cleaning in Santa Monica',
    description: 'Professional turnover cleaning for Santa Monica vacation rentals. Premium service for a premium market — guaranteed spotless every time.',
    heroStat: '$225',
    heroStatLabel: 'Average nightly rate in Santa Monica',
    listings: '1,500+',
    avgNightlyRate: '$225',
    avgOccupancy: '80%',
    topPropertyTypes: ['Ocean-view condos', 'Luxury apartments near the Pier', 'Family-sized homes near Montana Ave'],
    painPoints: ['Premium guests expect hotel-level cleanliness', 'Large properties (2-3BR) need thorough, fast turnovers', 'Strict STR regulations mean compliance matters'],
    localContext: 'Santa Monica is LA\'s highest-rate short-term rental market. At $225/night average, your guests are paying for a premium experience — and they expect one. A 4.2-star rating in Santa Monica means 40% fewer bookings compared to a 4.8. Our cleaners deliver 4.8+ quality, guaranteed.',
    nearbyAreas: ['Venice', 'Brentwood', 'Pacific Palisades'],
  },
  {
    slug: 'silver-lake',
    name: 'Silver Lake',
    title: 'Airbnb Cleaning in Silver Lake',
    description: 'Professional turnover cleaning for Silver Lake Airbnb hosts. Reliable, insured, and built for the creative neighborhood\'s unique properties.',
    heroStat: '1,200+',
    heroStatLabel: 'Active STR listings in Silver Lake',
    listings: '1,200+',
    avgNightlyRate: '$175',
    avgOccupancy: '75%',
    topPropertyTypes: ['Hillside bungalows', 'Mid-century modern homes', 'Converted artist lofts'],
    painPoints: ['Unique layouts and vintage features need careful cleaning', 'Hill access can delay unreliable cleaners', 'Design-forward guests notice details others miss'],
    localContext: 'Silver Lake\'s character homes and design-forward spaces attract guests who notice every detail. Vintage tile, exposed beams, and curated decor need a cleaning team that treats your property with care. Our Silver Lake cleaners are trained on delicate surfaces and architectural details.',
    nearbyAreas: ['Los Feliz', 'Echo Park', 'Atwater Village'],
  },
  {
    slug: 'downtown-la',
    name: 'Downtown LA',
    title: 'Airbnb Cleaning in Downtown LA',
    description: 'Professional turnover cleaning for DTLA lofts and high-rises. Fast elevator access, building coordination, and guaranteed turnovers.',
    heroStat: '2,500+',
    heroStatLabel: 'Active STR listings in DTLA',
    listings: '2,500+',
    avgNightlyRate: '$165',
    avgOccupancy: '72%',
    topPropertyTypes: ['High-rise condos in South Park', 'Arts District lofts', 'Historic building conversions'],
    painPoints: ['Building access rules and elevator scheduling', 'High-volume weekday business travelers need quick turnovers', 'Shared amenity spaces mean cleanliness is visible to neighbors'],
    localContext: 'Downtown LA is the highest-volume short-term rental market in the city with 2,500+ listings. Many are high-rise condos with building management rules around cleaning access, elevator scheduling, and noise. We coordinate with your building so turnovers happen on time, every time.',
    nearbyAreas: ['Arts District', 'Koreatown', 'Little Tokyo'],
  },
  {
    slug: 'hollywood',
    name: 'Hollywood',
    title: 'Airbnb Cleaning in Hollywood',
    description: 'Professional turnover cleaning for Hollywood Airbnb hosts. Tourist-heavy area means high turnover — we keep up with your pace.',
    heroStat: '3,000+',
    heroStatLabel: 'Active STR listings in Hollywood',
    listings: '3,000+',
    avgNightlyRate: '$155',
    avgOccupancy: '76%',
    topPropertyTypes: ['Walk-to-everything apartments', 'Celebrity-adjacent homes', 'Modern studios near nightlife'],
    painPoints: ['Extremely high turnover during peak tourist season', 'Late checkouts from nightlife guests', 'Party damage needs quick assessment and documentation'],
    localContext: 'Hollywood sees more tourist traffic than almost any LA neighborhood. That means back-to-back bookings, late checkouts, and occasional party damage. You need a cleaning team that can handle the pace. We offer same-day turnovers and document any damage with photos so you can file claims immediately.',
    nearbyAreas: ['West Hollywood', 'Los Feliz', 'Koreatown'],
  },
  {
    slug: 'beverly-hills',
    name: 'Beverly Hills',
    title: 'Airbnb Cleaning in Beverly Hills',
    description: 'Premium turnover cleaning for Beverly Hills luxury rentals. White-glove service for high-end properties and discerning guests.',
    heroStat: '$350',
    heroStatLabel: 'Average nightly rate in Beverly Hills',
    listings: '800+',
    avgNightlyRate: '$350',
    avgOccupancy: '70%',
    topPropertyTypes: ['Luxury estates', 'High-end condos', 'Designer homes'],
    painPoints: ['Ultra-high guest expectations — luxury guests leave 1-star for minor issues', 'Premium surfaces (marble, hardwood, designer fixtures) need specialized care', 'High property values mean insurance coverage is non-negotiable'],
    localContext: 'Beverly Hills is LA\'s most demanding short-term rental market. At $350/night average, your guests expect perfection — and they have zero tolerance for anything less. One hair in the shower. One smudge on the marble. That\'s a 3-star review. Our $2M insurance, background-checked team, and white-glove checklist is built for this market.',
    nearbyAreas: ['West Hollywood', 'Bel Air', 'Century City'],
  },
]

export interface ComparisonData {
  slug: string
  competitor: string
  title: string
  description: string
  heroLine: string
  stats: { label: string; them: string; us: string; savings: string }[]
  risks: string[]
  verdict: string
}

export const COMPARISONS: ComparisonData[] = [
  {
    slug: 'diy-vs-professional',
    competitor: 'DIY Cleaning',
    title: 'DIY Cleaning vs. Ready Rental Cleaning',
    description: 'Think cleaning your Airbnb yourself saves money? The math says otherwise. See the real cost of DIY vs professional turnover cleaning.',
    heroLine: 'DIY cleaning costs you $847/month in lost revenue',
    stats: [
      { label: 'Time per turnover', them: '4-6 hours (your time)', us: '3-4 hours (our team)', savings: 'You save 4-6 hours per clean' },
      { label: 'Your hourly value', them: '$50-75/hr (opportunity cost)', us: '$0 — you\'re free to work', savings: '$200-450 saved per turnover in your time' },
      { label: 'Consistency', them: 'Varies by your energy level', us: '47-point checklist, every time', savings: '0.6 star rating improvement avg' },
      { label: 'Photo documentation', them: 'You remember to take photos maybe 50% of the time', us: 'Before/after photos every clean — automatic', savings: 'Protect yourself from $500+ damage claims' },
      { label: 'Same-day emergency', them: 'Cancel your plans or lose the booking', us: 'Book by 10am, we\'re there', savings: 'Save $150-250 per rescued booking' },
      { label: 'Monthly cost (8 turnovers)', them: '$0 cash + 32-48 hours of your life', us: '$1,440 (8 × $180)', savings: 'Net gain: $847/mo after accounting for your time + better reviews' },
    ],
    risks: [
      'Burnout — 73% of DIY hosts report cleaning fatigue within 6 months',
      'Inconsistency — your worst clean becomes your review',
      'No insurance — you\'re personally liable for any cleaning-related damage',
      'Missed details — tired eyes miss what fresh, trained eyes catch',
      'Scaling impossible — you can\'t clean 2 properties at once',
    ],
    verdict: 'DIY cleaning saves $1,440/month in cash but costs $2,287/month in your time, lost bookings from lower ratings, and missed damage documentation. Professional cleaning is a net positive of $847/month — and you get your weekends back.',
  },
  {
    slug: 'vs-thumbtack-cleaners',
    competitor: 'Thumbtack / TaskRabbit Cleaners',
    title: 'Thumbtack Cleaners vs. Ready Rental Cleaning',
    description: 'Marketplace cleaners are cheap. They\'re also unreliable, uninsured, and unfamiliar with Airbnb standards. Here\'s the real comparison.',
    heroLine: 'Marketplace cleaners have a 34% cancellation rate',
    stats: [
      { label: 'Cancellation rate', them: '34% cancel or no-show', us: '0% — guaranteed arrival', savings: 'Never lose a booking to a no-show cleaner' },
      { label: 'Insurance coverage', them: '$0 — you\'re liable', us: '$2M general liability', savings: 'Protected from $10K+ property damage claims' },
      { label: 'Background checks', them: 'Self-reported, unverified', us: 'Full background + reference check', savings: 'Peace of mind with strangers in your property' },
      { label: 'Airbnb-specific training', them: 'Generic house cleaning', us: '47-point Airbnb turnover checklist', savings: '0.4 avg star improvement vs generic cleaners' },
      { label: 'Photo documentation', them: 'Almost never', us: 'Before/after photos every clean', savings: 'Evidence for guest damage claims' },
      { label: 'Price per turnover', them: '$80-140 (when they show up)', us: '$180 flat rate', savings: '$40-100 more, but zero missed bookings ($150-250 each)' },
    ],
    risks: [
      'No-shows — a single missed cleaning can cost you a $200+ booking AND a bad review',
      'No accountability — marketplace cleaners move on, you\'re stuck with the bad review',
      'No continuity — different cleaner every time means retraining every time',
      'No Airbnb knowledge — generic cleaners don\'t know turnover protocols',
      'No recourse — marketplace platforms offer minimal dispute resolution',
    ],
    verdict: 'Marketplace cleaners cost $40-100 less per clean but the 34% cancellation rate means you\'ll lose 3+ bookings per year ($450-750+). Add in the insurance risk, inconsistency, and training overhead — professional Airbnb-specific cleaning pays for itself in month one.',
  },
  {
    slug: 'vs-independent-cleaners',
    competitor: 'Independent Cleaners',
    title: 'Hiring Your Own Cleaner vs. Ready Rental Cleaning',
    description: 'Found a great independent cleaner? What happens when they\'re sick, on vacation, or quit? See why a cleaning team beats a solo cleaner.',
    heroLine: 'Solo cleaners have zero backup — one sick day costs you $200+',
    stats: [
      { label: 'Backup coverage', them: 'None — if they\'re sick, you\'re stuck', us: 'Full team backup, guaranteed', savings: 'Never scramble for last-minute coverage' },
      { label: 'Vacation coverage', them: 'You find a temp yourself', us: 'Seamless — our team covers', savings: '2-4 weeks/year of stress eliminated' },
      { label: 'Training & QA', them: 'You train them yourself', us: 'Pre-trained, 47-point checklist, QA inspections', savings: '10+ hours saved on training' },
      { label: 'Insurance', them: 'Unlikely — you\'re liable', us: '$2M general liability', savings: 'Full property protection' },
      { label: 'Scaling', them: 'Find and vet another person', us: 'Just book more cleans', savings: 'Scale from 1 to 10 properties instantly' },
      { label: 'Monthly cost (8 turnovers)', them: '$960-1,280 + management time', us: '$1,440 flat, zero management', savings: 'Pay slightly more, get reliability + insurance + zero headaches' },
    ],
    risks: [
      'Single point of failure — their emergency becomes your emergency',
      'No insurance — personal liability for anything that goes wrong',
      'Turnover risk — if they quit, you start from scratch',
      'Management overhead — scheduling, paying, providing supplies, quality checks',
      'No photo documentation — it\'s "trust me" vs. our photo proof',
    ],
    verdict: 'A great independent cleaner is great — until they\'re not available. 100% of Airbnb hosts who hire solo cleaners face at least one emergency gap per year. That one gap costs $200-400 in lost bookings + the scramble to find last-minute coverage. A professional team means zero gaps, zero stress, full insurance.',
  },
  {
    slug: 'vs-turnoverbnb',
    competitor: 'TurnoverBnB',
    title: 'TurnoverBnB vs. Ready Rental Cleaning',
    description: 'TurnoverBnB connects you with random cleaners. We assign you a dedicated team. See why local expertise beats a marketplace.',
    heroLine: 'Marketplace rotation means a different cleaner every time',
    stats: [
      { label: 'Cleaner consistency', them: 'Different cleaner each time', us: 'Dedicated cleaner who learns your property', savings: '15 min saved per clean (no re-learning layout)' },
      { label: 'Platform fees', them: '15-20% markup on top of cleaner cost', us: '$180 flat — no hidden fees', savings: 'You know the exact cost, always' },
      { label: 'Local presence', them: 'National platform, varied local quality', us: 'LA-only, we know every neighborhood', savings: 'Cleaners who know WeHo is different from DTLA' },
      { label: 'Response time', them: '4-24 hours to match a cleaner', us: 'Under 2 hours, same-day available', savings: 'Never miss a same-day turnover' },
      { label: 'Quality guarantee', them: 'Platform dispute process', us: 'Free re-clean, no questions asked', savings: 'Instant resolution vs days of back-and-forth' },
      { label: 'Communication', them: 'Through the platform (delays)', us: 'Direct text/call with your cleaner', savings: 'Real-time updates, no middleman' },
    ],
    risks: [
      'Inconsistency — every cleaner has different standards',
      'Platform dependency — their outage = your problem',
      'No relationship — cleaners have no incentive to go above and beyond for you',
      'Hidden costs — platform fees, surge pricing during peak times',
      'Slow resolution — disputes go through platform support, not direct',
    ],
    verdict: 'TurnoverBnB works for occasional bookings in random cities. For LA hosts with regular turnover, a dedicated local team that knows your property, your preferences, and your neighborhood delivers consistent 4.8+ results that a rotating marketplace never can.',
  },
]

export interface ServicePageData {
  slug: string
  title: string
  description: string
  heroLine: string
  price: string
  time: string
  includes: string[]
  idealFor: string[]
  faq: { q: string; a: string }[]
}

export const SERVICE_PAGES: ServicePageData[] = [
  {
    slug: 'airbnb-turnover-cleaning-los-angeles',
    title: 'Airbnb Turnover Cleaning in Los Angeles',
    description: 'Professional Airbnb turnover cleaning across all of Los Angeles. Book in 60 seconds, guaranteed spotless, $180 flat rate. Serving WeHo, Venice, Santa Monica, Silver Lake, DTLA, and all LA neighborhoods.',
    heroLine: '200+ LA hosts trust us with their turnovers',
    price: '$180',
    time: '3-4 hours',
    includes: ['Full linen change (hotel-style bed making)', 'Bathroom deep clean + disinfection', 'Kitchen wipe-down + appliance cleaning', 'All floors vacuumed + mopped', 'Trash removal + liner replacement', 'Essentials restock check', 'Before/after photo documentation', '47-point quality checklist'],
    idealFor: ['1-2 bedroom Airbnb listings', 'Regular guest turnovers (same-day available)', 'Hosts who want consistent 4.8+ star reviews', 'Property managers scaling to 5+ units'],
    faq: [
      { q: 'How fast can you get to my property?', a: 'Same-day if you book before 10 AM. Otherwise, next-day guaranteed. Most turnovers are scheduled 24-48 hours in advance.' },
      { q: 'Do you bring your own supplies?', a: 'Yes. Hospital-grade disinfectants, HEPA vacuums, microfiber cloths, and eco-friendly products. All pet-safe and guest-safe.' },
      { q: 'What if my guest checks out late?', a: 'We build in a 1-hour buffer. If the delay is longer, we\'ll reschedule within the same day at no extra charge. Your next guest will not be affected.' },
    ],
  },
  {
    slug: 'same-day-airbnb-cleaning',
    title: 'Same-Day Airbnb Cleaning in Los Angeles',
    description: 'Emergency same-day turnover cleaning for LA Airbnb hosts. Book before 10 AM, we\'re there by afternoon. Never lose a booking to a cleaning gap.',
    heroLine: 'Book by 10 AM — we\'re at your door by 2 PM',
    price: '$230',
    time: '3-4 hours',
    includes: ['Everything in a standard turnover', 'Priority scheduling (skip the queue)', 'Guaranteed same-day arrival', 'Rush coordination with your check-in time', 'Real-time text updates on arrival', 'Before/after photos within 30 min of completion'],
    idealFor: ['Last-minute cancellations from your regular cleaner', 'Back-to-back bookings with tight windows', 'Emergency turnovers when guests check out late', 'New bookings that come in overnight'],
    faq: [
      { q: 'What\'s the cutoff for same-day service?', a: 'Book before 10 AM for guaranteed same-day. After 10 AM, call us — we can often still make it happen depending on our schedule.' },
      { q: 'Is there an extra fee?', a: 'Same-day turnovers are $230 (vs $180 standard). The $50 rush fee covers priority scheduling and guaranteed arrival.' },
      { q: 'How quickly do you arrive?', a: 'Typically within 2-4 hours of booking. We\'ll confirm your arrival window within 15 minutes of your booking.' },
    ],
  },
  {
    slug: 'vacation-rental-deep-clean',
    title: 'Vacation Rental Deep Cleaning in Los Angeles',
    description: 'Professional deep cleaning for LA vacation rentals. Top-to-bottom, every surface, every corner. $350 flat rate, before/after photos, $2M insured.',
    heroLine: 'The reset button for your rental property',
    price: '$350',
    time: '5-6 hours',
    includes: ['Everything in a standard turnover PLUS:', 'Wall washing and baseboard detailing', 'Inside all appliances (oven, fridge, dishwasher)', 'Vent and fan cleaning', 'Grout treatment in bathrooms', 'Window interior cleaning', 'Under and behind furniture', 'Cabinet interior wipe-down', 'Light fixture cleaning', 'Full before/after photo report'],
    idealFor: ['Monthly maintenance (recommended)', 'Before a new listing goes live', 'After a long-term guest checkout', 'Post-renovation or post-construction', 'Seasonal refresh (spring/fall)'],
    faq: [
      { q: 'How often should I get a deep clean?', a: 'Monthly is ideal for active listings. At minimum, quarterly. Properties with 15+ turnovers/month should deep clean every 2 weeks.' },
      { q: 'Can you do a deep clean same-day?', a: 'Deep cleans require 24-hour advance booking due to the time commitment (5-6 hours). For same-day, book a standard turnover instead.' },
      { q: 'What\'s the difference between a turnover and a deep clean?', a: 'A turnover makes your property guest-ready. A deep clean resets it to like-new condition. Turnovers focus on surfaces and linens. Deep cleans go inside, under, and behind everything.' },
    ],
  },
]
