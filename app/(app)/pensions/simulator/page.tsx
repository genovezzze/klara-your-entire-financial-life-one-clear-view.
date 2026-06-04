import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { getSession } from '@/lib/session';
import { db } from '@/lib/prisma';
import { profileToPersona } from '@/lib/profileToPersona';
import { Header } from '@/components/layout/Header';
import { StrategySimulator } from '@/components/pensions/StrategySimulator';
import { formatCurrency } from '@/lib/pensionCalculations';
import { Strategy } from '@/lib/types';

export default async function SimulatorPage({
  searchParams,
}: {
  searchParams: Promise<{ planId?: string }>;
}) {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  const { planId } = await searchParams;

  const [profile, selectedPlan] = await Promise.all([
    db.financialProfile.findUnique({ where: { userId: session.userId } }),
    planId ? db.pensionPlan.findUnique({ where: { id: planId } }) : null,
  ]);

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground text-sm">Please complete your financial profile first.</p>
        <Link href="/profile/setup"
          className="flex items-center gap-1.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-lg transition-colors">
          Complete profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const persona = profileToPersona(session.userId, session.name, profile);

  // If a plan is selected, override strategy with the plan's estimated return
  if (selectedPlan) {
    const estimatedReturn = selectedPlan.return5Y / 100;
    // Map to nearest strategy for display
    if (estimatedReturn >= 0.07) persona.currentStrategy = 'growth' as Strategy;
    else if (estimatedReturn >= 0.04) persona.currentStrategy = 'balanced' as Strategy;
    else persona.currentStrategy = 'conservative' as Strategy;
  }

  const currentBalance = persona.pensionBalance + persona.thirdPillarBalance;

  return (
    <div>
      <Header
        userName={session.name}
        title="Strategy Simulator"
        subtitle={
          selectedPlan
            ? `Simulation based on: ${selectedPlan.provider} — ${selectedPlan.planName}`
            : 'Compare pension strategies and see your projected value at retirement'
        }
      />

      {/* Selected plan banner */}
      {selectedPlan && (
        <div className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 mb-5">
          <Info className="w-4 h-4 text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              Simulating: {selectedPlan.provider} — {selectedPlan.planName}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {selectedPlan.strategy} strategy · 5Y historical return: +{selectedPlan.return5Y.toFixed(1)}% ·
              Fee: {selectedPlan.managementFee.toFixed(2)}% · Prototype data only
            </p>
          </div>
          <Link href="/pensions/simulator" className="text-xs text-muted-foreground hover:text-foreground underline whitespace-nowrap">
            Reset
          </Link>
        </div>
      )}

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total pension balance', value: formatCurrency(currentBalance) },
          { label: 'Your age', value: `${persona.age} years` },
          { label: 'Years until 65', value: `${Math.max(0, 65 - persona.age)} years` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-border px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="font-bold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <StrategySimulator persona={persona} />
    </div>
  );
}
