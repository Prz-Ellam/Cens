import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class Database1693776149369 implements MigrationInterface {
    name = 'Database1693776149369';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`country\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`birth_date\` date NULL, \`gender\` enum ('masculino', 'femenino', 'otro') NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`country_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`participants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NULL, \`conversation_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`conversations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`followers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`followed_user_id\` int NULL, \`follower_user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`votes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`poll_id\` int NULL, \`user_id\` int NULL, \`option_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`poll_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`polls\` (\`id\` int NOT NULL AUTO_INCREMENT, \`question\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, \`poll_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`conversation_id\` int NULL, \`sender_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`reactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_like\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, \`poll_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_ae78dc6cb10aa14cfef96b2dd90\` FOREIGN KEY (\`country_id\`) REFERENCES \`country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` ADD CONSTRAINT \`FK_1427a77e06023c250ed3794a1ba\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` ADD CONSTRAINT \`FK_de8978490834e2e9cb3c3fc8066\` FOREIGN KEY (\`conversation_id\`) REFERENCES \`conversations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` ADD CONSTRAINT \`FK_dabee2071be6d19281013b95829\` FOREIGN KEY (\`followed_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` ADD CONSTRAINT \`FK_5147cc94953ebd1ac56fd71303e\` FOREIGN KEY (\`follower_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` ADD CONSTRAINT \`FK_176c7eedc76e4c0e41d17fe7a04\` FOREIGN KEY (\`poll_id\`) REFERENCES \`polls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` ADD CONSTRAINT \`FK_27be2cab62274f6876ad6a31641\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` ADD CONSTRAINT \`FK_649757246b34f4ab075819e62e6\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`options\` ADD CONSTRAINT \`FK_4e0972d6db48eb74f59164ebd61\` FOREIGN KEY (\`poll_id\`) REFERENCES \`polls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`polls\` ADD CONSTRAINT \`FK_7248107fd034c263fa56bbc5c2b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_85e0d46c3e25feec2d6c044b66d\` FOREIGN KEY (\`poll_id\`) REFERENCES \`polls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7fe3e887d78498d9c9813375ce2\` FOREIGN KEY (\`conversation_id\`) REFERENCES \`conversations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` ADD CONSTRAINT \`FK_c0ab99d9dfc61172871277b52f6\` FOREIGN KEY (\`sender_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` ADD CONSTRAINT \`FK_dde6062145a93649adc5af3946e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` ADD CONSTRAINT \`FK_6b781270faef2ff640953214bdb\` FOREIGN KEY (\`poll_id\`) REFERENCES \`polls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(`CREATE VIEW \`options_with_percentage\` AS 
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
    GROUP BY options.id;
  `);
        await queryRunner.query(
            `INSERT INTO \`cens\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
            [
                'cens',
                'VIEW',
                'options_with_percentage',
                'SELECT\n      options.id,\n      options.text,\n      options.poll_id,\n      options.created_at,\n      options.updated_at,\n      options.deleted_at, \n      CAST(100 * COUNT(votes.id) / SUM(COUNT(votes.id)) OVER() AS FLOAT) as percentage\n    FROM options\n    LEFT JOIN votes ON options.id = votes.option_id\n    GROUP BY options.id;',
            ],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`cens\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
            ['VIEW', 'options_with_percentage', 'cens'],
        );
        await queryRunner.query(`DROP VIEW \`options_with_percentage\``);
        await queryRunner.query(
            `ALTER TABLE \`reactions\` DROP FOREIGN KEY \`FK_6b781270faef2ff640953214bdb\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` DROP FOREIGN KEY \`FK_dde6062145a93649adc5af3946e\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_c0ab99d9dfc61172871277b52f6\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7fe3e887d78498d9c9813375ce2\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_85e0d46c3e25feec2d6c044b66d\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`polls\` DROP FOREIGN KEY \`FK_7248107fd034c263fa56bbc5c2b\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`options\` DROP FOREIGN KEY \`FK_4e0972d6db48eb74f59164ebd61\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` DROP FOREIGN KEY \`FK_649757246b34f4ab075819e62e6\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` DROP FOREIGN KEY \`FK_27be2cab62274f6876ad6a31641\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` DROP FOREIGN KEY \`FK_176c7eedc76e4c0e41d17fe7a04\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` DROP FOREIGN KEY \`FK_5147cc94953ebd1ac56fd71303e\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` DROP FOREIGN KEY \`FK_dabee2071be6d19281013b95829\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` DROP FOREIGN KEY \`FK_de8978490834e2e9cb3c3fc8066\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` DROP FOREIGN KEY \`FK_1427a77e06023c250ed3794a1ba\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_ae78dc6cb10aa14cfef96b2dd90\``,
        );
        await queryRunner.query(`DROP TABLE \`reactions\``);
        await queryRunner.query(`DROP TABLE \`message\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`polls\``);
        await queryRunner.query(`DROP TABLE \`options\``);
        await queryRunner.query(`DROP TABLE \`votes\``);
        await queryRunner.query(`DROP TABLE \`followers\``);
        await queryRunner.query(`DROP TABLE \`conversations\``);
        await queryRunner.query(`DROP TABLE \`participants\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`country\``);
    }
}
