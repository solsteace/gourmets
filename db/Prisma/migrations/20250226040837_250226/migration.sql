/*
  Warnings:

  - You are about to drop the column `contact` on the `PlaceBranchContacts` table. All the data in the column will be lost.
  - You are about to drop the column `tip` on the `PlaceBranchContacts` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `PlaceBranches` table. All the data in the column will be lost.
  - You are about to alter the column `contact` on the `PlacesContacts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(35)` to `VarChar(31)`.
  - Added the required column `url_prefix` to the `ContactMediums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `PlaceBranchContacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `PlaceBranches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_zone` to the `PlaceBranches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deposit` to the `Reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_updated_at` to the `Reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ContactMediums` ADD COLUMN `url_prefix` VARCHAR(63) NOT NULL;

-- AlterTable
ALTER TABLE `PlaceBranchContacts` DROP COLUMN `contact`,
    DROP COLUMN `tip`,
    ADD COLUMN `display_text` VARCHAR(31) NULL,
    ADD COLUMN `value` VARCHAR(31) NOT NULL;

-- AlterTable
ALTER TABLE `PlaceBranchMenus` ADD COLUMN `price` FLOAT NULL;

-- AlterTable
ALTER TABLE `PlaceBranches` DROP COLUMN `contact`,
    ADD COLUMN `address` VARCHAR(127) NOT NULL,
    ADD COLUMN `latitude` INTEGER NULL,
    ADD COLUMN `longitude` INTEGER NULL,
    ADD COLUMN `time_zone` VARCHAR(7) NOT NULL;

-- AlterTable
ALTER TABLE `PlacesContacts` MODIFY `contact` VARCHAR(31) NOT NULL;

-- AlterTable
ALTER TABLE `Reservations` ADD COLUMN `deposit` FLOAT NOT NULL,
    ADD COLUMN `last_updated_at` DATETIME(0) NOT NULL;
