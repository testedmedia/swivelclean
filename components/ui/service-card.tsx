'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from './card'

interface ServiceCardProps {
  title: string
  price: string
  time: string
  desc?: string
  image: string
  features: readonly string[]
  popular?: boolean
  className?: string
}

export function ServiceCard({
  title,
  price,
  time,
  desc,
  image,
  features,
  popular = false,
  className,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn('relative', className)}
    >
      <Card depth={popular ? 2 : 1} className="overflow-hidden bg-white">
        <img src={image} alt={title} className="w-full h-52 object-cover" />
        <div className="p-8">
          {popular && (
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary border border-primary/30 rounded-full px-3 py-1 mb-3">
              Most Popular
            </span>
          )}
          <h3 className="text-2xl font-bold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{time}</p>
          {desc && <p className="text-sm text-muted-foreground mb-4">{desc}</p>}
          <div className="text-5xl font-extrabold text-primary mb-6">{price}</div>
          <ul className="space-y-3 mb-8">
            {features.map((f, j) => (
              <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <a
            href="/book"
            className={cn(
              'inline-flex items-center justify-center w-full h-11 px-6 rounded-xl font-semibold text-sm transition-colors duration-150',
              popular
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border-2 border-primary bg-white text-primary hover:bg-gray-50'
            )}
          >
            Book {title}
          </a>
        </div>
      </Card>
    </motion.div>
  )
}
