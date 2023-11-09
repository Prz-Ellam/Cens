import optionController from '@/controllers/option.controller';
import { Router } from 'express';

const optionRouter = Router();

optionRouter.get('/gender/:pollId', optionController.findByGender);
optionRouter.get('/age/:pollId', optionController.findByAge);
optionRouter.get('/country/:pollId', optionController.findByCountry);

export default optionRouter;
