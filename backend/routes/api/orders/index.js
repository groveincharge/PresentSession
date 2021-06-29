const express = require('express');
const router = express.Router();

router.use('/', require('./addOrder'));
router.use('/getAll', require('./getAll'));
router.use('/getByOrderId/:id', require('./getByOrderId'));
router.use('/deleteOrder/:id', require('./deleteOrder'));
router.use('/updateOrder/:id', require('./updateOrder'));

module.exports = router;