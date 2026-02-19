'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-depth-1 hover:bg-primary/90 hover:shadow-depth-2',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border-2 border-primary bg-background text-primary hover:bg-secondary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        white: 'bg-white text-primary shadow-depth-2 hover:shadow-depth-3',
        cta: 'bg-primary text-primary-foreground rounded-full px-8 py-3 shadow-lg hover:shadow-xl',
      },
      size: {
        default: 'h-11 px-6 py-2.5 rounded-xl text-sm',
        sm: 'h-9 px-4 text-xs rounded-lg',
        lg: 'h-14 px-8 text-base rounded-xl',
        icon: 'h-10 w-10 rounded-xl',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

type ButtonProps = HTMLMotionProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
