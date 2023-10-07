import CommentController from '@/controllers/comment.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const commentRouter = Router();

commentRouter.post('/');
commentRouter.get('/:commentId', authMiddleware, CommentController.findOne);
commentRouter.put('/:commentId', authMiddleware, CommentController.update);
commentRouter.delete('/:commentId', authMiddleware, CommentController.delete);

export default commentRouter;
