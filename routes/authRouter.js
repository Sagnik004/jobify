import { Router } from 'express';

import {
  validateRegisterUser,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';
import { register, login, logout } from '../controllers/authController.js';

const router = Router();

router.post('/register', validateRegisterUser, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

export default router;
