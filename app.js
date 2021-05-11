// pull in express and assign to 'app'
const express = require('express');
const app = express();

// pull in dotenv so it can read our .env file
require('dotenv/config')

// pull in the db module with its functions
const db = require('./config/db')

// pull in users routes
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

// assign the const port 
const port = process.env.PORT || 8082;

// server listens on port
app.listen(port, console.log(`Sever is running on port ${port}`))

module.exports = app;