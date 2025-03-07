import express from 'express';
import { AdditionalController } from './controller';
import { verifyTokenLogin } from '../../../middlewares/verifyToken';

const router = express.Router();

verifyTokenLogin(router)

//adm
router.route('/').get(new AdditionalController().List)

router.route('/:id').get(new AdditionalController().GetOne)

router.route('/').post(new AdditionalController().Create)

router.route('/').put(new AdditionalController().Edit)

router.route('/:id').delete(new AdditionalController().Delete)


export default router;


