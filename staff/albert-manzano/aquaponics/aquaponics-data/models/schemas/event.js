const { Schema } = require('mongoose')

module.exports = new Schema({
    date: {
        type: Date,
        ref: 'Event',
        required: true
    },

    description: {
        type: String,
        minlength: 8,
        required: true
    }
})