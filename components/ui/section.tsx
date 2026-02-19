import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sectionVariants = cva('px-4 sm:px-6 lg:px-8', {
  variants: {
    variant: {
      default: 'bg-background',
      muted: 'bg-muted/50',
      hero: 'bg-gradient-to-br from-secondary via-background to-cyan-50',
      cta: 'bg-gradient-to-r from-primary via-primary/95 to-cyan-700 text-primary-foreground',
    },
    padding: {
      default: 'py-20',
      lg: 'py-28',
      sm: 'py-12',
      none: '',
    },
  },
  defaultVariants: { variant: 'default', padding: 'default' },
})

type SectionProps = HTMLAttributes<HTMLElement> & VariantProps<typeof sectionVariants>

export function Section({ className, variant, padding, children, ...props }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ variant, padding, className }))} {...props}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
