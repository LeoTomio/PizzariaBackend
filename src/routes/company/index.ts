import express from 'express';
import { CompanyController } from '../../resources/company/controller';
import { verifyTokenLogin } from '../../middlewares/verifyToken';

const router = express.Router();

verifyTokenLogin(router)

router.route('/:id').get(new CompanyController().GetOne)

router.route('/').get(new CompanyController().List)

router.route('/').post(new CompanyController().Create)

router.route('/').put(new CompanyController().Edit)

router.route('/:id').delete(new CompanyController().Delete)

router.route('/inactive/:id').put(new CompanyController().Inactive)


export default router;


