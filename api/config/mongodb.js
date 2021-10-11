const mongoose = require("mongoose");
const MONGO_URI = 'mongodb+srv://PlantApp:'+ process.env.MONGO_ATLAS_PW +'@plantapp.49pcz.mongodb.net/userdb?retryWrites=true&w=majority'
const connectDB = async() => {
    const conn = await mongoose.connect(MONGO_URI, {
        autoIndex: true,
        autoCreate: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};
module.exports = connectDB;