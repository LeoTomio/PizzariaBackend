import express from 'express';
import { verifyTokenLogin } from '../../../middlewares/verifyToken';
import { OrderController } from './controller';
import itemRoutes from './item/routes';

const router = express.Router();

// verifyTokenLogin(router)

router.post('/', new OrderController().Create)

router.delete('/:id', new OrderController().Remove)

router.put('/send/:id', new OrderController().Send)

router.get('/:url', new OrderController().List)

router.get('/:url/:id', new OrderController().GetOne)

router.put('/finish/:id', new OrderController().Finish)

// router.use('/item', itemRoutes)

export default router;


