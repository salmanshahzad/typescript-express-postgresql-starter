import request from 'supertest';

import app from '../src/app';

it('POST /api/message', (done) => {
  request(app)
    .post('/api/message')
    .send({ message: 'hello world' })
    .expect(200, { message: 'hello world' }, done);
});
