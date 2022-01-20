const express = require('express');
const router = express.Router();
const Card = require('./../models/CardModel')
const User = require('./../models/UserModel')



router.get('/arrond/:arrond/:id/favourite', async (req, res, next) => {
    try {
        console.log('hi i am there')
        const user = await User.findOne({$and :[{_id: req.session.currentUser._id}, { favourites: { $in: [req.params.id]}}]});
        console.log(user)
        if (user) {
            await User.findByIdAndUpdate(req.session.currentUser._id, {
                $pull: {favourites: req.params.id}
            })}
        else {
            await User.findByIdAndUpdate(req.session.currentUser._id, {
                $push: {favourites: req.params.id}
            })}
        res.redirect(`/arrond/${req.params.arrond}/${req.params.id}`)
    }  catch (err) {
        next(err)
    }
})

router.get('/arrond/:arrond', async (req, res, next) => {
    try {
    const cards = await Card.find({arrond: req.params.arrond}).populate('author')
    res.render('arrondissements', {
        cards,
        css: ['arrond.css'],
        scripts: ['index.js']
    })} 
    catch (err) {
        next(err)
        }
})

router.get('/arrond/:arrond/:id', async (req, res, next) => {
    try {
    const oneCard = await Card.findById(req.params.id).populate('author')
    console.log(oneCard)
    res.render('card-details', {
        oneCard,
        css: ['one-card.css']})
    } catch (err) {
        next(err)
    }
})


router.get('/category/:category', async (req, res, next) => {
    try {
    const catCards = await Card.find({category: req.params.category})
    res.render('category', {
        catCards, 
        css: ['arrond.css']
    })} 
    catch (err) {
        next(err)
        }
})






module.exports = router;