import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { getSession } from '@/lib/session';
import { db } from '@/lib/prisma';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/common/StatCard';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, strategyLabels } from '@/lib/pensionCalculations';
import { Strategy } from '@/lib/types';

export default async function InvestingPage() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  const profile = await db.financialProfile.findUnique({ where: { userId: session.userId } });

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground text-sm">Please complete your financial profile first.</p>
        <Link href="/profile/setup" className="flex items-center gap-1.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-lg transition-colors">
          Complete profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const strategy = profile.currentStrategy as Strategy;
  const mockYield = strategy === 'growth' ? 8.2 : strategy === 'balanced' ? 5.5 : 3.5;
  const investments = Number(profile.investmentsValue);
  const monthlyContrib = Number(profile.monthlyContribution);

  return (
    <div>
      <Header userName={session.name} title="Investing" subtitle="Portfolio overview and auto-investing simulation" />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard label="Portfolio value" value={formatCurrency(investments)} variant="positive" />
        <StatCard label="Pension strategy" value={strategyLabels[strategy]} sub={`~${mockYield}% avg yield (illustrative)`} />
        <StatCard label="Monthly contribution" value={formatCurrency(monthlyContrib)} sub="From your profile" />
      </div>

      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <SectionTitle title="Mock broker connections" subtitle="No real broker is connected in this prototype" />
        <div className="space-y-3">
          {['Interactive Brokers', 'Swissquote', 'Trading 212'].map((broker) => (
            <div key={broker} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-foreground font-medium">{broker}</span>
              <Badge variant="secondary" className="text-xs">Not connected · Demo</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <SectionTitle title="Auto-investing simulation" />
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Monthly auto-invest', value: formatCurrency(monthlyContrib) },
            { label: 'Target allocation', value: '80% stocks / 20% bonds' },
            { label: 'Rebalancing', value: 'Quarterly (illustrative)' },
            { label: 'Est. annual return', value: `~${mockYield}%` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          Real trading is not implemented. This page shows data from your manually entered profile for
          demonstration purposes only. No real investment orders are placed.
        </p>
      </div>
    </div>
  );
}
