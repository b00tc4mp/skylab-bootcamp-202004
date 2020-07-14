const { Schema } = require('mongoose')

module.exports = new Schema({
    strike: {
        type: Number,
        required: true
    },

    side: {
        type: String,
        enum: ['call', 'put'],
        required: true
    }
})