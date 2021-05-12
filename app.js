// pull in express and assign to 'app'
const express = require('express');
const app = express();

// pull in jsonwebtoken
const jwt = require('jsonwebtoken')

// pull in dotenv so it can read our .env file
require('dotenv/config')

// pull in the db module with its functions
const db = require('./config/db')

// pull in routes
const usersRoute = require('./routes/api/users')
const catsRoute = require('./routes/api/cats')
const authRoute = require('./routes/api/auth')

// middleware for parsing json payloads
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// assign url to routes
app.use('/api/users', usersRoute)
app.use('/api/cats', catsRoute)
app.use('/api/', authRoute)

// assign the const port 
const port = process.env.PORT || 8082;

// only happen if env not test
if (process.env.NODE_ENV !== "test") {
  // connect to mongoDB
  db.connect();
  // server listens on port
  app.listen(port, console.log(`Sever is running on port ${port}`))
}

module.exports = app;