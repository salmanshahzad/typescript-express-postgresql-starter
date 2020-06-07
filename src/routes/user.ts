import { NextFunction, Request, Response, Router } from 'express';

import Joi from '@hapi/joi';

import db from '../db';
import { User, UserSchema, UserPatchSchema } from '../models/User';

async function getUserById(req: Request, res: Response, next: NextFunction) {
  const IdSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
  });
  const { error } = IdSchema.validate(req.params);
  if (error) {
    return res
      .status(422)
      .json({ success: false, error: error.details[0].message });
  }
  const id = parseInt(req.params.id, 10);
  try {
    const users = await db<User>('user').select('*').where('id', '=', id);
    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: `User id ${id} does not exist` });
    }
    [req.user] = users;
    return next();
  } catch {
    return res.status(500).json({ success: false, error: 'Database error' });
  }
}

const router = Router();

router.get('/', async (_, res) => {
  try {
    const users = await db<User>('user').select('*');
    return res.json({ success: true, users });
  } catch {
    return res.status(500).json({ success: false, error: 'Database error' });
  }
});

router.get('/:id', getUserById, async (req, res) => {
  return res.json({ success: true, user: req.user });
});

router.post('/', async (req, res) => {
  const { error, value } = UserSchema.validate(req.body);
  if (error) {
    return res
      .status(422)
      .json({ success: false, error: error.details[0].message });
  }
  try {
    const user = (await db<User>('user').insert(value).returning('*'))[0];
    return res.status(201).json({ success: true, user });
  } catch {
    return res.status(500).json({ success: false, error: 'Database error' });
  }
});

router.patch('/:id', getUserById, async (req, res) => {
  const { error, value } = UserPatchSchema.validate(req.body);
  if (error) {
    return res
      .status(422)
      .json({ success: false, error: error.details[0].message });
  }
  try {
    const user = (
      await db<User>('user')
        .update(value)
        .where('id', '=', req.params.id)
        .returning('*')
    )[0];
    return res.status(200).json({ success: true, user });
  } catch {
    return res.status(500).json({ success: false, error: 'Database error' });
  }
});

router.put('/:id', getUserById, async (req, res) => {
  const { error, value } = UserSchema.validate(req.body);
  if (error) {
    return res
      .status(422)
      .json({ success: false, error: error.details[0].message });
  }
  try {
    const user = (
      await db<User>('user')
        .update(value)
        .where('id', '=', req.params.id)
        .returning('*')
    )[0];
    return res.status(200).json({ success: true, user });
  } catch {
    return res.status(500).json({ success: false, error: 'Database error' });
  }
});

router.delete('/:id', getUserById, async (req, res) => {
  try {
    await db<User>('user').where('id', '=', req.params.id).delete();
    return res.status(200).json({ success: true, user: req.user });
  } catch {
    return res.status(500).json({ success: false, error: 'Database error' });
  }
});

export default router;
