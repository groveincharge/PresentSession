//npm modules
require('rootpath')();
const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
//const User = require('./models/User');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const errorHandler = require('_helpers/error-handler');
require('dotenv').config();

// create the server
const app = express();

//express middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(fileUpload());
  app.use(cors());

   //passport and session middleware
   app.use(session({
    // Set the session ID
    genid: (req) => {
      console.log(`Inside the server.js session middleware ${req.sessionID}`);
      return uuid() //use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: process.env.SESSION_KEY,
    cookie: {maxAge: 600000, path: '/', httpOnly: true, secure: false},
    resave: false,
    saveUninitialized: false
    }));
   
  app.use(passport.initialize());
  app.use(passport.session());
   app.use(flash());

//models & routes
//require('./models/User');
require('./models/mongoConnect');
app.use('uploads',express.static('./../frontend/public/uploads'))
//app.use(require('./routes'));

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/products', require('./products/products.controller'));

// global error handler
app.use(errorHandler);

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email', password: 'password'},
  function(email, password, done) {
    console.log(`email from new strategy ${email}\n`)
    console.log(`password from new strategy ${password}\n`)
    User.findOne({ email: email}, (err, passportUser) => {
       console.log(`passportUser from new strategy ${passportUser}\n`)
      if (err) { return done(err); }
      if (!passportUser) { return done(null, false); }
      console.log(`user from new strategy ${passportUser}\n`)
      // Load hash from your password DB.
  bcrypt.compare(password, passportUser.password, function(err, res) {
    if (err) return done(null, false);
     if (!res) return done(null, false)
    if (res) return done(null, passportUser)
      });
    });
  }
));


// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log(`user from inside serialize ${JSON.stringify(user)}`);
  console.log(`user._id from inside serialize ${JSON.stringify(user._id)}`);
     done(null, user._id);
   });

   
passport.deserializeUser(function(_id, done) {
  User.findById(_id, function(err, user) {
    console.log(`user from inside deserialize ${JSON.stringify(user)}`);
    done(err, user);
  });
});

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 7000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});