const express = require('express');
const router = express.Router();
const Card = require('./../models/CardModel')
const User = require('./../models/UserModel')

router.get('/arrond/:arrond', async (req, res, next) => {
    try {
    const cards = await Card.find({arrond: req.params.arrond})
    res.render('arrondissements', {
        cards
    })} 
    catch (err) {
        next(err)
        }
})



router.get('/arrond/:arrond/:id', async (req, res, next) => {
    try {
    const oneCard = await Card.findById(req.params.id)
    console.log(oneCard)
    res.render('card-details', {oneCard})
    } catch (err) {
        next(err)
    }
})


router.get('/:category', async (req, res, next) => {
    try {
    const catCards = await Card.find({category: req.params.category})
    res.render('category', {
        catCards
    })} 
    catch (err) {
        next(err)
        }
})



module.exports = router;