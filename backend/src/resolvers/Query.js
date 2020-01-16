const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

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
   },
   async users(parent, args, ctx, info) {
      //check if logged in
      if (!ctx.request.userId) {
         throw new Error('You must be logged in');
      };
      //make sure user have permission to view all users
      hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
      //query all users
      return ctx.db.query.users({}, info);
   }
};

module.exports = Query;
