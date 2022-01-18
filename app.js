require('dotenv').config();
require('./db/mongo')

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require("connect-flash"); // designed to keep messages between 2 http request/response cycles
const hbs = require("hbs");
const session = require("express-session");
//const MongoStore = require("connect-mongo")(session);
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const arrondRouter = require('./routes/arrond')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  })
);

app.use(flash());
app.use(require("./middlewares/exposeFlashMessage"));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', arrondRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
