import { Persona } from '@/lib/types';
import { formatCurrency, calculateFutureValue, getAnnualReturn, strategyLabels } from '@/lib/pensionCalculations';

interface PensionOverviewCardProps {
  persona: Persona;
}

export function PensionOverviewCard({ persona }: PensionOverviewCardProps) {
  const years = Math.max(0, 65 - persona.age);
  const rate = getAnnualReturn(persona.currentStrategy);
  const projected = calculateFutureValue(persona.pensionBalance, rate, years);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Dark card: current state */}
      <div className="rounded-2xl bg-white border border-border p-6 border-l-4 border-l-primary">
        <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Current balance — 2nd Pillar</p>
        <p className="text-3xl font-bold mb-4 text-foreground">{formatCurrency(persona.pensionBalance)}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-4 border-t border-border">
          {[
            { label: 'Current provider', value: persona.provider },
            { label: 'Investment plan', value: persona.plan },
            { label: 'Current strategy', value: strategyLabels[persona.currentStrategy] },
            { label: 'Risk profile', value: persona.riskProfile },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Light card: projection */}
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-white border border-border p-5 flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Projected value at age 65
          </p>
          <p className="text-2xl font-bold text-[color:var(--positive)] mb-1">{formatCurrency(projected)}</p>
          <p className="text-xs text-muted-foreground">
            Based on {strategyLabels[persona.currentStrategy]} strategy · {years} years
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2 italic">
            Projected values are illustrative and do not guarantee future performance.
          </p>
        </div>
      </div>
    </div>
  );
}
