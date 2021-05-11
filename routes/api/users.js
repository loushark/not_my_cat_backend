const express = require('express');
const router = express.Router();

const User = require('../../models/user');

router.get('/', (req, res) => {
  User.find()
  .then(users => {
    res.status(200).json(users)
  })
});

router.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username })
  .then(user => {
    if (user) {
      res.status(200).json(user)
    }
    else {
      res.status(404).json({ message: "User not found" })
    }
  })
  // .catch(error => {
  //   res.status(404).json(error)
  // })
});

router.post('/', (req, res) => {
  User.create(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

module.exports = router;
