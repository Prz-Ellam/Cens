import VoteController from '@/controllers/vote.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const voteRouter = Router();

voteRouter.put('/:voteId', authMiddleware, VoteController.update);
voteRouter.delete('/:voteId', authMiddleware, VoteController.delete);

export default voteRouter;
