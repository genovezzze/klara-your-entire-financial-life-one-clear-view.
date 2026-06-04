import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getSession } from '@/lib/session';
import { db } from '@/lib/prisma';
import { profileToPersona } from '@/lib/profileToPersona';
import { Header } from '@/components/layout/Header';
import { PensionOverviewCard } from '@/components/pensions/PensionOverviewCard';
import { Button } from '@/components/ui/button';

export default async function PensionsPage() {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  const profile = await db.financialProfile.findUnique({
    where: { userId: session.userId },
  });

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground text-sm">Please complete your financial profile first.</p>
        <Link
          href="/profile/setup"
          className="flex items-center gap-1.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-lg transition-colors"
        >
          Complete profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const persona = profileToPersona(session.userId, session.name, profile);

  return (
    <div>
      <Header
        userName={session.name}
        title="Latvian Pension Overview"
        subtitle="2nd Pension Pillar — State & Private"
      />

      <PensionOverviewCard persona={persona} />

      {/* Simulator CTA */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-6">
        <p className="font-semibold text-foreground text-sm mb-1">Want to compare strategies?</p>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Use the strategy simulator to see how Conservative, Balanced, or Growth plans affect your
          projected pension at age 65.
        </p>
        <Link href="/pensions/simulator">
          <Button className="h-10 px-6 font-semibold text-sm">
            Open strategy simulator <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>

      {/* How to change */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-2">
        <p className="font-semibold text-foreground text-sm mb-3">How to change your plan</p>
        <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside leading-relaxed">
          <li>Log in to your current provider&apos;s portal (e.g. Swedbank, SEB, Luminor).</li>
          <li>Navigate to the &quot;Pensions&quot; section.</li>
          <li>Select &quot;Change Pension Plan&quot;.</li>
          <li>Choose your desired new plan and sign with eVerify / Smart-ID.</li>
          <li>The change usually takes effect within a few business days.</li>
        </ol>
        <p className="text-xs text-muted-foreground mt-3">
          Or go directly to{' '}
          <a
            href="https://latvija.lv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2"
          >
            latvija.lv
          </a>{' '}
          to manage your pension via the official e-service.
        </p>
      </div>

    </div>
  );
}
