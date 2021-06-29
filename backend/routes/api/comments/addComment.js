const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./../../../_helpers/db');
const ensureAuthenticated = require('./../../ensureAuthenticated');
const Comment = db.Comment;

router.post('/', (req, res) => {

    console.log('Inside POST /api/contact callback\n')
     console.log(`req.session.cookie ${JSON.stringify(req.session.cookie)}\n`);
     console.log(`req.session ${JSON.stringify(req.session)}\n`);
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}\n`);
    console.log(`req.session.id: ${JSON.stringify(req.session.id)}\n`);
    console.log(`req.session.user: ${JSON.stringify(req.session.user)}\n`);
console.log(`req.user from ./api/contact POST route ${req.user}\n`)

const comment = new Comment({
               _id: new mongoose.Types.ObjectId(),
               refId: req.body.refId,
               comment: req.body.comment
  });

 comment.save().then(result => {
  console.log(result);
  res.status(201).json(result);
     })
.catch(err => {
  console.log(err);
  res.status(500).json({ error: err })
  });
});

module.exports = router;