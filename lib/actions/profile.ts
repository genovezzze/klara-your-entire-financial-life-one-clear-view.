'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/lib/prisma';
import { getSession } from '@/lib/session';

const ProfileSchema = z.object({
  age: z.coerce.number().int().min(18).max(80),
  monthlySalary: z.coerce.number().min(0),
  secondPillarBalance: z.coerce.number().min(0),
  thirdPillarBalance: z.coerce.number().min(0),
  pensionProvider: z.string().min(1, 'Provider is required').trim(),
  pensionPlan: z.string().min(1, 'Plan is required').trim(),
  currentStrategy: z.enum(['conservative', 'balanced', 'growth']),
  riskProfile: z.enum(['Low', 'Medium', 'High']),
  monthlyContribution: z.coerce.number().min(0),
  investmentsValue: z.coerce.number().min(0),
  mortgageDebt: z.coerce.number().min(0),
});

export type ProfileState = {
  errors?: Record<string, string[]>;
  message?: string;
} | undefined;

export async function saveProfile(state: ProfileState, formData: FormData): Promise<ProfileState> {
  const session = await getSession();
  if (!session?.userId) redirect('/login');

  const validated = ProfileSchema.safeParse({
    age: formData.get('age'),
    monthlySalary: formData.get('monthlySalary'),
    secondPillarBalance: formData.get('secondPillarBalance'),
    thirdPillarBalance: formData.get('thirdPillarBalance'),
    pensionProvider: formData.get('pensionProvider'),
    pensionPlan: formData.get('pensionPlan'),
    currentStrategy: formData.get('currentStrategy'),
    riskProfile: formData.get('riskProfile'),
    monthlyContribution: formData.get('monthlyContribution'),
    investmentsValue: formData.get('investmentsValue'),
    mortgageDebt: formData.get('mortgageDebt'),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  await db.financialProfile.upsert({
    where: { userId: session.userId },
    update: validated.data,
    create: { userId: session.userId, ...validated.data },
  });

  redirect('/dashboard');
}
