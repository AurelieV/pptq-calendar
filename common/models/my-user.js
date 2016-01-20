var _ = require('lodash');

module.exports = function(myUser) {
  myUser.addRole = function(userId, role, next) {
  var Role = myUser.app.models.Role;
  var RoleMapping = myUser.app.models.RoleMapping;
  Role.findOne({where: {name: role}}
    , function(err, role) {
      if (err) return next(err);
      if (role == null) return next('Role not exist');
      RoleMapping.findOne({
        where: {
          roleId: role.id,
          principalId: userId
        }
      }
      , function(err, roleMapping) {
        if (err) return next(err);
        if (roleMapping != null) return next(null);

        return role.principals.create({
          principalType: RoleMapping.USER,
          principalId: userId
        }
        , function(err, principalAdded) {
          if (err) return next(err);
          myUser.find({where: {id: userId}, include: 'roles'}
          , function(err, users) {
            return next(err, users[0]);
          });
        });
      });
    });
  };

  myUser.removeRole = function(userId, role, next) {
  var Role = myUser.app.models.Role;
  var RoleMapping = myUser.app.models.RoleMapping;
  Role.findOne({where: {name: role}}
  , function(err, role) {
    if (err) return next(err);
    if (role == null) return next(null);
    RoleMapping.findOne({
      where: {
        roleId: role.id,
        principalId: userId
      }
    }
    , function(err, roleMapping) {
      if (err) return next(err);
      if (roleMapping == null) return next(null);

      roleMapping.destroy(function(err) {
        if (err) return next(err);
        myUser.findOne({
          where: {
            id: userId
          },
          include: 'roles'
        }
        , next);
      });
    });
  });
};

  myUser.findByRole = function(role, next) {
    var RoleMapping = myUser.app.models.RoleMapping;
    var MyUser = myUser.app.models.MyUser;
    var Role = myUser.app.models.Role;
    Role.findOne({where: {name: role}}, function(err, role) {
      if (err) return next(err);
      if (!role) return next(null, []);
    RoleMapping.find({
      where: {
        roleId: role.id,
        principalType: 'USER'
      }
    }
    , function(err, roleMappings) {
      if (err) throw err;
      var ids = _.map(roleMappings, 'principalId');
      MyUser.find({where: {id: {inq: ids}}}, next);
    });
    });
  };

  myUser.remoteMethod('addRole', {
      accepts: [
        {
          arg: 'userId',
          type: 'string'
        },
        {
          arg: 'role',
          type: 'string'
        }
      ],
      returns: {
        arg: 'user',
        type: 'object',
        root: true
      },
      http: {
        path: '/addRole',
        verb: 'post'
      }
  });

  myUser.remoteMethod('removeRole', {
    accepts: [
      {
        arg: 'userId',
        type: 'string'
      },
      {
        arg: 'role',
        type: 'string'
      }
    ],
    returns: {
      arg: 'user',
      type: 'object',
      root: true
    },
    http: {
      path: '/removeRole',
      verb: 'post'
    }
  });

  myUser.remoteMethod('findByRole', {
    accepts: {
      arg: 'role',
      type: 'string'
    },
    returns: {
      arg: 'users',
      type: '[object]'
    },
    http: {
      path: '/findByRole',
      verb: 'get'
    }
  });

};
