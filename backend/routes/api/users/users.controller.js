const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

async function authenticate(req, res, next) {
    const {user} = req.body;


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
            passport.authenticate('local', (err, passportUser, info) => {
                console.log('Inside passport.authenticate() callback\n');
                console.log(`passportUser inside passport.authenticate ${JSON.stringify(passportUser)}\n`)
                console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
                console.log(`req.user: ${JSON.stringify(req.user)}\n`);
            
                req.login(passportUser, (err) => {
                  
                  console.log('Inside req.login() callback\n');
                   console.log(`req.session.cookie ${JSON.stringify(req.session.cookie)}\n`);
                  console.log(`req.session ${JSON.stringify(req.session)}\n`);
                  console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
                  console.log(`passportUser inside req.login ${JSON.stringify(passportUser)}\n`);
                  console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
                  console.log(`req.user: ${JSON.stringify(req.user)}\n`);

                  req.user.authenticated = req.isAuthenticated();

                 // if (req.isAuthenticated()) {
                 //   res.status(201).json(req.user)
               // }  
              //else
               //  {
               //res.status(401).json({
               //isAuthenticated: req.isAuthenticated(),
              // message: 'You must be registered to login.'
              // })
             // }

                  userService.authenticate(req.user)
                 .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
                  .catch(err => next(err));

              })
              })(req, res, next);
          }

}


 async function register(req, res, next) {
     const {confirmPassword} = req.body;
    await check('email', 'Invalid Credentials').isEmail().run(req)
    await check('password', 'Invalid Credentials').isLength({ min: 6 })
               .withMessage('password must be at least six chars long')
               .matches(/\d/)
              .withMessage('password must contain at least one number')
              .equals(confirmPassword)
              .withMessage('passwordConfirmation field must have the same value as the password field')
              .run(req);
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        
       return res.status(422).json({

                            message: errors.errors.map(error => {
                              return error.msg
                            })
                          });      
          }
         else {
    await userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
         }
};

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}