import request from 'supertest';

import app from '../src/app';

describe('POST /api/message', () => {
  it('should return the same message that was sent', (done) => {
    request(app)
      .post('/api/message')
      .send({ message: 'hello world' })
      .expect(200, { message: 'hello world' }, done);
  });
});
