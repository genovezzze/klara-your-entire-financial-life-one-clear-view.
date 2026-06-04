import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { SmartIdMock } from '@/components/auth/SmartIdMock';
import { KlaraLogo } from '@/components/ui/KlaraLogo';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-2">
          <Link href="/">
            <KlaraLogo size="lg" />
          </Link>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl border border-border p-7 shadow-sm mb-4">
          <h2 className="text-lg font-bold text-foreground mb-1">Sign in</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Create one
            </Link>
          </p>
          <LoginForm />
        </div>

        {/* Demo mode */}
        <div className="bg-white rounded-2xl border border-border p-7 shadow-sm">
          <p className="text-sm font-semibold text-foreground mb-1">Try demo mode</p>
          <p className="text-xs text-muted-foreground mb-5">
            Explore with mock personas — no account needed.
          </p>
          <SmartIdMock />
        </div>
      </div>
    </div>
  );
}
