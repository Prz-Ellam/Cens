import MessageController from '@/controllers/message.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const conversationRouter = Router();

conversationRouter.get(
    '/:conversationId/messages',
    authMiddleware,
    MessageController.findAllByConversation,
);
conversationRouter.post(
    '/:conversationId/messages',
    authMiddleware,
    MessageController.create,
);

export default conversationRouter;
