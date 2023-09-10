import morgan from 'morgan';
import { logger } from '@config/logger';

const morganMiddleware = morgan((tokens, req, res) => {
    const status = res.statusCode;
    let logLevel = 'info';

    if (status >= 400 && status < 500) {
        logLevel = 'warn';
    } else if (status >= 500) {
        logLevel = 'error';
    }

    const message = morgan.compile(
        ':remote-addr - :method :url HTTP/:http-version :status :response-time ms',
    );

    logger.log(logLevel, message(tokens, req, res));
    return null;
});

export default morganMiddleware;
