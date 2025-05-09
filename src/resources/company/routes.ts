import express from 'express';
import { CompanyController } from './controller';
import CouponRoutes from './coupon/routes';
import { logMiddleware } from '../../middlewares/logger';

const router = express.Router();

router.use(logMiddleware)

router.use('/:url/coupon', CouponRoutes);

router.route('/:url').get(new CompanyController().GetOne)

export default router;