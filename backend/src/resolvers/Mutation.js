const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes} = require('crypto');
const { promisify } = require('util');

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
    },
    async requestReset(parent, args, ctx, info) {
        //Check if real user
        const user = await ctx.db.query.user({where: {email: args.email}});
        if (!user) {
            throw new Error(`No such user found for email ${args.email}`);
        }
        //Set reset token and expiry
        const randomBP = promisify(randomBytes);
        const resetToken = (await randomBP(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; //1 hour from now
        const res = await ctx.db.mutation.updateUser({
            where: {email: args.email},
            data: {
                resetToken,
                resetTokenExpiry
            }
        });

        return { message: 'Thanks!'};
        //Email them that reset token
    },
    async resetPassword(parent, args, ctx, info) {
        //check if passwords match
        const valid = args.password === args.confirmPassword;
        if (!valid) {
            throw new Error('Passwords do not match');
        }
        //check if it is a legit reset token
        const [user] = await ctx.db.query.users({
            where: {resetToken: args.resetToken, resetTokenExpiry_gte: Date.now() - 3600000}
        })
        if (!user) {
            throw new Error('This token is either invalid or expired');
        }
        //check if it is expired

        //hash new password
        const password = await bcrypt.hash(args.password, 10);
        //save the new password to the user and remove old reset token fields
        const updatedUser = await ctx.db.mutation.updateUser({
            where: {
                email: user.email
            },
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null
            }
        });
        //generate JWT
        const token = jwt.sign({userId: updatedUser.id}, process.env.APP_SECRET);
        //set JWT
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 //1 year
        });
        //return user
        return updatedUser;
    }
    
};

module.exports = Mutations;
