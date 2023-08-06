const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/Library";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to mongoose Successfully")
    })
}

module.exports = connectToMongo;