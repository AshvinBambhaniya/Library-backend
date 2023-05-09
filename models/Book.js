const mongoose = require('mongoose')
const { Schema } = mongoose

const BookSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    book:{
        type: String,
        required: true
    },
    auther:{
        type: String,
        required: true
    },
    publisher:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('book',BookSchema);