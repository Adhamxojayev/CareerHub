import Joi from "joi";

export const EmployerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

export const WorkerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  resume: Joi.string().pattern(new RegExp(/^image\/(pdf|doc)$/i)),
});

export const JobSchema = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string().required(),
  salary: Joi.number().min(1).required(),
  location: Joi.string().required()
});


export const IdSchema = Joi.object({
  id: Joi.number().integer().required()
})
