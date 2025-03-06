import express from 'express';
import { CategoryController } from './controller';

const router = express.Router();

router.route('/:url').get(new CategoryController().GetOne)

router.route('/list/:url').get(new CategoryController().List)

export default router;


