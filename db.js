const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URL;

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to mongoose Successfully")
    })
}

module.exports = connectToMongo;