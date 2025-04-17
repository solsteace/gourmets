-- CreateTable
CREATE TABLE `PlaceOwners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `place_id` INTEGER NOT NULL,

    INDEX `role_id`(`role_id`),
    INDEX `place_id`(`place_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlaceOwners` ADD CONSTRAINT `PlaceOwners_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceOwners` ADD CONSTRAINT `PlaceOwners_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
