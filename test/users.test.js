const request = require('supertest');
const app = require('../app')
const testSetup = require('./helper/dbHelper')
const User = require("../models/User")

testSetup()

test("GET /users", async () =>{
  const user = await User.create({
    username: "catlover69",
    email: "99cats@notyours.com",
    password: "password1",
    dateAdded: "11/05/2021"
  })
  await request(app)
  .get("/api/users")
  .expect(200)
  .then((response) =>{
    console.log(response)
    expect(response.body[1]._id).toBe(user.id)
  })
})


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
  it('returns status code 201', async () => {
    await request(app).post('/api/users')
    .then((request) => {
      expect(request.status).toEqual(201)
    })
  })
})
