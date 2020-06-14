# TypeScript Express PostgreSQL Starter

TypeScript starter code for an Express server including CRUD routes using PostgreSQL

## Environment Variables

Create a file named `.env` in the root folder with the following variables

- DB_CONNECTION
- PORT

`DB_CONNECTION` is a PostgreSQL connection string in the format `postgresql://user:password@host:port/database`

## Table Creation

```sql
CREATE TABLE "user"(id SERIAL PRIMARY KEY, name TEXT NOT NULL, age INTEGER NOT NULL);
```
