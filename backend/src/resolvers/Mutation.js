const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

    },
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        //hash passwords

        const password = await bcrypt.hash(args.password, 10);

        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: {set: ['USER'] }
            }
        }, info);
        //create JWT for them

        const token = jwt.sign({
            userId: user.id
        }, process.env.APP_SECRET);

        //set jwt as cookie on the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 //1 year
        });

        return user;
    },
    
};

module.exports = Mutations;
