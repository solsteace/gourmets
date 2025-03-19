/*
  Warnings:

  - You are about to drop the column `place_branch_id` on the `Reservations` table. All the data in the column will be lost.
  - You are about to drop the column `place_branch_id` on the `Seats` table. All the data in the column will be lost.
  - You are about to drop the `PlaceBranchContacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaceBranchImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaceBranchMenuReviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaceBranchMenus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaceBranches` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `branch_id` to the `Reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `Seats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MenuReviewImages` DROP FOREIGN KEY `MenuReviewImages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `PlaceBranchContacts` DROP FOREIGN KEY `PlaceBranchContacts_ibfk_1`;

-- DropForeignKey
ALTER TABLE `PlaceBranchContacts` DROP FOREIGN KEY `PlaceBranchContacts_ibfk_2`;

-- DropForeignKey
ALTER TABLE `PlaceBranchImages` DROP FOREIGN KEY `PlaceBranchImages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `PlaceBranchMenuReviews` DROP FOREIGN KEY `PlaceBranchMenuReviews_ibfk_1`;

-- DropForeignKey
ALTER TABLE `PlaceBranchMenuReviews` DROP FOREIGN KEY `PlaceBranchMenuReviews_ibfk_2`;

-- DropForeignKey
ALTER TABLE `PlaceBranchMenus` DROP FOREIGN KEY `PlaceBranchMenus_ibfk_1`;

-- DropForeignKey
ALTER TABLE `PlaceBranchMenus` DROP FOREIGN KEY `PlaceBranchMenus_ibfk_2`;

-- DropForeignKey
ALTER TABLE `PlaceBranches` DROP FOREIGN KEY `PlaceBranches_ibfk_1`;

-- DropForeignKey
ALTER TABLE `PlaceBranches` DROP FOREIGN KEY `PlaceBranches_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Reservations` DROP FOREIGN KEY `Reservations_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Seats` DROP FOREIGN KEY `Seats_ibfk_1`;

-- DropIndex
DROP INDEX `place_branch_id` ON `Reservations`;

-- DropIndex
DROP INDEX `place_branch_id` ON `Seats`;

-- AlterTable
ALTER TABLE `Reservations` DROP COLUMN `place_branch_id`,
    ADD COLUMN `branch_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Seats` DROP COLUMN `place_branch_id`,
    ADD COLUMN `branch_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `PlaceBranchContacts`;

-- DropTable
DROP TABLE `PlaceBranchImages`;

-- DropTable
DROP TABLE `PlaceBranchMenuReviews`;

-- DropTable
DROP TABLE `PlaceBranchMenus`;

-- DropTable
DROP TABLE `PlaceBranches`;

-- CreateTable
CREATE TABLE `BranchContacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `branch_id` INTEGER NOT NULL,
    `contact_medium_id` INTEGER NOT NULL,
    `value` VARCHAR(31) NOT NULL,
    `display_text` VARCHAR(31) NULL,

    INDEX `branch_id`(`branch_id`),
    INDEX `contact_medium_id`(`contact_medium_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BranchImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `branch_id` INTEGER NOT NULL,
    `image_path` VARCHAR(63) NOT NULL,
    `caption` VARCHAR(63) NOT NULL,

    INDEX `branch_id`(`branch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BranchMenus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `branch_id` INTEGER NOT NULL,
    `menu_id` INTEGER NOT NULL,
    `price` FLOAT NULL,

    INDEX `branch_id`(`branch_id`),
    INDEX `menu_id`(`menu_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `place_id` INTEGER NOT NULL,
    `address` VARCHAR(127) NOT NULL,
    `latitude` INTEGER NULL,
    `longitude` INTEGER NULL,
    `start_open_at` TIME(0) NOT NULL,
    `end_open_at` TIME(0) NOT NULL,
    `time_zone` VARCHAR(7) NOT NULL,
    `closed_at` DATETIME(0) NOT NULL,

    INDEX `country_id`(`country_id`),
    INDEX `place_id`(`place_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuReviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `branch_menu_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `comment` VARCHAR(1023) NOT NULL,
    `header` VARCHAR(63) NOT NULL,
    `rating` TINYINT NOT NULL,
    `last_changed_at` DATETIME(0) NOT NULL,

    INDEX `branch_menu_id`(`branch_menu_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `branch_id` ON `Reservations`(`branch_id`);

-- CreateIndex
CREATE INDEX `branch_id` ON `Seats`(`branch_id`);

-- AddForeignKey
ALTER TABLE `MenuReviewImages` ADD CONSTRAINT `MenuReviewImages_ibfk_1` FOREIGN KEY (`menu_review_id`) REFERENCES `MenuReviews`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `Branches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Seats` ADD CONSTRAINT `Seats_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `Branches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `BranchContacts` ADD CONSTRAINT `BranchContacts_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `Branches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `BranchContacts` ADD CONSTRAINT `BranchContacts_ibfk_2` FOREIGN KEY (`contact_medium_id`) REFERENCES `ContactMediums`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `BranchImages` ADD CONSTRAINT `BranchImages_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `Branches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `BranchMenus` ADD CONSTRAINT `BranchMenus_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `Branches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `BranchMenus` ADD CONSTRAINT `BranchMenus_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `Menus`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Branches` ADD CONSTRAINT `Branches_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `Countries`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Branches` ADD CONSTRAINT `Branches_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MenuReviews` ADD CONSTRAINT `MenuReviews_ibfk_1` FOREIGN KEY (`branch_menu_id`) REFERENCES `BranchMenus`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MenuReviews` ADD CONSTRAINT `MenuReviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
