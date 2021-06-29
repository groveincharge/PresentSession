const express = require('express');
const router = express.Router();

router.use('/', require('./addProduct'));
router.use('/getAll', require('./getAll'));
router.use('/getByProductId/:id', require('./getByProductId'));
router.use('/deleteProduct/:id', require('./deleteProduct'));
router.use('/updateProduct/:id', require('./updateProduct'));

module.exports = router;