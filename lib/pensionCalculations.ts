import { Strategy, ProjectionPoint } from './types';
import { Persona } from './types';

export const strategyReturns: Record<Strategy, number> = {
  conservative: 0.025,
  balanced: 0.045,
  growth: 0.07,
};

export const strategyLabels: Record<Strategy, string> = {
  conservative: 'Conservative',
  balanced: 'Balanced',
  growth: 'Growth',
};

export function getAnnualReturn(strategy: Strategy): number {
  return strategyReturns[strategy];
}

export function calculateFutureValue(
  currentBalance: number,
  annualReturn: number,
  years: number,
  monthlyContribution: number = 0
): number {
  if (years <= 0) return currentBalance;
  const growth = Math.pow(1 + annualReturn, years);
  const balancePart = currentBalance * growth;
  if (monthlyContribution <= 0 || annualReturn === 0) {
    return balancePart + monthlyContribution * 12 * years;
  }
  const contributionPart = monthlyContribution * 12 * ((growth - 1) / annualReturn);
  return balancePart + contributionPart;
}

export function calculateProjectionSeries(
  currentBalance: number,
  annualReturn: number,
  currentAge: number,
  targetAge: number = 65,
  monthlyContribution: number = 0
): ProjectionPoint[] {
  const totalYears = Math.max(0, targetAge - currentAge);
  const series: ProjectionPoint[] = [];
  const step = totalYears > 20 ? 5 : totalYears > 10 ? 2 : 1;

  for (let i = 0; i <= totalYears; i += step) {
    series.push({
      age: currentAge + i,
      value: Math.round(calculateFutureValue(currentBalance, annualReturn, i, monthlyContribution)),
    });
  }

  const last = series[series.length - 1];
  if (last.age !== targetAge) {
    series.push({
      age: targetAge,
      value: Math.round(calculateFutureValue(currentBalance, annualReturn, totalYears, monthlyContribution)),
    });
  }

  return series;
}

export function calculateDifferenceBetweenStrategies(
  user: Pick<Persona, 'pensionBalance' | 'thirdPillarBalance' | 'age' | 'currentStrategy' | 'monthlyContribution'>,
  selectedStrategy: Strategy
): number {
  const years = Math.max(0, 65 - user.age);
  const currentBalance = user.pensionBalance + user.thirdPillarBalance;
  const mc = user.monthlyContribution;
  const currentReturn = getAnnualReturn(user.currentStrategy);
  const selectedReturn = getAnnualReturn(selectedStrategy);
  const currentFV = calculateFutureValue(currentBalance, currentReturn, years, mc);
  const selectedFV = calculateFutureValue(currentBalance, selectedReturn, years, mc);
  return selectedFV - currentFV;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function getTotalAssets(user: Persona): number {
  return user.pensionBalance + user.thirdPillarBalance + user.investments;
}

export function getNetWorth(user: Persona): number {
  return getTotalAssets(user) - user.mortgageDebt;
}
