


import express from 'express';
import { UserController } from '../../resources/user/controller';
import { verifyTokenLogin } from '../../middlewares/verifyToken';

const router = express.Router();

router.post('/', new UserController().createUser)

router.post('/session', new UserController().authUser)

verifyTokenLogin(router)

router.get('/me', new UserController().detailUser)

export default router;


