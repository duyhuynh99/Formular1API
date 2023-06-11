/*
  Warnings:

  - You are about to drop the column `date` on the `Record` table. All the data in the column will be lost.
  - Added the required column `positions` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" TEXT NOT NULL,
    "lap" INTEGER NOT NULL,
    "timeRetired" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "positions" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,
    CONSTRAINT "Record_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("driverId", "id", "lap", "point", "raceId", "teamId", "timeRetired", "year") SELECT "driverId", "id", "lap", "point", "raceId", "teamId", "timeRetired", "year" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
