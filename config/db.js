const mongoose = require('mongoose');

// determines the env for the connection
const env = () => {
  if (process.env.NODE_ENV === "test") {
    return process.env.MONGO_URI_TEST
  }
  else if (process.env.NODE_ENV === "dev") {
    return process.env.MONGO_URI_DEV
  }
}

// connects to the mongodb using the uri in the .env 
const connect = async () => {
  try {
    await mongoose.connect(env(),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB is connected')
  }
  catch {
    console.log(error.message);
    process.exit(1);
  }
}

// returns a connection to the db for other functions to use
const connection = () => {
  return mongoose.connection.db
}

// disconnects the database from the express server
const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected')
  } 
  catch {
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = { connect, disconnect, connection };