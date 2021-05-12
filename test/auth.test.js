const request = require('supertest');
const app = require('../app')
const testSetup = require('./helper/dbHelper')
const testData = require('../test/helper/testData.json')

testSetup()

describe('POST /api/login', () => {
  it('Returns a jwt with successful login', async () => {
    await request(app).post('/api/login')
    .send({ "_id": `${testData.userData[0]._id}`,
            "password": `${testData.userData[0].password}`})
    .then((response) => {
      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expect.objectContaining( { accessToken }))
    })
  })
})