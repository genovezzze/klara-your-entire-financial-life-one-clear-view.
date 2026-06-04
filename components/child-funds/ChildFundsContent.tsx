'use client';

import { useState } from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { formatCurrency } from '@/lib/pensionCalculations';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const CURRENT_BALANCE = 2500;
const CHILD_AGE = 5;
const ANNUAL_RETURN = 0.05;
const GOAL = 20000;

export function ChildFundsContent() {
  const [monthly, setMonthly] = useState(100);
  const [targetAge, setTargetAge] = useState(18);

  const yearsLeft = Math.max(0, targetAge - CHILD_AGE);
  const projected =
    CURRENT_BALANCE * Math.pow(1 + ANNUAL_RETURN, yearsLeft) +
    monthly * 12 * ((Math.pow(1 + ANNUAL_RETURN, yearsLeft) - 1) / ANNUAL_RETURN);
  const progressPct = Math.min(100, Math.round((CURRENT_BALANCE / GOAL) * 100));

  const chartData = [0, 3, 6, 9, 12, yearsLeft]
    .filter((y, i, a) => a.indexOf(y) === i && y <= yearsLeft)
    .map((y) => ({
      year: `Year ${y}`,
      value: Math.round(
        CURRENT_BALANCE * Math.pow(1 + ANNUAL_RETURN, y) +
          monthly * 12 * ((Math.pow(1 + ANNUAL_RETURN, y) - 1) / ANNUAL_RETURN)
      ),
    }));

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Current balance', value: formatCurrency(CURRENT_BALANCE) },
          { label: 'Monthly contribution', value: formatCurrency(monthly) },
          { label: 'Projected at target', value: formatCurrency(projected) },
          { label: 'Goal', value: formatCurrency(GOAL) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-xl font-bold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-foreground">Goal progress</p>
          <p className="text-sm font-bold text-primary">{progressPct}%</p>
        </div>
        <div className="w-full bg-secondary rounded-full h-2.5">
          <div className="bg-primary rounded-full h-2.5 transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {formatCurrency(CURRENT_BALANCE)} of {formatCurrency(GOAL)} saved
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <SectionTitle title="Contribution simulator" />
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              Monthly contribution: <strong>{formatCurrency(monthly)}</strong>
            </label>
            <input type="range" min={25} max={500} step={25} value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full accent-purple-700" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              Target age: <strong>{targetAge} years</strong>
            </label>
            <input type="range" min={10} max={25} step={1} value={targetAge}
              onChange={(e) => setTargetAge(Number(e.target.value))}
              className="w-full accent-purple-700" />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#7A6B88' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#7A6B88' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => [v != null ? formatCurrency(Number(v)) : '', 'Projected'] as [string, string]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="value" fill="#00C4A7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Child fund data is illustrative. Balances are not from your financial profile.
      </p>
    </>
  );
}
