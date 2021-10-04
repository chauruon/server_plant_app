const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const register = require('./api/routes/register');
const userRoutes = require('./api/routes/user');

const uri = 'mongodb+srv://PlantApp:'+ process.env.MONGO_ATLAS_PW +'@plantapp.49pcz.mongodb.net/userdb?retryWrites=true&w=majority'

mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connected!!");
    },
    err => {console.log(err.message); }
  );

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use((req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET');
        return res.status(200).json({}); 
    }
    // next();
})

app.use('/register', register);
app.use('/api', userRoutes);

app.use((req,res,next)=>{
    const error = new Error('not found');
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