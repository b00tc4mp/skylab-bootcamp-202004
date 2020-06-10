const { Schema } = require('mongoose')

module.exports = new Schema({
    productType: {
        type: String,
        required: true
    },

    ticker: {
        type: String,
        required: true
    },

    exchange: {
        type: String,
        required: true
    },

    sector: {
        type: String,
        required: true
    },

    contractSize: {
        type: Number,
        required: true
    },

    settlementDate: {
        type: Date,
        required: true
    },

    type: {
        type: Object
    }
})