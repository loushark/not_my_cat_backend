const request = require('supertest');
const app = require('../app')
const testSetup = require('./helper/dbHelper')
const User = require("../models/User")

testSetup()

let testData = {
                "username": "catlover69",
                "email": "99cats@notyours.com",
                "password": "password1",
                }

// test("GET /users", async () =>{
//   const user = await User.create({
//     username: "catlover69",
//     email: "99cats@notyours.com",
//     password: "password1",
//     dateAdded: "11/05/2021"
//   })
//   await request(app)
//   .get("/api/users")
//   .expect(200)
//   .then((response) =>{
//     console.log(response)
//     expect(response.body[1]._id).toBe(user.id)
//   })
// })


describe('get users', () => {
  it('returns status code 200 and users array', async () => {
    await request(app).get('/api/users')
    .then((response) => {
      expect(response.status).toEqual(200)
      expect(response.body[0]).toEqual(expect.objectContaining( { "username": "catlover69" }))
    })
  })
})

describe('post users', () => {
  it('returns status code 201 and the user object', async () => {
    await request(app).post('/api/users')
    .send(testData)
    .then((response) => {
      expect(response.status).toEqual(201)
      expect(response.body).toEqual(expect.objectContaining(testData))
    })
  })

  it('return status 500 and error message', async () => {
    await request(app).post('/api/users')
    .send({ "username": "catlover69"} )
    .then((response) => {
      expect(response.status).toEqual(500)
      expect(response.body).toEqual(expect.objectContaining( { "_message": "User validation failed" }))
    })
  })
})

