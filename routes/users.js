var express = require('express');
var router = express.Router();
const Card = require('./../models/CardModel')
const User = require('./../models/UserModel')
const parser = require('./../config/cloudinary')
const protectPrivate = require('./../middlewares/protectRoute');


router.get('/profile/create', protectPrivate, (req, res, next) => {
  res.render('add-card');
});


router.post('/profile/create', parser.single('image'), async (req, res, next) => {
  const newCard = { ...req.body };
  if (!req.file) newCard.image = undefined;
  else newCard.image = req.file.path;
  try {
    await Card.create(newCard);
    res.redirect('/profile')
  } catch (err) {
    next(err)
  }
});


router.get('/profile/:id/update', async (req, res, next) => {
try {
  const cardToEdit = await Card.findById(req.params.id);
  res.render('update-card', {
    cardToEdit
  })
} catch (err) {
  next(err)
}
});


router.post('/profile/:id/update', async (req, res, next) => {
  try {
    await Card.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/profile');
  } catch (err) {
    res.render('update-card')
    next(err);
  }
});



module.exports = router;
