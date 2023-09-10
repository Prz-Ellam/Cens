import express from 'express';
import helmet from 'helmet';
import { env } from '@config/env';

const app = express();
app.set('port', env.get('server.port'));

app.use(express.json({ limit: '1kb' }));
app.use(helmet());

app.disable('x-powered-by');

export default app;
