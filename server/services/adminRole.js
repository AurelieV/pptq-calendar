var Promise = require('bluebird');
var _ = require('lodash');

//@TODO: add option for user, admin
module.exports = function init(app, options) {
  if (!app) return new Promise.reject(new Error('App is not defined'));

  var ACL = app.models.ACL;
  var Role = app.models.Role;
  var User = app.models.MyUser;
  var RoleMapping = app.models.RoleMapping;

  // Add role to user
  User.hasMany(Role, {foreignKey: 'principalId', through: RoleMapping, keyThrough: 'roleId'});

  // Disable end point for role
  User.disableRemoteMethod('__get__roles', false);
  User.disableRemoteMethod('__create__roles', false);
  User.disableRemoteMethod('__destroyById__roles', false); // DELETE
  User.disableRemoteMethod('__updateById__roles', false); // PUT

  // Add method addRole to User
  User.addRole = function(userId, role, next) {
    return Role.findOne({where: {name: role}})
      .then(function(role) {
        if (!role) {
          next(new Error('No role found'));
          return Promise.reject('No role found');
        }
        return RoleMapping.findOrCreate({principalType: RoleMapping.USER, principalId: userId, roleId: role.id});
      })
      .then(function (data) {
        next(null);
      })
      .catch(function (error) {
        next(error);
        return Promise.reject(error)
      })
  };

  // Add method removeRole to User
  User.removeRole = function(userId, role, next) {
    return Role.findOne({where: {name: role}})
      .then(function(role) {
        if (!role) {
          next(new Error('No role found'));
          return Promise.reject('No role found');
        }
        return RoleMapping.findOne({where:{principalType: RoleMapping.USER, principalId: userId, roleId: role.id}});
      })
      .then(function (roleMapping) {
        if (!roleMapping) return;
        return roleMapping.destroy();
      })
      .then(function (data) {
        next(null);
      })
      .catch(function (error) {
        next(error);
        return Promise.reject(error)
      })
  };

  // Add method findByRole to User
  User.findByRole = function(role, next) {
    return Role.findOne({where: {name: role}})
      .then(function(role) {
        if (!role) {
          next(new Error('No role found'));
          return Promise.reject('No role found');
        }
        return RoleMapping.find({where: {roleId: role.id, principalType: 'USER'}});
      })
      .then(function (roleMappings) {
        var ids = _.uniq(_.map(roleMappings, 'principalId'));
        return User.find({where: {id: {inq: ids}}});
      })
      .then(function (users) {
        next(null, users);
      })
      .catch(function (error) {
        next(error);
        return Promise.reject(error)
      })
  };

  // Add ACL for role managing by admin
  var pUserACL = Promise.all([
    ACL.findOrCreate({
      model: 'MyUser',
      accessType: ACL.EXECUTE,
      principalType: ACL.ROLE,
      principalId: 'admin',
      permission: ACL.ALLOW,
      property: 'addRole'
    })
    , ACL.findOrCreate({
      model: 'MyUser',
      accessType: ACL.EXECUTE,
      principalType: ACL.ROLE,
      principalId: 'admin',
      permission: ACL.ALLOW,
      property: 'removeRole'
    })
    , ACL.findOrCreate({
      model: 'MyUser',
      accessType: ACL.READ,
      principalType: ACL.ROLE,
      principalId: 'admin',
      permission: ACL.ALLOW,
      property: 'findByRole'
    })
    , ACL.findOrCreate({
      model: 'MyUser',
      accessType: ACL.EXECUTE,
      principalType: ACL.ROLE,
      principalId: 'admin',
      permission: ACL.ALLOW,
      property: 'updateAttributes'
    })
    , ACL.findOrCreate({
      model: 'MyUser',
      accessType: ACL.EXECUTE,
      principalType: ACL.ROLE,
      principalId: 'admin',
      permission: ACL.ALLOW,
      property: 'deleteById'
    })
    , ACL.findOrCreate({
      model: 'MyUser',
      accessType: 'READ',
      principalType: ACL.ROLE,
      principalId: 'admin',
      permission: ACL.ALLOW,
      property: 'find'
    })
    , ACL.findOrCreate({
      model: 'MyUser',
      accessType: 'READ',
      principalType: ACL.ROLE,
      principalId: 'admin',
      permission: ACL.ALLOW,
      property: 'findById'
    })
  ]);

  // Create admin role
  var pAdminRole = Role.findOrCreate({name: 'admin'}).then(function (data) {return data[0]});
  // Create admin user
  var pAdminUser = User.findOrCreate({where: {username: 'admin'}},
    {
      username: 'admin',
      email: 'pptq.calendar@gmail.com',
      password: 'admin'
    }).then(function (data) {return data[0]});

  // Add role admin to user admin
  var pNominateAdmin = Promise.join(pAdminRole, pAdminUser, function (adminRole, adminUser) {
    return RoleMapping.findOrCreate({principalType: RoleMapping.USER, principalId: adminUser.id, roleId: adminRole.id});
  });

  return Promise.all([pNominateAdmin, pUserACL]);
};
