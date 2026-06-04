import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getSession } from '@/lib/session';
import { db } from '@/lib/prisma';
import { Header } from '@/components/layout/Header';
import { MortgagesContent } from '@/components/mortgages/MortgagesContent';

export default async function MortgagesPage() {
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

  return (
    <div>
      <Header userName={session.name} title="Mortgages & Loans" subtitle="Debt overview and refinancing simulation" />
      <MortgagesContent mortgageDebt={Number(profile.mortgageDebt)} />
    </div>
  );
}
