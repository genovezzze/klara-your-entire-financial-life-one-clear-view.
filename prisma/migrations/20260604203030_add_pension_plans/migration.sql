-- CreateTable
CREATE TABLE "PensionPlan" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "planName" TEXT NOT NULL,
    "pillar" TEXT NOT NULL,
    "strategy" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "return1Y" DOUBLE PRECISION NOT NULL,
    "return3Y" DOUBLE PRECISION NOT NULL,
    "return5Y" DOUBLE PRECISION NOT NULL,
    "managementFee" DOUBLE PRECISION NOT NULL,
    "totalAssets" DOUBLE PRECISION,
    "participants" INTEGER,
    "sourceLabel" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PensionPlan_pkey" PRIMARY KEY ("id")
);
