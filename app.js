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
app.use(bodyParser.json({ type: 'application/*+json' }))
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
    next(
        res.json({
            error:{
                message:error.message
            }
        })
    );
});
app.use((req,res)=>{
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('ok');
    }
)
 app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    next(
        res.json({
            error:{
                message:error.message
            }
        })
    )
 });

module.exports = app;