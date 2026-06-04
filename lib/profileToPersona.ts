import { Persona, Strategy, RiskProfile } from './types';
import { DbProfile } from './types';

export function profileToPersona(
  userId: string,
  userName: string,
  profile: DbProfile
): Persona {
  return {
    id: userId,
    name: userName,
    segment: 'User',
    age: profile.age,
    salary: Number(profile.monthlySalary),
    pensionBalance: Number(profile.secondPillarBalance),
    provider: profile.pensionProvider,
    plan: profile.pensionPlan,
    currentStrategy: profile.currentStrategy as Strategy,
    riskProfile: profile.riskProfile as RiskProfile,
    thirdPillarBalance: Number(profile.thirdPillarBalance),
    investments: Number(profile.investmentsValue),
    mortgageDebt: Number(profile.mortgageDebt),
    monthlyContribution: Number(profile.monthlyContribution),
  };
}
