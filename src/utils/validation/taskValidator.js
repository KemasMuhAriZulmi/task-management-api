import Joi from 'joi';
import { ValidationError } from '../errors.js';

// const taskSchema = Joi.object({
//   title: Joi.string().required().min(3),
//   description: Joi.string().allow(''),
//   dueDate: Joi.date().iso().required(),
//   status: Joi.string().valid('pending', 'in progress', 'completed').required()
// });

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('').max(500),
  dueDate: Joi.date().iso().required(),
  status: Joi.string().valid('pending', 'in progress', 'completed').required()
});

export const validateTaskInput = async (input) => {
  const { error } = taskSchema.validate(input, { abortEarly: false });
  if (error) {
    throw new ValidationError(error.details.map(d => d.message).join(', '));
  }
};

// export const validateTaskInput = async (input) => {
//   const { error } = taskSchema.validate(input);
//   if (error) throw new ValidationError(error.details[0].message);
// };