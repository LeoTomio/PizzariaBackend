import express from 'express';
import { CompanyController } from '../../resources/company/controller';

const router = express.Router();

router.route('/:url').get(new CompanyController().GetOne)

export default router;


