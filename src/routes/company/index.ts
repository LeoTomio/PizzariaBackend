import express from 'express';
import { CompanyController } from '../../resources/company/controller';
import { verifyTokenLogin } from '../../middlewares/verifyToken';

const router = express.Router();

verifyTokenLogin(router)

router.route('/info').get(new CompanyController().GetOne)

router.route('/info/socialMedia').get(new CompanyController().getSocialMedia)

router.route('/').get(new CompanyController().List)

router.route('/').post(new CompanyController().Create)

router.route('/').put(new CompanyController().Edit)

router.route('/:id').delete(new CompanyController().Delete)

router.route('/changeStatus/:id').put(new CompanyController().changeStatus)


export default router;


