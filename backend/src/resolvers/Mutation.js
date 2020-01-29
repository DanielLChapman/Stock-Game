const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes} = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');
const axios = require('axios');

const Mutations = {
   async createStock(parent, args, ctx, info) {
        //TODO Check if admin
        //check if logged in 
        if (!ctx.request.userId) {
            throw new Error('You must be logged in');
         };
        //query current user
         const currentUser = await ctx.db.query.user({
             where: {
                 id: ctx.request.userId
             }
         }, info);
        //check if they have permissions to do thia
        hasPermission(currentUser, ['ADMIN', 'STOCKCREATE']);
        //find grouping
        let foundLastGrouping = false;
        let grouping = 0, i = 0;
        while(!foundLastGrouping) {
            const stocks = await ctx.db.query.stocks({ 
                where: {
                    grouping: i
                }
            }, info);

            if (stocks.length < 20) {
                foundLastGrouping = true;
                grouping = i;
            } else {
                i++;
            }
        }

        const stock = await ctx.db.mutation.createStock({
            data: {
                ...args,
                grouping
            }
        }, info);

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

        const mailRes = await transport.sendMail({
            from: 'admin@localhosting.com',
            to: user.email,
            subject: 'Your Password Reset Token',
            html: makeANiceEmail(`Your Password Reset Token is her! \n\n <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here To Reset</a>`)
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
    },
    async updateInformation(parent, args, ctx, info) {

        args.email = args.email.toLowerCase();
        
        if (!ctx.request.userId) {
           throw new Error('You must be logged in');
        };

        let currentUser = await ctx.db.query.user({
            where: {
                id: ctx.request.userId
            }
        });

        //verify data
        if (args.email.length === 0) {throw new Error('Email Cannot Be Empty')};
        if (args.name.length === 0) {throw new Error('Name Cannot Be Empty')};
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let result = re.test(args.email);
        if (!result) {
            throw new Error('Email Is Invalid');
        }

        const updatedUser = await ctx.db.mutation.updateUser({
            where: {
                email: currentUser.email
            },
            data: {
                email: args.email,
                name: args.name
            }
        });

        

        return updatedUser;



    },
    async updatePermissions(parent, args, ctx, info) {

        //check if logged in 
        if (!ctx.request.userId) {
            throw new Error('You must be logged in');
         };
        //query current user
         const currentUser = await ctx.db.query.user({
             where: {
                 id: ctx.request.userId
             }
         }, info);
        //check if they have permissions to do thia
        hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
        //update permissions
        return ctx.db.mutation.updateUser({
            data: {
                permissions: {
                    set: args.permissions
                }
            },
            where: {
                id: args.userId
            }
        }, info);

    },
    async updateStocks(parent, args, ctx, info) {
        
        //check if logged in 
        if (!ctx.request.userId) {
            throw new Error('You must be logged in');
         };
        //query current user
         const currentUser = await ctx.db.query.user({
             where: {
                 id: ctx.request.userId
             }
         }, info);
        //check if they have permissions to do thia
        hasPermission(currentUser, ['ADMIN', 'STOCKUPDATE']);  
        //find grouping
        //get the grouping
        let stocks = await ctx.db.query.stocks({ 
            where: {
                grouping: args.grouping
            }
        }, info);

        //make a url-ready search
        let output = "";
        for (var i = 0; i < stocks.length; i++) {
            output += stocks[i].symbol;
            if (i !== stocks.length-1) {
                output+=",";
            } 
        }

        console.log(output);

        //update each one
        await axios.get(`https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&apikey=${process.env.API_KEY}&symbols=${output}`)
            .then(response => {
                for (let i of stocks) {
                    stocks[i].price = response.data['Stock Quotes'][i]['2. price'];
                };
                //console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            }
            );

        //save to database
        for (var i = 0; i < stocks.length; i++) {
            const updatedStock = await ctx.db.mutation.updateStock({
                where: {
                    id: stocks[i].id
                },
                data: {
                    price: stocks[i].price
                }
            });
        }
        return stocks;

    }
    
};

module.exports = Mutations;
