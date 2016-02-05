var calendar = require('../services/calendar');
var pmx = require('pmx');

module.exports = function (app, next) {
  calendar.then(function (googleCalendar) {
      app.googleCalendar = googleCalendar;
    })
    .catch(function (error) {
      pmx.emit('googleCalendar:initError', error);
    })
    .finally(function () {
      next();
    });
};
