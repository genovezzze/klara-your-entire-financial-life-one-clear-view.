import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { KlaraLogo } from '@/components/ui/KlaraLogo';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <KlaraLogo size="lg" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-border p-7 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-1">Create account</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
