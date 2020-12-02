
const express = require('express');

const router = express.Router();

const accountService = require('./accountService');
const accountValidator = require('./accountServiceValidator');

router.post('/login', accountValidator.validate('login'), accountService.login);

module.exports = router;
