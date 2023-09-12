CREATE TABLE IF NOT EXISTS `users` (
    `user_id`               INT NOT NULL AUTO_INCREMENT,
    `username`              VARCHAR(100) UNIQUE,
    `email`                 VARCHAR(100) UNIQUE,
    `password`              VARCHAR(255),
    `birthdate`             DATE,
    `gender`                VARCHAR(25),
    `country`               VARCHAR(100),
    `created_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at`            DATETIME(6) NULL,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `polls`(
    `poll_id`               INT NOT NULL AUTO_INCREMENT,
    `question`              VARCHAR(255) NOT NULL,
    `description`           VARCHAR(255) NOT NULL,
    `user_id`               INT NOT NULL,
    `created_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at`            DATETIME(6) NULL,
    PRIMARY KEY (`poll_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

CREATE TABLE `options`(
    `option_id`             INT NOT NULL AUTO_INCREMENT,
    `text`                  VARCHAR(255) NOT NULL,
    `poll_id`               INT NOT NULL,
    `created_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at`            DATETIME(6) NULL,
    PRIMARY KEY (`option_id`),
    FOREIGN KEY (`poll_id`) REFERENCES `polls`(`poll_id`)
);

CREATE TABLE IF NOT EXISTS `votes`(
    `vote_id`               INT NOT NULL AUTO_INCREMENT,
    `poll_id`               INT NOT NULL,
    `user_id`               INT NOT NULL,
    `option_id`             INT NOT NULL,
    `created_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at`            DATETIME(6) NULL,
    PRIMARY KEY (`vote_id`)
);

CREATE TABLE IF NOT EXISTS `comments`(
    `comment_id`            INT NOT NULL AUTO_INCREMENT,
    `text`                  VARCHAR(255) NOT NULL,
    `poll_id`               INT NOT NULL,
    `user_id`               INT NOT NULL,
    `content_items`         INT NOT NULL,
    `created_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at`            DATETIME(6) NULL,
);

CREATE TABLE `content_items`(
    `id`                    INT NOT NULL AUTO_INCREMENT,
    `content_item_id`       INT,
    `content_type`          VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `reactions`(
    `reaction_id`           INT NOT NULL AUTO_INCREMENT,
    `is_like`               BOOLEAN,
    `content_items_id`      INT NOT NULL,
    `user_id`               INT NOT NULL,
    `created_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at`            DATETIME(6) NULL,
    PRIMARY KEY (`reaction_id`)
);

CREATE TABLE IF NOT EXISTS `followers` (
    `follower_id`           INT NOT NULL AUTO_INCREMENT,
    `followed_user_id`      INT NOT NULL,
    `follower_user_id`      INT NOT NULL,
    `created_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at`            DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at`            DATETIME(6) NULL,
    PRIMARY KEY (`follower_id`),
    FOREIGN KEY (`followed_user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`follower_user_id`) REFERENCES `users`(`user_id`)
);




SELECT 
    `conversation`.`id` AS `conversation_id`, 
    `conversation`.`created_at` AS `conversation_created_at`, 
    `participant`.`id` AS `participant_id`, 
    `participant`.`user_id` AS `participant_user_id`, 
    `participant`.`conversation_id` AS `participant_conversation_id`, 
    `user`.`id` AS `user_id`, 
    `user`.`username` AS `user_username`, 
    `user`.`email` AS `user_email`, 
    `user`.`password` AS `user_password`, 
    `user`.`birth_date` AS `user_birth_date`, 
    `user`.`gender` AS `user_gender`, 
    `user`.`country` AS `user_country`, 
    `user`.`created_at` AS `user_created_at`, 
    `user`.`updated_at` AS `user_updated_at`, 
    `user`.`deleted_at` AS `user_deleted_at` 
FROM
    `conversations` `conversation` 
INNER JOIN `participants` `participant` 
ON `participant`.`conversation_id`=`conversation`.`id`  
INNER JOIN `users` `user` 
ON `user`.`id`=`participant`.`user_id` AND (`user`.`deleted_at` IS NULL) 
WHERE `user`.`id` = 1 -- PARAMETERS: [1]


SELECT * FROM information_schema.columns WHERE table_schema = 'cens';
SELECT * FROM information_schema.columns WHERE table_schema = 'cens' ORDER BY TABLE_NAME, ORDINAL_POSITION;
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, COLUMN_COMMENT, ORDINAL_POSITION FROM information_schema.columns WHERE table_schema = 'db_name' ORDER BY TABLE_NAME, ORDINAL_POSITION;
SELECT * FROM information_schema.columns WHERE table_schema != 'information_schema';

SELECT
    *
FROM
    `votes`
INNER JOIN
    `users`
ON
    `votes`.`user_id` = `users`.`id`
WHERE
    `votes`.`deleted_at` IS NULL;


   SELECT
      options.id,
      options.text,
      options.poll_id,
      options.created_at,
      options.updated_at,
      options.deleted_at, 
      CAST(100 * COUNT(votes.id) / SUM(COUNT(votes.id)) OVER() AS FLOAT) as percentage
    FROM options
    LEFT JOIN votes ON options.id = votes.option_id
    WHERE options.poll_id = 1
    GROUP BY options.id;