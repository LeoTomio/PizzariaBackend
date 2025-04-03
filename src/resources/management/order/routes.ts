import express from 'express';
import { verifyTokenLogin } from '../../../middlewares/verifyToken';
import { OrderController } from './controller';

const router = express.Router();

// verifyTokenLogin(router)

router.get('/:url', new OrderController().List)

router.get('/:url/:id', new OrderController().GetOne)

router.patch('/:url/changeStatus/:id', new OrderController().ChangeStatus)


export default router;


