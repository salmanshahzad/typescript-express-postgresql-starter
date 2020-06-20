import { Router } from 'express';

import createUserController from '../controllers/userController';
import { UserRepository } from '../types/user';

function userRoutes(userRepository: UserRepository): Router {
  const router = Router();
  const userController = createUserController(userRepository);

  router.get('/', userController.findAll);
  router.get('/:id', userController.getUserById, userController.find);
  router.post('/', userController.create);
  router.patch('/:id', userController.getUserById, userController.patch);
  router.put('/:id', userController.getUserById, userController.update);
  router.delete('/:id', userController.getUserById, userController.delete);

  return router;
}

export default userRoutes;
