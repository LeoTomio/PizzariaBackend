import express from 'express';
import { CategoryController } from './controller';
import { verifyTokenLogin } from '../../../middlewares/verifyToken';

const router = express.Router();

verifyTokenLogin(router)

router.route('/:id').get(new CategoryController().GetOne)

router.route('/list/:url').get(new CategoryController().List)

router.route('/').post(new CategoryController().Create)

router.route('/').put(new CategoryController().Edit)

router.route('/:id').delete(new CategoryController().Delete)

export default router;


