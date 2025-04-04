import express from 'express';
import { UserController } from './controller';

const router = express.Router();

router.get('/me', new UserController().detailUser)

export default router;