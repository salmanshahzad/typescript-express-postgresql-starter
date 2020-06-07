import { Router } from 'express';

import userRoutes from './user';

const router = Router();

router.post('/message', (req, res) => {
  res.json({ message: req.body.message });
});

router.use('/user', userRoutes);

export default router;
