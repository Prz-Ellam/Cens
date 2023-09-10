import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class Database21693798039364 implements MigrationInterface {
    name = 'Database21693798039364';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD \`avatar\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` ADD \`deleted_at\` datetime(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_ae78dc6cb10aa14cfef96b2dd90\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`birth_date\` \`birth_date\` date NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('masculino', 'femenino', 'otro') NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`country_id\` \`country_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` DROP FOREIGN KEY \`FK_1427a77e06023c250ed3794a1ba\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` DROP FOREIGN KEY \`FK_de8978490834e2e9cb3c3fc8066\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` CHANGE \`user_id\` \`user_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` CHANGE \`conversation_id\` \`conversation_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` DROP FOREIGN KEY \`FK_dabee2071be6d19281013b95829\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` DROP FOREIGN KEY \`FK_5147cc94953ebd1ac56fd71303e\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` CHANGE \`followed_user_id\` \`followed_user_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` CHANGE \`follower_user_id\` \`follower_user_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`polls\` DROP FOREIGN KEY \`FK_7248107fd034c263fa56bbc5c2b\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`polls\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`polls\` CHANGE \`user_id\` \`user_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` DROP FOREIGN KEY \`FK_176c7eedc76e4c0e41d17fe7a04\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` DROP FOREIGN KEY \`FK_27be2cab62274f6876ad6a31641\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` DROP FOREIGN KEY \`FK_649757246b34f4ab075819e62e6\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` CHANGE \`poll_id\` \`poll_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` CHANGE \`user_id\` \`user_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` CHANGE \`option_id\` \`option_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`options\` DROP FOREIGN KEY \`FK_4e0972d6db48eb74f59164ebd61\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`options\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`options\` CHANGE \`poll_id\` \`poll_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_85e0d46c3e25feec2d6c044b66d\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` CHANGE \`user_id\` \`user_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` CHANGE \`poll_id\` \`poll_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7fe3e887d78498d9c9813375ce2\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_c0ab99d9dfc61172871277b52f6\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` CHANGE \`conversation_id\` \`conversation_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` CHANGE \`sender_id\` \`sender_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` DROP FOREIGN KEY \`FK_dde6062145a93649adc5af3946e\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` DROP FOREIGN KEY \`FK_6b781270faef2ff640953214bdb\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` CHANGE \`user_id\` \`user_id\` int NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` CHANGE \`poll_id\` \`poll_id\` int NULL`,
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
            `ALTER TABLE \`polls\` ADD CONSTRAINT \`FK_7248107fd034c263fa56bbc5c2b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
            `ALTER TABLE \`polls\` DROP FOREIGN KEY \`FK_7248107fd034c263fa56bbc5c2b\``,
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
        await queryRunner.query(
            `ALTER TABLE \`reactions\` CHANGE \`poll_id\` \`poll_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` ADD CONSTRAINT \`FK_6b781270faef2ff640953214bdb\` FOREIGN KEY (\`poll_id\`) REFERENCES \`polls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`reactions\` ADD CONSTRAINT \`FK_dde6062145a93649adc5af3946e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` CHANGE \`sender_id\` \`sender_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` CHANGE \`conversation_id\` \`conversation_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` ADD CONSTRAINT \`FK_c0ab99d9dfc61172871277b52f6\` FOREIGN KEY (\`sender_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7fe3e887d78498d9c9813375ce2\` FOREIGN KEY (\`conversation_id\`) REFERENCES \`conversations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` CHANGE \`poll_id\` \`poll_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_85e0d46c3e25feec2d6c044b66d\` FOREIGN KEY (\`poll_id\`) REFERENCES \`polls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`options\` CHANGE \`poll_id\` \`poll_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`options\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`options\` ADD CONSTRAINT \`FK_4e0972d6db48eb74f59164ebd61\` FOREIGN KEY (\`poll_id\`) REFERENCES \`polls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` CHANGE \`option_id\` \`option_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` CHANGE \`poll_id\` \`poll_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` ADD CONSTRAINT \`FK_649757246b34f4ab075819e62e6\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` ADD CONSTRAINT \`FK_27be2cab62274f6876ad6a31641\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`votes\` ADD CONSTRAINT \`FK_176c7eedc76e4c0e41d17fe7a04\` FOREIGN KEY (\`poll_id\`) REFERENCES \`polls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`polls\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`polls\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`polls\` ADD CONSTRAINT \`FK_7248107fd034c263fa56bbc5c2b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` CHANGE \`follower_user_id\` \`follower_user_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` CHANGE \`followed_user_id\` \`followed_user_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` ADD CONSTRAINT \`FK_5147cc94953ebd1ac56fd71303e\` FOREIGN KEY (\`follower_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` ADD CONSTRAINT \`FK_dabee2071be6d19281013b95829\` FOREIGN KEY (\`followed_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` CHANGE \`conversation_id\` \`conversation_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` ADD CONSTRAINT \`FK_de8978490834e2e9cb3c3fc8066\` FOREIGN KEY (\`conversation_id\`) REFERENCES \`conversations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`participants\` ADD CONSTRAINT \`FK_1427a77e06023c250ed3794a1ba\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`country_id\` \`country_id\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('masculino', 'femenino', 'otro') NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` CHANGE \`birth_date\` \`birth_date\` date NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_ae78dc6cb10aa14cfef96b2dd90\` FOREIGN KEY (\`country_id\`) REFERENCES \`country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` DROP COLUMN \`deleted_at\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` DROP COLUMN \`updated_at\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`followers\` DROP COLUMN \`created_at\``,
        );
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar\``);
    }
}
