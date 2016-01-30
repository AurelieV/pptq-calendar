var _ = require('lodash');
var pmx = require('pmx');
var path = require('path');

module.exports = function(myUser) {
  myUser.afterRemote('create', function(context, user, next) {
    pmx.emit('user:create', user);

    var options = {
      type: 'email',
      to: user.email,
      from: 'noreply@pptq-calendar.com',
      subject: 'Merci de vous être inscrit sur PPTQ Calendar',
      text: 'Pour valider votre compte, veuillez vous rendre à cette adresse {href}',
      user: user,
      host: 'pptq-calendar.com',
      template: path.resolve(path.join(__dirname, '..', '..', 'templates', 'verify.ejs'))
    };

    user.verify(options)
    .then(function (data) {
      pmx.emit('user:verifySuccess', user);
      next(null)
    })
    .catch(function (error) {
      pmx.emit('user:verifyError', error);
      next(error);
    })
  });

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
