/*
  Warnings:

  - You are about to drop the column `timeEnd` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `timeStart` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `driveName` on the `Driver` table. All the data in the column will be lost.
  - Added the required column `driverName` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Race" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "raceName" TEXT NOT NULL,
    "revenue" TEXT NOT NULL
);
INSERT INTO "new_Race" ("id", "raceName", "revenue") SELECT "id", "raceName", "revenue" FROM "Race";
DROP TABLE "Race";
ALTER TABLE "new_Race" RENAME TO "Race";
CREATE UNIQUE INDEX "Race_revenue_key" ON "Race"("revenue");
CREATE TABLE "new_Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "driverName" TEXT NOT NULL,
    "nation" TEXT NOT NULL
);
INSERT INTO "new_Driver" ("id", "nation") SELECT "id", "nation" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
