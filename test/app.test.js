const request = require('supertest');
const app = require('../app')

// contacts the root route of the server and expects status 200
describe('route root', () => {
  it('returns status code 200', async () => {
    await request(app)
      .get('/')
      .expect(200)
  })
})
