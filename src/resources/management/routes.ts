import express from 'express';
import { verifyTokenLogin } from '../../middlewares/verifyToken';
import CategoryRoutes from './category/routes';
import CompanyRoutes from './company/routes';
import ProductRoutes from './product/routes';
import AdditionalRoutes from './additional/routes';
const router = express.Router();

verifyTokenLogin(router)

router.use('/category', CategoryRoutes)

router.use('/company', CompanyRoutes)

router.use('/product', ProductRoutes);

router.use('/additional', AdditionalRoutes);

export default router;


