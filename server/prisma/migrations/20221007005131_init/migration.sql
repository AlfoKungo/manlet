/*
  Warnings:

  - You are about to drop the column `sets` on the `WordSet` table. All the data in the column will be lost.
  - Added the required column `progression` to the `WordSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terms` to the `WordSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WordSet" DROP COLUMN "sets",
ADD COLUMN     "progression" TEXT NOT NULL,
ADD COLUMN     "terms" TEXT NOT NULL;
