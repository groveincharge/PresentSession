const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../../../_helpers/db');
const { ensureAuthenticated } = require('../../ensureAuthenticated');
const Order = db.Order;

router.put("/:orderId", (req, res, next) => {
	const id = req.params.orderId? req.params.orderId: " ";
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Order.updateOne({_id: id}, { $set: updateOps})
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