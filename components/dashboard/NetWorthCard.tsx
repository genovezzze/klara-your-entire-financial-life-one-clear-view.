import { Persona } from '@/lib/types';
import { formatCurrency, getNetWorth, getTotalAssets } from '@/lib/pensionCalculations';

interface NetWorthCardProps {
  persona: Persona;
}

export function NetWorthCard({ persona }: NetWorthCardProps) {
  const netWorth = getNetWorth(persona);
  const assets = getTotalAssets(persona);
  const liabilities = persona.mortgageDebt;
  const isPositive = netWorth >= 0;

  return (
    <div className="rounded-2xl bg-white border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Net Worth */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
            Total net worth
          </p>
          <p className={`text-5xl font-bold tracking-tight ${isPositive ? 'text-foreground' : 'text-[color:var(--negative)]'}`}>
            {formatCurrency(netWorth)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Monthly salary: <span className="font-semibold text-foreground">{formatCurrency(persona.salary)}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="text-center px-5 py-3 rounded-xl bg-secondary border border-border min-w-[100px]">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Assets</p>
            <p className="text-lg font-bold text-[color:var(--positive)]">{formatCurrency(assets)}</p>
          </div>
          <div className="text-center px-5 py-3 rounded-xl bg-secondary border border-border min-w-[100px]">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Liabilities</p>
            <p className={`text-lg font-bold ${liabilities > 0 ? 'text-[color:var(--negative)]' : 'text-foreground'}`}>
              {liabilities > 0 ? `(${formatCurrency(liabilities)})` : '€0'}
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar: assets vs liabilities */}
      {assets > 0 && (
        <div className="mt-5">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Assets coverage</span>
            <span>{Math.round((assets / (assets + liabilities)) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-400 rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.round((assets / (assets + liabilities)) * 100))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
