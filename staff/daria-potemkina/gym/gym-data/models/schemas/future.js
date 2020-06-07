const { Schema } = require('mongoose')
const futureFeatures = require('./future-features')

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

    features: [futureFeatures]
})