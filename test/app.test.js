const request = require('supertest');
const app = require('../app')


describe('route root', () => {
  it('returns status code 200', async () => {
    await request(app)
      .get('/')
      .expect(200)
  })
})
