const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const {ensureAuthenticated} = require('./../../ensureAuthenticated');
const db = require('./../../../_helpers/db');
const User = db.User;

router.delete('/:userId', function(req, res, next) {
	const id = req.params.userId;
	User.deleteOne({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			 message: 'Product Deleted',
			 request: {
			 	type: 'POST',
			 	url: 'http://localhost:7000/api/users/getByUserId',
			 	body: {name: 'String', email: 'String'}
			 }
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
	});

    module.exports = router;