'use client';

import { useActionState } from 'react';
import { login, AuthState } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(login, undefined);

  return (
    <form action={action} className="space-y-4">
      {state?.message && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          placeholder="you@example.com"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-600 mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          placeholder="••••••••"
        />
        {state?.errors?.password && (
          <p className="text-xs text-red-600 mt-1">{state.errors.password[0]}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="w-full h-11 font-semibold"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}
