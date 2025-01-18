import { Router } from 'express';
import { tokenValidator } from '../middlewares/verifyToken';
import CategoryRoutes from './category/index';
import ManagementRoutes from './management/index';
import OrderRoutes from './order/index';
import UserRoutes from './users/index';
import CompanyRoutes from './company/index';
// import ProductRoutes from './product/index';
import errorHandler from '../middlewares/customError';

const router = Router();

// Status da API
router.get('/status', (req, res) => {
  res.status(200).json({ message: "API funcionando!" });
});

// Rotas públicas
router.use('/user', UserRoutes);
router.use('/category', CategoryRoutes);
router.use('/company', CompanyRoutes);
// router.use('/product', ProductRoutes);

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
router.use('/order', OrderRoutes);


router.use(errorHandler);

export { router };
