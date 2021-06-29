const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('config.json');
const { check, validationResult } = require('express-validator');

// create the login get and post routes
router.get('/', (req, res) => {
  console.log('Inside GET ./api/login callback\n')
  console.log(`req.user ${JSON.stringify(req.user)}\n`);
  console.log(`req.session ${JSON.stringify(req.session)}\n`);
  console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
  console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
  console.log(`req.session.user: ${JSON.stringify(req.session.user)}\n`);
  console.log(`req.sessionID from ./apt/login GET route ${req.sessionID}\n`)
  console.log(`req.isAuthenticated() from ./api/login GET route ${req.isAuthenticated()}\n`)

  if (req.isAuthenticated()) {
    res.status(200).json({
      user: req.user
    })
  } else {
    res.status(401).redirect('/api/users/login')
  }

});



router.post('/', async (req, res, next) => {

  const user = req.body;

  console.log('user', user);

  await check('email', 'Invalid Credentials').isEmail().run(req);
  await check('password', 'Invalid Credentials').isLength({ min: 6 })
    .withMessage('password must be at least six chars long')
    .matches(/\d/)
    .withMessage('password must contain at least one number')
    .run(req);

  // Finds the validation errors in this request and wraps them in an object with handy functions
  let errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(422).json({
      message: errors.errors.map((error, index) => {
        return `(${index + 1}) ${error.msg}.`
      })
    });
  }
  else {
    console.log('Inside POST /login callback\n');
    console.log(`POST user ${JSON.stringify(user)}\n`);
    console.log(`req.session ${JSON.stringify(req.session)}\n`);
    console.log(`req.sessionID ${req.sessionID}\n`);

    passport.authenticate('local', (err, passportUser, info) => {
      console.log('Inside passport.authenticate() callback\n');
      console.log(`passportUser inside passport.authenticate ${JSON.stringify(passportUser)}\n`)
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
      console.log(`req.user: ${JSON.stringify(req.user)}\n`);
      console.log(`req.isAuthenticated: ${JSON.stringify(req.isAuthenticated())}\n`);

      req.login(passportUser, (err) => {

        console.log('Inside req.login() callback\n');
        console.log(`req.session.cookie ${JSON.stringify(req.session.cookie)}\n`);
        console.log(`req.session ${JSON.stringify(req.session)}\n`);
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
        console.log(`passportUser inside req.login ${JSON.stringify(passportUser)}\n`);
        console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
        console.log(`req.user: ${JSON.stringify(req.user)}\n`);
        console.log(`req.isAuthenticated: ${JSON.stringify(req.isAuthenticated())}\n`);

        if (req.isAuthenticated()) {
         return res.status(201).json({
            user: req.user
          })
        }
        else {
         return res.status(401).redirect('/api/users')
        }
      })

    })(req, res, next);

  }
  console.log(`req.isAuthenticated: ${JSON.stringify(req.isAuthenticated())}\n`);
});

module.exports = router;