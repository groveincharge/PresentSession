const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../../../_helpers/db');
const { ensureAuthenticated } = require('./../../ensureAuthenticated');
const Order = db.Order;
const Product = db.Product;

router.post('/', (req, res) => {

	console.log('Inside POST /api/order callback');
	console.log(`req.session.id: ${JSON.stringify(req.session.id)}`);
	console.log(`req.session from POST /api/order route ${JSON.stringify(req.session)}`);
	console.log(`req.isAuthenticated from POST /api/order route ${req.isAuthenticated()}`);
	 console.log(`req.user from POST /api/order route ${req.user}`);
   console.log(`req.file from inside POST /api/order router ${JSON.stringify(req.file)}`);

	  Product.findById(req.body.product)
	       .then(product => {
	       	if(!product){
          return res.status(404).json({
          	           message: 'Product Not Found'
          })
	       	};
             const order = new Order({
             	   _id: mongoose.Types.ObjectId(),
              quantity: req.body.quantity,
               product: req.body.product
                });

             return order.save()
              })
                  .then(result => {
	                    res.status(201).json({
	         	             message: 'Item Order Successful',
	         	        createdOrder: {
	         	     	         _id: result._id,
	         	             product: result.product,
                            quantity: result.quantity
	         	        },
                     request: {type: 'POST',
                               url: 'http://localhost:4000/api/order/addOrder ' + result._id
                             }
	                   })   
	       })
	        .catch(err => {
	       	  res.status(500).json({
	       	  	message: 'Product Not Found',
	       	  	error: err
	       	  })
	       })
});

   module.exports = router;