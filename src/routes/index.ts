import { Router } from 'express';

import { UserRepository } from '../types/user';
import userRoutes from './user';

function apiRoutes(userRepository: UserRepository): Router {
  const router = Router();

  router.use('/user', userRoutes(userRepository));

  return router;
}

export default apiRoutes;
