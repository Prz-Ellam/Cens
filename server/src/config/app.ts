import express from 'express';
import helmet from 'helmet';

const app = express();
app.set('port', 3000);

app.use(express.json({ limit: '1kb' }));
app.use(helmet());

app.disable('x-powered-by');

export default app;
