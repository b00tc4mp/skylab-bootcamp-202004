const { Schema } = require('mongoose')
const price = require('./price')

module.exports = new Schema({
    type: {
        type: String,
        required: true
    },

    exchange: {
        type: String,
        required: true
    },

    ticker: {
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

    expirationDate: {
        type: Date,
        required: true
    },

    prices: [price]
})