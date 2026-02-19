'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ShimmerButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function ShimmerButton({ children, className, onClick, href }: ShimmerButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-primary-foreground bg-primary rounded-lg shadow-depth-2 hover:bg-primary/90 transition-colors',
    className
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
