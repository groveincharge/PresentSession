const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../../../_helpers/db');
const { ensureAuthenticated } = require('./../../ensureAuthenticated');
const Order = db.Order;
const Product = db.Product;

router.get('/:orderId', function(req, res, next) {
	const id = req.params.orderId;
	Order.findById(id)
	 .populate('product')
	.exec()
    .then(order => {
    	if(!order){
            res.status(404).json({
            	message: 'Order Not Found'
            })
    	};
    	res.status(200).json({
                    order: order,
                  request: {
                  	   type: 'GET',
                  	   url: 'http://localhost:4000/api/order/getByOrderId '+order._id
                  }
    	  });
  })
    .catch(err => {
    	console.log(err);
        res.status(500).json({error: err })
     });
});

   module.exports = router;