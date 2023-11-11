/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ cens /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE cens;

DROP TABLE IF EXISTS comments;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `poll_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4c675567d2a58f0b07cef09c13d` (`user_id`),
  KEY `FK_85e0d46c3e25feec2d6c044b66d` (`poll_id`),
  CONSTRAINT `FK_4c675567d2a58f0b07cef09c13d` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_85e0d46c3e25feec2d6c044b66d` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS conversations;
CREATE TABLE `conversations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS country;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=751 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS followers;
CREATE TABLE `followers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `followed_user_id` int(11) DEFAULT NULL,
  `follower_user_id` int(11) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_dabee2071be6d19281013b95829` (`followed_user_id`),
  KEY `FK_5147cc94953ebd1ac56fd71303e` (`follower_user_id`),
  CONSTRAINT `FK_5147cc94953ebd1ac56fd71303e` FOREIGN KEY (`follower_user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_dabee2071be6d19281013b95829` FOREIGN KEY (`followed_user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS message;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `conversation_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7fe3e887d78498d9c9813375ce2` (`conversation_id`),
  KEY `FK_c0ab99d9dfc61172871277b52f6` (`sender_id`),
  CONSTRAINT `FK_7fe3e887d78498d9c9813375ce2` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c0ab99d9dfc61172871277b52f6` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS message_view;
CREATE TABLE `message_view` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `viewed_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `message_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9afaa3f22934f44774e4476b568` (`message_id`),
  KEY `FK_6793de42c3eca75d3ef9b97a88b` (`user_id`),
  CONSTRAINT `FK_6793de42c3eca75d3ef9b97a88b` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_9afaa3f22934f44774e4476b568` FOREIGN KEY (`message_id`) REFERENCES `message` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS migrations;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS options;
CREATE TABLE `options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `poll_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4e0972d6db48eb74f59164ebd61` (`poll_id`),
  CONSTRAINT `FK_4e0972d6db48eb74f59164ebd61` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS participants;
CREATE TABLE `participants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `conversation_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1427a77e06023c250ed3794a1ba` (`user_id`),
  KEY `FK_de8978490834e2e9cb3c3fc8066` (`conversation_id`),
  CONSTRAINT `FK_1427a77e06023c250ed3794a1ba` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_de8978490834e2e9cb3c3fc8066` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS polls;
CREATE TABLE `polls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7248107fd034c263fa56bbc5c2b` (`user_id`),
  CONSTRAINT `FK_7248107fd034c263fa56bbc5c2b` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS reactions;
CREATE TABLE `reactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_like` tinyint(4) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `poll_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_dde6062145a93649adc5af3946e` (`user_id`),
  KEY `FK_6b781270faef2ff640953214bdb` (`poll_id`),
  CONSTRAINT `FK_6b781270faef2ff640953214bdb` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_dde6062145a93649adc5af3946e` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS typeorm_metadata;
CREATE TABLE `typeorm_metadata` (
  `type` varchar(255) NOT NULL,
  `database` varchar(255) DEFAULT NULL,
  `schema` varchar(255) DEFAULT NULL,
  `table` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('masculino','femenino','otro') DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ae78dc6cb10aa14cfef96b2dd90` (`country_id`),
  CONSTRAINT `FK_ae78dc6cb10aa14cfef96b2dd90` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS votes;
CREATE TABLE `votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `poll_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `option_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_176c7eedc76e4c0e41d17fe7a04` (`poll_id`),
  KEY `FK_27be2cab62274f6876ad6a31641` (`user_id`),
  KEY `FK_649757246b34f4ab075819e62e6` (`option_id`),
  CONSTRAINT `FK_176c7eedc76e4c0e41d17fe7a04` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_27be2cab62274f6876ad6a31641` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_649757246b34f4ab075819e62e6` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE OR REPLACE VIEW `options_with_percentage` AS select `options`.`id` AS `id`,`options`.`text` AS `text`,`options`.`poll_id` AS `poll_id`,`options`.`created_at` AS `created_at`,`options`.`updated_at` AS `updated_at`,`options`.`deleted_at` AS `deleted_at`,ifnull(cast(100 * count(`votes`.`id`) / sum(count(`votes`.`id`)) over ( partition by `options`.`poll_id`) as float),0) AS `percentage` from (`options` left join `votes` on(`options`.`id` = `votes`.`option_id` and `votes`.`deleted_at` is null)) group by `options`.`id` order by `options`.`id`,`options`.`poll_id`;