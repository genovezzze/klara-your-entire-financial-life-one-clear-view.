'use client';

import { useState } from 'react';
import { StatCard } from '@/components/common/StatCard';
import { formatCurrency } from '@/lib/pensionCalculations';
import { ArrowRight } from 'lucide-react';

interface MortgagesContentProps {
  mortgageDebt: number;
}

export function MortgagesContent({ mortgageDebt }: MortgagesContentProps) {
  const [newRate, setNewRate] = useState(3.5);
  const hasMortgage = mortgageDebt > 0;
  const currentRate = 4.8;
  const currentMonthly = hasMortgage ? Math.round((mortgageDebt * (currentRate / 100)) / 12 + 300) : 0;
  const refinancedMonthly = hasMortgage ? Math.round((mortgageDebt * (newRate / 100)) / 12 + 300) : 0;
  const monthlySaving = currentMonthly - refinancedMonthly;
  const pct = ((newRate - 1) / (8 - 1)) * 100;

  if (!hasMortgage) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 text-center">
        <p className="text-3xl mb-3">🎉</p>
        <p className="font-semibold text-foreground mb-1">No active mortgage or loans</p>
        <p className="text-sm text-muted-foreground">You have no outstanding debt in your profile.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Outstanding balance" value={formatCurrency(mortgageDebt)} variant="negative" />
        <StatCard label="Current rate" value={`${currentRate}%`} sub="Euribor + margin" />
        <StatCard label="Monthly payment" value={formatCurrency(currentMonthly)} />
        <StatCard label="Remaining term" value="22 years" sub="Illustrative" />
      </div>

      {/* Simulator */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden mb-4">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <p className="font-semibold text-foreground">Refinancing simulator</p>
          <p className="text-xs text-muted-foreground mt-0.5">What if you refinanced at a lower rate?</p>
        </div>

        {/* Before / After comparison */}
        <div className="grid grid-cols-2 divide-x divide-border">
          {/* Before */}
          <div className="px-6 py-5 bg-secondary/40">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Current</p>
            <p className="text-xs text-muted-foreground mb-0.5">Rate</p>
            <p className="text-2xl font-bold text-foreground mb-3">{currentRate}%</p>
            <p className="text-xs text-muted-foreground mb-0.5">Monthly payment</p>
            <p className="text-3xl font-bold text-foreground">{formatCurrency(currentMonthly)}</p>
          </div>

          {/* After */}
          <div className="px-6 py-5 relative">
            <div className="absolute top-5 right-6">
              {monthlySaving > 0 ? (
                <span className="text-xs font-semibold text-[color:var(--positive)] bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                  −{formatCurrency(monthlySaving)}/mo
                </span>
              ) : monthlySaving < 0 ? (
                <span className="text-xs font-semibold text-[color:var(--negative)] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                  +{formatCurrency(-monthlySaving)}/mo
                </span>
              ) : null}
            </div>
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-3">After refinancing</p>
            <p className="text-xs text-muted-foreground mb-0.5">Rate</p>
            <p className="text-2xl font-bold text-primary mb-3">{newRate.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mb-0.5">Monthly payment</p>
            <p className={`text-3xl font-bold ${monthlySaving > 0 ? 'text-[color:var(--positive)]' : 'text-foreground'}`}>
              {formatCurrency(refinancedMonthly)}
            </p>
          </div>
        </div>

        {/* Arrow connector */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden">
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Slider section */}
        <div className="px-6 py-5 bg-secondary/20 border-t border-border">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-medium text-foreground">Set new rate</p>
            <span className="text-2xl font-bold text-primary tabular-nums">{newRate.toFixed(1)}%</span>
          </div>

          {/* Slider track */}
          <div className="relative h-10 flex items-center">
            <div className="w-full h-2 bg-border rounded-full">
              <div
                className="h-full bg-primary rounded-full transition-all duration-75"
                style={{ width: `${pct}%` }}
              />
            </div>
            <input
              type="range"
              min={1} max={8} step={0.1}
              value={newRate}
              onChange={(e) => setNewRate(parseFloat(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-grab active:cursor-grabbing"
            />
            <div
              className="absolute w-7 h-7 bg-white border-[3px] border-primary rounded-full shadow-lg pointer-events-none transition-all duration-75 flex items-center justify-center"
              style={{ left: `calc(${pct}% - 14px)` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1%</span>
            <span className="text-xs text-muted-foreground">← drag</span>
            <span>8%</span>
          </div>
        </div>

        {/* Savings footer */}
        {monthlySaving > 0 && (
          <div className="px-6 py-4 bg-green-50 border-t border-green-200 flex items-center justify-between">
            <p className="text-sm text-[color:var(--positive)] font-medium">
              Annual savings at this rate
            </p>
            <p className="text-xl font-bold text-[color:var(--positive)]">
              {formatCurrency(monthlySaving * 12)}
            </p>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Illustrative simulation only. Contact your bank or a licensed mortgage advisor for real advice.
      </p>
    </>
  );
}
