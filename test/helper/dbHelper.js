const db = require('../../config/db')
const app = require('../../app');
const mongoose = require('mongoose');

const testSetup = () => {

  beforeAll(async () => {
    await db.connect()
  })

  // afterEach(async () => {
  //   await mongoose.connection.dropCollection()
  // })

  afterAll(async () => {
    await db.disconnect()
  })
}

module.exports = testSetup;
