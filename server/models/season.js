const getPublic = require("../helpers/getPublic");

module.exports = function(Season) {
  Season.afterRemote("**", (ctx, data, next) => {
    if (ctx.result) {
      if(Array.isArray(ctx.result)) {
        ctx.result = ctx.result.map(s => getPublic.season(s.toJSON()))
      } else {
        ctx.result = getPublic.season(ctx.result.toJSON());
      }
    }
    next();
  });
};
