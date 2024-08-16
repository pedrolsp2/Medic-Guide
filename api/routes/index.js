var user = require('./user');
var paciente = require('./paciente');
var auth = require('./auth');

module.exports = (app) => {
  app.use('/api', user, auth, paciente);
};
