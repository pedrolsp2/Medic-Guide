var express = require('express');
var router = express.Router();

var paciente = require('../../controllers/paciente/pacienteController');

router.get('/paciente', paciente.buscaPaciente);
router.put('/paciente', paciente.novoPaciente);
router.delete('/paciente', paciente.deletPacient);
router.patch('/paciente', paciente.editPacient);
module.exports = router;
