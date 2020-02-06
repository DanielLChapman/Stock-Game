const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');
const axios = require('axios');

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
   },
   async stockSearch(parent, args, ctx, info) {
      let stock = {
         symbol: "BL",
         message: "",
         price: 0,
         opening: 0
      };
      let user = null;
      let apiKey = "";
      //check if logged in
      if (ctx.request.userId) {
         user = await ctx.db.query.user({
            where: { id: ctx.request.userId }
         }, info);
      };

      //if logged in, get their api key
      if (user) {
         apiKey = user.apikey;
      }
      // else use the free one
      else {
         apiKey = process.env.FREEAPIKEY;
      }
      // verify there are no special characters in symbol
      if(/[^a-zA-Z0-9]/.test(args.symbol)) {
         throw new Error('Invalid Symbol');
      }
      //make api call
      let res = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${args.symbol}&interval=5min&apikey=${apiKey}`);
      //verify stock
      if (res.data['Error Message']) {
         throw new Error('Possible Invalid SYMBOL, Please Double Check It Is A Real Stock Symbol');
      }
      
      let recent = res.data['Global Quote'];
      stock = {
         symbol: args.symbol,
         price: recent['05. price'],
         opening: recent['02. open']
      }
      //return stock
      return stock;
   }
};

module.exports = Query;
