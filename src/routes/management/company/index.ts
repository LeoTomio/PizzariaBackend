import express from 'express';
import { CompanyController } from '../../../resources/management/company/controller';
import { verifyTokenLogin } from '../../../middlewares/verifyToken';

const router = express.Router();

verifyTokenLogin(router)

router.route('/info/:url').get(new CompanyController().GetOne)

router.route('/').get(new CompanyController().List)

router.route('/').post(new CompanyController().Create)

router.route('/').put(new CompanyController().Edit)

router.route('/:id').delete(new CompanyController().Delete)

router.route('/changeStatus/:id').put(new CompanyController().changeStatus)


export default router;


