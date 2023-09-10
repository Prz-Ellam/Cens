import 'reflect-metadata';
import path from 'path';
import {
    DataSource,
    type Logger,
    type DatabaseType,
    type QueryRunner,
    type LogMessage,
} from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import env from '@config/env';
import { logger } from './logger';

const dialect = env.get('db.connection');
let type: DatabaseType = 'mysql';
switch (dialect) {
    case 'mysql':
        type = 'mysql';
        break;
    case 'postgres':
        type = 'postgres';
        break;
    case 'mssql':
        type = 'mssql';
        break;
    case 'sqlite':
        type = 'sqlite';
        break;
    case 'oracle':
        type = 'oracle';
        break;
}

class CustomLogger implements Logger {
    logQuery(
        query: string,
        parameters?: LogMessage[],
        _queryRunner?: QueryRunner,
    ): void {
        const sql =
            query +
            (parameters?.length
                ? ` -- PARAMETERS: ${JSON.stringify(parameters)}`
                : '');
        logger.info(`Query: ${sql}`);
    }

    logQueryError(
        error: string,
        query: string,
        parameters?: LogMessage[],
        _queryRunner?: QueryRunner,
    ): void {
        const sql =
            query +
            (parameters?.length
                ? ` -- PARAMETERS: ${JSON.stringify(parameters)}`
                : '');
        logger.error(`Query error: ${error}\n${sql}`);
    }

    logQuerySlow(
        time: number,
        query: string,
        parameters?: LogMessage[],
        _queryRunner?: QueryRunner,
    ): void {
        const sql =
            query +
            (parameters?.length
                ? ` -- PARAMETERS: ${JSON.stringify(parameters)}`
                : '');
        logger.warn(`Slow query: Execution time: ${time}ms\n${sql}`);
    }

    logSchemaBuild(message: string, _queryRunner?: QueryRunner): void {
        logger.info(`Schema build: ${message}`);
    }

    logMigration(message: string, _queryRunner?: QueryRunner): void {
        logger.info(`Migration: ${message}`);
    }

    log(
        level: 'log' | 'info' | 'warn',
        message: LogMessage,
        _queryRunner?: QueryRunner,
    ): void {
        if (env.get('server.env') !== 'development') {
            logger.log(level, message);
        }
    }
}

export const connection = new DataSource({
    type,
    host: env.get('db.host'),
    port: env.get('db.port'),
    username: env.get('db.username'),
    password: env.get('db.password'),
    database: env.get('db.database'),
    entities: [path.resolve(__dirname, '..', 'models', '**', '*.model.ts')],
    logging: true,
    logger: new CustomLogger(),
    migrations: [
        path.resolve(
            __dirname,
            '..',
            '..',
            'database',
            'migrations',
            '**',
            '*.ts',
        ),
    ],
    migrationsTableName: 'migrations',
    namingStrategy: new SnakeNamingStrategy(),
});
