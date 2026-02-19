'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NumberTickerProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export function NumberTicker({ value, suffix = '', prefix = '', decimals = 0, className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const raw = useMotionValue(0)
  const spring = useSpring(raw, { stiffness: 80, damping: 20 })

  useEffect(() => {
    if (isInView) raw.set(value)
  }, [isInView, value, raw])

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      if (innerRef.current) {
        const formatted = decimals > 0
          ? v.toFixed(decimals)
          : (Math.round(v) >= 1000 ? Math.round(v).toLocaleString() : String(Math.round(v)))
        innerRef.current.textContent = prefix + formatted + suffix
      }
    })
    return unsubscribe
  }, [spring, prefix, suffix, decimals])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span ref={innerRef}>{prefix}0{suffix}</span>
    </span>
  )
}
