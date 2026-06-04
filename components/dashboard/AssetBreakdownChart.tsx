'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Persona } from '@/lib/types';
import { formatCurrency } from '@/lib/pensionCalculations';

const COLORS = ['#00C4A7', '#009e88', '#00d4b5', '#007a67'];

interface AssetBreakdownChartProps {
  persona: Persona;
}

export function AssetBreakdownChart({ persona }: AssetBreakdownChartProps) {
  const data = [
    { name: '2nd Pillar Pension', value: persona.pensionBalance },
    { name: '3rd Pillar', value: persona.thirdPillarBalance },
    { name: 'Investments', value: persona.investments },
  ].filter((d) => d.value > 0);

  return (
    <div className="bg-white rounded-2xl border border-border p-5 h-full">
      <p className="text-sm font-semibold text-foreground mb-1">Asset breakdown</p>
      <p className="text-xs text-muted-foreground mb-4">Where your savings are</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => [v != null ? formatCurrency(Number(v)) : '', ''] as [string, string]} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-muted-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
