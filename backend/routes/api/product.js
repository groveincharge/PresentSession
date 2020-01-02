const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const Product = require("./../../models/Product");
const fileUpload = require('express-fileupload');
const {authmiddleware} = require('./../auth');

router.get('/', authmiddleware, (req, res, next) => {
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
                      url: 'http://localhost:7000/api/product/' + doc._id
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

router.get('/:productId', authmiddleware, function(req, res, next) {

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

//  POST Upload Endpoint
router.post('/', authmiddleware, (req, res) => {
    console.log('Inside POST /api/product callback');
	console.log(`req.session.id: ${JSON.stringify(req.session.id)}`);
	console.log(`req.session from POST /api/product route ${JSON.stringify(req.session)}`);
	console.log(`req.isAuthenticated from POST /api/product route ${req.isAuthenticated()}`);
	console.log(`req.user from POST /api/product route ${req.user}`);
	console.log(req.body)
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.productImage;
  console.log(file)
  file.mv(`/Users/Grover/homefolder/workstation/PresentSession/frontend/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    const newProduct = new Product({
                 _id: new mongoose.Types.ObjectId(),
                 name: req.body.name,
                 price: req.body.price,
                 productImage: file.name,
                 productPath: `/uploads/${file.name}`,

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
         	       	       url: 'http://localhost:7000/api/product/' + result._id
         	               }
                        }
	                 })
                })
  });
});

router.delete('/:productId', authmiddleware, function(req, res, next) {
	const id = req.params.productId;
	Product.deleteOne({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			 message: 'Product Deleted',
			 request: {
			 	type: 'POST',
			 	url: 'http://localhost:7000/api/product/',
			 	body: {name: 'String', price: 'Number'}
			 }
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
	});

router.patch("/:productId", authmiddleware, function(req, res, next) {
	const id = req.params.productId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({_id: id}, { $set: updateOps})
	.exec()
	.then(result =>{
		res.status(200).json({
			message: 'Product Update',
			request: {
				type: 'GET',
				url: 'http://localhost:7000/api/product/' + id
			}
		});
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({error: err});
	})
});

module.exports = router;