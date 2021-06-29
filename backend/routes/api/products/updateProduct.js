const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const {ensureAuthenticated} = require('./../../ensureAuthenticated');
const db = require('./../../../_helpers/db');
const Product = db.Product;

router.put("/:productId", (req, res, next) => {
	const id = req.params.productId? req.params.productId: " ";
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.updateOne({_id: id}, { $set: updateOps})
	.exec()
	.then(result =>{
		res.status(200).json({
			message: 'Product Update',
			request: {
				type: 'GET',
				url: 'http://localhost:7000/api/product/updateProduct' + id
			}
		});
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({error: err});
	})
    next()
});

module.exports = router;