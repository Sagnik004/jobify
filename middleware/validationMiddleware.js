import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

import Job from '../models/JobModel.js';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('No job')) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('position').trim().notEmpty().withMessage('Position is required'),
  body('jobLocation').trim().notEmpty().withMessage('Job location is required'),
  body('jobStatus')
    .trim()
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid job status value'),
  body('jobType')
    .trim()
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Invalid job type value'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new BadRequestError('Invalid id provided');
    }
    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`No job found with id: ${value}`);
    }
  }),
]);
