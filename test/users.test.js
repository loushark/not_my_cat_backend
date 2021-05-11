const request = require('supertest');
const app = require('../app')
const testSetup = require('./helper/dbHelper')

testSetup()

describe('get users', () => {
  it('returns status code 200 and users array', async () => {
    await request(app).get('/api/users')
    .then((response) => {
      console.log(response)
      expect(response.status).toEqual(200)
      expect(response.body[0]).toEqual(expect.objectContaining( { "username": "catlover69" }))
    })
  })
})

describe('post users', () => {
  it('returns status code 201', async () => {
    await request(app)
      .post('/api/users')
      .expect(201)
  })
})
