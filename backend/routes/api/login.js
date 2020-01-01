const express = require('express');
const router = express.Router();
const passport = require('passport');
const Cookies = require('cookies');
const { check, validationResult } = require('express-validator');

// create the login get and post routes
router.get('/', (req, res) => {
       console.log('Inside GET /login callback\n')
       console.log(`req.session.cookie ${JSON.stringify(req.session.cookie)}\n`);
       console.log(`req.session ${JSON.stringify(req.session)}\n`);
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
      console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
      console.log(`req.session.user: ${JSON.stringify(req.session.user)}\n`);
  console.log(`req.sessionID from ./login GET route ${req.sessionID}\n`)
  res.end(`You got the GET login api page!\n`)
});

 router.post('/', async (req, res, next) => {

  //const { body: { user } } = req;
       const user = req.body;

// Optionally define keys to sign cookie values
// to prevent client tampering
    const keys = [process.env.SESSION_KEY]

    // Create a cookies object
  const cookies = new Cookies(req, res, { keys: keys })
 
  // Get a cookie
   //const lastVisit = cookies.get('LastVisit', { signed: true })

  // Set the cookie to a value
  //cookies.set('LastVisit', new Date().toISOString(), { signed: true })

  
 await check('email', 'Invalid Credentials').isEmail().run(req);
  await check('password', 'Invalid Credentials').isLength({ min: 6 })
            .withMessage('password must be at least six chars long')
            .matches(/\d/)
            .withMessage('password must contain at least one number')
            .run(req);
            
        req.session.passportUser = {};
        req.session.isLoaded = false;
        req.session.errors = null;
       // lastVisit = null;

   // Finds the validation errors in this request and wraps them in an object with handy functions
  let errors = validationResult(req);
  console.log(`errors ${JSON.stringify(errors)}`)
  if (!errors.isEmpty()) {
      req.session.errors = errors;
      errors.errors.map(error => {
        console.log(`Login error from POST: ${JSON.stringify(error.msg)}`)
      })
    return res.status(422).json({ errors: errors.array() });
  }
  else
  {

  //const { body: { user } } = req;
  const user = req.body;

   console.log('Inside POST /login callback\n');
   console.log(`POST user ${JSON.stringify(user)}\n`);
  console.log(`req.session ${JSON.stringify(req.session)}\n`);
  console.log(`req.sessionID ${req.sessionID}\n`);

  passport.authenticate('local', (err, passportUser, info) => {
    console.log('Inside passport.authenticate() callback\n');
    console.log(`passportUser inside passport.authenticate ${JSON.stringify(passportUser)}\n`)
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
    console.log(`req.user: ${JSON.stringify(req.user)}\n`);

    req.login(passportUser, (err) => {
      req.session.passportUser = req.user;
      req.session.isLoaded = true;

      console.log('Inside req.login() callback\n');
       console.log(`req.session.cookie ${JSON.stringify(req.session.cookie)}\n`);
      console.log(`req.session ${JSON.stringify(req.session)}\n`);
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
      console.log(`passportUser inside req.login ${JSON.stringify(passportUser)}\n`);
      console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
      console.log(`req.user: ${JSON.stringify(req.user)}\n`);
     // return res.send('You were authenticated & logged in!\n');

      // Get a cookie
     const lastVisit = cookies.get('LastVisit', { signed: true })

    if ((!lastVisit) && req.isAuthenticated()) {
   // res.setHeader('Content-Type', 'application/json')
    cookies.set('LastVisit', new Date().toISOString(), { signed: true })
    res.json({
      message: 'Welcome, first time visitor!'
    })
    } 
    else
      if ((lastVisit) && req.isAuthenticated()) {
        // res.setHeader('Content-Type', 'application/json')
         cookies.set('LastVisit', new Date().toISOString(), { signed: true })
           res.json({
           message: 'Welcome back! Nothing much changed since your last visit at ' + lastVisit + '.'
           })
       }  
     else
        {
    //res.setHeader('Content-Type', 'application/json')
    res.json({message: 'You must be registered to login.'})
     }
  })

  })(req, res, next);
   
   }

   });

  module.exports = router;