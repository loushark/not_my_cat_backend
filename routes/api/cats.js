const express = require('express');
const router = express.Router();
const Cat = require('../../models/cat');

router.get('/', (req, res) => {
  Cat.find()
  .then(cats => {
    res.status(200).json(cats)
  })
})

router.get('/:user_id', (req, res) => {
  Cat.find({ user_id: req.params.user_id })
  .then(cat => {
    if (Object.keys(cat).length) {
      res.status(200).json(cat)
    }
    else {
      res.status(404).json({ message: "No cats found" })
    }
  })
});

router.post('/', (req, res) => {
  Cat.create(req.body)
  .then(cat => {
    res.status(201).json(cat)
  })
})
module.exports = router;
