const express = require('express');
const router = express.Router();
const Cat = require('../../models/cat');
const jwt = require('jsonwebtoken')

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
  jwt.verify(req.body.accessToken, process.env.TOKEN_SECRET, (err, verifiedUser) => {
    if (err){
      res.status(500).json(err)
    } else {
      Cat.create(req.body.postData)
      .then(cat => {
        res.status(201).json(cat)
      })
      .catch(err => {res.status(500).json(err)})
    }
  })
})

router.delete('/:catName', (req, res) => {
  Cat.deleteOne({ catName: req.params.catName })
  .then(cat => {
    res.status(200).json(cat)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})


router.put('/:catName', (req, res) => {
  Cat.findOneAndUpdate(
    { catName: req.params.catName },
    { timesSpotted: req.body.timesSpotted,
      wins: req.body.wins }, 
    {new: true}
  )
  .then(cat => {
    res.status(200).json(cat)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

module.exports = router;
