import express from 'express';
import { CompanyController } from '../../../resources/management/company/controller';
import CouponRoutes from './coupon/routes';
import { permissionGuard } from '../../../middlewares/tokenAuthorization';

const router = express.Router({ mergeParams: true });

router.use('/:url/coupon', CouponRoutes);

router.route('/info/:url').get(permissionGuard, new CompanyController().GetOne)

router.route('/').get(permissionGuard, new CompanyController().List)

router.route('/').post(permissionGuard, new CompanyController().Create)

router.route('/').put(permissionGuard, new CompanyController().Edit)

router.route('/:id').delete(permissionGuard, new CompanyController().Delete)

router.route('/changeStatus/:url').put(permissionGuard, new CompanyController().changeStatus)

router.route('/changeOperational/:id').put(permissionGuard, new CompanyController().changeOperational)


export default router;


