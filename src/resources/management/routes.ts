import express from 'express';
import AdditionalRoutes from './additional/routes';
import CategoryRoutes from './category/routes';
import CompanyRoutes from './company/routes';
import OrderRoutes from './order/routes';
import ProductRoutes from './product/routes';
import UserRoutes from './user/routes';
import { verifyTokenLogin } from '../../middlewares/verifyToken';
import { permissionGuard } from '../../middlewares/tokenAuthorization';
const router = express.Router({ mergeParams: true });


router.use(verifyTokenLogin);

router.use('/user', UserRoutes);

router.use('/category', CategoryRoutes)

router.use('/company', CompanyRoutes)

router.use('/product', ProductRoutes);

router.use('/additional', AdditionalRoutes);

router.use('/order', OrderRoutes);


export default router;


