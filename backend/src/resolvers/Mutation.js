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
    async signin(parent, {email, password}, ctx, info) {
        //check if there is a user with that email
        const user = await ctx.db.query.user({where: {email}});
        if (!user) {
            throw new Error(`No such user found for email ${email}`);
        }
        //check if their password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid Password');
        }
        //generate the JWT
        const token = jwt.sign({
            userId: user.id
        }, process.env.APP_SECRET);
        //set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 //1 year
        });
        //return the user
        
        return user;
    },
    async signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {
            message: 'Goodbye'
        };
    }
    
};

module.exports = Mutations;
