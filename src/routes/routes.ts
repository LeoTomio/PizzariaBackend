import { Router } from 'express';
import { tokenValidator } from '../middlewares/verifyToken';
import CategoryRoutes from './category/index';
import OrderRoutes from './order/index';
import ProductRoutes from './product/index';
import UserRoutes from './users/index'
const router = Router();

router.get('/status', (request, response) => {
  response.status(200).json({ message: "funcionando" });
});

// Usuarios

router.use('/user', UserRoutes)

router.use(async (request, response, next) => {
  let verified = await tokenValidator(request);
  if (verified) {
    next();
  } else {
    response.status(401).json({ statusCode: 401, msg: "Token inválido" })
  }
});


// ---  ROTAS CATEGORY

router.use('/category', CategoryRoutes)

// -- ROTAS PRODUCT

router.use('/product', ProductRoutes)

//-- ROTAS ORDER

router.use('/order', OrderRoutes)

export { router };

