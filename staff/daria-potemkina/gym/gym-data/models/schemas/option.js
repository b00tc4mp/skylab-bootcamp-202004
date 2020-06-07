const { Schema } = require('mongoose')
const optionFeatures = require('./option-features')

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
        type: String,
        required: true
    },

    side: {
        type: String,
        required: true
    },

    expirationDate: {
        type: Date,
        required: true
    },

    features: [optionFeatures]
})