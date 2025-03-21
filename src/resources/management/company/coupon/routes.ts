import express from 'express';
import { verifyTokenLogin } from '../../../../middlewares/verifyToken';
import { CouponController } from './controller';

const router = express.Router({ mergeParams: true });

verifyTokenLogin(router)

router.route('/:id').get(new CouponController().GetOne)

router.route('/').get(new CouponController().List)

router.route('/').post(new CouponController().Create)

router.route('/changeStatus/:id').put(new CouponController().ChangeStatus)

router.route('/').put(new CouponController().Edit)

router.route('/:id').delete(new CouponController().Delete)

export default router;


