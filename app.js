const express = require('express');
const app = express();
const dotenv = require('dotenv');
var cors = require('cors');
const connectDatabase = require('./config/database');
const errorMiddleware = require('./utillib/errors');
//set up config
dotenv.config({path : './config/config.env'});
connectDatabase();

//setup body parser
app.use(express.json());


//importing all routes
const cars = require('./routes/cars');
const auth = require('./routes/auth');
const mock = require('./routes/mock');


// use it before all route definitions
app.use(cors({origin: true, credentials: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/v1', cars);
app.use('/api/v1', auth);
app.use('/api/v1', mock);

//middleware setup
//fallback route
app.all('*', (req,res,next) => {
    next('route not found');
});



const PORT = process.env.PORT;
    module.exports = app.listen(PORT, () => {
        console.log(`Server running on port ${process.env.PORT} in mode: ${process.env.NODE_ENV}`);
    });
