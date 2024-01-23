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

const router = Router();

router.route('/').get(getAllJobs).post(validateJobInput, createNewJob);
router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .patch(validateIdParam, validateJobInput, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
