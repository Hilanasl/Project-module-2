const express = require('express');
const router = express.Router();
const Card = require('./../models/CardModel')
const User = require('./../models/UserModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/signin', (req, res, next) => {
  res.render('auth/signin')
})

router.post('/signin', (req, res, next) => {
  res.render
})

router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

//router.get("/signout", protectRoute, (req, res) => {
// req.session.destroy(function (err) {
//    res.redirect("/auth/signin");
// });
//});

router.get('/profile', (req, res, next) => {
  res.render('dashboardUser');
});

module.exports = router;
