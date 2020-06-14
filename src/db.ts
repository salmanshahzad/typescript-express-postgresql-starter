import path from 'path';

import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const db = knex({
  client: 'pg',
  connection: process.env.DB_CONNECTION,
});

export default db;
