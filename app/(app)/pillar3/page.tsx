import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { getSession } from '@/lib/session';
import { db } from '@/lib/prisma';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/common/StatCard';
import { formatCurrency } from '@/lib/pensionCalculations';

const providers = [
  { name: 'INDEXO', fund: 'Global Equity 3rd', risk: 'High', fee: '0.39%' },
  { name: 'Swedbank', fund: 'Index 100', risk: 'High', fee: '0.50%' },
  { name: 'SEB', fund: 'Active Balanced', risk: 'Medium', fee: '1.10%' },
  { name: 'Citadele', fund: 'Conservative Plus', risk: 'Low', fee: '0.85%' },
  { name: 'Luminor', fund: 'Balanced Pension', risk: 'Medium', fee: '0.95%' },
];

export default async function Pillar3Page() {
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

  const thirdPillar = Number(profile.thirdPillarBalance);
  const monthlyContrib = Number(profile.monthlyContribution);
  const taxBenefit = Math.round(thirdPillar * 0.20 * 0.10);

  return (
    <div>
      <Header userName={session.name} title="3rd & 4th Pillar" subtitle="Private pension funds with tax benefits" />

      {thirdPillar > 0 ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <StatCard label="Total balance" value={formatCurrency(thirdPillar)} variant="positive" />
            <StatCard label="Est. annual tax return" value={formatCurrency(taxBenefit)} sub="~20% of contributions up to limit" variant="positive" />
            <StatCard label="Monthly contribution" value={formatCurrency(monthlyContrib)} sub="From your profile" />
          </div>
          <div className="bg-white rounded-2xl border border-border p-5 mb-4">
            <p className="text-sm font-semibold text-foreground mb-3">How it works</p>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside leading-relaxed">
              <li>Contributions to a 3rd pillar pension are eligible for 20% income tax relief.</li>
              <li>Maximum deductible: 10% of annual gross income or €4,000/year (whichever is lower).</li>
              <li>Funds are locked until age 55, unless you accept a penalty.</li>
              <li>Declare contributions in your annual tax return to receive the benefit.</li>
            </ul>
          </div>
        </>
      ) : (
        <div className="bg-white border border-border border-l-4 border-l-primary rounded-2xl p-6 mb-6">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">You don&apos;t have a 3rd pillar yet</p>
          <p className="text-2xl font-bold mb-3 text-foreground">Is it worth it?</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Contributing to a 3rd pillar gives you a <strong className="text-primary">20% income tax return</strong> on contributions — up to a limit. That&apos;s free money from the government.
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-border overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-border">
          <p className="font-semibold text-foreground text-sm">Compare Latvian providers</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary text-muted-foreground text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3">Provider</th>
              <th className="text-left px-5 py-3">Fund</th>
              <th className="text-left px-5 py-3">Risk</th>
              <th className="text-left px-5 py-3">Mgmt fee</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p, i) => (
              <tr key={p.name} className={i % 2 === 0 ? 'bg-white' : 'bg-secondary/30'}>
                <td className="px-5 py-3 font-semibold text-foreground">{p.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{p.fund}</td>
                <td className="px-5 py-3 text-muted-foreground">{p.risk}</td>
                <td className="px-5 py-3 text-muted-foreground">{p.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          Provider data is illustrative. Check official providers for current fees and returns.
          Tax rules apply for Latvian residents.
        </p>
      </div>
    </div>
  );
}
