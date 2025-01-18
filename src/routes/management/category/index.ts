import express from 'express';
import { CategoryController } from '../../../resources/management/category/controller';
import { verifyTokenLogin } from '../../../middlewares/verifyToken';

const router = express.Router();

verifyTokenLogin(router)

router.route('/:id').get(new CategoryController().GetOne)
//restaurante
router.route('/').get(new CategoryController().List)
//adm
router.route('/list/:id').get(new CategoryController().List)

router.route('/').post(new CategoryController().Create)

router.route('/').put(new CategoryController().Edit)

router.route('/:id').delete(new CategoryController().Delete)

export default router;


