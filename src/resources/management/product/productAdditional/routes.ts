import express from 'express';
import { ProductAdditionalController } from './controller';
import { verifyTokenLogin } from '../../../../middlewares/verifyToken';

const router = express.Router();

verifyTokenLogin(router)

router.route('/:product_id').get(new ProductAdditionalController().GetList)

router.route('/').post(new ProductAdditionalController().Create)

router.route('/:id').put(new ProductAdditionalController().Edit)

router.route('/:id').delete(new ProductAdditionalController().Delete)


export default router;


