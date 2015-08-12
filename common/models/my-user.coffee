module.exports = (myUser) ->
  myUser.addRole = (userId, role, next) ->
    Role = myUser.app.models.Role
    RoleMapping = myUser.app.models.RoleMapping
    Role.findOne
      where:
        name: role
    , (err, role) ->
      return next(err) if (err)
      return next('Role not exist') unless role?
      RoleMapping.findOne
        where:
          roleId: role.id
          principalId: userId
      , (err, roleMapping) ->
        return next(err) if (err)
        return next(null) if roleMapping?
        role.principals.create
          principalType: RoleMapping.USER
          principalId: userId
        , (err, principalAdded) ->
            return next(err) if err
            myUser.find
              where:
                id: userId
              include: 'roles'
            , next

    myUser.removeRole = (userId, role, next) ->
      Role = myUser.app.models.Role
      RoleMapping = myUser.app.models.RoleMapping
      Role.findOne
        where:
          name: role
      , (err, role) ->
        return next(err) if (err)
        console.log 'err3', err
        return next(null) unless role?
        RoleMapping.findOne
          where:
            roleId: role.id
            principalId: userId
        , (err, roleMapping) ->
          return next(err) if (err)
          console.log 'err2', err
          return next(null) unless roleMapping?
          roleMapping.destroy (err) ->
            console.log 'err', err
            return next(err) if err
            myUser.find
              where:
                id: userId
              include: 'roles'
            , next

  myUser.remoteMethod 'addRole',
    accepts: [
      arg: 'userId'
      type: 'string'
    ,
      arg: 'role'
      type: 'string'
    ]
    returns:
      arg: 'user'
      type: 'object'
    http:
      path: '/addRole'
      verb: 'post'

  myUser.remoteMethod 'removeRole',
    accepts: [
      arg: 'userId'
      type: 'string'
    ,
      arg: 'role'
      type: 'string'
    ]
    returns:
      arg: 'user'
      type: 'object'
    http:
      path: '/removeRole'
      verb: 'post'
