const getPublic = require("../helpers/getPublic");

module.exports = function(Region) {
  Region.afterRemote("**", (ctx, data, next) => {
    if (ctx.result) {
      if(Array.isArray(ctx.result)) {
        ctx.result = ctx.result.map(r => getPublic.region(r.toJSON()))
      } else {
        ctx.result = getPublic.region(ctx.result.toJSON());
      }
      next();
    }
  });
};
