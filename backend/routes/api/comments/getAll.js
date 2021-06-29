const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../../../_helpers/db');
const ensureAuthenticated = require('./../../ensureAuthenticated');
const Comment = db.Comment;



/* GET contacts listing. */
router.get('/', (req, res, next) => {
        Comment.find()
               .select('refId comment _id')
               .exec()
               .then(result => {
               	console.log(result);
               	  res.status(200).json({
               	  	  message: 'Contact List.',
               	  	  count: result.length,
               	  	   contact: result.map(doc => {
        		 	    return{
        		 		refId: doc.refId,
        		 	      comment: doc.comment,
        		 	        _id: doc._id,
        		 	           request: {
        		 	           	   type: 'GET',
        		 	           	   url: 'http://localhost:7000/api/comments/getAll' + doc._id
        		 	           }
        		 	     }
        		     })
               	  })
               })
               .catch(err => {
               	res.status(500).json({
                      message: 'List failed to load.',
                      error: err
               	})
              })
});

  module.exports = router;