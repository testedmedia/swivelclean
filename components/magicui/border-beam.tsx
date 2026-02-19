import { cn } from '@/lib/utils'

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
}

export function BorderBeam({
  className,
  size = 200,
  duration = 4,
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]',
        className
      )}
      style={
        {
          '--border-beam-size': `${size}px`,
          '--border-beam-duration': `${duration}s`,
          '--border-beam-delay': `${delay}s`,
          maskImage: `conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 10%, black 36%, transparent 62%, transparent 100%)`,
          WebkitMaskImage: `conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 10%, black 36%, transparent 62%, transparent 100%)`,
          backgroundImage: `conic-gradient(from calc(var(--border-beam-angle, 0deg)), transparent 0%, hsl(var(--primary)) 20%, transparent 40%)`,
          animation: `border-beam-spin var(--border-beam-duration) linear var(--border-beam-delay) infinite`,
        } as React.CSSProperties
      }
    />
  )
}
