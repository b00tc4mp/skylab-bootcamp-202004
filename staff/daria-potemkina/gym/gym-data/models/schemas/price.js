const { Schema } = require('mongoose')

module.exports = new Schema({
    date: {
        type: Date,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
})