'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 65, suffix: '', label: 'Retirement age', delay: 0 },
  { value: 3, suffix: '', label: 'Pension pillars tracked', delay: 200 },
  { value: 100, suffix: '%', label: 'Your data, your control', delay: 400 },
];

function useCountUp(target: number, duration = 1500, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return count;
}

function StatCard({ value, suffix, label, delay, started }: {
  value: number; suffix: string; label: string; delay: number; started: boolean;
}) {
  const count = useCountUp(value, 1400, started);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  return (
    <div
      className="text-center transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div className="relative inline-block">
        <p className="text-6xl font-bold text-foreground tabular-nums leading-none">
          {count}{suffix}
        </p>
        {/* Floating glow */}
        <div
          className="absolute inset-0 blur-2xl opacity-20 bg-primary rounded-full pointer-events-none"
          style={{
            animation: `float${(delay / 200) + 1} ${3 + delay / 400}s ease-in-out infinite`,
          }}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

export function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex gap-16 flex-wrap">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} started={started} />
      ))}
    </div>
  );
}
