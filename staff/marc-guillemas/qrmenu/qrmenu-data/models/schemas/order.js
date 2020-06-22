const { Schema } = require("mongoose");
const dishStatus = require('./dishStatus')

module.exports = new Schema ({
    tableId: {
        type: String,
        required: true
    },

    table: {
        type: Number,
        required: true
    },

    dishStatus: [dishStatus],

    total: {
        type: Number,
        default: 0
    },

    payed: {
        type: Boolean, 
        default: false
    },

    date: {
        type: Date,
        default: Date.now()
    }
})