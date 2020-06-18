const { Schema } = require('mongoose')

module.exports = new Schema({
    content: {
        type: String,
        required: true,
        minlength: 2
    },
    limit: {
        type: Number,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        required: true,
    }
})