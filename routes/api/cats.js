const express = require('express');
const router = express.Router();
const Cat = require('../../models/cat');

router.get('/', (req, res) => {
  Cat.find()
  .then(cats => {
    res.status(200).json(cats)
  })
})

router.post('/', (req, res) => {
  Cat.create(req.body)
  .then(cat => {
    res.status(201).json(cat)
  })
})
module.exports = router;
