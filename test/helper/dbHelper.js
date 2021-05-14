const db = require('../../config/db')
const app = require('../../app');
const request = require('supertest');
const testData = require('./testData.json')

const testSetup = () => {

  let server

  // before all tests of a given test suite, connects to the db
  beforeAll(async () => {
    server = app.listen(4000, () => {console.log("Test server running")})
    await db.connect()
  })

  // before each and every test, adds data to the database
  beforeEach( async () => {
    for (let i = 0; i < testData.userData.length; i ++) {
      await request(app).post('/api/users').send(testData.userData[i])
      }
    for (let i = 0; i < testData.catData.length; i ++) {
      let accessData = 0
      await request(app).post('/api/cats').send({postData: testData.catData[i], accessToken: accessData})
      }
  })

  // after each and every test, clears the user collection
  afterEach( async () => {
    await db.connection().listCollections()
    .forEach( async (collection) => {
      if(collection) {
        await db.connection().dropCollection(collection.name)
      }
    })
    .catch(error => console.log(error))
  })

  // after all tests are concluded, disconnects form the db
  afterAll(async () => {
    await server.close(console.log("Test server closed"))
    await db.disconnect()
  })
}

module.exports = testSetup;
