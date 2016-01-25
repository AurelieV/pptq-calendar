var adminRole = require('../services/adminRole');
var Promise = require('bluebird');
var roles = ['judgeTwo'];

module.exports = function (app, next) {
  var Role = app.models.Role;

  adminRole(app, {})
  .then(function () {
    return Promise.map(roles, function(role) {
      return Role.findOrCreate({name: role});
    });
  })
  .then(function () {
    next(null)
  })
  .catch(function (error) {
    next(error)
  });
};
