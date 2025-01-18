import express from 'express';
import { verifyTokenLogin } from '../../middlewares/verifyToken';
import { CategoryController } from '../../resources/category/controller';
import managemantRoutes from '../management/index';

const router = express.Router();

router.route('/:url').get(new CategoryController().GetOne)

router.route('/list/:url').get(new CategoryController().List)
 
export default router;


