import express from 'express';
import { CouponController } from './controller';

const router = express.Router({ mergeParams: true });

router.route('/:code').get(new CouponController().Find)
 

export default router;


