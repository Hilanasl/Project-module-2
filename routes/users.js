var express = require('express');
var router = express.Router();
const Card = require('./../models/CardModel')
const User = require('./../models/UserModel')
const parser = require('./../config/cloudinary')

router.get('/profile/create', (req, res, next) => {
  res.render('add-card');
});


router.post('/profile/create', parser.single('image'), async (req, res, next) => {
  const newCard = { ...req.body };
  try {
    await Card.create(newCard);
    res.redirect('/profile')
  } catch (err) {
    next(err)
  }
});

module.exports = router;
