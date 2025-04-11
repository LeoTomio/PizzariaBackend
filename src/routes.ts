import { Router } from 'express';
import errorHandler from './middlewares/customError';
import CategoryRoutes from './resources/category/routes';
import CompanyRoutes from './resources/company/routes';
import ManagementRoutes from './resources/management/routes';
import OrderRoutes from './resources/order/routes';
import UserRoutes from './resources/user/routes';
import { logMiddleware } from './middlewares/logger';

const router = Router();

// Status da API
router.get('/status', (req, res) => {
  res.status(200).json({ message: "API funcionando!" });
});

router.use(logMiddleware)

// Rotas públicas
router.use('/user', UserRoutes);
router.use('/category', CategoryRoutes);
router.use('/company', CompanyRoutes);
router.use('/order', OrderRoutes);



//Rotas protegidas
router.use('/management', ManagementRoutes);

router.use(errorHandler);

export { router };

