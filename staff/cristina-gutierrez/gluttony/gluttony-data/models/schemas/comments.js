const { Schema } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required:true
    },

    date: {
        type: Date,
        required: true
    }
})