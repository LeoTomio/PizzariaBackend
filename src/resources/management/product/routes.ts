import express from 'express';
import { ProductController } from './controller';
import ProductAdditionalRoutes from './productAdditional/routes';
import { permissionGuard } from '../../../middlewares/tokenAuthorization';

const router = express.Router({ mergeParams: true });

router.use('/additionals', ProductAdditionalRoutes);

router.route('/:id').get(permissionGuard, new ProductController().GetOne)
//restaurante
router.route('/').get(permissionGuard, new ProductController().List)
//adm
router.route('/list/:url').get(permissionGuard, new ProductController().List)

router.route('/').post(permissionGuard, new ProductController().Create)

router.route('/').put(permissionGuard, new ProductController().Edit)

router.route('/:id').delete(permissionGuard, new ProductController().Delete)


export default router;


