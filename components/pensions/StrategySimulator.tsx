'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Persona, Strategy } from '@/lib/types';
import { strategies } from '@/lib/mockData';
import {
  calculateFutureValue,
  calculateProjectionSeries,
  formatCurrency,
  getAnnualReturn,
  strategyLabels,
} from '@/lib/pensionCalculations';
import { saveSimulation } from '@/lib/actions/simulation';
import { StrategyCard } from './StrategyCard';
import { ChangeStrategyModal } from './ChangeStrategyModal';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info, Save } from 'lucide-react';

interface StrategySimulatorProps {
  persona: Persona;
}

export function StrategySimulator({ persona }: StrategySimulatorProps) {
  const [selected, setSelected] = useState<Strategy>(persona.currentStrategy);
  const [modalOpen, setModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const years = Math.max(0, 65 - persona.age);
  const currentBalance = persona.pensionBalance + persona.thirdPillarBalance;
  const mc = persona.monthlyContribution;
  const selectedRate = getAnnualReturn(selected);
  const projectionData = calculateProjectionSeries(currentBalance, selectedRate, persona.age, 65, mc);
  const selectedFV = calculateFutureValue(currentBalance, selectedRate, years, mc);

  const currentRate = getAnnualReturn(persona.currentStrategy);
  const currentFV = calculateFutureValue(currentBalance, currentRate, years, mc);
  const diff = selectedFV - currentFV;
  const isSameCurrent = selected === persona.currentStrategy;

  async function handleSave() {
    setSaveStatus('saving');
    const result = await saveSimulation(selected, selectedFV, diff);
    setSaveStatus(result.success ? 'saved' : 'error');
    setTimeout(() => setSaveStatus('idle'), 3000);
  }

  return (
    <div className="space-y-6">
      {/* Strategy cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {strategies.map((s) => {
          const fv = calculateFutureValue(currentBalance, s.annualReturn, years, mc);
          return (
            <StrategyCard
              key={s.id}
              {...s}
              projectedValue={fv}
              isSelected={selected === s.id}
              isCurrent={persona.currentStrategy === s.id}
              onClick={() => setSelected(s.id)}
            />
          );
        })}
      </div>

      {/* Chart + summary */}
      <div className="rounded-2xl bg-white border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
          <div>
            <p className="text-foreground font-bold text-base">Projected value at age 65</p>
            <p className="text-muted-foreground text-xs mt-0.5">
              Strategy: {strategyLabels[selected]}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[color:var(--positive)]">{formatCurrency(selectedFV)}</p>
            {!isSameCurrent && (
              <p className={diff >= 0 ? 'text-xs text-[color:var(--positive)] mt-0.5' : 'text-xs text-[color:var(--negative)] mt-0.5'}>
                {diff >= 0 ? '+' : ''}{formatCurrency(diff)} vs current strategy
              </p>
            )}
            {isSameCurrent && (
              <p className="text-xs text-muted-foreground mt-0.5">Your current strategy</p>
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
            <XAxis
              dataKey="age"
              tickFormatter={(v) => `Age ${v}`}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => [v != null ? formatCurrency(Number(v)) : '', 'Projected value'] as [string, string]}
              labelFormatter={(l) => `Age ${l}`}
              contentStyle={{ background: 'white', border: 'none', borderRadius: 8, fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#52AD8C"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: '#52AD8C' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Disclaimer note */}
      <div className="flex gap-2 text-xs text-muted-foreground bg-secondary rounded-xl px-4 py-3">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        Projection is illustrative and based on simplified assumptions. Formula includes current
        balance growth plus monthly contributions compounded annually. Projected values do not
        guarantee future performance.
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          variant="outline"
          className="h-11 px-6 font-semibold"
        >
          <Save className="w-4 h-4 mr-2" />
          {saveStatus === 'saving' ? 'Saving…' : saveStatus === 'saved' ? 'Simulation saved.' : saveStatus === 'error' ? 'Error saving' : 'Save simulation'}
        </Button>

        <Button
          onClick={() => setModalOpen(true)}
          className="h-11 px-8 font-semibold"
        >
          Change pension strategy <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <ChangeStrategyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
