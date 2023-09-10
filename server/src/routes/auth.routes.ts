import { Router } from 'express';
import UserController from '@/controllers/user.controller';

const authRouter = Router();

authRouter.post('/', UserController.login);
authRouter.delete('/', UserController.logout);

export default authRouter;
