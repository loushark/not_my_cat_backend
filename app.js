const express = require('express');
const app = express();
require('dotenv/config')

const db = require('./config/db')

// const users = require('./routes/api/users')

db.connect();

app.get('/', (req, res) => {
  res.status(200).send()
})

module.exports = app;