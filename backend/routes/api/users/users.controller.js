const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const userService = require('./user.service');
const mongoose = require('mongoose');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/logout/:id', logout)
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

async function authenticate(req, res, next) {

    const {email, password} = req.body;
    const user = {email, password}
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
                  
                  if (req.isAuthenticated()) {
                  req.user.auth = req.isAuthenticated();
                  };

                  userService.authenticate(req.user)
                 .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
                  .catch(err => next(err));

              })
              })(req, res, next);
          }

}

async function logout(req, res, next)  {
  console.log('Inside GET req.logout() callback\n');
  console.log(`req.session ${JSON.stringify(req.session)}\n`)
  console.log(`req.params.id ${JSON.stringify(req.params.id)}\n`)
  console.log(`req.isAuthenticated from GET /api/logout router ${req.isAuthenticated()}\n`);
  console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
  console.log(`req.user: ${JSON.stringify(req.user)}\n`);

  if (req.isAuthenticated){

    await userService.logout(req.user._id)
        .then(user => res.json({
                     user,
                    auth: !req.isAuthenticated 
        }))
        .catch(err => next(err));
    req.logout();
    return;  
   } 
   else
     {
     return res.json({message: 'you must be logged in!'});
   } 
 };

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

                            message: errors.errors.map((error, index) => {
                              return `(${index+1}) ${error.msg}.`
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