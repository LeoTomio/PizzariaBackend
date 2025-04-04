import express from 'express';
import { UserController } from './controller';

const router = express.Router();

router.post('/', new UserController().createUser)

router.post('/session', new UserController().authUser)

export default router;