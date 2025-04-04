import express from 'express';
import { OrderController } from './controller';
import { permissionGuard } from '../../../middlewares/tokenAuthorization';

const router = express.Router({ mergeParams: true });

router.route('/:url').get(permissionGuard, new OrderController().List)

router.route('/:url/:id').get(permissionGuard, new OrderController().GetOne)

router.route('/:url/changeStatus/:id').patch(permissionGuard, new OrderController().ChangeStatus)


export default router;


