import express from 'express';
import env from '@config/env';
import authRouter from '@routes/auth.routes';
import commentRouter from '@routes/comment.routes';
import conversationRouter from '@routes/conversation.routes';
import messageRouter from '@routes/message.routes';
import optionRouter from '@routes/option.routes';
import pollRouter from '@routes/poll.routes';
import userRouter from '@routes/user.routes';
import voteRouter from '@routes/vote.routes';
import { notFoundMiddleware } from '@middlewares/not-found.middleware';
import helmet from 'helmet';
import { trim_all } from 'request_trimmer';
import morganMiddleware from '@config/morgan';
import reactionRouter from '@/routes/reaction.routes';
import cors from 'cors';

const app = express();
app.set('port', env.get('server.port'));

app.use(cors());

app.use(express.json({ limit: '1kb' }));
app.use(morganMiddleware);
app.use(helmet());
app.use(trim_all);

app.disable('x-powered-by');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/conversations', conversationRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/options', optionRouter);
app.use('/api/v1/polls', pollRouter);
app.use('/api/v1/reactions', reactionRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/votes', voteRouter);

app.all('*', notFoundMiddleware);

export default app;
