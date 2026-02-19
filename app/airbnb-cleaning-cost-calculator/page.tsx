'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export default function CostCalculator() {
  const [properties, setProperties] = useState(1)
  const [turnoversPerMonth, setTurnoversPerMonth] = useState(8)
  const [avgNightlyRate, setAvgNightlyRate] = useState(180)
  const [currentRating, setCurrentRating] = useState('4.2')

  const calc = useMemo(() => {
    const monthlyCleaningCost = turnoversPerMonth * 180 * properties
    const yearlyCleaningCost = monthlyCleaningCost * 12

    // Rating improvement model: professional cleaning → +0.6 stars avg
    const currentRatingNum = parseFloat(currentRating)
    const projectedRating = Math.min(5, currentRatingNum + 0.6)

    // Booking increase: each 0.1 star = ~5% more bookings
    const ratingDiff = projectedRating - currentRatingNum
    const bookingIncreasePct = ratingDiff * 5

    // Revenue impact
    const currentMonthlyBookings = turnoversPerMonth * properties
    const additionalBookings = Math.round(currentMonthlyBookings * (bookingIncreasePct / 100))
    const additionalMonthlyRevenue = additionalBookings * avgNightlyRate
    const additionalYearlyRevenue = additionalMonthlyRevenue * 12

    // Time saved (DIY: 5 hrs/turnover)
    const hoursSavedPerMonth = turnoversPerMonth * properties * 5
    const hoursSavedPerYear = hoursSavedPerMonth * 12

    // Missed cleaning cost avoided (avg 6 incidents/year for DIY/marketplace)
    const avoidedLosses = 6 * avgNightlyRate * properties

    // Net ROI
    const netAnnualGain = additionalYearlyRevenue + avoidedLosses - yearlyCleaningCost
    const monthlyNetGain = netAnnualGain / 12

    return {
      monthlyCleaningCost,
      yearlyCleaningCost,
      projectedRating: projectedRating.toFixed(1),
      bookingIncreasePct: Math.round(bookingIncreasePct),
      additionalBookings,
      additionalMonthlyRevenue,
      additionalYearlyRevenue,
      hoursSavedPerMonth,
      hoursSavedPerYear,
      avoidedLosses,
      netAnnualGain,
      monthlyNetGain,
    }
  }, [properties, turnoversPerMonth, avgNightlyRate, currentRating])

  const sliderClasses = 'w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary'
  const inputWrapperClasses = 'space-y-3'

  return (
    <div>
      <Section variant="hero" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">
            <Calculator className="w-3 h-3 mr-1" />
            ROI Calculator
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Airbnb Cleaning<br />
            <span className="text-primary">Cost Calculator</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            See exactly how much professional cleaning will cost — and how much MORE you'll earn from higher ratings. Plug in your numbers.
          </p>
        </div>
      </Section>

      <Section variant="default" padding="default">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Panel */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Your Numbers</h2>

              <div className="space-y-8">
                <div className={inputWrapperClasses}>
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold text-foreground">Properties</label>
                    <span className="text-sm font-bold text-primary">{properties}</span>
                  </div>
                  <input type="range" min={1} max={20} value={properties} onChange={(e) => setProperties(+e.target.value)} className={sliderClasses} />
                  <div className="flex justify-between text-xs text-muted-foreground"><span>1</span><span>20</span></div>
                </div>

                <div className={inputWrapperClasses}>
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold text-foreground">Turnovers per property/month</label>
                    <span className="text-sm font-bold text-primary">{turnoversPerMonth}</span>
                  </div>
                  <input type="range" min={2} max={20} value={turnoversPerMonth} onChange={(e) => setTurnoversPerMonth(+e.target.value)} className={sliderClasses} />
                  <div className="flex justify-between text-xs text-muted-foreground"><span>2</span><span>20</span></div>
                </div>

                <div className={inputWrapperClasses}>
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold text-foreground">Average nightly rate</label>
                    <span className="text-sm font-bold text-primary">${avgNightlyRate}</span>
                  </div>
                  <input type="range" min={80} max={500} step={10} value={avgNightlyRate} onChange={(e) => setAvgNightlyRate(+e.target.value)} className={sliderClasses} />
                  <div className="flex justify-between text-xs text-muted-foreground"><span>$80</span><span>$500</span></div>
                </div>

                <div className={inputWrapperClasses}>
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold text-foreground">Current rating</label>
                    <span className="text-sm font-bold text-primary">{currentRating}★</span>
                  </div>
                  <div className="flex gap-2">
                    {['3.8', '4.0', '4.2', '4.4', '4.6'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setCurrentRating(r)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                          currentRating === r
                            ? 'bg-primary text-primary-foreground shadow-depth-1'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {r}★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Your Results</h2>

              <div className="space-y-4">
                {/* Cleaning Cost */}
                <Card depth={1} className="p-6">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Cleaning Investment</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-extrabold text-foreground">${calc.monthlyCleaningCost.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">per month</p>
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-foreground">${calc.yearlyCleaningCost.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">per year</p>
                    </div>
                  </div>
                </Card>

                {/* Revenue Gains */}
                <Card depth={2} className="p-6 border-primary/20 bg-primary/5">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Revenue Gains
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-primary/10">
                      <span className="text-sm text-foreground">Projected rating</span>
                      <span className="text-sm font-bold text-primary">{currentRating}★ → {calc.projectedRating}★</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-primary/10">
                      <span className="text-sm text-foreground">Booking increase</span>
                      <span className="text-sm font-bold text-primary">+{calc.bookingIncreasePct}% more bookings</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-primary/10">
                      <span className="text-sm text-foreground">Additional bookings/month</span>
                      <span className="text-sm font-bold text-primary">+{calc.additionalBookings}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-primary/10">
                      <span className="text-sm text-foreground">Additional monthly revenue</span>
                      <span className="text-sm font-bold text-primary">+${calc.additionalMonthlyRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-primary/10">
                      <span className="text-sm text-foreground">Avoided losses (missed cleans)</span>
                      <span className="text-sm font-bold text-primary">+${calc.avoidedLosses.toLocaleString()}/year</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-foreground">Time saved</span>
                      <span className="text-sm font-bold text-primary">{calc.hoursSavedPerMonth} hrs/month</span>
                    </div>
                  </div>
                </Card>

                {/* Net Result */}
                <motion.div
                  key={calc.netAnnualGain}
                  initial={{ scale: 0.97, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`rounded-2xl p-6 text-center ${
                    calc.netAnnualGain >= 0
                      ? 'bg-emerald-50 border-2 border-emerald-200'
                      : 'bg-amber-50 border-2 border-amber-200'
                  }`}
                >
                  <p className="text-sm font-bold uppercase tracking-wider mb-1"
                    style={{ color: calc.netAnnualGain >= 0 ? '#047857' : '#b45309' }}
                  >
                    {calc.netAnnualGain >= 0 ? 'Net Annual Gain' : 'Near Break-Even'}
                  </p>
                  <p className="text-4xl font-extrabold mb-1"
                    style={{ color: calc.netAnnualGain >= 0 ? '#047857' : '#b45309' }}
                  >
                    {calc.netAnnualGain >= 0 ? '+' : ''}${Math.abs(calc.netAnnualGain).toLocaleString()}/year
                  </p>
                  <p className="text-sm" style={{ color: calc.netAnnualGain >= 0 ? '#059669' : '#d97706' }}>
                    {calc.netAnnualGain >= 0
                      ? `That\'s +$${Math.round(calc.monthlyNetGain).toLocaleString()}/month after cleaning costs`
                      : `Plus ${calc.hoursSavedPerYear} hours of your time back per year`
                    }
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="hero" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            The Math Is Clear
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Professional cleaning pays for itself. Book your first turnover and see the difference in your next review.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book" className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl font-semibold shadow-depth-2 hover:bg-primary/90 transition-all">
              Book Your First Cleaning
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
            <a href="/compare/diy-vs-professional" className="inline-flex items-center justify-center h-12 px-8 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-secondary transition-all">
              See Full Comparison
            </a>
          </div>
        </div>
      </Section>
    </div>
  )
}
