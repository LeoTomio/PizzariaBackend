import { Router } from 'express';
import { tokenValidator } from './middlewares/verifyToken';
import CategoryRoutes from './resources/category/routes';
import ManagementRoutes from './resources/management/routes';
import OrderRoutes from './resources/order/routes';
import UserRoutes from './resources/user/routes';
import CompanyRoutes from './resources/company/routes';
// import ProductRoutes from './product/index';
import errorHandler from './middlewares/customError';

const router = Router();

// Status da API
router.get('/status', (req, res) => {
  res.status(200).json({ message: "API funcionando!" });
});

// Rotas públicas
router.use('/user', UserRoutes);
router.use('/category', CategoryRoutes);
router.use('/company', CompanyRoutes);
router.use('/order', OrderRoutes);

// Middleware de autenticação
router.use(async (req, res, next) => {
  try {
    const verified = await tokenValidator(req);
    if (verified) {
      return next();
    }
    return res.status(401).json({ statusCode: 401, message: "Token inválido ou ausente" });
  } catch (err) {
    return res.status(401).json({ statusCode: 401, message: "Erro ao validar token", error: err.message });
  }
});

// Rotas protegidas
router.use('/management', ManagementRoutes);


router.use(errorHandler);

export { router };
