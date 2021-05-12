const express = require('express');
const router = express.Router();
const User = require('../../models/user');

// GET /api/users  -returns all users
router.get('/', (req, res) => {
  User.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => res.json(error))
});

// GET /api/users/:_id  -returns a user of the specified _id
router.get('/:_id', (req, res) => {
  User.findOne({ _id: req.params._id })
  .then(user => {
    if (user) {
      res.status(200).json(user)
    }
    else {
      res.status(404).json({ message: "User not found" })
    }
  })
  .catch(error => res.json(error))
});

// POST /api/users  -creates a new user and returns the user obj
router.post('/', (req, res) => {
  User.create(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => res.status(500).json(error))
});

module.exports = router;
