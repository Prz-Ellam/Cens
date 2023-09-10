import express from 'express';
import helmet from 'helmet';
import { env } from '@config/env';
import morganMiddleware from '@config/morgan';
import { trim_all } from 'request_trimmer';
import { notFoundMiddleware } from '@/middlewares/not-found.middleware';

const app = express();
app.set('port', env.get('server.port'));

app.use(express.json({ limit: '1kb' }));
app.use(morganMiddleware);
app.use(helmet());
app.use(trim_all);

app.disable('x-powered-by');

app.all('*', notFoundMiddleware);

export default app;
