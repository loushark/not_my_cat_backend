const request = require('supertest');
const app = require('../app')
const testSetup = require('./helper/dbHelper')
const testData = require('../test/helper/testData.json')

testSetup()

describe('POST /api/login', () => {
  it('Returns a jwt with successful login', async () => {
    await request(app).post('/api/login')
    .send({ "username": `${testData.userData[0]._id}`,
            "password": `${testData.userData[0].password}`})
    .then((response) => {
      expect(response.status).toEqual(200)
      expect(response.body.accessToken).toBeDefined()
    })
  })

  it('Returns status 401 and a message if the user id is incorrect', async () => {
    await request(app).post('/api/login')
    .send({ "_id": "notauser", "password": "password1" })
    .then((response) => {
      expect(response.status).toEqual(401)
      expect(response.body.message).toEqual( "Username or password incorrect" )
    })
  })

  it('Returns status 401 and a message if the user password is incorrect', async () => {
    await request(app).post('/api/login')
    .send({ "_id": `${testData.userData[0]._id}`, "password": "notmypassword" })
    .then((response) => {
      expect(response.status).toEqual(401)
      expect(response.body.message).toEqual( "Username or password incorrect" )
    })
  })
})