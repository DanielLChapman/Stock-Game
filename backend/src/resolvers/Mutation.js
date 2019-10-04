const Mutations = {
   async createStock(parent, args, ctx, info) {
        //TODO Check if admin
        
        const stock = await ctx.db.mutation.createStock({
            data: {
                ...args
            }
        }, info);

        console.log(stock);

        return stock;

    }
};

module.exports = Mutations;
