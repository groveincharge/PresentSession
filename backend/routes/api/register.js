const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('./../../_helpers/db');
const mongoose = require('mongoose');
const User = db.User
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const {body: {firstName, lastName, email, password, confirmPassword}} = req;

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
    else
       {
       await User.find({email})
       .exec()
       .then(list => {
         if (list.length >= 1) {
           return res.status(409).json({
             message: 'Email already registered'
                          })
            }
         else 
             {
          bcrypt.hash(password, 10, (err, hash) => {
                                if (err) {
                                    return res.status(500).json({
                                                          message: err
                                                               });
                                   }
                                   else
                                      { 
                                     const NewUser = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                     firstName,
                                     lastName,
                                     email,
                                     password: hash
                                     });
                                       console.log(`NewUser ${NewUser}`)                 
                                          return NewUser.save()
                                                        .then(user => {
                                                          res.status(201).json({
                                                            user,
                                                            messsage: 'Registered!'
                                                          })
                                                        })
                                     };
                                });
                }
            });
       }
  });

 router.get('/', (req, res, next) => {
    User.find()
        .then(result => {
         console.log(result);
           res.status(200).json({
               message: 'user List.',
               count: result.length,
                contact: result.map(doc => {
           return{
         firstName: doc.firstName,
           lastName: doc.lastName,
             email: doc.email,
               _id: doc._id,
                  request: {
                      type: 'GET',
                      url: 'http://localhost:7000/api/register/' + doc._id
                  }
            }
          })
           })
        })
        .catch(err => {
         res.status(500).json({
               message: 'List failed to load.',
               error: err
         })
       })
});

   module.exports = router;