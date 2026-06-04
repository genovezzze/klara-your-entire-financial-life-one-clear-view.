'use server';

import { z } from 'zod';
import { db } from '@/lib/prisma';

const Schema = z.object({
  email: z.string().email('Please enter a valid email.').trim().toLowerCase(),
  name: z.string().trim().optional(),
});

export type WaitlistState = {
  success?: boolean;
  message?: string;
  errors?: { email?: string[]; name?: string[] };
} | undefined;

export async function joinWaitlist(state: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const validated = Schema.safeParse({
    email: formData.get('email'),
    name: formData.get('name') || undefined,
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, name } = validated.data;

  const existing = await db.waitlistEntry.findUnique({ where: { email } });
  if (existing) {
    return { success: true, message: "You're already on the list! We'll be in touch." };
  }

  await db.waitlistEntry.create({ data: { email, name } });

  return { success: true, message: "You're on the list! We'll notify you when Klara is ready." };
}
