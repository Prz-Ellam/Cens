import 'reflect-metadata';
import app from './app';
import { logger } from '@config/logger';
import { databaseConnection } from './connection';

void databaseConnection();

app.listen(app.get('port'), () => {
    logger.info(`Server started on port ${app.get('port')}`);
});
