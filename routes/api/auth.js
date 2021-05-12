const express = require('express');
const User = require('../../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
  User.findById(req.body._id)
  .then(user => {
    if (user === null) {
      res.status(401).json({ message: "Username or password incorrect"})
    }
    if (user.isValidPassword(req.body.password)) {
      const accessToken = jwt.sign({ username: user._id }, process.env.TOKEN_SECRET)
      res.status(200).json({ accessToken })
    } else {
      res.status(401).json({ message: "Username or password incorrect"})
    }
  })
  .catch(error => console.log(error))
})

module.exports = router;
