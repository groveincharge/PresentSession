const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const fileUpload = require('express-fileupload');
const {ensureAuthenticated} = require('./../../ensureAuthenticated');
const db = require('./../../../_helpers/db');
const Product = db.Product;

router.get('/:productId', function(req, res, next) {

	const id = req.params.productId;
	Product.findById(id)
	.select('name price productImage _id')
	.exec()
    .then(doc => {
    	console.log(doc);
    	if(doc){
    	res.status(200).json({
    		   product: doc,
    		   request: {
    		   	    type: 'GET',
    		   	    url: 'http://localhost:7000/api/product/' + product._id
    		   }
    	});
       }
  })
    .catch(err => {
    	console.log(err);
        res.status(500).json({error: err })
     });
});

module.exports = router;