import { Router } from 'express';
import UserController from '@/controllers/user.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import ConversationController from '@/controllers/conversation.controller';
import { multerUpload } from '@/config/storage';

const userRouter = Router();

userRouter.get('/', UserController.findAll);
userRouter.get('/:id', UserController.findOne);
userRouter.post('/', UserController.register);
userRouter.put('/:id', authMiddleware, UserController.update);
userRouter.put(
    '/:id/avatar',
    authMiddleware,
    multerUpload.single('avatar'),
    UserController.updateAvatar,
);
userRouter.get('/:id/avatar', UserController.getAvatar);
userRouter.put('/:id/password', authMiddleware, UserController.updatePassword);
userRouter.delete('/:id', authMiddleware, UserController.delete);

userRouter.get('/:userId/followers', authMiddleware);
userRouter.get('/:userId/following', authMiddleware);
userRouter.post(
    '/:userId/followers',
    authMiddleware,
    UserController.followUser,
);
userRouter.delete('/:userId/followers', authMiddleware);

userRouter.get(
    '/:userId/conversations',
    authMiddleware,
    ConversationController.findAllByUser,
);
userRouter.post(
    '/:userId/conversations',
    authMiddleware,
    ConversationController.create,
);

export default userRouter;
