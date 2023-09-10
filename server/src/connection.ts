import { connection } from '@config/database';
import { logger } from '@config/logger';
import type { DataSource } from 'typeorm';

export async function databaseConnection(): Promise<DataSource | null> {
    try {
        const dataSource = await connection.initialize();
        logger.info('Database connection success');
        return dataSource;
    } catch (exception) {
        const error = String(exception);
        logger.error(`Database connection failed, ${error}`);
        return null;
    }
}
