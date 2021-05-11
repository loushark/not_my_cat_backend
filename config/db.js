const mongoose = require('mongoose');

// connects to the mongodb using the uri in the .env 
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, 
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