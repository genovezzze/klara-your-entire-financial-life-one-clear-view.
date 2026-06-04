import { Strategy } from '@/lib/types';
import { formatCurrency } from '@/lib/pensionCalculations';
import { cn } from '@/lib/utils';

interface StrategyCardProps {
  id: Strategy;
  label: string;
  annualReturn: number;
  description: string;
  riskLabel: string;
  projectedValue: number;
  isSelected: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

const riskColors: Record<string, string> = {
  'Low risk': 'bg-blue-50 text-blue-700 border-blue-200',
  'Medium risk': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'High risk': 'bg-red-50 text-red-700 border-red-200',
};

export function StrategyCard({
  label,
  annualReturn,
  description,
  riskLabel,
  projectedValue,
  isSelected,
  isCurrent,
  onClick,
}: StrategyCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left rounded-2xl border-2 p-5 transition-all',
        isSelected
          ? 'border-primary bg-secondary shadow-md'
          : 'border-border bg-white hover:border-primary/40 hover:bg-secondary/50'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-bold text-foreground text-base">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
        {isCurrent && (
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0 ml-2">
            Current
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span
          className={cn(
            'text-xs font-medium px-2.5 py-1 rounded-full border',
            riskColors[riskLabel] ?? 'bg-secondary text-muted-foreground border-border'
          )}
        >
          {riskLabel}
        </span>
        <span className="text-sm font-bold text-[color:var(--positive)]">
          ~{(annualReturn * 100).toFixed(1)}% / yr
        </span>
      </div>

      <div className="border-t border-border pt-3">
        <p className="text-xs text-muted-foreground mb-0.5">Projected at age 65</p>
        <p className={cn('text-lg font-bold', isSelected ? 'text-primary' : 'text-foreground')}>
          {formatCurrency(projectedValue)}
        </p>
      </div>
    </button>
  );
}
