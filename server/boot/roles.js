const Promise = require('bluebird');

module.exports = function (app, next) {
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  const judge_p = Role.findOrCreate({name: 'judge'});
  const admin_p = Role.findOrCreate({name: 'admin'});
  Promise.join(judge_p, admin_p, (judge, admin) => {
    return RoleMapping.findOrCreate({
      principalType: RoleMapping.ROLE,
      principalId: admin[0].id,
      roleId: judge[0].id
    });
  })
  .then(() => next(null))
  .catch(next);
};
