import app from '@config/app';
import { logger } from '@config/logger';
import { databaseConnection } from '@config/connection';

void databaseConnection();

app.listen(app.get('port'), () => {
    logger.info(`Server started on port ${app.get('port')}`);
});
