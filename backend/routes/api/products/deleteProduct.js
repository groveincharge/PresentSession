const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const fileUpload = require('express-fileupload');
const {ensureAuthenticated} = require('./../../ensureAuthenticated');
const db = require('./../../../_helpers/db');
const Product = db.Product;

router.delete('/:productId', function(req, res, next) {
	const id = req.params.productId;
	Product.deleteOne({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			 message: 'Product Deleted',
			 request: {
			 	type: 'POST',
			 	url: 'http://localhost:7000/api/product/getByProductId',
			 	body: {name: 'String', price: 'Number'}
			 }
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
	});

    module.exports = router;