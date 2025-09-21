-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "farcasterUsername" TEXT,
    "baseAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emissionData" TEXT NOT NULL DEFAULT '{}',
    "rewardsPoints" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "emission_entries" (
    "entryId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "calculatedCarbonFootprint" REAL NOT NULL,
    CONSTRAINT "emission_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "challenges" (
    "challengeId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "emissionReductionGoal" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "user_challenges" (
    "userChallengeId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "progress" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    CONSTRAINT "user_challenges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_challenges_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges" ("challengeId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "earnedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "emission_entries_entryId_key" ON "emission_entries"("entryId");

-- CreateIndex
CREATE UNIQUE INDEX "challenges_challengeId_key" ON "challenges"("challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "user_challenges_userChallengeId_key" ON "user_challenges"("userChallengeId");

-- CreateIndex
CREATE UNIQUE INDEX "user_challenges_userId_challengeId_key" ON "user_challenges"("userId", "challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "achievements_id_key" ON "achievements"("id");
