module.exports = function createRoles(app) {
  var Role = app.models.Role;
  Role.findOrCreate({where: {name: 'admin'}}, {name: 'admin'}, function (err, adminRole) {
    if (err) throw err;
    Role.findOrCreate({where: {name: 'judgeTwo'}}, {name: 'judgeTwo'}, function (err, judgeTwoRole) {
      if (err) throw err;
    });
  });
};
