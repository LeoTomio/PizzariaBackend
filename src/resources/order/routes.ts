import express from 'express';
import { OrderController } from './controller';
import { logMiddleware } from '../../middlewares/logger';

const router = express.Router()

router.use(logMiddleware);

router.post('/:url', new OrderController().Create)

export default router;


