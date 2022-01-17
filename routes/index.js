const express = require('express');
const router = express.Router();
const Card = require('./../models/CardModel')
const User = require('./../models/UserModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
