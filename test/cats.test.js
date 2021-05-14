const request = require('supertest');
const app = require('../app')
const testSetup = require('./helper/dbHelper')
const testData = require('../test/helper/testData.json')
const jwt = require('jsonwebtoken')

// pulls in the testHelper functions (beforeAll, beforeEach etc)
testSetup()

let postData = {
  "catName": "Fluff",
  "user_id": `${testData.userData[0]._id}`,
  "cattitude": 7,
  "floof": 10,
  "chonk": 4
}

describe('Get /api/cats', () => {
  it('returns status code 200 and an array of cats', async () => {
    await request(app).get('/api/cats')
    .then((response) => {
      expect(response.status).toEqual(200)
      expect(response.body[0]).toEqual(expect.objectContaining( { "catName": `${testData.catData[0].catName}` }))
    })
  })
})

describe('Get /api/cats/:user_id', () => {
  it('returns a specific cat by it\'s owner', async () => {
    await request(app).get(`/api/cats/${testData.catData[0].user_id}`)
    .then((response) => {
      expect(response.status).toEqual(200)
      expect(response.body[0]).toEqual(expect.objectContaining( { "catName": `${testData.catData[0].catName}` }))
    })
  })
  it('return status 404 and error message when the cat is not found', async () => {
    await request(app).get('/api/cats/doglover10330')
    .then((response) => {
      expect(response.status).toEqual(404)
      expect(response.body.message).toEqual("No cats found")
    })
  })
})

describe('POST /api/cats', () => {
  it('returns status code 201 and the cat object upon creation', async () => {
    const accessToken = jwt.sign({ username: "catlover69" }, process.env.TOKEN_SECRET)
    await request(app).post('/api/cats')
    .send({postData, accessToken})
    .then((response) => {
      expect(response.status).toEqual(201)
      expect(response.body).toEqual(expect.objectContaining(postData))
    })
  })

  it('return status 500 and error message if the cat cannot be created', async () => {
    await request(app).post('/api/cats')
    .send({ "catName": "NoUserCat"} )
    .then((response) => {
      expect(response.status).toEqual(500)
      expect(response.body).toEqual(expect.objectContaining( { "_message": "Cat validation failed" }))
    })
  })
})
