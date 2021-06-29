const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const fileUpload = require('express-fileupload');
const {authmiddleware} = require('./../../ensureAuthenticated');
const db = require('./../../../_helpers/db');
const Product = db.Product;

router.get('/', (req, res, next) => {
		console.log('Inside GET /api/product callback');
	console.log(`req.session.id: ${JSON.stringify(req.session.id)}`);
	console.log(`req.session from GET /api/product route ${JSON.stringify(req.session)}`);
	console.log(`req.isAuthenticated from GET /api/product route ${req.isAuthenticated()}`);
	 console.log(`req.user from GET /api/product route ${req.user}`);

        Product.find()
        .select('name price productImage productPath _id')
	    .exec()
        .then(result => {
			res.status(200).json({
			  count: result.length,
		productList: result.map(doc => {
           return{
           name: doc.name,
           price: doc.price,
           prodPath: doc.productPath,
           prodImage: doc.productImage,
               _id: doc._id,
                  request: {
                      type: 'GET',
                      url: 'http://localhost:7000/api/product/getAll' + doc._id
                  }
            }
          })
			})
        })
     .catch(err => {
                 res.status(500).json({
                         error: err
                          })
              });
   });

   module.exports = router;