'use client';

import { useActionState } from 'react';
import { joinWaitlist, WaitlistState } from '@/lib/actions/waitlist';
import { CheckCircle, ArrowRight } from 'lucide-react';

export function WaitlistForm() {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, undefined);

  if (state?.success) {
    return (
      <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
        <CheckCircle className="w-5 h-5 text-white shrink-0" />
        <p className="text-white text-sm font-medium">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <div className="flex-1">
        <input
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full h-12 px-4 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
        />
        {state?.errors?.email && (
          <p className="text-white/70 text-xs mt-1.5">{state.errors.email[0]}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="h-12 px-6 rounded-xl bg-white text-primary font-semibold text-sm whitespace-nowrap flex items-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-60"
      >
        {pending ? 'Joining…' : 'Join waitlist'}
        {!pending && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
}
