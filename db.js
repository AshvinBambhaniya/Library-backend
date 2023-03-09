const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://notebook-backend:notebook-backend@cluster0.efw5kzi.mongodb.net/library-backend?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to mongoose Successfully")
    })
}

module.exports = connectToMongo;