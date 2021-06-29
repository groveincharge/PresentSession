const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../_helpers/db');
const User = db.User;
const ensureAuthenticated = require('./ensureAuthenticated');

router.get('/', function(req, res, next) {
   User.find()
      .exec()
      .then(users => {
         res.status(200).json(users);
      })
      .catch(err => {
       res.status(500).json({
             message: 'List failed to load.',
             error: err
       })
     })
});

router.delete('/:userId', function(req, res, next) {
	const id = req.params.userId;
	User.deleteOne({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
	});


module.exports = router; 