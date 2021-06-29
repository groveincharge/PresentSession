const express = require('express');
const router = express.Router();

router.use('/', require('./addComment'));
router.use('/getAll', require('./getAll'));
router.use('/getByCommentId/:id', require('./getByCommentId'));
router.use('/deleteComment/:id', require('./deleteComment'));
router.use('/updateComment/:id', require('./updateComment'));

module.exports = router;