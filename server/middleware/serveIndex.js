var path = require('path');

module.exports = function () {
  "use strict";
  return function (req, res) {
    res.sendFile(path.resolve('www', 'index.html'));
  }
};
