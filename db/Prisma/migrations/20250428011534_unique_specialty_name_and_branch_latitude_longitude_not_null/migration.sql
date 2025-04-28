/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Specialties` will be added. If there are existing duplicate values, this will fail.
  - Made the column `latitude` on table `Branches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Branches` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Branches` MODIFY `latitude` INTEGER NOT NULL,
    MODIFY `longitude` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Specialties_name_key` ON `Specialties`(`name`);
