import db from '../db';

import { User, UserRepository } from '../types/user';

function createUserRepository(): UserRepository {
  return {
    async findAll() {
      return db<User>('user').select('*');
    },

    async find(id: number) {
      const users = await db<User>('user').select('*').where('id', '=', id);
      return users[0];
    },

    async create(user: Omit<User, 'id'>) {
      const users = await db<User>('user').insert(user).returning('*');
      return users[0];
    },

    async update(id: number, user: Partial<User>) {
      const users = await db<User>('user')
        .update(user)
        .where('id', '=', id)
        .returning('*');
      return users[0];
    },

    async delete(id: number) {
      const users = await db<User>('user')
        .where('id', '=', id)
        .delete()
        .returning('*');
      return users[0];
    },
  };
}

export default createUserRepository;
