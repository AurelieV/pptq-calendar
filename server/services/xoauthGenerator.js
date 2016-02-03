var xoauth2 = require('xoauth2');
var key = require('../data/xoauthGmailKey.json');

module.exports = xoauth2.createXOAuth2Generator({
  user: 'pptq.calendar@gmail.com',
  clientId: key.client_id,
  clientSecret: key.client_secret,
  refreshToken: key.refresh_token
});
