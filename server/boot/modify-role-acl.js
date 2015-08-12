module.exports = function modifyRoleAcl(app) {
  var ACL = app.models.ACL;
  ACL.create({
    model: 'User',
    property: '*',
    accessType: '*',
    principalType: 'ROLE',
    principalId: 'admin',
    permission: 'ALLOW'
  }, function (err, acl) { // Create the acl
    if (err) console.error(err);
  });

  ACL.create({
    model: 'Role',
    property: '*',
    accessType: '*',
    principalType: 'ROLE',
    principalId: 'admin',
    permission: 'ALLOW'
  }, function (err, acl) { // Create the acl
    if (err) console.error(err);
  });

  ACL.create({
    model: 'RoleMapping',
    property: '*',
    accessType: '*',
    principalType: 'ROLE',
    principalId: 'admin',
    permission: 'ALLOW'
  }, function (err, acl) { // Create the acl
    if (err) console.error(err);
  });
};
