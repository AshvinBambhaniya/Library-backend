const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URL;

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to mongoose Successfully")
    })
}

module.exports = connectToMongo;