/*
  Warnings:

  - Added the required column `is_superadmin` to the `BranchAdmins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Branches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BranchAdmins` ADD COLUMN `is_superadmin` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `Branches` ADD COLUMN `name` VARCHAR(127) NOT NULL;
