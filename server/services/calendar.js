var google = require('googleapis');
var key = require('../data/service-account-key.json');
var Promise = require('bluebird');

var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/calendar'],
  null
);

module.exports = Promise.promisify(jwtClient.authorize, {context: jwtClient})()
  .then(function(tokens) {
    return google.calendar({version: 'v3', auth: jwtClient});
  });
