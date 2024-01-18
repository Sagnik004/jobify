import { Router } from 'express';

import {
  createNewJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

const router = Router();

router.route('/').get(getAllJobs).post(createNewJob);
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob);

export default router;
