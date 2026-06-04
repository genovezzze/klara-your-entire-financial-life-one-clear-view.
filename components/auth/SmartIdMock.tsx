'use client';

import { useState } from 'react';
import { loginAsDemo } from '@/lib/actions/auth';
import { CheckCircle, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'form' | 'verifying' | 'verified';

const DEMO_PERSONAS = [
  { id: 'marta', label: 'Marta', desc: 'Age 28 · Young Professional', emoji: '👩' },
  { id: 'andris', label: 'Andris', desc: 'Age 42 · Mid-Career', emoji: '👨' },
  { id: 'ingrid', label: 'Ingrid', desc: 'Age 58 · Pre-Retirement', emoji: '👵' },
];

export function SmartIdMock() {
  const [step, setStep] = useState<Step>('form');
  const [error, setError] = useState('');

  async function handleDemo(id: string) {
    setStep('verifying');
    setError('');
    await new Promise((r) => setTimeout(r, 1800));
    setStep('verified');
    await new Promise((r) => setTimeout(r, 800));
    const result = await loginAsDemo(id);
    if (result?.error) {
      setError(result.error);
      setStep('form');
    }
  }

  if (step === 'verifying') {
    return (
      <div className="text-center space-y-6 py-4">
        <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
          <Smartphone className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-1">Smart-ID verification</h3>
          <p className="text-muted-foreground text-sm">Simulating authentication…</p>
        </div>
        <div className="bg-secondary rounded-2xl px-8 py-5 inline-block">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Verification code</p>
          <p className="text-5xl font-bold text-primary tracking-[0.2em]">4821</p>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">Waiting for confirmation…</p>
      </div>
    );
  }

  if (step === 'verified') {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-16 h-16 rounded-full bg-green-50 mx-auto flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-[color:var(--positive)]" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">Identity verified</h3>
          <p className="text-muted-foreground text-sm mt-1">Redirecting to your dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Demo accounts
      </p>
      <div className="space-y-2">
        {DEMO_PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleDemo(p.id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all hover:border-primary hover:bg-secondary border-border bg-white'
            )}
          >
            <span className="text-2xl">{p.emoji}</span>
            <div>
              <p className="font-semibold text-sm text-foreground">{p.label}</p>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center leading-relaxed pt-2">
        Prototype only — no real Smart-ID authentication is performed.
      </p>
    </div>
  );
}
