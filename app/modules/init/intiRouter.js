const express = require('express');

const router = express.Router();

const initService = require('./initService');
/* GET home page. */
router.get('/', initService.init);

module.exports = router;
