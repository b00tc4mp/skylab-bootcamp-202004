const { Schema } = require('mongoose')

module.exports = new Schema({
    message: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
})