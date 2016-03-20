"use strict";

var server = require('../pptq-calendar');
var db = server.datasources.db;

db.automigrate()
  .then(function() {
    console.log('Database create successfully !');
    process.exit(0);
  })
  .catch(function(err) {
    console.log('Error when updating the database');
    console.log('ERR: ', err);
    process.exit(1);
  });
