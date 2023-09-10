import { Router } from 'express';
import UserController from '@/controllers/user.controller';

const userRouter = Router();

userRouter.post('/', UserController.register);

export default userRouter;
