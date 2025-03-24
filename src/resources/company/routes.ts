import express from 'express';
import { CompanyController } from './controller';
import CouponRoutes from './coupon/routes';

const router = express.Router();

router.use('/:url/coupon', CouponRoutes);

router.route('/:url').get(new CompanyController().GetOne)

export default router;