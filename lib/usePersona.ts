'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Persona } from './types';
import { personas } from './mockData';

export function usePersona(redirectIfMissing = true) {
  const [persona, setPersonaState] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('personaId');
    if (id && personas[id]) {
      setPersonaState(personas[id]);
    } else if (redirectIfMissing) {
      router.push('/login');
    }
    setLoading(false);
  }, [redirectIfMissing, router]);

  function setPersona(id: string) {
    localStorage.setItem('personaId', id);
    setPersonaState(personas[id] ?? null);
  }

  function clearPersona() {
    localStorage.removeItem('personaId');
    setPersonaState(null);
  }

  return { persona, loading, setPersona, clearPersona };
}
