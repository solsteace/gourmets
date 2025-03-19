/*
  Warnings:

  - You are about to drop the `PlaceAdmin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PlaceAdmin` DROP FOREIGN KEY `PlaceAdmin_ibfk_1`;

-- DropForeignKey
ALTER TABLE `PlaceAdmin` DROP FOREIGN KEY `PlaceAdmin_ibfk_2`;

-- DropTable
DROP TABLE `PlaceAdmin`;

-- CreateTable
CREATE TABLE `BranchAdmins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `branch_id` INTEGER NOT NULL,

    INDEX `branch_id`(`branch_id`),
    INDEX `role_id`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BranchAdmins` ADD CONSTRAINT `BranchAdmins_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `BranchAdmins` ADD CONSTRAINT `BranchAdmins_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `Branches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
