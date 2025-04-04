import express from 'express';
import { CategoryController } from './controller';
import { permissionGuard } from '../../../middlewares/tokenAuthorization';

const router = express.Router({ mergeParams: true });

router.route('/:id').get(permissionGuard, new CategoryController().GetOne)

router.route('/list/:url').get(permissionGuard, new CategoryController().List)

router.route('/').post(permissionGuard, new CategoryController().Create)

router.route('/').put(permissionGuard, new CategoryController().Edit)

router.route('/:id').delete(permissionGuard, new CategoryController().Delete)

export default router;


