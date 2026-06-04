'use server';

import { db } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function saveSimulation(
  selectedStrategy: string,
  projectedValue: number,
  differenceFromCurrent: number
): Promise<{ success: boolean; message: string }> {
  const session = await getSession();
  if (!session?.userId) {
    return { success: false, message: 'Not authenticated.' };
  }

  await db.pensionSimulation.create({
    data: {
      userId: session.userId,
      selectedStrategy,
      projectedValue,
      differenceFromCurrent,
    },
  });

  return { success: true, message: 'Simulation saved.' };
}
