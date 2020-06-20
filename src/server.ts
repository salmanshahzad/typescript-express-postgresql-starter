import bodyParser from 'body-parser';
import compression from 'compression';
import express, { Express } from 'express';
import morgan from 'morgan';

import apiRoutes from './routes';
import { UserRepository } from './types/user';

function createServer(userRepository: UserRepository): Express {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());
  app.use(morgan('dev'));

  app.use('/api', apiRoutes(userRepository));

  return app;
}

export default createServer;
