import express from 'express';
import { AdditionalController } from './controller';
import { permissionGuard } from '../../../middlewares/tokenAuthorization';

const router = express.Router({ mergeParams: true });

router.route('/').get(permissionGuard, new AdditionalController().List)

router.route('/:id').get(permissionGuard, new AdditionalController().GetOne)

router.route('/').post(permissionGuard, new AdditionalController().Create)

router.route('/').put(permissionGuard, new AdditionalController().Edit)

router.route('/:id').delete(permissionGuard, new AdditionalController().Delete)


export default router;


