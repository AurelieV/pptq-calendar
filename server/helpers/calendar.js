var Promise = require('bluebird');
var moment = require('moment');

module.exports = {
  createOrSave: function(app, tournament) {
    if (!app.googleCalendar) {
      return Promise.reject(new Error('Calendar service not exist'));
    }
    var insert = Promise.promisify(app.googleCalendar.events.insert, {context: app.googleCalendar});
    var update = Promise.promisify(app.googleCalendar.events.update, {context: app.googleCalendar});
    var date = moment(tournament.date).format('YYYY-MM-DD');
    var options = {
      resource: {
        summary: tournament.town + ' - ' + tournament.format + ' - ' + tournament.organizer,
        description: tournament.information,
        location: tournament.adress,
        end: {date: date},
        start: {date: date}
      }
    };
    if (!tournament.regionId) {
      return Promise.reject(new Error('Region not defined'));
    }
    return app.models.Region.findById(tournament.regionId)
      .then(function (region) {
        if (!region)
          return Promise.reject(new Error('Region not defined'));

        options.calendarId = region.googleId;

        if (!options.calendarId)
          return Promise.reject(new Error('Region do not have calendar'));

        if (tournament.googleId) {
          options.eventId = tournament.googleId;
          return update(options);
        } else {
          return insert(options);
        }
      });
  }
};
