-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "monthlySalary" DECIMAL(65,30) NOT NULL,
    "secondPillarBalance" DECIMAL(65,30) NOT NULL,
    "thirdPillarBalance" DECIMAL(65,30) NOT NULL,
    "pensionProvider" TEXT NOT NULL,
    "pensionPlan" TEXT NOT NULL,
    "currentStrategy" TEXT NOT NULL,
    "riskProfile" TEXT NOT NULL,
    "monthlyContribution" DECIMAL(65,30) NOT NULL,
    "investmentsValue" DECIMAL(65,30) NOT NULL,
    "mortgageDebt" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PensionSimulation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "selectedStrategy" TEXT NOT NULL,
    "projectedValue" DECIMAL(65,30) NOT NULL,
    "differenceFromCurrent" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PensionSimulation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialProfile_userId_key" ON "FinancialProfile"("userId");

-- AddForeignKey
ALTER TABLE "FinancialProfile" ADD CONSTRAINT "FinancialProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PensionSimulation" ADD CONSTRAINT "PensionSimulation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
