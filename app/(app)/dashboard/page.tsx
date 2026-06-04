import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Landmark, PiggyBank, TrendingUp, Home, ChevronRight } from 'lucide-react';
import { getSession } from '@/lib/session';
import { db } from '@/lib/prisma';
import { profileToPersona } from '@/lib/profileToPersona';
import { Header } from '@/components/layout/Header';
import { NetWorthCard } from '@/components/dashboard/NetWorthCard';
import { AssetBreakdownChart } from '@/components/dashboard/AssetBreakdownChart';
import { ProjectionChart } from '@/components/dashboard/ProjectionChart';
import { formatCurrency, strategyLabels } from '@/lib/pensionCalculations';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  const profile = await db.financialProfile.findUnique({
    where: { userId: session.userId },
  });

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground text-sm">Please complete your financial profile first.</p>
        <Link href="/profile/setup">
          <Button className="gap-2">Complete profile <ArrowRight className="w-3.5 h-3.5" /></Button>
        </Link>
      </div>
    );
  }

  const persona = profileToPersona(session.userId, session.name, profile);
  const totalAssets = persona.pensionBalance + persona.thirdPillarBalance + persona.investments;
  const netWorth = totalAssets - persona.mortgageDebt;

  const categories = [
    {
      href: '/pensions',
      icon: Landmark,
      label: '2nd Pillar Pension',
      value: formatCurrency(persona.pensionBalance),
      sub: `${strategyLabels[persona.currentStrategy]} · ${persona.provider}`,
      positive: true,
    },
    {
      href: '/pillar3',
      icon: PiggyBank,
      label: '3rd Pillar',
      value: formatCurrency(persona.thirdPillarBalance),
      sub: persona.thirdPillarBalance > 0 ? 'Active' : 'Not active',
      positive: true,
    },
    {
      href: '/investing',
      icon: TrendingUp,
      label: 'Investments',
      value: formatCurrency(persona.investments),
      sub: 'Portfolio value',
      positive: true,
    },
    {
      href: '/mortgages',
      icon: Home,
      label: 'Mortgage & Loans',
      value: persona.mortgageDebt > 0 ? `(${formatCurrency(persona.mortgageDebt)})` : '€0',
      sub: persona.mortgageDebt > 0 ? 'Outstanding debt' : 'No active debt',
      positive: false,
    },
  ];

  return (
    <div className="space-y-7">
      <Header
        userName={session.name}
        title={`Welcome back, ${session.name}`}
        subtitle="Here's your financial overview"
      />

      {/* Net Worth Hero */}
      <NetWorthCard persona={persona} />

      {/* Category cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(({ href, icon: Icon, label, value, sub, positive }) => (
          <Link key={href} href={href}>
            <div className="bg-white rounded-2xl border border-border p-4 hover:shadow-md transition-all hover:-translate-y-0.5 group h-full border-l-4 border-l-gray-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-xl font-bold mb-1 ${positive ? 'text-foreground' : persona.mortgageDebt > 0 ? 'text-[color:var(--negative)]' : 'text-foreground'}`}>
                {value}
              </p>
              <p className="text-xs text-muted-foreground truncate">{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AssetBreakdownChart persona={persona} />
        <ProjectionChart persona={persona} />
      </div>

      {/* Pension CTA */}
      <div className="bg-white rounded-2xl border border-border p-5 flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground mb-1">Ready to compare pension strategies?</p>
          <p className="text-sm text-muted-foreground">
            See how Conservative, Balanced or Growth affects your pension at 65.
          </p>
        </div>
        <Link href="/pensions/simulator" className="ml-4 shrink-0">
          <Button className="gap-2">
            Open simulator <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Footer info */}
      <p className="text-xs text-center text-muted-foreground pb-2">
        Data source: manually entered and stored in Neon · This is a prototype, not financial advice.
      </p>

    </div>
  );
}
