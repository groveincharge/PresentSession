const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const fileUpload = require('express-fileupload');
const {ensureAuthenticated} = require('./../../ensureAuthenticated');
const db = require('./../../../_helpers/db');
const Product = db.Product;

//  POST Upload Endpoint
router.post('/', (req, res) => {
    console.log('Inside POST /api/product callback');
	console.log(`req.session.id: ${JSON.stringify(req.session.id)}`);
	console.log(`req.session from POST /api/product route ${JSON.stringify(req.session)}`);
	console.log(`req.isAuthenticated from POST /api/product route ${req.isAuthenticated()}`);
	console.log(`req.user from POST /api/product route ${req.user}`);
	console.log('req.body',req.body);
	console.log('req.files',req.files)



    const newProduct = new Product({
                 _id: new mongoose.Types.ObjectId(),
                 name: req.body.name,
                 price: req.body.price
                });

    newProduct.save()
          .then(result => {
          		res.status(201).send({
         createdProduct: {
         	        name: result.name,
         	        price: result.price,
                  productImage: result.productImage,
                   productPath: result.productPath,
         	        _id: result._id,
         	       request: {
         	       	       type: 'GET',
         	       	       url: 'http://localhost:7000/api/product/addProduct' + result._id
         	               }
                        }
	                 })
                })
           });

           module.exports = router;