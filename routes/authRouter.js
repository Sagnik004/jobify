import { Router } from 'express';

import { validateRegisterUser } from '../middleware/validationMiddleware.js';
import { register, login } from '../controllers/authController.js';

const router = Router();

router.post('/register', validateRegisterUser, register);
router.post('/login', login);

export default router;
