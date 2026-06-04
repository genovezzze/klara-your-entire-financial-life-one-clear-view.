'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Persona } from '@/lib/types';
import { formatCurrency, getTotalAssets } from '@/lib/pensionCalculations';

interface ProjectionChartProps {
  persona: Persona;
}

export function ProjectionChart({ persona }: ProjectionChartProps) {
  const base = getTotalAssets(persona);
  const data = [
    { year: 'Year 1', value: Math.round(base * 1.05) },
    { year: 'Year 3', value: Math.round(base * 1.15) },
    { year: 'Year 5', value: Math.round(base * 1.28) },
    { year: 'Year 7', value: Math.round(base * 1.45) },
    { year: 'Year 10', value: Math.round(base * 1.70) },
  ];

  return (
    <div className="bg-white border border-border rounded-2xl p-5 h-full">
      <p className="text-sm font-semibold text-foreground mb-1">10-Year projection</p>
      <p className="text-xs text-muted-foreground mb-4">Illustrative — assumes ~5% avg. growth</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
          <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(v) => [v != null ? formatCurrency(Number(v)) : '', 'Projected value'] as [string, string]}
            contentStyle={{ background: 'white', border: 'none', borderRadius: 8, fontSize: 12 }}
          />
          <Bar dataKey="value" fill="#00C4A7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
