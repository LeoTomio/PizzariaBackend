import express from 'express';
import { ProductController } from './controller';
import { verifyTokenLogin } from '../../../middlewares/verifyToken';

const router = express.Router();

verifyTokenLogin(router)

router.route('/:id').get(new ProductController().GetOne)
//restaurante
router.route('/').get(new ProductController().List)
//adm
router.route('/list/:url').get(new ProductController().List)

router.route('/').post(new ProductController().Create)

router.route('/').put(new ProductController().Edit)

router.route('/:id').delete(new ProductController().Delete)


export default router;


