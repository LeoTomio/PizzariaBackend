import express from 'express';
import { CouponController } from './controller';
import { permissionGuard } from '../../../../middlewares/tokenAuthorization';

const router = express.Router({ mergeParams: true });

router.route('/:id').get(permissionGuard, new CouponController().GetOne)

router.route('/').get(permissionGuard, new CouponController().List)

router.route('/').post(permissionGuard, new CouponController().Create)

router.route('/changeStatus/:id').put(permissionGuard, new CouponController().ChangeStatus)

router.route('/').put(permissionGuard, new CouponController().Edit)

router.route('/:id').delete(permissionGuard, new CouponController().Delete)

export default router;


