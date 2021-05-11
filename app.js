const express = require('express');
const app = express();
require('dotenv/config')

const db = require('./config/db')

const usersRoute = require('./routes/api/users')

// middleware for parsing json payloads
app.use(express.json())

// assign url to users routes
app.use('/api/users', usersRoute)

// connect to mongoDB
db.connect();

// test route
app.get('/', (req, res) => {
  res.status(200).send()
})

app.listen(8082, console.log('Sever is running on port 8082'))

module.exports = app;