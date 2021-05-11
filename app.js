const express = require('express');
const app = express();
require('dotenv/config')

const db = require('./config/db')

const usersRoute = require('./routes/api/users')

// assign url to users routes
app.use('/api/users', usersRoute)

// connect to mongoDB
db.connect();

// test route
app.get('/', (req, res) => {
  res.status(200).send()
})

module.exports = app;
