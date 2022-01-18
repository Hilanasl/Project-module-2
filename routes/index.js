const express = require('express');
const router = express.Router();
const Card = require('./../models/CardModel');
const User = require('./../models/UserModel');
const protectPrivate = require('./../middlewares/protectRoute');
const protectUnlogged = require('./../middlewares/protectUnlogged')
const bcrypt = require('bcrypt');
const salt = 10;


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/signin', (req, res, next) => {
  res.render('auth/signin')
})

router.post('/signin', protectUnlogged, (req, res, next) => {
  const userInfo = req.body;

  if (!userInfo.email || !userInfo.password) {
    req.flash("warning", "All fields are required!");
    res.redirect("/signin");
  }

  User.findOne({ email: userInfo.email })
    .then((user) => {
      if (!userInfo) {
        req.flash("error", "Invalid credential");
        res.redirect('/signin');
      }
      console.log(userInfo);
      const checkPassword = bcrypt.compareSync(userInfo.password, user.password);

      if (!checkPassword) {
        req.flash("error", "Invalid credential");
        res.redirect('/signin');
      } else {
        const userObject = user.toObject();
        delete userObject.password;
        console.log(userObject);
        req.session.currentUser = userObject;
        req.flash("success", "Successfully signed in!")
        res.redirect('/profile')
      }
    })
    .catch(next)
})

router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

router.post("/signup", (req, res, next) => {
  const newUser = { ...req.body };
  if (!newUser.fullname || !newUser.username || !newUser.email || !newUser.password) {
    req.flash("error", "Please fill in all the fields");
    res.redirect("/signup");
  } else {
    User.findOne({ email: newUser.email })
      .then((email) => {
        if (email) {
          req.flash(
            "warning",
            "This e-mail already exists in our database!"
          );
          res.redirect("/signup");
        }
      })
      .catch(next);

    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    newUser.password = hashedPassword;

    User.create(newUser)
      .then(() => {
        req.flash("success", "Account successfully created!");
        res.redirect('/signin')
      })
      .catch(next)
  }
});


router.get('/profile', protectPrivate, (req, res, next) => {
  res.render('dashboardUser');
});

router.get("/signout", protectPrivate, (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/signin");
  });
});

module.exports = router;
