var express = require('express');
var router = express.Router();
const Card = require('./../models/CardModel')
const User = require('./../models/UserModel')
const parser = require('./../config/cloudinary')
const protectPrivate = require('./../middlewares/protectRoute');




router.get('/profile/create', protectPrivate, (req, res, next) => {
  res.render('add-card', {
    css: ['auth.css']
  });
});


router.post('/profile/create', parser.single('image'), async (req, res, next) => {
  const newCard = { ...req.body };
  console.log(req.body)
  if (!req.file) newCard.image = undefined;
  else newCard.image = req.file.path;
  newCard.author = req.session.currentUser._id;
  try {
    await Card.create(newCard);
    res.redirect('/profile')
  } catch (err) {
    next(err)
  }
});


router.get('/profile/:id/update', protectPrivate, async (req, res, next) => {
  try {
    const cardToEdit = await Card.findById(req.params.id);
    res.render('update-card', {
      cardToEdit,
      css: ['auth.css']
    })
    console.log('reached form')
  } catch (err) {
    next(err)
  }
});


router.post('/profile/:id/update', parser.single('image'), async (req, res, next) => {
  const updatedCard = { ...req.body };

  if (!req.file) updatedCard.image = undefined;
  else updatedCard.image = req.file.path;
  try {
    await Card.findByIdAndUpdate(req.params.id, updatedCard);
    res.redirect('/profile')
  } catch (err) {
    res.render('update-card')
    next(err);
  }
});


router.get('/profile/:id/delete', async (req, res, next) => {
  try {
    const cardToDelete = await Card.findByIdAndRemove(req.params.id);
    res.redirect('/profile')
  } catch (err) {
    next(err)
  }
})

router.get('/profile/favourites', async (req, res, next) => {
  try {
    const favCards = await User.findById(req.session.currentUser._id, {favourites: 1, _id: 0}).populate('favourites');
    res.render('favourites', {
      favCards,
      css: ['dashboard.css']
    });
  }
  catch (err) {
    next(err)
  }
});



module.exports = router;
