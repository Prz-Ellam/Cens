import 'reflect-metadata';
import app from '@config/app';
import { logger } from '@config/logger';
import { databaseConnection } from './connection';

app.listen(app.get('port'), async () => {
    await databaseConnection();

    logger.info(`Server started on port ${app.get('port')}`);
});
