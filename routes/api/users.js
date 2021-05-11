const express = require('express');
const router = express.Router();

// const User = require('../../models/user');
router.get('/', (req, res) => {
  res.status(200).send()
});

router.post('/', (req, res) => {
  res.status(201).send()
});

module.exports = router;
