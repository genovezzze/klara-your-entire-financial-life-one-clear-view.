export type Strategy = 'conservative' | 'balanced' | 'growth';
export type RiskProfile = 'Low' | 'Medium' | 'High';

export interface Persona {
  id: string;
  name: string;
  segment: string;
  age: number;
  salary: number;
  pensionBalance: number;
  provider: string;
  plan: string;
  currentStrategy: Strategy;
  riskProfile: RiskProfile;
  thirdPillarBalance: number;
  investments: number;
  mortgageDebt: number;
  monthlyContribution: number;
}

export interface ProjectionPoint {
  age: number;
  value: number;
}

export interface StrategyOption {
  id: Strategy;
  label: string;
  annualReturn: number;
  description: string;
  riskLabel: string;
}

export interface DbProfile {
  age: number;
  monthlySalary: string | number | { toNumber(): number };
  secondPillarBalance: string | number | { toNumber(): number };
  thirdPillarBalance: string | number | { toNumber(): number };
  pensionProvider: string;
  pensionPlan: string;
  currentStrategy: string;
  riskProfile: string;
  monthlyContribution: string | number | { toNumber(): number };
  investmentsValue: string | number | { toNumber(): number };
  mortgageDebt: string | number | { toNumber(): number };
}
