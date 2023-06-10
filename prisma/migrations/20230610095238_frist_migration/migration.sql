-- CreateTable
CREATE TABLE "Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "driveName" TEXT NOT NULL,
    "nation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Race" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "raceName" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "timeStart" DATETIME NOT NULL,
    "timeEnd" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" DATETIME NOT NULL,
    "date" DATETIME NOT NULL,
    "lap" INTEGER NOT NULL,
    "timeRetired" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,
    CONSTRAINT "Record_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamName_key" ON "Team"("teamName");

-- CreateIndex
CREATE UNIQUE INDEX "Race_revenue_key" ON "Race"("revenue");
