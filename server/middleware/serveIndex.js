var path = require('path');

module.exports = function () {
  "use strict";
  return function (req, res) {
      res.sendFile("index.html", {root: __dirname + "/../../dist"});
  }
};
