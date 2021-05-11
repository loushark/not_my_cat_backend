const request = require('supertest');
const app = require('../app')

describe('get users', () => {
  it('returns status code 200', async () => {
    await request(app)
      .get('/api/users')
      .expect(200)
  })
})
