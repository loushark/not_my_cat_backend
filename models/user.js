const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  if(!user.isModified("password")) {
      return next();
  }
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

userSchema.methods.isValidPassword = function(password) {
  const user = this;
  const compare = bcrypt.compareSync(password, user.password);

  return compare;
}

module.exports = user = new mongoose.model('User', userSchema);
