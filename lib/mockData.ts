import { Persona, StrategyOption } from './types';

export const personas: Record<string, Persona> = {
  marta: {
    id: 'marta',
    name: 'Marta',
    segment: 'Young Professional',
    age: 28,
    salary: 1800,
    pensionBalance: 8500,
    provider: 'Swedbank',
    plan: 'Growth II',
    currentStrategy: 'growth',
    riskProfile: 'High',
    thirdPillarBalance: 3000,
    investments: 12000,
    mortgageDebt: 5000,
    monthlyContribution: 60,
  },
  andris: {
    id: 'andris',
    name: 'Andris',
    segment: 'Mid-Career',
    age: 42,
    salary: 2400,
    pensionBalance: 24000,
    provider: 'SEB',
    plan: 'Balanced',
    currentStrategy: 'balanced',
    riskProfile: 'Medium',
    thirdPillarBalance: 7000,
    investments: 18000,
    mortgageDebt: 45000,
    monthlyContribution: 80,
  },
  ingrid: {
    id: 'ingrid',
    name: 'Ingrid',
    segment: 'Pre-Retirement',
    age: 58,
    salary: 1700,
    pensionBalance: 61000,
    provider: 'Luminor',
    plan: 'Conservative',
    currentStrategy: 'conservative',
    riskProfile: 'Low',
    thirdPillarBalance: 19000,
    investments: 9000,
    mortgageDebt: 0,
    monthlyContribution: 50,
  },
};

export const strategies: StrategyOption[] = [
  {
    id: 'conservative',
    label: 'Conservative',
    annualReturn: 0.025,
    description: 'Lower risk, mostly bonds and cash.',
    riskLabel: 'Low risk',
  },
  {
    id: 'balanced',
    label: 'Balanced',
    annualReturn: 0.045,
    description: 'Mixed risk, stocks and bonds.',
    riskLabel: 'Medium risk',
  },
  {
    id: 'growth',
    label: 'Growth',
    annualReturn: 0.07,
    description: 'Higher risk, mostly equities.',
    riskLabel: 'High risk',
  },
];

export const latvianProviders = [
  'Swedbank',
  'SEB',
  'Luminor',
  'Citadele',
  'INDEXO',
];
