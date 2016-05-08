var _ = require('lodash');
var pmx = require('pmx');
var path = require('path');
// var validators = require('../helpers/validators');

module.exports = function(myUser) {
  myUser.validatesLengthOf('username', {min: 5, max: 20, message: {min: 'Username is too short', max: 'Username is too short'}});
  // TODO: make a PR to loopback to be able to use validator correctly
  var validator = function(err) {
    if (this.firstname && this.firstname.length > 50) {
      err('firstname');
    }
    if (this.lastname && this.lastname.length > 50) {
      err('lastname');
    }
  };
  myUser.validate('firstname', validator, {message: {firstname: 'Firstname too long', lastname: 'Lastname too long'}});

  myUser.afterRemote('create', function(context, user, next) {
   pmx.emit('user:create', user);

   var options = {
     type: 'email',
     to: user.email,
     from: 'noreply@pptq-calendar.com',
     subject: 'Merci de vous être inscrit sur PPTQ Calendar',
     text: 'Pour valider votre compte, veuillez vous rendre à cette adresse {href}',
     user: user,
     redirect: encodeURIComponent('/#/login/verified'),
     host: process.env.NODE_ENV === 'production' ? 'pptq-calendar.com' : 'localhost',
     port: process.env.NODE_ENV === 'production' ? 80 : 3000,
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
};
