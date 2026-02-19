import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva('rounded-2xl bg-card text-card-foreground transition-all duration-300', {
  variants: {
    depth: {
      0: '',
      1: 'shadow-depth-1 border border-border/60',
      2: 'shadow-depth-2 border border-border/40',
      3: 'shadow-depth-3 border border-border/20',
    },
    hover: {
      none: '',
      lift: 'hover:shadow-depth-2 hover:-translate-y-1',
      glow: 'hover:shadow-glow-teal',
    },
  },
  defaultVariants: { depth: 1, hover: 'none' },
})

type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, depth, hover, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ depth, hover, className }))} {...props} />
  )
)
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-bold leading-none tracking-tight', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
