import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  variant?: 'default' | 'positive' | 'negative' | 'dark';
  className?: string;
}

export function StatCard({ label, value, sub, variant = 'default', className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-5 border border-border bg-white',
        variant === 'dark' && 'bg-white border-l-4 border-l-primary',
        className
      )}
    >
      <p
        className={cn(
          'text-xs font-medium uppercase tracking-wider mb-2',
          'text-muted-foreground'
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'text-2xl font-bold',
          variant === 'dark' && 'text-foreground',
          variant === 'positive' && 'text-[color:var(--positive)]',
          variant === 'negative' && 'text-[color:var(--negative)]',
          variant === 'default' && 'text-foreground'
        )}
      >
        {value}
      </p>
      {sub && (
        <p className={cn('text-xs mt-1', variant === 'dark' ? 'text-white/50' : 'text-muted-foreground')}>
          {sub}
        </p>
      )}
    </div>
  );
}
