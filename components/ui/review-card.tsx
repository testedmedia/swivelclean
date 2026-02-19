'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Card } from './card'
import { cn } from '@/lib/utils'

interface ReviewCardProps {
  name: string
  area: string
  properties?: string
  text: string
  rating: number
  className?: string
}

export function ReviewCard({ name, area, properties, text, rating, className }: ReviewCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Card depth={1} className={cn('p-8', className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
              {initials}
            </div>
            <div>
              <div className="font-bold text-foreground">{name}</div>
              <div className="text-xs text-muted-foreground">
                {area}
                {properties && ` · ${properties}`}
              </div>
            </div>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">&ldquo;{text}&rdquo;</p>
      </Card>
    </motion.div>
  )
}
