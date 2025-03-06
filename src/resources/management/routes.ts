import express from 'express';
import { verifyTokenLogin } from '../../middlewares/verifyToken';
import CategoryRoutes from './category/routes';
import CompanyRoutes from './company/routes';
import ProductRoutes from './product/routes';
const router = express.Router();

verifyTokenLogin(router)

router.use('/category', CategoryRoutes)

router.use('/company', CompanyRoutes)

router.use('/product', ProductRoutes);


export default router;


