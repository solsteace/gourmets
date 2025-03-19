/*
  Warnings:

  - You are about to drop the column `is_superadmin` on the `BranchAdmins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BranchAdmins` DROP COLUMN `is_superadmin`;
