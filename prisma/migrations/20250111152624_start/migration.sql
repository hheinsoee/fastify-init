-- CreateTable
CREATE TABLE `users` (
    `id` CHAR(26) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `uid` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_email_uq`(`email`),
    UNIQUE INDEX `uid_uq`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` CHAR(26) NOT NULL,
    `title` CHAR(255) NOT NULL,
    `description` CHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_user_id_fk` FOREIGN KEY (`created_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
