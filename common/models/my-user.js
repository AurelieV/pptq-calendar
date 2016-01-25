var _ = require('lodash');

module.exports = function(myUser) {
  //TODO: move this on a module? currently here if want to be visible in explorer
  myUser.remoteMethod('addRole', {
    accepts: [
      {
        arg: 'userId',
        type: 'string',
        required: true
      },
      {
        arg: 'role',
        type: 'string',
        required: true
      }
    ],
    returns: {}
    ,
    http: {
      verb: 'post'
    }
  });
  myUser.remoteMethod('removeRole', {
    accepts: [
      {
        arg: 'userId',
        type: 'string',
        required: true
      },
      {
        arg: 'role',
        type: 'string',
        required: true
      }
    ],
    returns: {}
    ,
    http: {
      verb: 'post'
    }
  });
  myUser.remoteMethod('findByRole', {
    accepts: {
      arg: 'role',
      type: 'string',
      required: true
    },
    returns: {
      arg: 'users',
      type: '[object]'
    },
    http: {
      verb: 'get'
    }
  });
};
