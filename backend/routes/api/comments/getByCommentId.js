const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../../../_helpers/db');
const ensureAuthenticated = require('./../../ensureAuthenticated');
const Comment = db.Comment;

router.get('/:commentId', function(req, res, next) {
	const id = req.params.commentId;
	Comment.findById(id)
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