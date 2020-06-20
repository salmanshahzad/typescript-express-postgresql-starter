import path from 'path';

import dotenv from 'dotenv';

import createServer from './server';
import createUserRepository from './repositories/userRepository';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { PORT } = process.env;

const server = createServer(createUserRepository());

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
