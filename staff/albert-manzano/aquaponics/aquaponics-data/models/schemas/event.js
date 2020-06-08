const { Schema } = require('mongoose')

module.exports = new Schema({
    date: {
        type: date,
        ref: event,
        required: true
    },

    description: {
        type: String,
        minlength: 10,
        required: true
    }
})