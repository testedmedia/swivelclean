'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatCardProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  decimals?: number
  className?: string
}

export function StatCard({ value, suffix = '', prefix = '', label, decimals = 0, className }: StatCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const raw = useMotionValue(0)
  const spring = useSpring(raw, { stiffness: 80, damping: 20 })
  const display = useTransform(spring, (v) => {
    if (decimals > 0) return v.toFixed(decimals)
    const rounded = Math.round(v)
    return rounded >= 1000 ? rounded.toLocaleString() : String(rounded)
  })

  useEffect(() => {
    if (isInView) raw.set(value)
  }, [isInView, value, raw])

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
        {prefix}
        <span>{isInView ? <DisplayValue value={display} /> : '0'}</span>
        {suffix}
      </div>
      <div className="text-sm font-medium text-muted-foreground mt-1 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

function DisplayValue({ value }: { value: ReturnType<typeof useTransform<number, string>> }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const unsubscribe = value.on('change', (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return unsubscribe
  }, [value])

  return <span ref={ref}>0</span>
}
