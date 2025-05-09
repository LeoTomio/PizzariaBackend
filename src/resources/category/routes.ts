import express from 'express';
import { CategoryController } from './controller';
import { logMiddleware } from '../../middlewares/logger';

const router = express.Router();

router.use(logMiddleware)

router.route('/:url').get(new CategoryController().GetOne)

router.route('/list/:url').get(new CategoryController().List)

export default router;


