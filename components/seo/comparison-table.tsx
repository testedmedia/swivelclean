'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Row {
  label: string
  them: string
  us: string
  savings: string
}

export function ComparisonTable({ rows, competitorName }: { rows: Row[]; competitorName: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left text-sm font-bold text-muted-foreground uppercase tracking-wider py-4 px-4 border-b-2 border-border">Factor</th>
            <th className="text-left text-sm font-bold text-red-500 uppercase tracking-wider py-4 px-4 border-b-2 border-red-200 bg-red-50/50">{competitorName}</th>
            <th className="text-left text-sm font-bold text-primary uppercase tracking-wider py-4 px-4 border-b-2 border-primary/30 bg-primary/5">Ready Rental</th>
            <th className="text-left text-sm font-bold text-emerald-600 uppercase tracking-wider py-4 px-4 border-b-2 border-emerald-200 bg-emerald-50/50">Your Savings</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.label}
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.35, ease: 'easeOut' }}
              className="border-b border-border/60 hover:bg-muted/30 transition-colors"
            >
              <td className="py-4 px-4 text-sm font-semibold text-foreground">{row.label}</td>
              <td className="py-4 px-4 text-sm text-red-600 bg-red-50/30">{row.them}</td>
              <td className="py-4 px-4 text-sm text-primary font-medium bg-primary/5">{row.us}</td>
              <td className="py-4 px-4 text-sm text-emerald-700 font-semibold bg-emerald-50/30">{row.savings}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
