const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./api/config/mongodb');
const routes = require('./api/routes/all_Route');
const isAuth = require('./api/middleware/is-auth')

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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200)
    }
    next()
  })

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

app.use(isAuth);

app.use((req,res)=>{
        // res.setHeader(name, value) 
        res.writeHead(200, { 'Content-Type': 'text/plain' });x
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