import Joi from '@hapi/joi';

export interface User {
  id: number;
  name: string;
  age: number;
}

export interface UserRepository {
  findAll(): Promise<User[]>;
  find(id: number): Promise<User | undefined>;
  create(user: Omit<User, 'id'>): Promise<User>;
  update(id: number, user: Partial<User>): Promise<User>;
  delete(id: number): Promise<User>;
}

export const UserSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
}).options({ stripUnknown: true });

export const UserPatchSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number().integer().min(0),
}).options({ stripUnknown: true });
