# TypeScript Express PostgreSQL Starter

TypeScript starter code for an Express server including CRUD routes using PostgreSQL

## Environment variables

Create a file named `.env` in the root folder with the following variables

- PORT
- DB_USERNAME
- DB_PASSWORD
- DB_NAME

Create a table named `user` in PostgreSQL

```sql
CREATE TABLE "user"(id SERIAL PRIMARY KEY, name TEXT NOT NULL, age INTEGER NOT NULL);
```
