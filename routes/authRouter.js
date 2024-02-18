import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import {
  validateRegisterUser,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';
import { register, login, logout } from '../controllers/authController.js';

// Configure rate limiter...
// Needed only in auth page as it is the only publicly available api endpoint
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins in milliseconds
  max: 50,
  message: { msg: 'Rate limit exceeded, please retry after 15 minutes' },
});

const router = Router();

router.post('/register', apiLimiter, validateRegisterUser, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router;
