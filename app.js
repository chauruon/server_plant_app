const express = require('express');
const app = express();
const morgan = require('morgan');
const mongo = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes = require('./api/routes/all_Route');
const connectDB = require('./api/config/mongodb');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())
app.use(cors())

// kết nối mongoose (database)
connectDB();

app.use('/api', routes);

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
 app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
 });

module.exports = app;