import express from 'express';
import { ProductAdditionalController } from './controller';
import { permissionGuard } from '../../../../middlewares/tokenAuthorization';

const router = express.Router({ mergeParams: true });

router.route('/:product_id').get(permissionGuard, new ProductAdditionalController().GetList)

router.route('/').post(permissionGuard, new ProductAdditionalController().Create)

router.route('/:id').put(permissionGuard, new ProductAdditionalController().Edit)

router.route('/:id').delete(permissionGuard, new ProductAdditionalController().Delete)


export default router;


