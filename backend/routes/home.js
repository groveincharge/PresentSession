const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../_helpers/db');
const User = db.User;
const {authmiddleware} = require('./auth');

router.get('/', authmiddleware, function(req, res, next) {

	User.find()
	.exec()
    .then(docs => {
    	console.log(docs);
    	res.status(200).json(docs);
  })
    .catch(err => {
    	console.log(err);
        res.status(500).json({error: err })
     });
});

module.exports = router; 