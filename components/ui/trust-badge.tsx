import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrustBadgeProps {
  icon: LucideIcon
  label: string
  className?: string
}

export function TrustBadge({ icon: Icon, label, className }: TrustBadgeProps) {
  return (
    <div className={cn('flex items-center gap-1.5 text-sm text-muted-foreground', className)}>
      <Icon className="w-4 h-4 text-primary" />
      {label}
    </div>
  )
}
