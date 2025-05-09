import express from 'express';
import { UserController } from './controller';
import { logMiddleware } from '../../middlewares/logger';

const router = express.Router();

router.use(logMiddleware) 

router.post('/', new UserController().createUser)

router.post('/session', new UserController().authUser)

export default router;