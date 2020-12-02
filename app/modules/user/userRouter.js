
const express = require('express');

const router = express.Router();

const userService = require('./userService');
const userServiceValidator = require('./userServiceValidator');
const { authenticate } = require('../../middleware/securityMiddleware');

router.post('/', userServiceValidator.validate('addUser'), userService.addUser);
router.get('/:userId', authenticate, userServiceValidator.validate('getUser'), userService.getUser);
router.get('/:userId/tokens', authenticate, userServiceValidator.validate('getUser'), userService.getUserTokens);


module.exports = router;
