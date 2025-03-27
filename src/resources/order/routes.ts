import express from 'express';
import { OrderController } from './controller';

const router = express.Router();

router.post('/:url', new OrderController().Create)

export default router;


