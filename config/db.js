const mongoose = require('mongoose');

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

const connection = () => {
  return mongoose.connection.db
}

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