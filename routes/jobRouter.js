import { Router } from 'express';

import {
  createNewJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createNewJob);
router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
