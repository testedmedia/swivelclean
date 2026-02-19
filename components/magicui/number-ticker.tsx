'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NumberTickerProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
}

export function NumberTicker({ value, suffix = '', prefix = '', className }: NumberTickerProps) {
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
        const rounded = Math.round(v)
        innerRef.current.textContent =
          prefix +
          (rounded >= 1000 ? rounded.toLocaleString() : String(rounded)) +
          suffix
      }
    })
    return unsubscribe
  }, [spring, prefix, suffix])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span ref={innerRef}>{prefix}0{suffix}</span>
    </span>
  )
}
