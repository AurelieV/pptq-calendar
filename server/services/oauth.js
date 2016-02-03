var google = require('googleapis');
var key = require('../data/service-account-key.json');
var Promise = require('bluebird');

var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://mail.google.com/'],
  null
);

module.exports = Promise.promisify(jwtClient.authorize, {context: jwtClient})()
  .then(function(tokens) {
    return jwtClient;
  })
  .catch(function(error) {
    console.log('error jwt', error);
    return null;
  });



