const { forwardTo } = require('prisma-binding');
const Query = {
   stocks: forwardTo('db'),
};

module.exports = Query;
