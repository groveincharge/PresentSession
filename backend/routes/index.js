const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));
router.get('/', require('./home'));

module.exports = router;