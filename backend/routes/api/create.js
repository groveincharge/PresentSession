const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('./../../_helpers/db');
const mongoose = require('mongoose');
const User = db.User
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    // validate
    const {body: {firstName, lastName, email, password, confirmPassword}} = req;

     // hash password
         let hash = bcrypt.hashSync(password, 10);
    

    const CreateUser = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        email,
        password: hash
          });

    // save user
         await CreateUser.save()
                  .then(user => {
                      res.status(201).json(user)
                     })
                   .catch(err => {
                       res.status(500).json({
                       message: 'User not saved possible 500 error.',
                       error: err
                      });
            });
        });
module.exports = router;