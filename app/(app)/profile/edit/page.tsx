import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { db } from '@/lib/prisma';
import { ProfileForm } from '@/components/profile/ProfileForm';

export default async function ProfileEditPage() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  const profile = await db.financialProfile.findUnique({
    where: { userId: session.userId },
  });

  if (!profile) redirect('/profile/setup');

  const defaults = {
    age: profile.age,
    monthlySalary: Number(profile.monthlySalary),
    secondPillarBalance: Number(profile.secondPillarBalance),
    thirdPillarBalance: Number(profile.thirdPillarBalance),
    pensionProvider: profile.pensionProvider,
    pensionPlan: profile.pensionPlan,
    currentStrategy: profile.currentStrategy,
    riskProfile: profile.riskProfile,
    monthlyContribution: Number(profile.monthlyContribution),
    investmentsValue: Number(profile.investmentsValue),
    mortgageDebt: Number(profile.mortgageDebt),
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Edit financial profile</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Update your data. Changes are saved to Neon and reflected immediately across the app.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-7 shadow-sm">
        <ProfileForm defaultValues={defaults} />
      </div>

      <p className="text-xs text-center text-muted-foreground mt-6 leading-relaxed">
        This prototype uses manually entered data for informational simulations only.
        It does not constitute financial advice.
      </p>
    </div>
  );
}
