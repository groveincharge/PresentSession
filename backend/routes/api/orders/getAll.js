const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../../../_helpers/db');
const { ensureAuthenticated } = require('./../../ensureAuthenticated');
const Order = db.Order;


/* GET Orders list. */
router.get('/', (req, res, next) => {
        Order.find()
             .select('product quantity _id')
             .populate('product')
             .exec()
             .then(docs => {
             	console.log(docs);
             	res.status(200).json({
             		count: docs.length,
             		orders: docs.map(doc => {
             			return {
             				_id: doc._id,
             		   quantity: doc.quantity,
             		    product: doc.product,
                        request: {
         	       	       type: 'GET',
         	       	        url: 'http://localhost:7000/api/order/getAll' + doc._id
         	               }
             			}
             		})
             	})
             })
             .catch(err => {
             	res.status(500).json({
             		message: 'An error has occurred.',
             		error: err
             	})
             })
});

module.exports = router;