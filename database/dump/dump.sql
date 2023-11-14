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
  CONSTRAINT `FK_4c675567d2a58f0b07cef09c13d` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_85e0d46c3e25feec2d6c044b66d` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS conversations;
CREATE TABLE `conversations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  CONSTRAINT `FK_5147cc94953ebd1ac56fd71303e` FOREIGN KEY (`follower_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_dabee2071be6d19281013b95829` FOREIGN KEY (`followed_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  CONSTRAINT `FK_c0ab99d9dfc61172871277b52f6` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS message_view;
CREATE TABLE `message_view` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `viewed_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `message_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9afaa3f22934f44774e4476b568` (`message_id`),
  KEY `FK_6793de42c3eca75d3ef9b97a88b` (`user_id`),
  CONSTRAINT `FK_6793de42c3eca75d3ef9b97a88b` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_9afaa3f22934f44774e4476b568` FOREIGN KEY (`message_id`) REFERENCES `message` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS migrations;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1427a77e06023c250ed3794a1ba` (`user_id`),
  KEY `FK_de8978490834e2e9cb3c3fc8066` (`conversation_id`),
  CONSTRAINT `FK_1427a77e06023c250ed3794a1ba` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_de8978490834e2e9cb3c3fc8066` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  CONSTRAINT `FK_7248107fd034c263fa56bbc5c2b` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
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
  CONSTRAINT `FK_dde6062145a93649adc5af3946e` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
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
  CONSTRAINT `FK_27be2cab62274f6876ad6a31641` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_649757246b34f4ab075819e62e6` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE OR REPLACE VIEW `options_with_percentage` AS select `options`.`id` AS `id`,`options`.`text` AS `text`,`options`.`poll_id` AS `poll_id`,`options`.`created_at` AS `created_at`,`options`.`updated_at` AS `updated_at`,`options`.`deleted_at` AS `deleted_at`,ifnull(cast(100 * count(`votes`.`id`) / sum(count(`votes`.`id`)) over ( partition by `options`.`poll_id`) as float),0) AS `percentage` from (`options` left join `votes` on(`options`.`id` = `votes`.`option_id` and `votes`.`deleted_at` is null)) group by `options`.`id` order by `options`.`id`,`options`.`poll_id`;

INSERT INTO country(id,name) VALUES(1,'AF'),(2,'AL'),(3,'DZ'),(4,'AS'),(5,'AD'),(6,'AO'),(7,'AI'),(8,'AQ'),(9,'AG'),(10,'AR'),(11,'AM'),(12,'AW'),(13,'AU'),(14,'AT'),(15,'AZ'),(16,'BS'),(17,'BH'),(18,'BD'),(19,'BB'),(20,'BY'),(21,'BE'),(22,'BZ'),(23,'BJ'),(24,'BM'),(25,'BT'),(26,'BO'),(27,'BA'),(28,'BW'),(29,'BV'),(30,'BR'),(31,'IO'),(32,'BN'),(33,'BG'),(34,'BF'),(35,'BI'),(36,'KH'),(37,'CM'),(38,'CA'),(39,'CV'),(40,'KY'),(41,'CF'),(42,'TD'),(43,'CL'),(44,'CN'),(45,'CX'),(46,'CC'),(47,'CO'),(48,'KM'),(49,'CG'),(50,'CD'),(51,'CK'),(52,'CR'),(53,'CI'),(54,'HR'),(55,'CU'),(56,'CY'),(57,'CZ'),(58,'DK'),(59,'DJ'),(60,'DM'),(61,'DO'),(62,'EC'),(63,'EG'),(64,'SV'),(65,'GQ'),(66,'ER'),(67,'EE'),(68,'ET'),(69,'FK'),(70,'FO'),(71,'FJ'),(72,'FI'),(73,'FR'),(74,'GF'),(75,'PF'),(76,'TF'),(77,'GA'),(78,'GM'),(79,'GE'),(80,'DE'),(81,'GH'),(82,'GI'),(83,'GR'),(84,'GL'),(85,'GD'),(86,'GP'),(87,'GU'),(88,'GT'),(89,'GN'),(90,'GW'),(91,'GY'),(92,'HT'),(93,'HM'),(94,'VA'),(95,'HN'),(96,'HK'),(97,'HU'),(98,'IS'),(99,'IN'),(100,'ID'),(101,'IR'),(102,'IQ'),(103,'IE'),(104,'IL'),(105,'IT'),(106,'JM'),(107,'JP'),(108,'JO'),(109,'KZ'),(110,'KE'),(111,'KI'),(112,'KP'),(113,'KR'),(114,'KW'),(115,'KG'),(116,'LA'),(117,'LV'),(118,'LB'),(119,'LS'),(120,'LR'),(121,'LY'),(122,'LI'),(123,'LT'),(124,'LU'),(125,'MO'),(126,'MK'),(127,'MG'),(128,'MW'),(129,'MY'),(130,'MV'),(131,'ML'),(132,'MT'),(133,'MH'),(134,'MQ'),(135,'MR'),(136,'MU'),(137,'YT'),(138,'MX'),(139,'FM'),(140,'MD'),(141,'MC'),(142,'MN'),(143,'MS'),(144,'MA'),(145,'MZ'),(146,'MM'),(147,'NA'),(148,'NR'),(149,'NP'),(150,'NL'),(151,'NC'),(152,'NZ'),(153,'NI'),(154,'NE'),(155,'NG'),(156,'NU'),(157,'NF'),(158,'MP'),(159,'NO'),(160,'OM'),(161,'PK'),(162,'PW'),(163,'PS'),(164,'PA'),(165,'PG'),(166,'PY'),(167,'PE'),(168,'PH'),(169,'PN'),(170,'PL'),(171,'PT'),(172,'PR'),(173,'QA'),(174,'RE'),(175,'RO'),(176,'RU'),(177,'RW'),(178,'SH'),(179,'KN'),(180,'LC'),(181,'PM'),(182,'VC'),(183,'WS'),(184,'SM'),(185,'ST'),(186,'SA'),(187,'SN'),(188,'SC'),(189,'SL'),(190,'SG'),(191,'SK'),(192,'SI'),(193,'SB'),(194,'SO'),(195,'ZA'),(196,'GS'),(197,'ES'),(198,'LK'),(199,'SD'),(200,'SR'),(201,'SJ'),(202,'SZ'),(203,'SE'),(204,'CH'),(205,'SY'),(206,'TW'),(207,'TJ'),(208,'TZ'),(209,'TH'),(210,'TL'),(211,'TG'),(212,'TK'),(213,'TO'),(214,'TT'),(215,'TN'),(216,'TR'),(217,'TM'),(218,'TC'),(219,'TV'),(220,'UG'),(221,'UA'),(222,'AE'),(223,'GB'),(224,'US'),(225,'UM'),(226,'UY'),(227,'UZ'),(228,'VU'),(229,'VE'),(230,'VN'),(231,'VG'),(232,'VI'),(233,'WF'),(234,'EH'),(235,'YE'),(236,'ZM'),(237,'ZW'),(238,'AX'),(239,'BQ'),(240,'CW'),(241,'GG'),(242,'IM'),(243,'JE'),(244,'ME'),(245,'BL'),(246,'MF'),(247,'RS'),(248,'SX'),(249,'SS'),(250,'XK');