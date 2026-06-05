'use client';

import { useEffect, useState } from 'react';

const stats = [
  { value: 65, suffix: '', label: 'Retirement age', delay: 0 },
  { value: 3, suffix: '', label: 'Pension pillars tracked', delay: 150 },
  { value: 100, suffix: '%', label: 'Your data, your control', delay: 300 },
];

function useCountUp(target: number, duration = 1200, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatCard({ value, suffix, label, delay }: {
  value: number; suffix: string; label: string; delay: number;
}) {
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStarted(true), delay);
    const t2 = setTimeout(() => setVisible(true), delay);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [delay]);

  const count = useCountUp(value, 1200, started);

  return (
    <div className="transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
      <p className="text-6xl font-bold text-foreground tabular-nums leading-none">
        {count}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

export function AnimatedStats() {
  return (
    <div className="flex gap-16 flex-wrap">
      {stats.map((s) => <StatCard key={s.label} {...s} />)}
    </div>
  );
}
