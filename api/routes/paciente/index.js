var express = require('express');
var router = express.Router();

var paciente = require('../../controllers/paciente/pacienteController');

router.put('/paciente', paciente.novoPaciente);
module.exports = router;
