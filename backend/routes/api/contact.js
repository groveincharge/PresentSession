const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Contact = require('./../../models/Contact');
const {authmiddleware} = require('./../auth');
//const Contact = mongoose.model('Contact');


/* GET contacts listing. */
router.get('/', (req, res, next) => {
        Contact.find()
               .select('firstName lastName email info _id')
               .exec()
               .then(result => {
               	console.log(result);
               	  res.status(200).json({
               	  	  message: 'Contact List.',
               	  	  count: result.length,
               	  	   contact: result.map(doc => {
        		 	    return{
        		 		firstName: doc.firstName,
        		 	    lastName: doc.lastName,
        		 	      email: doc.email,
        		 	      info: doc.info,
        		 	        _id: doc._id,
        		 	           request: {
        		 	           	   type: 'GET',
        		 	           	   url: 'http://localhost:7000/addContact/' + doc._id
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

router.get('/:contactId', authmiddleware, function(req, res, next) {
	const id = req.params.contactId;
	Contact.findById(id)
	.exec()
    .then(docs => {
    	console.log(docs);
    	res.status(200).json(docs);
  })
    .catch(err => {
    	console.log(err);
        res.status(500).json({error: err })
     });
});

router.post('/', authmiddleware, (req, res) => {

      console.log('Inside POST /api/contact callback\n')
       console.log(`req.session.cookie ${JSON.stringify(req.session.cookie)}\n`);
       console.log(`req.session ${JSON.stringify(req.session)}\n`);
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
      console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
      console.log(`req.session.user: ${JSON.stringify(req.session.user)}\n`);
  console.log(`req.user from ./api/contact POST route ${req.user}\n`)

const contact = new Contact({
                 _id: new mongoose.Types.ObjectId(),
                 firstName: req.body.firstName,
                 lastName: req.body.lastName,
                 email: req.body.email,
                 info: req.body.info
    });

   contact.save().then(result => {
	console.log(result);
	res.status(201).json(result);
       })
.catch(err => {
	console.log(err);
	res.status(500).json({ error: err })
    });
});

router.delete('/:contactId', authmiddleware, function(req, res, next) {
	const id = req.params.contactId;
	Contact.deleteOne({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
	});

router.patch("/:contactId", authmiddleware, function(req, res, next) {
	const id = req.params.contactId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Contact.update({_id: id}, { $set: updateOps})
	.exec()
	.then(result =>{
		console.log(result);
		res.status(200).json(result);
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({error: err});
	})
});

module.exports = router; 