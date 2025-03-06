import express from 'express';
import { ProductController } from './controller';

const router = express.Router();

router.route('/:id').get(new ProductController().GetOne)

export default router;