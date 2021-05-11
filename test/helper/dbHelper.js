const db = require('../../config/db')
const app = require('../../app');
const request = require('supertest');
const testData = require('./testData.json')

const testSetup = () => {

  // before all tests of a given test suite, connects to the db
  beforeAll(async () => {
    await db.connect()
  })

  // before each and every test, adds users to the database
  beforeEach( async () => {
    for (let i = 0; i < testData.userData.length; i ++) {
      await request(app).post('/api/users').send(testData.userData[i])
      }
  })

  // after each and every test, clears the user collection
  afterEach((done) => {
    db.connection().listCollections({ name: "users"})
    .next((error, collection) => {
      if(collection){
        db.connection().dropCollection("users")
        .then(() => done())
        .catch(error => console.log(error))
      }
      else {
        done(console.log(error))
      }
    })
  })

  // after all tests are concluded, disconnects form the db
  afterAll(async () => {
    await db.disconnect()
  })
}

module.exports = testSetup;
