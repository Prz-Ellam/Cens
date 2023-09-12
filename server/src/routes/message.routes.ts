import messageController from '@/controllers/message.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const messageRouter = Router();

messageRouter.put('/:messageId', authMiddleware, messageController.update);
messageRouter.delete('/:messageId', authMiddleware, messageController.delete);

export default messageRouter;
