var user = require('./user');
var paciente = require('./paciente');
var consultar = require('./consultar');
var auth = require('./auth');

module.exports = (app) => {
  app.use('/api', user, auth, paciente, consultar);
};
