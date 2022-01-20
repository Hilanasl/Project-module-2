const express = require('express');
const router = express.Router();
const Card = require('./../models/CardModel')
const User = require('./../models/UserModel')



router.get('/arrond/:arrond/:id/favourite', async (req, res, next) => {
    try {
        const user = await User.findOne({$and :[{_id: req.session.currentUser._id}, { favourites: { $in: [req.params.id]}}]});
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
        const cards = await Card.find({ arrond: req.params.arrond }).populate('author')

        let previousArrondNumber;
        if (Number(req.params.arrond) > 75001) {
            console.log("yes")
            previousArrondNumber = Number(req.params.arrond) - 1
        } else {
            console.log("not")
            previousArrondNumber = Number(req.params.arrond) + 19
        }

        let nextArrondNumber;
        if (Number(req.params.arrond) === 75020) {
            console.log("yes")
            nextArrondNumber = Number(req.params.arrond) - 19
        } else {
            console.log("not")
            nextArrondNumber = Number(req.params.arrond) + 1
        }

        res.render('arrondissements', {
            cards,
            previous: previousArrondNumber,
            next: nextArrondNumber,
            css: ['arrond.css'],
            scripts: ['index.js']
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/arrond/:arrond/:id', async (req, res, next) => {
    try {
        const oneCard = await Card.findById(req.params.id).populate('author')
        const favUser = await User.findOne({$and :[{_id: req.session.currentUser?._id}, { favourites: { $in: [req.params.id]}}]}) 
        res.render('card-details', {
            oneCard, favUser,
            css: ['one-card.css']
        })
    } catch (err) {
        next(err)
    }
})


router.get('/category/:category', async (req, res, next) => {
    try {
        const catCards = await Card.find({ category: req.params.category })
        res.render('category', {
            catCards,
            css: ['arrond.css']
        })
    }
    catch (err) {
        next(err)
    }
})






module.exports = router;