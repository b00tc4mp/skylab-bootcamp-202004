const { Schema } = require('mongoose')


module.exports = new Schema({
    table: {
        type: Number,
        required: true
    },

    active: {
        type: Boolean,
        required: true,
        default: false
    }   
})