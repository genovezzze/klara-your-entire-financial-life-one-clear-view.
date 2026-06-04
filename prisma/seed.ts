import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);

  // Dynamic import to use the generated client
  const { PrismaClient } = await import('../lib/generated/prisma/client.js');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prisma = new (PrismaClient as any)({ adapter });

  const SOURCE = 'Prototype dataset based on public pension plan structure';

  const plans = [
    // SWEDBANK
    { provider: 'Swedbank', planName: 'Swedbank Pension Fund Conservative', pillar: '2nd', strategy: 'Conservative', riskLevel: 'Low',    return1Y: 3.2,  return3Y: 2.8,  return5Y: 3.1,  managementFee: 0.50, totalAssets: 890_000_000,  participants: 145000, sourceLabel: SOURCE },
    { provider: 'Swedbank', planName: 'Swedbank Pension Fund Balanced',     pillar: '2nd', strategy: 'Balanced',    riskLevel: 'Medium', return1Y: 7.4,  return3Y: 5.9,  return5Y: 6.3,  managementFee: 0.50, totalAssets: 1_240_000_000, participants: 210000, sourceLabel: SOURCE },
    { provider: 'Swedbank', planName: 'Swedbank Pension Fund Growth',       pillar: '2nd', strategy: 'Growth',      riskLevel: 'High',   return1Y: 12.1, return3Y: 8.7,  return5Y: 9.2,  managementFee: 0.50, totalAssets: 780_000_000,  participants: 98000,  sourceLabel: SOURCE },
    { provider: 'Swedbank', planName: 'Swedbank 3rd Pillar Index 100',      pillar: '3rd', strategy: 'Growth',      riskLevel: 'High',   return1Y: 13.4, return3Y: 9.8,  return5Y: 10.1, managementFee: 0.50, totalAssets: 210_000_000,  participants: 42000,  sourceLabel: SOURCE },

    // SEB
    { provider: 'SEB',      planName: 'SEB Pensiju fonds Konservatīvais',  pillar: '2nd', strategy: 'Conservative', riskLevel: 'Low',    return1Y: 2.9,  return3Y: 2.5,  return5Y: 2.8,  managementFee: 0.60, totalAssets: 520_000_000,  participants: 89000,  sourceLabel: SOURCE },
    { provider: 'SEB',      planName: 'SEB Pensiju fonds Sabalansētais',   pillar: '2nd', strategy: 'Balanced',    riskLevel: 'Medium', return1Y: 6.8,  return3Y: 5.4,  return5Y: 5.9,  managementFee: 0.60, totalAssets: 870_000_000,  participants: 134000, sourceLabel: SOURCE },
    { provider: 'SEB',      planName: 'SEB Pensiju fonds Aktīvais',        pillar: '2nd', strategy: 'Growth',      riskLevel: 'High',   return1Y: 11.3, return3Y: 8.1,  return5Y: 8.8,  managementFee: 0.60, totalAssets: 640_000_000,  participants: 76000,  sourceLabel: SOURCE },

    // LUMINOR
    { provider: 'Luminor',  planName: 'Luminor Conservative Fund',         pillar: '2nd', strategy: 'Conservative', riskLevel: 'Low',    return1Y: 3.5,  return3Y: 3.0,  return5Y: 3.2,  managementFee: 0.75, totalAssets: 310_000_000,  participants: 54000,  sourceLabel: SOURCE },
    { provider: 'Luminor',  planName: 'Luminor Balanced Fund',             pillar: '2nd', strategy: 'Balanced',    riskLevel: 'Medium', return1Y: 7.1,  return3Y: 5.6,  return5Y: 6.0,  managementFee: 0.75, totalAssets: 490_000_000,  participants: 71000,  sourceLabel: SOURCE },
    { provider: 'Luminor',  planName: 'Luminor Global Equity Fund',        pillar: '2nd', strategy: 'Growth',      riskLevel: 'High',   return1Y: 11.8, return3Y: 8.4,  return5Y: 9.0,  managementFee: 0.75, totalAssets: 380_000_000,  participants: 43000,  sourceLabel: SOURCE },

    // CITADELE
    { provider: 'Citadele', planName: 'Citadele Conservative',             pillar: '2nd', strategy: 'Conservative', riskLevel: 'Low',    return1Y: 2.6,  return3Y: 2.2,  return5Y: 2.5,  managementFee: 0.85, totalAssets: 95_000_000,   participants: 18000,  sourceLabel: SOURCE },
    { provider: 'Citadele', planName: 'Citadele Balanced Plus',            pillar: '2nd', strategy: 'Balanced',    riskLevel: 'Medium', return1Y: 6.2,  return3Y: 5.0,  return5Y: 5.4,  managementFee: 0.85, totalAssets: 140_000_000,  participants: 24000,  sourceLabel: SOURCE },

    // INDEXO
    { provider: 'INDEXO',   planName: 'INDEXO Conservative',               pillar: '2nd', strategy: 'Conservative', riskLevel: 'Low',    return1Y: 4.1,  return3Y: 3.5,  return5Y: 3.7,  managementFee: 0.39, totalAssets: 78_000_000,   participants: 14000,  sourceLabel: SOURCE },
    { provider: 'INDEXO',   planName: 'INDEXO Balanced Index',             pillar: '2nd', strategy: 'Balanced',    riskLevel: 'Medium', return1Y: 8.9,  return3Y: 6.8,  return5Y: 7.2,  managementFee: 0.39, totalAssets: 185_000_000,  participants: 31000,  sourceLabel: SOURCE },
    { provider: 'INDEXO',   planName: 'INDEXO Global Equity',              pillar: '2nd', strategy: 'Growth',      riskLevel: 'High',   return1Y: 14.2, return3Y: 10.3, return5Y: 10.9, managementFee: 0.39, totalAssets: 220_000_000,  participants: 38000,  sourceLabel: SOURCE },
    { provider: 'INDEXO',   planName: 'INDEXO 3rd Pillar Global',          pillar: '3rd', strategy: 'Growth',      riskLevel: 'High',   return1Y: 14.8, return3Y: 10.7, return5Y: 11.2, managementFee: 0.39, totalAssets: 45_000_000,   participants: 9000,   sourceLabel: SOURCE },
  ];

  console.log('Seeding pension plans...');
  await prisma.pensionPlan.deleteMany();
  await prisma.pensionPlan.createMany({ data: plans });
  console.log(`✓ Seeded ${plans.length} pension plans`);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
