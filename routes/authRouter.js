import { Router } from 'express';

import {
  validateRegisterUser,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';
import { register, login } from '../controllers/authController.js';

const router = Router();

router.post('/register', validateRegisterUser, register);
router.post('/login', validateLoginInput, login);

export default router;
