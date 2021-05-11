const request = require('supertest');
const app = require('../app')
const testSetup = require('./helper/dbHelper')

testSetup()

describe('get users', () => {
  it('returns status code 200', async () => {
    await request(app)
      .get('/api/users')
      .expect(200)
  })
})

describe('post users', () => {
  it('returns status code 201', async () => {
    await request(app)
      .post('/api/users')
      .expect(201)
  })
})
