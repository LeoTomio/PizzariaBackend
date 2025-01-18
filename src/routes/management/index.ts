import express from 'express';
import { verifyTokenLogin } from '../../middlewares/verifyToken';
import CategoryRoutes from './category/index';
import CompanyRoutes from './company/index';
import ProductRoutes from './product/index';
const router = express.Router();

verifyTokenLogin(router)

router.use('/category', CategoryRoutes)

router.use('/company', CompanyRoutes) 

router.use('/product', ProductRoutes);


export default router;


