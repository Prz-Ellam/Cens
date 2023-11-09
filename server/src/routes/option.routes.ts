import optionController from '@/controllers/option.controller';
import { Router } from 'express';

const optionRouter = Router();

optionRouter.get('/', optionController.findByGender);
optionRouter.get('/1', optionController.findByAge);

export default optionRouter;
