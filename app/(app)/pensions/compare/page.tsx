import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { db } from '@/lib/prisma';
import { Header } from '@/components/layout/Header';
import { CompareClient } from '@/components/pensions/CompareClient';

export default async function ComparePage() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  const [plans, profile] = await Promise.all([
    db.pensionPlan.findMany({ orderBy: { return5Y: 'desc' } }),
    db.financialProfile.findUnique({ where: { userId: session.userId } }),
  ]);

  const userProfile = profile
    ? {
        provider: profile.pensionProvider,
        planName: profile.pensionPlan,
        strategy: profile.currentStrategy,
        managementFee: undefined as number | undefined,
        return5Y: undefined as number | undefined,
      }
    : null;

  const serializedPlans = plans.map(p => ({
    id: p.id,
    provider: p.provider,
    planName: p.planName,
    pillar: p.pillar,
    strategy: p.strategy,
    riskLevel: p.riskLevel,
    return1Y: p.return1Y,
    return3Y: p.return3Y,
    return5Y: p.return5Y,
    managementFee: p.managementFee,
    totalAssets: p.totalAssets,
    participants: p.participants,
  }));

  return (
    <div>
      <Header
        userName={session.name}
        title="Compare Pension Plans"
        subtitle="Compare public-style pension plan data and simulate how different strategies may affect your long-term pension value."
      />
      <CompareClient plans={serializedPlans} userProfile={userProfile} />
    </div>
  );
}
