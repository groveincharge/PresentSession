const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../../../_helpers/db');
const ensureAuthenticated = require('./../../ensureAuthenticated');
const Comment = db.Comment;

router.put("/:commentId", (req, res, next) => {
	const id = req.params.commentId? req.params.commentId: " ";
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Comment.updateOne({_id: id}, { $set: updateOps})
	.exec()
	.then(result =>{
		console.log(result);
		res.status(200).json(result);
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({error: err});
	})
    next()
});

module.exports = router; 