import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPrismaClient = any;

const globalForPrisma = globalThis as unknown as {
  db: AnyPrismaClient;
};

function createClient(): AnyPrismaClient {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  // Prisma 7 requires an adapter to connect
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new (PrismaClient as any)({ adapter });
}

export const db: InstanceType<typeof PrismaClient> =
  globalForPrisma.db ?? createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db;
