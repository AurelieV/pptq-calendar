module.exports = function createAdmin(app) {
  var User = app.models.MyUser;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  var adminData = {username: 'admin', email: 'orwel.violette@gmail.com', password: 'admin'};

  User.findOrCreate( {where: {username: 'admin'}}, adminData, function(err, admin) {
    if (err) throw err;
    console.log('admin create or find', admin);

    //create the admin role
    Role.findOrCreate({where: {name: 'admin'}}, {name: 'admin'}, function(err, adminRole) {
      if (err) throw err;

      // give admin role to the admin
      var roleMappingData = {principalType: RoleMapping.USER, principalId: admin.id};
      adminRole.principals({where:roleMappingData}, function(err, principal) {
        if (err) throw err;
        if (principal.length > 0) {
          console.log('admin has already role');
          return;
        }
        console.log('add admin role');
        adminRole.principals.create(roleMappingData, function(err, principal) {
          if (err) throw err;
        });
      });
    });
  });
};
