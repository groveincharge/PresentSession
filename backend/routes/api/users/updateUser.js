const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const {ensureAuthenticated} = require('./../../ensureAuthenticated');
const db = require('./../../../_helpers/db');
const User = db.User;

/*router.patch("/:userId", async (req, res, next) = {
    try{
    const updatedPost = await User.updateOne({_id: req.params.userId}, {$set: {email: req.body.email}});
    res.json(updatedPost);
    }
    catch(err){
        res.json({message: err});
    }
});*/

router.put("/:userId", (req, res, next) => {
	const id = req.params.userId? req.params.userId: " ";
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	User.updateOne({_id: id}, { $set: updateOps})
	.exec()
	.then(result =>{
	return res.status(200).json({
			message: 'Product Update',
			request: {
				type: 'GET',
				url: 'http://localhost:7000/api/product/updateProduct/' + id
			}
		});
	})
	.catch(err =>{
		console.log(err);
		return res.status(500).json({error: err});
	})
    next()
});

module.exports = router;