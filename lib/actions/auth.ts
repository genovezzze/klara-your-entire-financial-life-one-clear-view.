'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/session';
import { personas } from '@/lib/mockData';

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

const LoginSchema = z.object({
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export type AuthState = {
  errors?: { name?: string[]; email?: string[]; password?: string[] };
  message?: string;
} | undefined;

export async function register(state: AuthState, formData: FormData): Promise<AuthState> {
  const validated = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, password } = validated.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { errors: { email: ['An account with this email already exists.'] } };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await db.user.create({ data: { name, email, passwordHash } });

  await createSession(user.id, user.name, user.email);
  redirect('/profile/setup');
}

export async function login(state: AuthState, formData: FormData): Promise<AuthState> {
  const validated = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return { message: 'Invalid email or password.' };
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return { message: 'Invalid email or password.' };
  }

  await createSession(user.id, user.name, user.email);

  const profile = await db.financialProfile.findUnique({ where: { userId: user.id } });
  redirect(profile ? '/dashboard' : '/profile/setup');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}

const DEMO_ACCOUNTS: Record<string, { name: string; email: string }> = {
  marta: { name: 'Marta (Demo)', email: 'demo-marta@klara.demo' },
  andris: { name: 'Andris (Demo)', email: 'demo-andris@klara.demo' },
  ingrid: { name: 'Ingrid (Demo)', email: 'demo-ingrid@klara.demo' },
};

export async function loginAsDemo(personaId: string): Promise<{ error?: string }> {
  const demo = DEMO_ACCOUNTS[personaId];
  if (!demo) return { error: 'Unknown demo persona.' };

  const mock = personas[personaId];
  let user = await db.user.findUnique({ where: { email: demo.email } });

  if (!user) {
    const passwordHash = await bcrypt.hash(crypto.randomUUID(), 10);
    user = await db.user.create({ data: { name: demo.name, email: demo.email, passwordHash } });
    await db.financialProfile.create({
      data: {
        userId: user.id,
        age: mock.age,
        monthlySalary: mock.salary,
        secondPillarBalance: mock.pensionBalance,
        thirdPillarBalance: mock.thirdPillarBalance,
        pensionProvider: mock.provider,
        pensionPlan: mock.plan,
        currentStrategy: mock.currentStrategy,
        riskProfile: mock.riskProfile,
        monthlyContribution: mock.monthlyContribution,
        investmentsValue: mock.investments,
        mortgageDebt: mock.mortgageDebt,
      },
    });
  }

  await createSession(user.id, user.name, user.email);
  redirect('/dashboard');
}
