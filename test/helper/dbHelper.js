const db = require('../../config/db')
const app = require('../../app');
const request = require('supertest');
const testData = require('./testData.json')

const testSetup = () => {

  beforeAll(async () => {
    await db.connect()
  })

  beforeEach( async () => {
    for (let i = 0; i < testData.userData.length; i ++) {
      await request(app).post('/api/users').send(testData.userData[i])
      }
  })

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

  afterAll(async () => {
    await db.disconnect()
  })
}

module.exports = testSetup;
