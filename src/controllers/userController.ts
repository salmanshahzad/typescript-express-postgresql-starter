import Joi from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';

import { UserRepository, UserSchema, UserPatchSchema } from '../types/user';

interface UserController {
  getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAll(req: Request, res: Response): Promise<void>;
  find(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  patch(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}

function createUserController(userRepository: UserRepository): UserController {
  const dbErrorResponse = { success: false, error: 'Internal server error' };

  return {
    async getUserById(req: Request, res: Response, next: NextFunction) {
      const IdSchema = Joi.object({
        id: Joi.number().integer().min(1).required(),
      });
      const { error } = IdSchema.validate(req.params);
      if (error) {
        res
          .status(422)
          .json({ success: false, error: error.details[0].message });
      } else {
        const id = parseInt(req.params.id, 10);
        try {
          const user = await userRepository.find(id);
          if (!user) {
            res.status(404).json({
              success: false,
              error: `User with id ${id} does not exist`,
            });
          } else {
            req.user = user;
            next();
          }
        } catch (err) {
          console.error(err);
          res.status(500).json(dbErrorResponse);
        }
      }
    },

    async findAll(_: Request, res: Response) {
      try {
        const users = await userRepository.findAll();
        res.json({ success: true, users });
      } catch (err) {
        console.error(err);
        res.status(500).json(dbErrorResponse);
      }
    },

    async find(req: Request, res: Response) {
      res.json({ success: true, user: req.user });
    },

    async create(req: Request, res: Response) {
      const { error, value } = UserSchema.validate(req.body);
      if (error) {
        res
          .status(422)
          .json({ success: false, error: error.details[0].message });
      } else {
        try {
          const user = await userRepository.create(value);
          res.status(201).json({ success: true, user });
        } catch (err) {
          console.error(err);
          res.status(500).json(dbErrorResponse);
        }
      }
    },

    async patch(req: Request, res: Response) {
      const { error, value } = UserPatchSchema.validate(req.body);
      if (error) {
        res
          .status(422)
          .json({ success: false, error: error.details[0].message });
      } else {
        try {
          const user = await userRepository.update(
            parseInt(req.params.id, 10),
            value,
          );
          res.status(200).json({ success: true, user });
        } catch (err) {
          console.error(err);
          res.status(500).json(dbErrorResponse);
        }
      }
    },

    async update(req: Request, res: Response) {
      const { error, value } = UserSchema.validate(req.body);
      if (error) {
        res
          .status(422)
          .json({ success: false, error: error.details[0].message });
      } else {
        try {
          const user = await userRepository.update(
            parseInt(req.params.id, 10),
            value,
          );
          res.status(200).json({ success: true, user });
        } catch (err) {
          console.error(err);
          res.status(500).json(dbErrorResponse);
        }
      }
    },

    async delete(req: Request, res: Response) {
      try {
        const user = await userRepository.delete(parseInt(req.params.id, 10));
        res.status(200).json({ success: true, user });
      } catch (err) {
        console.error(err);
        res.status(500).json(dbErrorResponse);
      }
    },
  };
}

export default createUserController;
