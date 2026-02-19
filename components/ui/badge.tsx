import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground border-primary/20',
        success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        warning: 'bg-amber-50 text-amber-700 border-amber-100',
        destructive: 'bg-red-50 text-red-700 border-red-100',
        outline: 'bg-transparent border-border text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, className }))} {...props} />
}
