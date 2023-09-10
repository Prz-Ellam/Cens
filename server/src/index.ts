import app from '@config/app';
import { logger } from '@config/logger';

app.listen(app.get('port'), () => {
    logger.info(`Server started on port ${app.get('port')}`);
});
