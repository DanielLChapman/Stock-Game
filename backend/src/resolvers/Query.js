const { forwardTo } = require('prisma-binding');

const Query = {
   stocks: forwardTo('db'),
   randomProfiles: forwardTo('db'),

};

module.exports = Query;
