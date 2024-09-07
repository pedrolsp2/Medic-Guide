var express = require('express');
var router = express.Router();
var middlware = require('../../middleware/modules');

var user = require('../../controllers/user/userController');

router.get('/user', user.listUsers);

router.put('/user', [middlware.validate], user.createUser);
router.post('/user', [middlware.validate], user.listUser);
module.exports = router;
