import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { KlaraLogo } from '@/components/ui/KlaraLogo';

export default async function ProfileSetupPage() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <KlaraLogo size="md" />
        </div>

        <div className="bg-white rounded-2xl border border-border p-7 shadow-sm">
          <h1 className="text-xl font-bold text-foreground mb-1">Complete your financial profile</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Hi {session.name}! Enter your current financial data. All values are stored securely in
            Neon PostgreSQL and used only for personalised simulations.
          </p>
          <ProfileForm />
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6 leading-relaxed">
          This prototype uses manually entered data for informational simulations only.
          It does not constitute financial advice.
        </p>
      </div>
    </div>
  );
}
