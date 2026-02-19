export const SERVICES = [
  {
    value: 'standard',
    title: 'Standard Turnover',
    price: 180,
    priceLabel: '$180',
    time: '3–4 hours',
    desc: 'Perfect for 1-2 bedroom apartments and condos between guest checkouts.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop',
    popular: false,
    features: [
      'Change all bed linens & make beds',
      'Clean & disinfect all bathrooms',
      'Wipe down kitchen surfaces & appliances',
      'Vacuum & mop all floors',
      'Empty trash & replace liners',
      'Restock essentials (soap, paper goods)',
      'Quick walkthrough inspection',
      'Before/after photos sent to you',
    ],
  },
  {
    value: 'premium',
    title: 'Premium Turnover',
    price: 220,
    priceLabel: '$220',
    time: '4–5 hours',
    desc: 'For 3+ bedroom properties or hosts who want the extra detail.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop',
    popular: true,
    features: [
      'Everything in Standard Turnover',
      'Additional bedrooms & bathrooms',
      'Dust all surfaces & shelves',
      'Wipe down baseboards',
      'Clean interior windows',
      'Pre-guest quality checklist',
      'Priority scheduling',
      'Dedicated cleaner assignment',
    ],
  },
  {
    value: 'deep',
    title: 'Deep Clean',
    price: 350,
    priceLabel: '$350',
    time: '5–6 hours',
    desc: 'Monthly deep maintenance to keep your property in top condition.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop',
    popular: false,
    features: [
      'Everything in Premium Turnover',
      'Deep clean walls & ceilings',
      'Appliance detailing (oven, fridge)',
      'Vent & blinds cleaning',
      'Baseboards deep scrub',
      'Grout & tile treatment',
      'Cabinet interior cleaning',
      'Detailed inspection report',
    ],
  },
] as const

export const SERVICE_AREAS = [
  { area: 'West Hollywood', listings: '2,000+ listings' },
  { area: 'Venice', listings: '1,500+ listings' },
  { area: 'Santa Monica', listings: '1,800+ listings' },
  { area: 'Silver Lake', listings: '1,200+ listings' },
  { area: 'Downtown LA', listings: '1,500+ listings' },
  { area: 'Los Feliz', listings: '800+ listings' },
  { area: 'Beverly Hills', listings: '900+ listings' },
  { area: 'Hollywood', listings: '1,100+ listings' },
  { area: 'Koreatown', listings: '900+ listings' },
  { area: 'Echo Park', listings: '600+ listings' },
  { area: 'Mar Vista', listings: '500+ listings' },
  { area: 'Culver City', listings: '700+ listings' },
] as const

export const ADDONS = [
  { name: 'Laundry Service', price: '+$40', desc: 'We wash, dry, and fold all guest linens' },
  { name: 'Refrigerator Restock', price: '+$30', desc: 'Water bottles, snacks, and welcome essentials' },
  { name: 'Patio/Balcony Clean', price: '+$50', desc: 'Outdoor furniture wipe-down, sweep, and organize' },
  { name: 'Pet Hair Removal', price: '+$35', desc: 'Extra attention to upholstery and hard-to-reach areas' },
  { name: 'Carpet Steam Clean', price: '+$75', desc: 'Professional steam cleaning for carpeted areas' },
  { name: 'Same-Day Rush', price: '+$50', desc: 'Book before 10am for same-day cleaning service' },
] as const

export const TESTIMONIALS = [
  { name: 'Sarah M.', area: 'West Hollywood', properties: '2 units', text: 'Absolute lifesaver. Had a same-day turnover and Ready Rental Cleaning had the property guest-ready in under 3 hours. My guest reviews went from 4.2 to 4.8 since I started using them. The photo documentation alone is worth it.', rating: 5 },
  { name: 'David K.', area: 'Venice', properties: '5 units', text: 'I manage 5 properties and Ready Rental Cleaning handles all of them. Professional, reliable, and their booking system is so easy. I just click, pay, and forget about it. They assigned me a dedicated cleaner who knows all my properties now.', rating: 5 },
  { name: 'Maria L.', area: 'Silver Lake', properties: '1 unit', text: 'The best cleaning service I have found for Airbnb turnovers. Fast, thorough, and their before/after photos give me total peace of mind when I cannot be there in person. Worth every penny of the $180.', rating: 5 },
  { name: 'James T.', area: 'Santa Monica', properties: '3 units', text: 'No more stress about last-minute cleanings. Ready Rental Cleaning handles it all. I had an emergency same-day turnover and they got a cleaner out within 2 hours. That saved me a $400 booking.', rating: 5 },
  { name: 'Lisa R.', area: 'Downtown LA', properties: '4 units', text: 'Finally a cleaning service that understands Airbnb. They know what guests look for — spotless bathrooms, fresh linens, and that "wow" factor when they walk in. My Superhost status is thanks to them.', rating: 5 },
  { name: 'Michael P.', area: 'Los Feliz', properties: '2 units', text: 'The deep clean service is incredible. They got into corners and areas my previous cleaners never touched. My property looks brand new after every monthly deep clean. Highly recommend for any serious host.', rating: 5 },
  { name: 'Jennifer W.', area: 'Hollywood', properties: '6 units', text: 'As a property manager with 6 units, I needed someone who could handle volume. Ready Rental Cleaning assigns dedicated cleaners, sticks to schedule, and the admin dashboard lets me track everything. Game changer.', rating: 5 },
  { name: 'Carlos D.', area: 'Beverly Hills', properties: '3 units', text: 'Premium service for premium properties. My Beverly Hills listings need to be immaculate and Ready Rental Cleaning delivers every single time. The insurance and bonding gives my clients confidence too.', rating: 5 },
] as const

export const PRICE_MAP: Record<string, number> = {
  standard: 180,
  premium: 220,
  deep: 350,
}

export const SERVICE_LABEL_MAP: Record<string, string> = {
  standard: 'Standard Turnover',
  premium: 'Premium Turnover',
  deep: 'Deep Clean',
}
