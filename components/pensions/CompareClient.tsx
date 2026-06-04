'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpDown, ArrowRight, Info, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChangeStrategyModal } from './ChangeStrategyModal';
import { formatCurrency } from '@/lib/pensionCalculations';

interface Plan {
  id: string; provider: string; planName: string; pillar: string;
  strategy: string; riskLevel: string; return1Y: number; return3Y: number;
  return5Y: number; managementFee: number; totalAssets: number | null; participants: number | null;
}

type UserProfile = {
  provider: string; planName: string; strategy: string;
  managementFee?: number; return5Y?: number;
} | null;

type SortKey = 'return1Y' | 'return3Y' | 'return5Y' | 'managementFee';

const riskColors: Record<string, string> = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-red-100 text-red-700',
};

export function CompareClient({ plans, userProfile }: { plans: Plan[]; userProfile: UserProfile }) {
  const [filterProvider, setFilterProvider] = useState('');
  const [filterPillar, setFilterPillar]     = useState('');
  const [filterRisk, setFilterRisk]         = useState('');
  const [filterStrategy, setFilterStrategy] = useState('');
  const [sortKey, setSortKey]               = useState<SortKey>('return5Y');
  const [sortAsc, setSortAsc]               = useState(false);
  const [selectedPlan, setSelectedPlan]     = useState<Plan | null>(null);
  const [modalOpen, setModalOpen]           = useState(false);

  const providers  = [...new Set(plans.map(p => p.provider))].sort();
  const pillars    = ['2nd', '3rd'];
  const risks      = ['Low', 'Medium', 'High'];
  const strategies = ['Conservative', 'Balanced', 'Growth'];

  const filtered = useMemo(() => {
    return plans
      .filter(p => !filterProvider || p.provider === filterProvider)
      .filter(p => !filterPillar   || p.pillar === filterPillar)
      .filter(p => !filterRisk     || p.riskLevel === filterRisk)
      .filter(p => !filterStrategy || p.strategy === filterStrategy)
      .sort((a, b) => {
        const diff = a[sortKey] - b[sortKey];
        return sortAsc ? diff : -diff;
      });
  }, [plans, filterProvider, filterPillar, filterRisk, filterStrategy, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  }

  function SortBtn({ k, label }: { k: SortKey; label: string }) {
    return (
      <button onClick={() => toggleSort(k)}
        className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
          sortKey === k ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-primary/40'
        }`}>
        {label} <ArrowUpDown className="w-3 h-3" />
      </button>
    );
  }

  return (
    <div className="space-y-5">

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Filters</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Provider', value: filterProvider, set: setFilterProvider, options: providers },
            { label: 'Pillar',   value: filterPillar,   set: setFilterPillar,   options: pillars },
            { label: 'Risk',     value: filterRisk,     set: setFilterRisk,     options: risks },
            { label: 'Strategy', value: filterStrategy, set: setFilterStrategy, options: strategies },
          ].map(({ label, value, set, options }) => (
            <div key={label}>
              <select value={value} onChange={e => set(e.target.value)}
                className="h-9 px-3 text-sm rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">All {label}s</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          {(filterProvider || filterPillar || filterRisk || filterStrategy) && (
            <button onClick={() => { setFilterProvider(''); setFilterPillar(''); setFilterRisk(''); setFilterStrategy(''); }}
              className="h-9 px-3 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground self-center mr-1">Sort by:</p>
          <SortBtn k="return1Y"      label="1Y return" />
          <SortBtn k="return3Y"      label="3Y return" />
          <SortBtn k="return5Y"      label="5Y return" />
          <SortBtn k="managementFee" label="Fee" />
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground px-1">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {plans.length} plans
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3">Provider / Plan</th>
                <th className="text-left px-4 py-3">Pillar</th>
                <th className="text-left px-4 py-3">Strategy</th>
                <th className="text-left px-4 py-3">Risk</th>
                <th className="text-right px-4 py-3">1Y %</th>
                <th className="text-right px-4 py-3">3Y %</th>
                <th className="text-right px-4 py-3">5Y %</th>
                <th className="text-right px-4 py-3">Fee %</th>
                <th className="text-right px-4 py-3">Participants</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((plan, i) => (
                <tr key={plan.id} className={`hover:bg-secondary/30 transition-colors ${i % 2 === 0 ? '' : 'bg-secondary/10'}`}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground">{plan.provider}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{plan.planName}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-secondary border border-border text-xs px-2 py-0.5 rounded-full">{plan.pillar}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{plan.strategy}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskColors[plan.riskLevel]}`}>
                      {plan.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-[color:var(--positive)]">+{plan.return1Y.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right font-medium text-[color:var(--positive)]">+{plan.return3Y.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right font-bold text-[color:var(--positive)]">+{plan.return5Y.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{plan.managementFee.toFixed(2)}%</td>
                  <td className="px-4 py-3 text-right text-muted-foreground text-xs">
                    {plan.participants ? plan.participants.toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelectedPlan(plan)}
                      className="text-xs font-medium text-primary hover:underline whitespace-nowrap">
                      Select →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected plan panel */}
      {selectedPlan && (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Selected plan</p>
              <p className="text-lg font-bold text-foreground">{selectedPlan.provider} — {selectedPlan.planName}</p>
              <p className="text-sm text-muted-foreground">{selectedPlan.strategy} · {selectedPlan.riskLevel} risk · {selectedPlan.pillar} Pillar</p>
            </div>
            <button onClick={() => setSelectedPlan(null)} className="text-muted-foreground hover:text-foreground p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Compare with current plan */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Compare with my current plan</p>
            {userProfile ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary rounded-xl p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Your current plan</p>
                  <p className="font-bold text-foreground">{userProfile.provider}</p>
                  <p className="text-sm text-muted-foreground">{userProfile.planName}</p>
                  <p className="text-sm text-muted-foreground">{userProfile.strategy} strategy</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Selected plan</p>
                  <p className="font-bold text-foreground">{selectedPlan.provider}</p>
                  <p className="text-sm text-muted-foreground">{selectedPlan.planName}</p>
                  <p className="text-sm text-muted-foreground">{selectedPlan.strategy} strategy</p>
                </div>

                {/* Differences */}
                <div className="col-span-2 grid grid-cols-2 gap-3">
                  <div className="bg-secondary rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">5Y return difference</p>
                    {(() => {
                      const diff = selectedPlan.return5Y - (userProfile.return5Y ?? 0);
                      return (
                        <p className={`text-xl font-bold ${diff > 0 ? 'text-[color:var(--positive)]' : diff < 0 ? 'text-[color:var(--negative)]' : 'text-foreground'}`}>
                          {diff > 0 ? '+' : ''}{diff.toFixed(1)}%
                        </p>
                      );
                    })()}
                  </div>
                  <div className="bg-secondary rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Fee difference</p>
                    {(() => {
                      const diff = selectedPlan.managementFee - (userProfile.managementFee ?? 0);
                      return (
                        <p className={`text-xl font-bold ${diff < 0 ? 'text-[color:var(--positive)]' : diff > 0 ? 'text-[color:var(--negative)]' : 'text-foreground'}`}>
                          {diff > 0 ? '+' : ''}{diff.toFixed(2)}%
                        </p>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Please complete your financial profile first.</p>
                <Link href="/profile/setup">
                  <Button size="sm" className="gap-1.5">Complete profile <ArrowRight className="w-3.5 h-3.5" /></Button>
                </Link>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
            <Link href={`/pensions/simulator?planId=${selectedPlan.id}`}>
              <Button className="gap-2">
                Simulate this plan <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" onClick={() => setModalOpen(true)} className="gap-2">
              <ExternalLink className="w-4 h-4" /> Change pension strategy
            </Button>
          </div>
        </div>
      )}

      {/* Data source */}
      <div className="flex gap-3 bg-secondary rounded-xl p-4">
        <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Plan comparison uses prototype public-style data.</strong> Personal pension balance is manually entered by the user.
          Official data should be verified on <a href="https://manapensija.lv" target="_blank" rel="noopener noreferrer" className="text-primary underline">manapensija.lv</a> or provider websites.
          This comparison is informational only and does not constitute financial advice. Past returns do not guarantee future performance.
        </p>
      </div>

      <ChangeStrategyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
