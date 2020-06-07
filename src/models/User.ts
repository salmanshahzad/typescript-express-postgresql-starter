import Joi from '@hapi/joi';

export interface User {
  id: number;
  name: string;
  age: number;
}

export const UserSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
}).options({ stripUnknown: true });

export const UserPatchSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number().integer().min(0),
}).options({ stripUnknown: true });
