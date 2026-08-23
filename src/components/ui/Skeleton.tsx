interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circle' | 'card'
}

export function Skeleton({
  className = '',
  variant = 'text',
}: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded-lg',
    circle: 'h-10 w-10 rounded-full',
    card: 'h-32 w-full rounded-2xl',
  }

  return (
    <div
      aria-hidden="true"
      className={[
        'animate-pulse bg-slate-200',
        variants[variant],
        className,
      ].join(' ')}
    />
  )
}
