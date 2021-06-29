//npm modules
require('rootpath')();
const config = require('config.json');
const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');
const errorHandler = require('./_helpers/error-handler');
const db = require('./_helpers/db');
const User = db.User;
const routes = require('./routes')


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

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
       console.log(`user from inside deserialize ${JSON.stringify(user)}`);
       done(err, user)
     });
   });

// create the server
const app = express();

//express middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(fileUpload());
  app.use(cors());
 
/*
   app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:7000');
   res.header('Access-Control-Allow-Headers',
              'Origin, X-Requested-With, X-Powered-By, Etag, Set-Cookie, cookie, Content-type, Accept, Authurization');
     res.header('Access-Control-Allow-Credentials', true);
     res.header('Access-Control-Expose-Headers', 'X-Powered-By, Etag, X-Requested-With');
     req.header('Content-Type', 'application/json');
     if (req.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
       return res.status(200).json({});
     }
    next()
     })
  */
      //passport and session middleware
   app.use(session({
    // Set the session ID
    genid: (req) => {
      console.log(`Inside the server.js session middleware ${req.sessionID}`);
      return uuid() //use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: config.secret,
    cookie: {maxAge: 6000000, path: '/', httpOnly: true, secure: false},
    resave: false,
    saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session()); 

   //models & routes
app.use('uploads',express.static('./../frontend/public/uploads'));
app.use(routes);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
}); 