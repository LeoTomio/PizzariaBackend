import express from 'express';
import { CompanyStyleController } from '../../../resources/management/companyStyle/controller';
import { permissionGuard } from '../../../middlewares/tokenAuthorization';

const router = express.Router({ mergeParams: true });

router.route('/:url').get(permissionGuard, new CompanyStyleController().GetOne)

router.route('/:url').post(permissionGuard, new CompanyStyleController().Create)

router.route('/:url').put(permissionGuard, new CompanyStyleController().Edit)



export default router;


