CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) UNIQUE,
  `email` VARCHAR(100) UNIQUE,
  `password` VARCHAR(255),
  `birthdate` DATE,
  `gender` VARCHAR(25),
  `country` VARCHAR(100),
  `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` DATETIME(6) NULL,
  PRIMARY KEY (`user_id`)
);
CREATE TABLE `polls`(
  `poll_id` INT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` DATETIME(6) NULL,
  PRIMARY KEY (`poll_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);
CREATE TABLE `options`(
  `option_id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  `poll_id` INT NOT NULL,
  `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` DATETIME(6) NULL,
  PRIMARY KEY (`option_id`),
  FOREIGN KEY (`poll_id`) REFERENCES `polls`(`poll_id`)
);
CREATE TABLE IF NOT EXISTS `votes`(
  `vote_id` INT NOT NULL AUTO_INCREMENT,
  `poll_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `option_id` INT NOT NULL,
  `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` DATETIME(6) NULL,
  PRIMARY KEY (`vote_id`)
);
CREATE TABLE IF NOT EXISTS `comments`(
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  `poll_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `content_items` INT NOT NULL,
  `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` DATETIME(6) NULL,
);
CREATE TABLE `content_items`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `content_item_id` INT,
  `content_type` VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS `reactions`(
  `reaction_id` INT NOT NULL AUTO_INCREMENT,
  `is_like` BOOLEAN,
  `content_items_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` DATETIME(6) NULL,
  PRIMARY KEY (`reaction_id`)
);
CREATE TABLE IF NOT EXISTS `followers` (
  `follower_id` INT NOT NULL AUTO_INCREMENT,
  `followed_user_id` INT NOT NULL,
  `follower_user_id` INT NOT NULL,
  `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` DATETIME(6) NULL,
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
  INNER JOIN `participants` `participant` ON `participant`.`conversation_id` = `conversation`.`id`
  INNER JOIN `users` `user` ON `user`.`id` = `participant`.`user_id`
  AND (`user`.`deleted_at` IS NULL)
WHERE
  `user`.`id` = 1 -- PARAMETERS: [1]
SELECT
  *
FROM
  information_schema.columns
WHERE
  table_schema = 'cens';
SELECT
  *
FROM
  information_schema.columns
WHERE
  table_schema = 'cens'
ORDER BY
  TABLE_NAME,
  ORDINAL_POSITION;
SELECT
  TABLE_NAME,
  COLUMN_NAME,
  DATA_TYPE,
  COLUMN_TYPE,
  COLUMN_COMMENT,
  ORDINAL_POSITION
FROM
  information_schema.columns
WHERE
  table_schema = 'db_name'
ORDER BY
  TABLE_NAME,
  ORDINAL_POSITION;
SELECT
  *
FROM
  information_schema.columns
WHERE
  table_schema != 'information_schema';
SELECT
  *
FROM
  `votes`
  INNER JOIN `users` ON `votes`.`user_id` = `users`.`id`
WHERE
  `votes`.`deleted_at` IS NULL;
SELECT
  options.id,
  options.text,
  options.poll_id,
  options.created_at,
  options.updated_at,
  options.deleted_at,
  CAST(
    100 * COUNT(votes.id) / SUM(COUNT(votes.id)) OVER() AS FLOAT
  ) as percentage
FROM
  options
  LEFT JOIN votes ON options.id = votes.option_id
WHERE
  options.poll_id = 1
GROUP BY
  options.id;
SELECT
  *
FROM
  users;
SELECT
  u.*
FROM
  users u
WHERE
  u.id NOT IN (
    SELECT
      f.followed_user_id
    FROM
      followers f
    WHERE
      f.follower_user_id = 1 -- Reemplaza 1 con el user_id del usuario específico
  )
  AND u.id <> 1 -- Para asegurarse de que el usuario no aparezca como resultado
ORDER BY
  RAND()
LIMIT
  5;
SELECT
  conversations.id AS chatId,
  participants.user_id,
  users.username
FROM
  conversations
  INNER JOIN participants ON conversations.id = participants.conversation_id
  INNER JOIN users ON participants.user_id = users.id;
-- Chats
SELECT
  users.*
FROM
  conversations
  INNER JOIN participants ON conversations.id = participants.conversation_id
  INNER JOIN users ON participants.user_id = users.id
WHERE
  conversations.id IN (
    SELECT
      conversations.id
    FROM
      conversations
      INNER JOIN participants ON conversations.id = participants.conversation_id
    WHERE
      participants.user_id = 1
  )
  AND participants.user_id <> 1;
SELECT
  `conversation`.`id` AS `conversation_id`
FROM
  `conversations` `conversation`
  INNER JOIN `participants` `participants` ON `participants`.`conversation_id` = `conversation`.`id`
WHERE
  `participants`.`user_id` = 1
SELECT
  conversations.id
FROM
  conversations
  INNER JOIN participants ON conversations.id = participants.conversation_id
WHERE
  participants.user_id = 1;
-- TODO: Las fechas de nacimiento no deberian pasar la fecha actual o 18 años atras
SELECT
  polls.id,
  polls.question,
  polls.description,
  votes.option_id,
  -- COUNT(votes.option_id),
  users.id,
  users.gender
FROM
  polls
  RIGHT JOIN votes ON polls.id = votes.poll_id
  INNER JOIN users ON votes.user_id = users.id
WHERE
  polls.id = 1
GROUP BY
  votes.option_id;
SELECT
  votes.option_id,
  COUNT(votes.option_id),
  IFNULL(users.gender, 'Desconocido'),
  COUNT(users.gender)
FROM
  votes
  INNER JOIN users ON votes.user_id = users.id
WHERE
  votes.poll_id = 1
GROUP BY
  votes.option_id,
  users.gender;
SELECT
  o.id AS option_id,
  o.text AS option_text,
  SUM(
    CASE
      WHEN u.gender = 'masculino' THEN 1
      ELSE 0
    END
  ) AS male_votes,
  SUM(
    CASE
      WHEN u.gender = 'femenino' THEN 1
      ELSE 0
    END
  ) AS female_votes,
  SUM(
    CASE
      WHEN u.gender IS NULL THEN 1
      ELSE 0
    END
  ) AS other_votes
FROM
  options o
  LEFT JOIN votes v ON o.id = v.option_id
  LEFT JOIN users u ON v.user_id = u.id
WHERE
  o.poll_id = 1
GROUP BY
  o.id;
SELECT
  o.text AS option_text,
  IFNULL(
    SUM(
      CASE
        WHEN u.gender = 'masculino' THEN 1
        ELSE 0
      END
    ) / COUNT(v.id) * 100,
    0
  ) AS percentage_male,
  IFNULL(
    SUM(
      CASE
        WHEN u.gender = 'femenino' THEN 1
        ELSE 0
      END
    ) / COUNT(v.id) * 100,
    0
  ) AS percentage_female,
  IFNULL(
    SUM(
      CASE
        WHEN u.gender IS NULL THEN 1
        ELSE 0
      END
    ) / COUNT(v.id) * 100,
    0
  ) AS percentage_other
FROM
  options o
  LEFT JOIN votes v ON o.id = v.option_id
  LEFT JOIN users u ON v.user_id = u.id
WHERE
  o.poll_id = 1
GROUP BY
  o.id;
-- Consulta para calcular el porcentaje por edad de cada respuesta para un poll_id específico
SELECT
  options.text AS option_text,
  SUM(
    CASE
      WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 18
      AND 24 THEN 1
      ELSE 0
    END
  ) / COUNT(v.id) * 100 AS '18-24',
  SUM(
    CASE
      WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 25
      AND 34 THEN 1
      ELSE 0
    END
  ) / COUNT(v.id) * 100 AS '25-34',
  SUM(
    CASE
      WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 35
      AND 44 THEN 1
      ELSE 0
    END
  ) / COUNT(v.id) * 100 AS '35-44',
  SUM(
    CASE
      WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 45
      AND 54 THEN 1
      ELSE 0
    END
  ) / COUNT(v.id) * 100 AS '45-54',
  SUM(
    CASE
      WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 55
      AND 64 THEN 1
      ELSE 0
    END
  ) / COUNT(v.id) * 100 AS '55-64',
  SUM(
    CASE
      WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) >= 65 THEN 1
      ELSE 0
    END
  ) / COUNT(v.id) * 100 AS '65+',
  SUM(
    CASE
      WHEN u.birth_date IS NULL THEN 1
      ELSE 0
    END
  ) / COUNT(v.id) * 100 AS percentage_other
FROM
  votes v
  INNER JOIN options ON v.option_id = options.id
  LEFT JOIN polls p ON v.poll_id = p.id
  LEFT JOIN users u ON v.user_id = u.id
WHERE
  v.poll_id = 1
GROUP BY
  options.id,
  options.text;
SELECT
  c.name AS country_name,
  o.text AS option_text,
  COUNT(v.id) * 100.0 / (
    SELECT
      COUNT(*)
    FROM
      votes
    WHERE
      poll_id = 1
  ) AS percentage
FROM
  votes v
  JOIN options o ON v.option_id = o.id
  JOIN users u ON v.user_id = u.id
  JOIN country c ON u.country_id = c.id
WHERE
  v.poll_id = 1
GROUP BY
  c.name,
  o.text
ORDER BY
  c.name,
  o.text;




SELECT
  options.text AS option_text,
  COALESCE(c.name, 'Unknown') AS country_name,
  u.username AS user_username,
  COUNT(v.id) / COUNT(*) * 100 AS percentage
FROM
  votes v
  INNER JOIN options ON v.option_id = options.id
  LEFT JOIN polls p ON v.poll_id = p.id
  LEFT JOIN users u ON v.user_id = u.id
  LEFT JOIN country c ON u.country_id = c.id
WHERE
  v.poll_id = 1
GROUP BY
  options.id,
  options.text,
  country_name,
  user_username;


SELECT
  IFNULL(country.name, 'Desconocido') AS country,
  IFNULL(CAST(100 * COUNT(users.id) / SUM(COUNT(users.id)) OVER(PARTITION BY votes.poll_id) AS FLOAT), 0) as percentage
FROM
  votes
  INNER JOIN users ON votes.user_id = users.id
  LEFT JOIN country ON users.country_id = country.id
WHERE
  votes.poll_id = 1
GROUP BY
  country.name;