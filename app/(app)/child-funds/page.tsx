import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { Header } from '@/components/layout/Header';
import { ChildFundsContent } from '@/components/child-funds/ChildFundsContent';

export default async function ChildFundsPage() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  return (
    <div>
      <Header userName={session.name} title="Child Funds" subtitle="Savings goal tracking for your child's future" />
      <ChildFundsContent />
    </div>
  );
}
