const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../../../_helpers/db');
const { ensureAuthenticated } = require('./../../ensureAuthenticated');
const Order = db.Order;
const Product = db.Product;

router.delete('/:orderId', function(req, res, next) {
	const id = req.params.orderId;
	Order.deleteOne({ _id: id })
	.exec()
	.then(result => {
		  console.log(result);
		res.status(200).json({
			     message: 'Order Deleted',
			     orderId: id,
                  request: {
                  	   type: 'POST',
                  	    url: 'http://localhost:7000/api/order/deleteOrder' + id
                        }
		             });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
	});

    module.exports = router;