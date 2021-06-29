const express = require('express');
const router = express.Router();

router.use('/', require('./login'));
router.use('/register', require('./register'));
router.use('/getByUserId/:id', require('./getByUserId'));
router.use('/deleteUser/id', require('./deleteUser'));
router.use('/updateUser/:id', require('./updateUser'));
router.use('/updateUser/:id', require('./updateUser'));
router.use('/logout', require('./logout'));

module.exports = router;