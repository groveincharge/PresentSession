const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
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

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
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