import express from 'express';
import AdditionalRoutes from './additional/routes';
import CategoryRoutes from './category/routes';
import CompanyRoutes from './company/routes';
import CompanyStyleRoutes from './companyStyle/routes';
import OrderRoutes from './order/routes';
import ProductRoutes from './product/routes';
import UserRoutes from './user/routes';
import { verifyTokenLogin } from '../../middlewares/verifyToken';
import { logMiddleware } from '../../middlewares/logger';

const router = express.Router({ mergeParams: true });

router.use(verifyTokenLogin);

router.use(logMiddleware)

router.use('/user', UserRoutes);

router.use('/category', CategoryRoutes)

router.use('/company', CompanyRoutes)

router.use('/product', ProductRoutes);

router.use('/additional', AdditionalRoutes);

router.use('/order', OrderRoutes);

router.use('/companyStyle', CompanyStyleRoutes);


export default router;


