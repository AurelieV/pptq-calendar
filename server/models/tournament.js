var calendarHelper = require('../../server/helpers/calendar');
var pmx = require('pmx');
var _ = require('lodash');
var app = require('../../server/pptq-calendar');
const getPublic = require("../helpers/getPublic");

module.exports = function(Tournament) {
  Tournament.observe('before save', function (ctx, next) {
    if (ctx.instance) {
      calendarHelper.createOrSave(app, ctx.instance)
        .then(function(googleEvent) {
          ctx.instance.googleId = googleEvent.id;
          pmx.emit('tournament:updateGoogle', googleEvent);
          next();
        })
        .catch(function (error) {
          pmx.emit('tournament:updateGoogleError', error);
          console.log("error", error);
          next();
        });
    } else if (ctx.currentInstance) {
      calendarHelper.createOrSave(app, _.merge(ctx.currentInstance, ctx.data))
        .then(function(googleEvent) {
          ctx.data.googleId = googleEvent.id;
          pmx.emit('tournament:updateGoogle', googleEvent);
          next();
        })
        .catch(function (error) {
          pmx.emit('tournament:updateGoogleError', error);
          next();
        });
    }
    //TODO: handle updateAll and multiple??
    //TODO: handle calendarId change and region change
  });

  Tournament.afterRemote("**", (ctx, data, next) => {
    if (ctx.result) {
      if(Array.isArray(ctx.result)) {
        ctx.result = ctx.result.map(t => getPublic.tournament(t.toJSON()))
      } else {
        ctx.result = getPublic.tournament(ctx.result.toJSON());
      }
    }
    next();
  });
};
