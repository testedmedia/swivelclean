'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: string
  label: string
}

export function StatsBar({ stats }: { stats: Stat[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="text-3xl font-extrabold text-primary mb-1">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
