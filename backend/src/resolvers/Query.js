const { forwardTo } = require('prisma-binding');

const Query = {
   stocks: forwardTo('db'),
   stock: forwardTo('db'),
   stocksConnection: forwardTo('db'),
   randomProfiles: forwardTo('db'),
   me(parent, args, ctx, info) {
      //check if there is a user ID
      if (!ctx.request.userId) {
         return null;
      };
      return ctx.db.query.user({
         where: { id: ctx.request.userId }
      }, info);
   }
};

module.exports = Query;
