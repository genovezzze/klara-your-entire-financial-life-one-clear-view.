'use client';

import { useActionState } from 'react';
import { saveProfile, ProfileState } from '@/lib/actions/profile';
import { Button } from '@/components/ui/button';

interface ProfileFormProps {
  defaultValues?: {
    age?: number;
    monthlySalary?: number;
    secondPillarBalance?: number;
    thirdPillarBalance?: number;
    pensionProvider?: string;
    pensionPlan?: string;
    currentStrategy?: string;
    riskProfile?: string;
    monthlyContribution?: number;
    investmentsValue?: number;
    mortgageDebt?: number;
  };
}

const fieldClass =
  'w-full h-10 px-3 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary';

const labelClass = 'block text-sm font-medium text-foreground mb-1.5';

export function ProfileForm({ defaultValues = {} }: ProfileFormProps) {
  const [state, action, pending] = useActionState<ProfileState, FormData>(saveProfile, undefined);

  return (
    <form action={action} className="space-y-5">
      {state?.message && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="age" className={labelClass}>Age</label>
          <input id="age" name="age" type="number" min="18" max="80" required className={fieldClass}
            defaultValue={defaultValues.age ?? ''} placeholder="e.g. 35" />
          {state?.errors?.age && <p className="text-xs text-red-600 mt-1">{state.errors.age[0]}</p>}
        </div>

        <div>
          <label htmlFor="monthlySalary" className={labelClass}>Monthly salary (€)</label>
          <input id="monthlySalary" name="monthlySalary" type="number" min="0" step="0.01" required className={fieldClass}
            defaultValue={defaultValues.monthlySalary ?? ''} placeholder="e.g. 2000" />
          {state?.errors?.monthlySalary && <p className="text-xs text-red-600 mt-1">{state.errors.monthlySalary[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="secondPillarBalance" className={labelClass}>2nd pillar balance (€)</label>
          <input id="secondPillarBalance" name="secondPillarBalance" type="number" min="0" step="0.01" required className={fieldClass}
            defaultValue={defaultValues.secondPillarBalance ?? ''} placeholder="e.g. 12000" />
          {state?.errors?.secondPillarBalance && <p className="text-xs text-red-600 mt-1">{state.errors.secondPillarBalance[0]}</p>}
        </div>

        <div>
          <label htmlFor="thirdPillarBalance" className={labelClass}>3rd pillar balance (€)</label>
          <input id="thirdPillarBalance" name="thirdPillarBalance" type="number" min="0" step="0.01" required className={fieldClass}
            defaultValue={defaultValues.thirdPillarBalance ?? ''} placeholder="e.g. 3000" />
          {state?.errors?.thirdPillarBalance && <p className="text-xs text-red-600 mt-1">{state.errors.thirdPillarBalance[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pensionProvider" className={labelClass}>Pension provider</label>
          <input id="pensionProvider" name="pensionProvider" type="text" required className={fieldClass}
            defaultValue={defaultValues.pensionProvider ?? ''} placeholder="e.g. Swedbank" />
          {state?.errors?.pensionProvider && <p className="text-xs text-red-600 mt-1">{state.errors.pensionProvider[0]}</p>}
        </div>

        <div>
          <label htmlFor="pensionPlan" className={labelClass}>Pension plan name</label>
          <input id="pensionPlan" name="pensionPlan" type="text" required className={fieldClass}
            defaultValue={defaultValues.pensionPlan ?? ''} placeholder="e.g. Growth II" />
          {state?.errors?.pensionPlan && <p className="text-xs text-red-600 mt-1">{state.errors.pensionPlan[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="currentStrategy" className={labelClass}>Current strategy</label>
          <select id="currentStrategy" name="currentStrategy" required className={fieldClass}
            defaultValue={defaultValues.currentStrategy ?? 'balanced'}>
            <option value="conservative">Conservative (2.5% p.a.)</option>
            <option value="balanced">Balanced (4.5% p.a.)</option>
            <option value="growth">Growth (7.0% p.a.)</option>
          </select>
          {state?.errors?.currentStrategy && <p className="text-xs text-red-600 mt-1">{state.errors.currentStrategy[0]}</p>}
        </div>

        <div>
          <label htmlFor="riskProfile" className={labelClass}>Risk profile</label>
          <select id="riskProfile" name="riskProfile" required className={fieldClass}
            defaultValue={defaultValues.riskProfile ?? 'Medium'}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {state?.errors?.riskProfile && <p className="text-xs text-red-600 mt-1">{state.errors.riskProfile[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="monthlyContribution" className={labelClass}>Monthly contribution (€)</label>
          <input id="monthlyContribution" name="monthlyContribution" type="number" min="0" step="0.01" required className={fieldClass}
            defaultValue={defaultValues.monthlyContribution ?? ''} placeholder="e.g. 50" />
          {state?.errors?.monthlyContribution && <p className="text-xs text-red-600 mt-1">{state.errors.monthlyContribution[0]}</p>}
        </div>

        <div>
          <label htmlFor="investmentsValue" className={labelClass}>Investments value (€)</label>
          <input id="investmentsValue" name="investmentsValue" type="number" min="0" step="0.01" required className={fieldClass}
            defaultValue={defaultValues.investmentsValue ?? ''} placeholder="e.g. 8000" />
          {state?.errors?.investmentsValue && <p className="text-xs text-red-600 mt-1">{state.errors.investmentsValue[0]}</p>}
        </div>

        <div>
          <label htmlFor="mortgageDebt" className={labelClass}>Mortgage / debt (€)</label>
          <input id="mortgageDebt" name="mortgageDebt" type="number" min="0" step="0.01" required className={fieldClass}
            defaultValue={defaultValues.mortgageDebt ?? ''} placeholder="e.g. 45000" />
          {state?.errors?.mortgageDebt && <p className="text-xs text-red-600 mt-1">{state.errors.mortgageDebt[0]}</p>}
        </div>
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="w-full h-11 font-semibold"
      >
        {pending ? 'Saving…' : 'Save and continue'}
      </Button>
    </form>
  );
}
