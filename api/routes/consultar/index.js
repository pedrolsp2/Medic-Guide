var express = require('express');
var router = express.Router();
var middlware = require('../../middleware/modules');

var consultar = require('../../controllers/consultar/consultarController');

router.put('/consultar', [middlware.getUser], consultar.createConsultar);
module.exports = router;
