import { Router } from 'express';
import PollController from '@/controllers/poll.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import CommentController from '@/controllers/comment.controller';
import VoteController from '@/controllers/vote.controller';
import ReactionController from '@/controllers/reaction.controller';

const pollRouter = Router();

// Obtener todas las encuestas de un usuario
pollRouter.get('/', authMiddleware, PollController.findMany);
pollRouter.get('/:id', authMiddleware, PollController.findOne);
pollRouter.post('/', authMiddleware, PollController.create);
pollRouter.put('/:pollId', authMiddleware, PollController.update);
pollRouter.delete('/:pollId', authMiddleware, PollController.delete);

pollRouter.post('/:pollId/comments', authMiddleware, CommentController.create);
pollRouter.put(
    '/:pollId/comments/:commentId',
    authMiddleware,
    CommentController.update,
);
pollRouter.delete(
    '/:pollId/comments/:commentId',
    authMiddleware,
    CommentController.delete,
);
pollRouter.get(
    '/:pollId/comments',
    authMiddleware,
    CommentController.findAllByPoll,
);

// Reacciones
pollRouter.get(
    '/:pollId/reactions',
    authMiddleware,
    ReactionController.findAllByPoll,
);
pollRouter.post(
    '/:pollId/reactions',
    authMiddleware,
    ReactionController.createReaction,
);
pollRouter.put('/:pollId/reactions', authMiddleware, ReactionController.update);
pollRouter.delete(
    '/:pollId/reactions',
    authMiddleware,
    ReactionController.delete,
);

// Votos
pollRouter.get('/:pollId/votes', authMiddleware, VoteController.findAllByPoll);
pollRouter.post('/:pollId/votes', authMiddleware, VoteController.create);
pollRouter.put('/:pollId/votes', authMiddleware, VoteController.update);
pollRouter.delete('/:pollId/votes', authMiddleware, VoteController.delete);

export default pollRouter;
