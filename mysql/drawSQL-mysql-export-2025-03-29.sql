CREATE TABLE `exercise_name`(
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `muscle_group` VARCHAR(255) NOT NULL,
    `equipment` VARCHAR(255) NOT NULL,
    `difficulty` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    PRIMARY KEY(`name`)
);
CREATE TABLE `my_training_program`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `routine_name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `frequency` INT NOT NULL,
    `exercise_list` JSON NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    PRIMARY KEY(`routine_name`)
);
CREATE TABLE `kwak_trainer_program`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `routine_name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `frequency` INT NOT NULL,
    `exercise_list` JSON NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    PRIMARY KEY(`routine_name`)
);
CREATE TABLE `Users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL
);
CREATE TABLE `workout_logs`(
    `program_name` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `exercise_id` BIGINT NOT NULL,
    `routine_id` BIGINT NOT NULL,
    `performed_date` BIGINT NOT NULL,
    `sets` BIGINT NOT NULL,
    `reps` BIGINT NOT NULL,
    `created_at` BIGINT NOT NULL
);
ALTER TABLE
    `workout_logs` ADD CONSTRAINT `workout_logs_program_name_foreign` FOREIGN KEY(`program_name`) REFERENCES `kwak_trainer_program`(`routine_name`);
ALTER TABLE
    `workout_logs` ADD CONSTRAINT `workout_logs_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `workout_logs` ADD CONSTRAINT `workout_logs_program_name_foreign` FOREIGN KEY(`program_name`) REFERENCES `my_training_program`(`routine_name`);
ALTER TABLE
    `my_training_program` ADD CONSTRAINT `my_training_program_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `my_training_program` ADD CONSTRAINT `my_training_program_exercise_list_foreign` FOREIGN KEY(`exercise_list`) REFERENCES `exercise_name`(`name`);
ALTER TABLE
    `kwak_trainer_program` ADD CONSTRAINT `kwak_trainer_program_exercise_list_foreign` FOREIGN KEY(`exercise_list`) REFERENCES `exercise_name`(`name`);