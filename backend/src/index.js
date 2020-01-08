const cookieParser = require('cookie-parser');
require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');
const jwt = require('jsonwebtoken');

const server = createServer();

//use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

//middleware to decode JWT so we can get user ID on each request
server.express.use((req, res, next) => {

    //pull token out of request
    const token = req.cookies.token;

    if(token) {
        const verified = jwt.verify(token, process.env.APP_SECRET).userId;
        //put userId onto request
        req.userId = verified;
    }

    next();

});

//use express middleware to populate current user


server.start(
    {
      cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
      },
    },
    deets => {
      console.log(`Server is now running on port http://localhost:${deets.port}`);
    }
  );