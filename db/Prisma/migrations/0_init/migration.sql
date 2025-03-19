-- CreateTable
CREATE TABLE `ContactMediums` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(31) NOT NULL,
    `icon_path` VARCHAR(63) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(63) NOT NULL,
    `display_name` VARCHAR(3) NOT NULL,
    `description` VARCHAR(511) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Levels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(31) NOT NULL,
    `required_exp` INTEGER NOT NULL,
    `image_path` VARCHAR(63) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    UNIQUE INDEX `required_exp`(`required_exp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoginAttempts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `is_ok` BOOLEAN NOT NULL,
    `attempted_at` DATETIME(0) NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuBookmark` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `menu_id`(`menu_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_id` INTEGER NOT NULL,
    `image_path` VARCHAR(63) NOT NULL,
    `caption` VARCHAR(63) NOT NULL,

    INDEX `menu_id`(`menu_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuReviewImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_path` VARCHAR(63) NULL,
    `menu_review_id` INTEGER NOT NULL,

    UNIQUE INDEX `image_path`(`image_path`),
    INDEX `menu_review_id`(`menu_review_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuSpecialties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `specialty_id` INTEGER NOT NULL,
    `menu_id` INTEGER NOT NULL,

    INDEX `menu_id`(`menu_id`),
    INDEX `specialty_id`(`specialty_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` INTEGER NOT NULL,
    `name` VARCHAR(63) NOT NULL,
    `description` VARCHAR(511) NULL,

    INDEX `place_id`(`place_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceAdmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `place_id` INTEGER NOT NULL,

    INDEX `place_id`(`place_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceBranchContacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_branch_id` INTEGER NOT NULL,
    `contact_medium_id` INTEGER NOT NULL,
    `contact` VARCHAR(35) NOT NULL,
    `tip` VARCHAR(15) NULL,

    INDEX `contact_medium_id`(`contact_medium_id`),
    INDEX `place_branch_id`(`place_branch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceBranchImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_branch_id` INTEGER NOT NULL,
    `image_path` VARCHAR(63) NOT NULL,
    `caption` VARCHAR(63) NOT NULL,

    INDEX `place_branch_id`(`place_branch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceBranchMenuReviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_branch_menu_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `comment` VARCHAR(1023) NOT NULL,
    `header` VARCHAR(63) NOT NULL,
    `rating` TINYINT NOT NULL,
    `timestamp` DATETIME(0) NOT NULL,

    INDEX `place_branch_menu_id`(`place_branch_menu_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceBranchMenus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_branch_id` INTEGER NOT NULL,
    `menu_id` INTEGER NOT NULL,

    INDEX `menu_id`(`menu_id`),
    INDEX `place_branch_id`(`place_branch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceBranches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `place_id` INTEGER NOT NULL,
    `contact` VARCHAR(15) NULL,
    `start_open_at` TIME(0) NOT NULL,
    `end_open_at` TIME(0) NOT NULL,
    `closed_at` DATETIME(0) NOT NULL,

    INDEX `country_id`(`country_id`),
    INDEX `place_id`(`place_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceSpecialties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` INTEGER NOT NULL,
    `specialty_id` INTEGER NOT NULL,

    INDEX `place_id`(`place_id`),
    INDEX `specialty_id`(`specialty_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Places` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(31) NOT NULL,
    `description` VARCHAR(511) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlacesContacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` INTEGER NOT NULL,
    `contact_medium_id` INTEGER NOT NULL,
    `contact` VARCHAR(35) NOT NULL,
    `tip` VARCHAR(15) NULL,

    INDEX `contact_medium_id`(`contact_medium_id`),
    INDEX `place_id`(`place_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `place_branch_id` INTEGER NOT NULL,
    `status` VARCHAR(7) NOT NULL,
    `start_time` DATETIME(0) NOT NULL,
    `end_time` DATETIME(0) NOT NULL,

    INDEX `place_branch_id`(`place_branch_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservedSeats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seat_id` INTEGER NOT NULL,
    `reservation_id` INTEGER NOT NULL,

    INDEX `reservation_id`(`reservation_id`),
    INDEX `seat_id`(`seat_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(31) NOT NULL,
    `description` VARCHAR(127) NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_branch_id` INTEGER NOT NULL,
    `capacity` INTEGER NOT NULL,
    `name` VARCHAR(31) NOT NULL,

    INDEX `place_branch_id`(`place_branch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Specialties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(31) NOT NULL,
    `image_path` VARCHAR(63) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpecialtyPreferences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `specialty_id` INTEGER NOT NULL,

    INDEX `specialty_id`(`specialty_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRoles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `role_id`(`role_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserStats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `level_id` INTEGER NOT NULL,
    `exp_points` INTEGER NOT NULL,

    INDEX `level_id`(`level_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NULL,
    `display_name` VARCHAR(63) NOT NULL,
    `username` VARCHAR(63) NOT NULL,
    `email` VARCHAR(63) NOT NULL,
    `password` VARCHAR(63) NOT NULL,
    `image_path` VARCHAR(63) NULL,
    `verified_at` DATETIME(0) NULL,
    `last_logged_at` DATETIME(0) NULL,
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `password`(`password`),
    INDEX `country_id`(`country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LoginAttempts` ADD CONSTRAINT `LoginAttempts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MenuBookmark` ADD CONSTRAINT `MenuBookmark_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `Menus`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MenuBookmark` ADD CONSTRAINT `MenuBookmark_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MenuImages` ADD CONSTRAINT `MenuImages_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `Menus`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MenuReviewImages` ADD CONSTRAINT `MenuReviewImages_ibfk_1` FOREIGN KEY (`menu_review_id`) REFERENCES `PlaceBranchMenuReviews`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MenuSpecialties` ADD CONSTRAINT `MenuSpecialties_ibfk_1` FOREIGN KEY (`specialty_id`) REFERENCES `Specialties`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MenuSpecialties` ADD CONSTRAINT `MenuSpecialties_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `Menus`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Menus` ADD CONSTRAINT `Menus_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceAdmin` ADD CONSTRAINT `PlaceAdmin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceAdmin` ADD CONSTRAINT `PlaceAdmin_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceBranchContacts` ADD CONSTRAINT `PlaceBranchContacts_ibfk_1` FOREIGN KEY (`place_branch_id`) REFERENCES `PlaceBranches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceBranchContacts` ADD CONSTRAINT `PlaceBranchContacts_ibfk_2` FOREIGN KEY (`contact_medium_id`) REFERENCES `ContactMediums`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceBranchImages` ADD CONSTRAINT `PlaceBranchImages_ibfk_1` FOREIGN KEY (`place_branch_id`) REFERENCES `PlaceBranches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceBranchMenuReviews` ADD CONSTRAINT `PlaceBranchMenuReviews_ibfk_1` FOREIGN KEY (`place_branch_menu_id`) REFERENCES `PlaceBranchMenus`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceBranchMenuReviews` ADD CONSTRAINT `PlaceBranchMenuReviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceBranchMenus` ADD CONSTRAINT `PlaceBranchMenus_ibfk_1` FOREIGN KEY (`place_branch_id`) REFERENCES `PlaceBranches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceBranchMenus` ADD CONSTRAINT `PlaceBranchMenus_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `Menus`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceBranches` ADD CONSTRAINT `PlaceBranches_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `Countries`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceBranches` ADD CONSTRAINT `PlaceBranches_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceSpecialties` ADD CONSTRAINT `PlaceSpecialties_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlaceSpecialties` ADD CONSTRAINT `PlaceSpecialties_ibfk_2` FOREIGN KEY (`specialty_id`) REFERENCES `Specialties`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlacesContacts` ADD CONSTRAINT `PlacesContacts_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `Places`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PlacesContacts` ADD CONSTRAINT `PlacesContacts_ibfk_2` FOREIGN KEY (`contact_medium_id`) REFERENCES `ContactMediums`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_ibfk_2` FOREIGN KEY (`place_branch_id`) REFERENCES `PlaceBranches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ReservedSeats` ADD CONSTRAINT `ReservedSeats_ibfk_1` FOREIGN KEY (`seat_id`) REFERENCES `Seats`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ReservedSeats` ADD CONSTRAINT `ReservedSeats_ibfk_2` FOREIGN KEY (`reservation_id`) REFERENCES `Reservations`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Seats` ADD CONSTRAINT `Seats_ibfk_1` FOREIGN KEY (`place_branch_id`) REFERENCES `PlaceBranches`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `SpecialtyPreferences` ADD CONSTRAINT `SpecialtyPreferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `SpecialtyPreferences` ADD CONSTRAINT `SpecialtyPreferences_ibfk_2` FOREIGN KEY (`specialty_id`) REFERENCES `Specialties`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `UserStats` ADD CONSTRAINT `UserStats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `UserStats` ADD CONSTRAINT `UserStats_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `Levels`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `Countries`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

