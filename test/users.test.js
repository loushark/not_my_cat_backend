const request = require('supertest');
const app = require('../app')
const testSetup = require('./helper/dbHelper')
const testData = require('../test/helper/testData.json')

// pulls in the testHelper functions (beforeAll, beforeEach etc)
testSetup()

// data for post operations
let postData = {
                "username": "catlover69",
                "email": "99cats@notyours.com",
                "password": "password1",
                }

describe('GET /api/users', () => {
  it('returns status code 200 and an array of users', async () => {
    await request(app).get('/api/users')
    .then((response) => {
      expect(response.status).toEqual(200)
      expect(response.body[0]).toEqual(expect.objectContaining( { "username": `${testData.userData[0].username}` }))
    })
  })
})

describe('GET /api/users/:username', () => {
  it('returns status 200 and a specific user object', async () => {
    await request(app).get(`/api/users/${testData.userData[0].username}`)
    .then((response) => {
      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expect.objectContaining( { "username": `${testData.userData[0].username}`,
                                                               "password": `${testData.userData[0].password}` }))
    })
  })

  it('return status 404 and error message when the user is not found', async () => {
    await request(app).get('/api/users/doglover10330')
    .then((response) => {
      expect(response.status).toEqual(404)
      expect(response.body.message).toEqual("User not found")
    })
  })
})

describe('POST /api/users', () => {
  it('returns status code 201 and the user object upon creation', async () => {
    await request(app).post('/api/users')
    .send(postData)
    .then((response) => {
      expect(response.status).toEqual(201)
      expect(response.body).toEqual(expect.objectContaining(postData))
    })
  })

  it('return status 500 and error message if the user cannot be created', async () => {
    await request(app).post('/api/users')
    .send({ "username": "catlover69"} )
    .then((response) => {
      expect(response.status).toEqual(500)
      expect(response.body).toEqual(expect.objectContaining( { "_message": "User validation failed" }))
    })
  })
})
