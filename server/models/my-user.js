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
     redirect: '/verified',
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
