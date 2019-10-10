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

    },
    async createRandomProfile(parent, args, ctx, info) {
        //TODO Check if admin
        
        const randomProfile = await ctx.db.mutation.createRandomProfile({
            data: {
                ...args
            }
        }, info);

        console.log(randomProfile);

        return randomProfile;

    }
};

module.exports = Mutations;
