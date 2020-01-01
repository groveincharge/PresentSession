const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//const Users = mongoose.model('Users');
const User = require('../../models/User');


// create the getUserId route
router.get('/:_id', (req, res) => {
    Users.find({_id: req.params._id})
   .exec()
   .then(user => {
     if(user.length >= 1){
        return res.status(200).send({
                       message: 'User found',
                       _id: user[0]._id,
                       email: user[0].email,
                       username: user[0].username
        });
     }else{
       res.status(409)
         .json({
           message: 'User Not Found',
           email: req.params._id
         })
     };
           
   })
   .catch(err => {
     res.status(500).json({
       message: 'User Not Found',
       error: err
     })
   })
 });

 module.exports = router;