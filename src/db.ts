import path from 'path';

import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
});

export default db;
