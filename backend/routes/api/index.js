const express = require('express');
const router = express.Router();

router.use('/comments', require('./comments'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
//router.get('/services', require('./services'))

module.exports = router;