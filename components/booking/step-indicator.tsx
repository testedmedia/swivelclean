'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  num: number
  label: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <div className={cn('flex items-center justify-center gap-3', className)}>
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                scale: s.num === currentStep ? 1.1 : 1,
                backgroundColor:
                  s.num <= currentStep
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--muted))',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm',
                s.num <= currentStep
                  ? 'text-primary-foreground shadow-lg shadow-primary/30'
                  : 'text-muted-foreground'
              )}
            >
              {s.num < currentStep ? <Check className="w-5 h-5" /> : s.num}
            </motion.div>
            <span className="text-[10px] text-muted-foreground mt-1 font-medium">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <motion.div
              initial={false}
              animate={{
                backgroundColor:
                  s.num < currentStep
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--border))',
              }}
              className="w-12 h-0.5 mb-4"
            />
          )}
        </div>
      ))}
    </div>
  )
}
