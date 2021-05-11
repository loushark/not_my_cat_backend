const db = require('../../config/db')
const app = require('../../app')

const testSetup = () => {
  beforeAll(async () => {
    await db.connect()
  })
  afterAll(async () => {
    await db.disconnect()
  })
};

module.exports = testSetup
