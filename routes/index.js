const express = require('express');
const router = express.Router();
const Card = require('./../models/CardModel')
const User = require('./../models/UserModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/arrond', (req, res) => {
  res.render('arrondissements')
})

router.get('/signin')

module.exports = router;
