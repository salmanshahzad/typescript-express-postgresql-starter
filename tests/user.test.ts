import { Express } from 'express';
import request from 'supertest';

import createServer from '../src/server';
import { User, UserRepository } from '../src/types/user';

describe('user routes', () => {
  let server: Express;
  let userRepository: UserRepository & { users: User[]; nextId: number };

  beforeEach(() => {
    userRepository = {
      users: [
        { id: 1, name: 'Salman', age: 21 },
        { id: 2, name: 'Shahzad', age: 21 },
      ],
      nextId: 3,
      async findAll() {
        return this.users;
      },

      async find(id: number) {
        return this.users.find((user) => user.id === id);
      },

      async create(user: Omit<User, 'id'>) {
        const newUser = { id: this.nextId, ...user };
        this.users.push(newUser);
        this.nextId += 1;
        return newUser;
      },

      async update(id: number, user: User) {
        const index = this.users.findIndex((u) => u.id === id);
        this.users[index] = { ...this.users[index], ...user };
        return this.users[index];
      },

      async delete(id: number) {
        const index = this.users.findIndex((u) => u.id === id);
        return this.users.splice(index, 1)[0];
      },
    };
    server = createServer(userRepository);
  });

  it('should return all users', async (done) => {
    const response = await request(server).get('/api/user');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      success: true,
      users: userRepository.users,
    });
    done();
  });

  it('returns 404 if the user id does not exist', async (done) => {
    const response = await request(server).get('/api/user/3');
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({
      success: false,
      error: 'User with id 3 does not exist',
    });
    done();
  });

  it('returns the correct user by id', async (done) => {
    const response = await request(server).get('/api/user/1');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      success: true,
      user: userRepository.users[0],
    });
    done();
  });

  it('validates inputs when creating a user', async (done) => {
    const response = await request(server)
      .post('/api/user')
      .send({ name: 'Test', age: -1 });
    expect(response.status).toBe(422);
    done();
  });

  it('creates and returns a new user', async (done) => {
    const response = await request(server)
      .post('/api/user')
      .send({ name: 'Test', age: 1 });
    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      success: true,
      user: {
        id: 3,
        name: 'Test',
        age: 1,
      },
    });
    done();
  });

  it('updates an existing user', async (done) => {
    const response = await request(server)
      .patch('/api/user/1')
      .send({ age: 22 });
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      success: true,
      user: {
        id: 1,
        name: 'Salman',
        age: 22,
      },
    });
    done();
  });

  it('requires all properties for put requests', async (done) => {
    const response = await request(server).put('/api/user/1').send({ age: 22 });
    expect(response.status).toBe(422);
    done();
  });

  it('deletes and returns the user', async (done) => {
    const response = await request(server).delete('/api/user/1');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      success: true,
      user: {
        id: 1,
        name: 'Salman',
        age: 21,
      },
    });
    done();
  });
});
