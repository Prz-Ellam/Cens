import ReactionController from '@/controllers/reaction.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const reactionRouter = Router();

reactionRouter.put('/:reactionId', authMiddleware, ReactionController.update);
reactionRouter.delete(
    '/:reactionId',
    authMiddleware,
    ReactionController.delete,
);

export default reactionRouter;
